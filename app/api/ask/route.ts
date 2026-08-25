import { env } from "cloudflare:workers";
import { brand, courseModules, glossaryTerms } from "../../lib/siteContent";
import datalab from "../../lib/datalab/projects.json";

/**
 * The Academy guide — a small educational assistant powered by Workers AI.
 *
 * Design rules, in order:
 *   1. It teaches property vocabulary only. It refuses legal, tax, price and
 *      investment advice, and never talks about a specific project.
 *   2. It degrades honestly. If the AI binding is absent, the daily free quota
 *      is spent, or the model errors, the route answers with { fallback: true }
 *      and the client falls back to the glossary + WhatsApp. No hard failures.
 *   3. It is cheap to run. Workers AI free tier is ~10k neurons/day; answers are
 *      capped short and each visitor gets a small daily allowance.
 */

type AiRunner = {
  run: (
    model: string,
    options: Record<string, unknown>,
  ) => Promise<ReadableStream<Uint8Array> | Record<string, unknown>>;
};

/**
 * Model candidates, tried in order. Catalogs change and accounts differ, so the
 * route discovers a working model at runtime and remembers it per isolate.
 * GET /api/ask reports which candidate works and the exact error from each
 * failure — open it in a browser when the AI "rests" in production.
 */
const MODELS = [
  "@cf/meta/llama-3.1-8b-instruct",
  "@cf/meta/llama-3.1-8b-instruct-fast",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-3-8b-instruct",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
] as const;
let workingModel: string | null = null;
const DAILY_VISITOR_LIMIT = 15;
const DAILY_GLOBAL_LIMIT = 400;

// Per-isolate counters. Not perfectly global, but combined with the graceful
// quota fallback they are enough protection for a pre-launch site.
const visitorUsage = new Map<string, { day: string; count: number }>();
let globalUsage = { day: "", count: 0 };

function today() {
  return new Date().toISOString().slice(0, 10);
}

function underLimit(ip: string) {
  const day = today();
  if (globalUsage.day !== day) globalUsage = { day, count: 0 };
  if (globalUsage.count >= DAILY_GLOBAL_LIMIT) return false;

  const entry = visitorUsage.get(ip);
  if (!entry || entry.day !== day) {
    visitorUsage.set(ip, { day, count: 1 });
    globalUsage.count += 1;
    return true;
  }
  if (entry.count >= DAILY_VISITOR_LIMIT) return false;
  entry.count += 1;
  globalUsage.count += 1;
  return true;
}

function decodePrompt() {
  return [
    `You are the Deal Decoder for ${brand.academy} (Bengaluru, India). The user pastes a fragment of a builder's quote, brochure or listing.`,
    ``,
    `Do exactly two things, in plain English for a beginner:`,
    `1. TRANSLATE: explain what each term or number in the fragment actually means (SBUA, carpet, PLC, EDC, IDC, clubhouse charge, corpus, khata, CLP and so on).`,
    `2. VERIFY: list the 3-5 specific things the buyer should ask for or check in writing before relying on this fragment.`,
    ``,
    `Hard rules:`,
    `1. NEVER judge whether the deal or price is good or bad, and never estimate a fair price. You translate and point to verification only.`,
    `2. No legal, tax or investment advice. For anything project-specific, suggest the Hundred Yards team on WhatsApp (+91 99168 66667) or a qualified professional.`,
    `3. Under 150 words. Short lines. No markdown headings.`,
    `4. Never invent facts about the project — you only see the fragment.`,
  ].join("\n");
}

function systemPrompt() {
  const glossary = glossaryTerms.map((item) => `- ${item.term}: ${item.definition}`).join("\n");
  const chapters = courseModules.map((m) => `${m.number}. ${m.title} — ${m.copy}`).join("\n");
  return [
    `You are the Academy Guide for ${brand.academy}, the educational platform of ${brand.name}, ${brand.role} of ${brand.company} (Bengaluru, India).`,
    `The academy's first product is "Basics of Real Estate", a 49-slide visual foundation course. It is pre-launch: no price is announced and no payment is collected.`,
    ``,
    `Your ONLY job is to explain foundational real-estate vocabulary and concepts, in plain English, for beginners in India.`,
    ``,
    `Course chapters:`,
    chapters,
    ``,
    `Glossary you may draw on:`,
    glossary,
    ``,
    `Hard rules:`,
    `1. Educational definitions and general context only. NEVER give legal, tax, price, valuation or investment advice, and never assess a specific project, builder or locality.`,
    `2. If asked for advice, a prediction, or anything transaction-specific, decline briefly and suggest speaking to the Hundred Yards team on WhatsApp (+91 99168 66667) or a qualified professional.`,
    `3. Definitions vary by project and state — remind the reader to verify against actual project documents when it matters.`,
    `4. Keep answers under 120 words. Plain sentences. No markdown headings, no bullet spam.`,
    `5. Never invent statistics, prices, laws or returns. If unsure, say so.`,
  ].join("\n");
}

type AskBody = { question?: unknown; history?: unknown; mode?: unknown; project?: unknown };

/** Project-aware prompt: facts come ONLY from our own register entry (looked up
 *  server-side by slug), never from the client — so they cannot be spoofed. */
