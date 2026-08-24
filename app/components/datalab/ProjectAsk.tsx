"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const STARTERS = [
  "Is this project RERA registered?",
  "What does the register say about the builder?",
  "What should I verify before booking here?",
];

/**
 * Project-aware AI — same Workers AI route as the Deal Decoder, in "project"
 * mode: the server injects this project's register facts and refuses anything
 * beyond them. Same limits, same graceful fallback.
 */
export function ProjectAsk({ slug, name }: { slug: string; name: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "fallback">("idle");
  const busyRef = useRef(false);

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 4 || busyRef.current) return;
    busyRef.current = true;
    setStatus("busy");
    setAnswer("");
    window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "project_ask_used" } }));

    const fallback = () => {
      setStatus("fallback");
      setAnswer(
        `The guide is resting right now. The register facts for ${name} are shown above — for anything beyond them, the official K-RERA register link or the WhatsApp button below will get you an answer from a person.`,
      );
      busyRef.current = false;
    };

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, mode: "project", project: slug }),
      });
      const type = response.headers.get("Content-Type") || "";
      if (!type.includes("text/event-stream")) { fallback(); return; }
      const reader = response.body?.getReader();
      if (!reader) { fallback(); return; }
      const decoder = new TextDecoder();
      let buffer = "";
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const payload = line.startsWith("data: ") ? line.slice(6).trim() : "";
          if (!payload || payload === "[DONE]") continue;
          try {
            const token = (JSON.parse(payload) as { response?: string }).response;
            if (token) { text += token; setAnswer(text); }
          } catch { /* partial chunk */ }
        }
      }
      if (text) { setStatus("done"); busyRef.current = false; }
      else fallback();
    } catch {
      fallback();
    }
  };

  return (
    <div className="pask">
      <p className="dossier__more-title"><Sparkles size={12} aria-hidden="true" /> Ask about this project</p>
      <div className="pask__starters">
        {STARTERS.map((starter) => (
          <button key={starter} onClick={() => { setQuestion(starter); void ask(starter); }} disabled={status === "busy"}>
            {starter}
          </button>
        ))}
      </div>
      <form
        className="pask__form"
        onSubmit={(event) => { event.preventDefault(); void ask(question); }}
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Your question on the register facts…"
          aria-label={`Ask about ${name}`}
          maxLength={280}
        />
        <button className="button button--gold button--sm" disabled={status === "busy"} type="submit">
          {status === "busy" ? "Reading…" : <>Ask <ArrowUpRight size={13} aria-hidden="true" /></>}
        </button>
      </form>
      {answer && <p className={`pask__answer${status === "fallback" ? " is-fallback" : ""}`}>{answer}</p>}
      <p className="annot">Answers only from the public register shown above — never price opinions or advice.</p>
    </div>
  );
}
