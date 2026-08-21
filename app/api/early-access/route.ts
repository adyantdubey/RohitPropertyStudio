import { env } from "cloudflare:workers";
import { recordEvent } from "../../lib/analytics";

const interests = new Set(["course-launch", "team-training", "property-enquiry", "general"]);

type Submission = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  consent?: unknown;
  website?: unknown;
  sourcePath?: unknown;
  turnstileToken?: unknown;
};

type TurnstileResponse = { success?: boolean };

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function verifyTurnstile(token: string, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token,
      remoteip: request.headers.get("CF-Connecting-IP") || undefined,
      idempotency_key: crypto.randomUUID(),
    }),
  });
  if (!verification.ok) return false;
  const result = await verification.json() as TurnstileResponse;
  return result.success === true;
}

export async function POST(request: Request) {
  let body: Submission;
  try {
    body = await request.json() as Submission;
  } catch {
    return json({ message: "Please check the form and try again." }, 400);
  }

  if (clean(body.website, 200)) return json({ message: "Your interest has been recorded." }, 201);

  const name = clean(body.name, 100);
  const email = clean(body.email, 160).toLowerCase() || null;
  const phone = clean(body.phone, 30) || null;
  const interest = clean(body.interest, 40);
  const sourcePath = clean(body.sourcePath, 160).startsWith("/") ? clean(body.sourcePath, 160) : "/contact";
  const token = clean(body.turnstileToken, 2048);

  if (name.length < 2 || (!email && !phone) || !interests.has(interest) || body.consent !== true) {
    return json({ message: "Please add your name, email or phone, enquiry type and consent." }, 400);
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ message: "Please enter a valid email address." }, 400);
  }
  if (!(await verifyTurnstile(token, request))) {
    return json({ message: "The security check expired or could not be verified. Please try again." }, 400);
  }

  try {
    const now = new Date().toISOString();
    let leadId = crypto.randomUUID();
    if (email) {
      const existing = await env.ACADEMY_DB.prepare("SELECT id FROM early_access_leads WHERE email = ? LIMIT 1").bind(email).first<{ id: string }>();
      if (existing?.id) {
        leadId = existing.id;
        await env.ACADEMY_DB.prepare(
          "UPDATE early_access_leads SET name = ?, phone = COALESCE(?, phone), interest = ?, source_path = ?, consent_at = ?, updated_at = ? WHERE id = ?",
        ).bind(name, phone, interest, sourcePath, now, now, leadId).run();
      } else {
        await env.ACADEMY_DB.prepare(
          "INSERT INTO early_access_leads (id, name, email, phone, interest, source_path, consent_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        ).bind(leadId, name, email, phone, interest, sourcePath, now, now, now).run();
      }
    } else {
      await env.ACADEMY_DB.prepare(
        "INSERT INTO early_access_leads (id, name, email, phone, interest, source_path, consent_at, created_at, updated_at) VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?)",
      ).bind(leadId, name, phone, interest, sourcePath, now, now, now).run();
    }

    // The lead is already saved; recordEvent never throws, so analytics can never
    // turn a saved lead into an error for the visitor.
    recordEvent("early_access_completed", interest, sourcePath);

    return json({ message: "The team can now contact you when the launch details are confirmed." }, 201);
  } catch (error) {
    console.error("Early access submission failed", error);
    return json({ message: "The list is temporarily unavailable. Please use WhatsApp or email instead." }, 503);
  }
}