function projectPrompt(slug: string): string | null {
  const project = datalab.projects.find((entry) => entry.slug === slug);
  if (!project) return null;
  const siblings = datalab.projects
    .filter((entry) => entry.promoter === project.promoter && entry.slug !== slug)
    .map((entry) => `${entry.name} (${entry.locality}; ${entry.status})`)
    .slice(0, 12);
  return [
    `You are the project guide of ${brand.academy} (Bengaluru, India), answering questions about ONE project using ONLY the register facts below.`,
    ``,
    `REGISTER FACTS (Karnataka RERA public register, as of ${datalab.asOf}):`,
    `- Project: ${project.name}`,
    `- Builder/promoter: ${project.promoter || "on record — name pending full register sync"}`,
    `- Locality: ${project.locality} (${project.zone} Bengaluru)`,
    `- Register status: ${project.status}`,
    `- K-RERA reference: ${project.reraRef || "on record"}${project.reraComplete ? "" : " (partial reference — must be confirmed on the official register)"}`,
    siblings.length ? `- Other register entries by this promoter: ${siblings.join("; ")}` : `- No other register entries by this promoter in our extract.`,
    ``,
    `Hard rules:`,
    `1. Answer ONLY from the facts above plus general vocabulary education. If a detail is not in the facts (price, carpet area, amenities, possession date, loan advice), say plainly that it is not in the public register extract and suggest the official register or the Hundred Yards team on WhatsApp (+91 99168 66667).`,
    `2. NEVER judge whether the project or its price is good or bad, never predict prices, never give legal, tax or investment advice.`,
    `3. Never invent a fact, figure or date. Cite "K-RERA public register" when stating a fact.`,
    `4. Under 120 words, plain English for a beginner, no markdown headings.`,
  ].join("\n");
}
type Turn = { role: "user" | "assistant"; content: string };

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let body: AskBody;
  try {
    body = await request.json() as AskBody;
  } catch {
    return json({ fallback: true, reason: "bad_request" }, 400);
  }

  const mode = body.mode === "decode" ? "decode" : body.mode === "project" ? "project" : "ask";
  const maxLength = mode === "decode" ? 700 : 300;
  const projectSystem = mode === "project" && typeof body.project === "string" ? projectPrompt(body.project.slice(0, 80)) : null;
  if (mode === "project" && !projectSystem) return json({ fallback: true, reason: "unknown_project" }, 400);
  const question = typeof body.question === "string" ? body.question.trim().slice(0, maxLength) : "";
  if (question.length < 2) return json({ fallback: true, reason: "empty" }, 400);

  const history: Turn[] = Array.isArray(body.history)
    ? (body.history as Turn[])
        .filter((t) => t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string")
        .slice(-6)
        .map((t) => ({ role: t.role, content: t.content.slice(0, 500) }))
    : [];

  const ai = (env as unknown as { AI?: AiRunner }).AI;
  if (!ai) return json({ fallback: true, reason: "unavailable" });

  const ip = request.headers.get("CF-Connecting-IP") || "anonymous";
  if (!underLimit(ip)) return json({ fallback: true, reason: "limit" });

  const messages = [
    { role: "system", content: mode === "decode" ? decodePrompt() : mode === "project" && projectSystem ? projectSystem : systemPrompt() },
    ...history,
    { role: "user", content: question },
  ];
  const options = { messages, max_tokens: 320, temperature: 0.3 };
  const candidates = workingModel ? [workingModel, ...MODELS.filter((m) => m !== workingModel)] : [...MODELS];
  const errors: string[] = [];

  // First pass: streaming. Second pass: plain JSON (some models/accounts
  // reject stream mode but answer fine without it — the client handles both).
  for (const streaming of [true, false]) {
    for (const model of candidates) {
      try {
        const result = await ai.run(model, { ...options, stream: streaming });
        if (streaming && result instanceof ReadableStream) {
          workingModel = model;
          return new Response(result, {
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
          });
        }
        const text = typeof (result as { response?: unknown }).response === "string"
          ? (result as { response: string }).response
          : "";
        if (text) {
          workingModel = model;
          return json({ answer: text });
        }
        errors.push(`${model}${streaming ? " (stream)" : ""}: empty response`);
      } catch (error) {
        errors.push(`${model}${streaming ? " (stream)" : ""}: ${error instanceof Error ? error.message.slice(0, 160) : "unknown error"}`);
      }
    }
  }
  console.error("All AI candidates failed", errors);
  return json({ fallback: true, reason: "error", errors: errors.slice(0, 10) });
}

/**
 * Health check: GET /api/ask answers with which model works and the exact
 * error from every candidate that does not. Safe to expose — it holds no
 * secrets and costs a few tokens at most.
 */
export async function GET() {
  const ai = (env as unknown as { AI?: AiRunner }).AI;
  if (!ai) return json({ ok: false, binding: "missing" });
  const report: Array<{ model: string; ok: boolean; error?: string; sample?: string }> = [];
  for (const model of MODELS) {
    try {
      const result = await ai.run(model, {
        messages: [{ role: "user", content: "Reply with the single word: ready" }],
        max_tokens: 10,
      });
      const text = typeof (result as { response?: unknown }).response === "string"
        ? (result as { response: string }).response.trim()
        : "";
      report.push({ model, ok: text.length > 0, sample: text.slice(0, 40) });
      if (text && !workingModel) workingModel = model;
    } catch (error) {
      report.push({ model, ok: false, error: error instanceof Error ? error.message.slice(0, 200) : "unknown" });
    }
  }
  return json({ ok: report.some((r) => r.ok), workingModel, report });
}
