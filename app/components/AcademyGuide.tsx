"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CornerDownLeft, Sparkles } from "lucide-react";
import { course, glossaryTerms } from "../lib/siteContent";

/**
 * "Ask the Academy" — a small, honest AI tutor.
 *
 * Answers stream in token by token from /api/ask (Workers AI). When the AI is
 * unavailable — no binding, free quota spent, model error — the panel falls
 * back to matching glossary definitions and the WhatsApp channel, and says so
 * plainly instead of pretending.
 */

type Turn = { role: "user" | "assistant"; content: string; fallback?: boolean };

const suggestions = [
  "What is the difference between carpet area and built-up area?",
  "What does RERA actually do?",
  "What is undivided share?",
  "How does a construction-linked payment plan work?",
] as const;

function track(event: string) {
  window.dispatchEvent(new CustomEvent("academy:track", { detail: { event } }));
}

function glossaryFallback(question: string): string {
  const words = question.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
  const matches = glossaryTerms
    .map((item) => ({
      item,
      score: words.filter((w) => `${item.term} ${item.definition}`.toLowerCase().includes(w)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (!matches.length) {
    return "The AI guide is resting right now and no glossary entry matches this directly. The Hundred Yards team can answer on WhatsApp, or try the glossary above.";
  }
  const definitions = matches.map(({ item }) => `${item.term}: ${item.definition}`).join("\n\n");
  return `The AI guide is resting right now, so here is the closest glossary answer instead.\n\n${definitions}`;
}

export function AcademyGuide() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  const ask = useCallback(async (raw: string) => {
    const question = raw.trim().slice(0, 300);
    if (question.length < 2 || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setInput("");
    track("guide_used");

    let history: Turn[] = [];
    setTurns((current) => {
      history = current.filter((t) => !t.fallback).slice(-6);
      return [...current, { role: "user", content: question }, { role: "assistant", content: "" }];
    });

    const finish = (content: string, fallback = false) => {
      setTurns((current) => {
        const next = [...current];
        next[next.length - 1] = { role: "assistant", content, fallback };
        return next;
      });
      if (fallback) track("guide_fallback");
      busyRef.current = false;
      setBusy(false);
    };

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          history: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      const type = response.headers.get("Content-Type") || "";
      if (!type.includes("text/event-stream")) {
        const data = await response.json() as { answer?: string; fallback?: boolean };
        if (data.answer) { finish(data.answer); return; }
        finish(glossaryFallback(question), true);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) { finish(glossaryFallback(question), true); return; }

      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";
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
            if (token) {
              answer += token;
              const snapshot = answer;
              setTurns((current) => {
                const next = [...current];
                next[next.length - 1] = { role: "assistant", content: snapshot };
                return next;
              });
            }
          } catch {
            // partial JSON across chunk boundary — wait for more
          }
        }
      }
      if (answer) finish(answer);
      else finish(glossaryFallback(question), true);
    } catch {
      finish(glossaryFallback(question), true);
    }
  }, []);

  // The glossary's "no match" state hands its query over through this event.
  useEffect(() => {
    const onAsk = (event: Event) => {
      const question = (event as CustomEvent<{ question?: string }>).detail?.question;
      if (question) void ask(question);
    };
    window.addEventListener("academy:guide-ask", onAsk);
    return () => window.removeEventListener("academy:guide-ask", onAsk);
  }, [ask]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(input);
  };

  return (
    <div className="guide" id="ask-panel">
      <div className="guide__head">
        <span className="guide__badge"><Sparkles size={15} aria-hidden="true" /> AI guide</span>
        <p>Ask about any property term. Educational answers only — it will not advise on a specific project, price or investment.</p>
      </div>

      {turns.length === 0 && (
        <div className="guide__starters">
          {suggestions.map((question) => (
            <button key={question} type="button" onClick={() => void ask(question)}>{question}</button>
          ))}
        </div>
      )}

      {turns.length > 0 && (
        <div className="guide__log" ref={logRef} aria-live="polite">
          {turns.map((turn, index) => (
            <div className={`guide__turn guide__turn--${turn.role}`} key={index}>
              {turn.content
                ? turn.content.split("\n").filter(Boolean).map((line, i) => <p key={i}>{line}</p>)
                : <p className="guide__thinking" aria-label="Thinking">Thinking</p>}
              {turn.role === "assistant" && index === turns.length - 1 && busy && turn.content && (
                <span className="guide__caret" aria-hidden="true" />
              )}
              {turn.fallback && (
                <a className="text-link" href={course.whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp_clicked">
                  Ask the team on WhatsApp <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <form className="guide__form" onSubmit={submit}>
        <label className="sr-only" htmlFor="guide-input">Ask a property question</label>
        <input
          id="guide-input"
          type="text"
          value={input}
          maxLength={300}
          placeholder="Ask about a property term…"
          autoComplete="off"
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="button button--gold button--sm" type="submit" disabled={busy || input.trim().length < 2}>
          {busy ? "Answering…" : "Ask"} <CornerDownLeft size={15} aria-hidden="true" />
        </button>
      </form>

      <p className="tool__note">
        Answers are AI-generated learning aids, not professional advice, and may be imperfect.
        Definitions vary by project and state — verify against the actual documents. Conversations
        are not stored.
      </p>
    </div>
  );
}
