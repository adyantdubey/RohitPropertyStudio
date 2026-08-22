"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, ScanSearch } from "lucide-react";
import { course } from "../../lib/siteContent";

const samples = [
  "₹7,250/sqft on SBUA, 1.5% floor rise, 2 covered CP ₹4.5L, clubhouse ₹3L, corpus ₹2/sqft, CLP 10:80:10",
  "Pre-launch offer: pay 10% now, no EMI till possession, A khata, OC applied",
] as const;

/**
 * Paste a fragment of a builder's quote; the AI translates the jargon and lists
 * what to verify. Same Workers AI route, limits and honesty rules as the guide —
 * and the same graceful fallback when the model is unavailable.
 */
export function DealDecoder() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "fallback">("idle");
  const busyRef = useRef(false);

  const decode = async (raw: string) => {
    const fragment = raw.trim().slice(0, 700);
    if (fragment.length < 8 || busyRef.current) return;
    busyRef.current = true;
    setStatus("busy");
    setAnswer("");
    window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "decoder_used" } }));

    const fallback = () => {
      setStatus("fallback");
      setAnswer(
        "The decoder is resting right now. Two reliable moves meanwhile: ask the seller to state, in writing, which area definition every rate uses — and check each unfamiliar term in the glossary on the Resources page.",
      );
      busyRef.current = false;
    };

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: fragment, mode: "decode" }),
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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void decode(input);
  };

  return (
    <div className="tool lab-tool lab-tool--decoder">
      <form className="decoder__form" onSubmit={submit}>
        <label htmlFor="decoder-input">
          <ScanSearch size={16} aria-hidden="true" /> Paste a line from a quote, brochure or listing
        </label>
        <textarea
          id="decoder-input"
          value={input}
          maxLength={700}
          rows={3}
          placeholder="e.g. ₹7,250/sqft on SBUA, 2 covered CP ₹4.5L, corpus ₹2/sqft…"
          onChange={(event) => setInput(event.target.value)}
        />
        <div className="decoder__actions">
          {samples.map((sample) => (
            <button className="decoder__sample" type="button" key={sample} onClick={() => { setInput(sample); void decode(sample); }}>
              Try: “{sample.slice(0, 44)}…”
            </button>
          ))}
          <button className="button button--gold button--sm" type="submit" disabled={status === "busy" || input.trim().length < 8}>
            {status === "busy" ? "Decoding…" : "Decode it"}
          </button>
        </div>
      </form>

      {answer && (
        <div className="decoder__answer" aria-live="polite">
          {answer.split("\n").filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
          {status === "busy" && <span className="guide__caret" aria-hidden="true" />}
          {status === "fallback" && (
            <a className="text-link" href={course.whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp_clicked">
              Ask the team on WhatsApp <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      )}

      <p className="tool__note">
        The decoder translates wording and points to what needs verification. It never judges whether a
        price or deal is good — no tool honestly can from one line of text. AI answers may be imperfect;
        verify against the actual project documents.
      </p>
    </div>
  );
}
