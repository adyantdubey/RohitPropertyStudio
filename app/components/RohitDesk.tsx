"use client";

import { ArrowUpRight, MessageCircle, Send, Sparkles } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

type DeskReply = {
  question: string;
  answer: string;
};

const suggestedReplies: DeskReply[] = [
  {
    question: "I’m new to real estate. Where should I begin?",
    answer:
      "Start with the Field Notes guide. It establishes the essential vocabulary, a due-diligence checklist, and a simple way to compare opportunities before you move into the deeper course.",
  },
  {
    question: "What is the difference between the course and the PDF?",
    answer:
      "The PDF is a concise field reference you can revisit while researching. The course adds guided lessons, worked examples, and a complete decision process for people who want more structure.",
  },
  {
    question: "Does Rohit answer personal investment questions?",
    answer:
      "Rohit can clarify the educational material and his evaluation framework, but the site does not provide personalised investment, legal, tax, or financial advice.",
  },
];

export function RohitDesk() {
  const [reply, setReply] = useState<DeskReply>(suggestedReplies[0]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [isCustomFallback, setIsCustomFallback] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  function selectSuggestion(item: DeskReply) {
    setReply(item);
    setCustomQuestion("");
    setIsCustomFallback(false);
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = customQuestion.trim();
    if (!question) return;

    setIsThinking(true);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = (await response.json()) as { answer?: string };
      if (!response.ok || !data.answer) throw new Error("Mistral unavailable");
      setReply({ question, answer: data.answer });
      setIsCustomFallback(false);
    } catch {
      setReply({
        question,
        answer:
          "Mistral is wired into this experience but its private API key is not connected in the preview. Send this question to Rohit through the contact form and he can reply with the right context.",
      });
      setIsCustomFallback(true);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <section className="rohit-desk" aria-labelledby="rohit-desk-title">
      <div className="rohit-desk__topline">
        <div className="rohit-desk__identity">
          <span className="rohit-desk__mark" aria-hidden="true">
            <MessageCircle size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="rohit-desk__label">Rohit’s desk</p>
            <p className="rohit-desk__availability">
              <span aria-hidden="true" /> Guided answers
            </p>
          </div>
        </div>
        <span className="rohit-desk__demo-label">
          <Sparkles aria-hidden="true" size={14} /> AI-ready demo
        </span>
      </div>

      <div className="rohit-desk__body">
        <div className="rohit-desk__intro">
          <p className="rohit-desk__eyebrow">A clear place to start</p>
          <h2 id="rohit-desk-title">Ask before you choose.</h2>
          <p>
            Explore curated answers to common questions. This preview is
            transparent by design: it is ready for an AI knowledge layer, but
            does not pretend to generate live advice.
          </p>
        </div>

        <div className="rohit-desk__suggestions" aria-label="Suggested questions">
          {suggestedReplies.map((item, index) => (
            <button
              aria-pressed={!isCustomFallback && reply.question === item.question}
              className="rohit-desk__suggestion"
              key={item.question}
              onClick={() => selectSuggestion(item)}
              type="button"
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {item.question}
            </button>
          ))}
        </div>

        <div className="rohit-desk__conversation" aria-live="polite">
          <p className="rohit-desk__question">“{reply.question}”</p>
          <div className="rohit-desk__reply">
            <span className="rohit-desk__reply-mark" aria-hidden="true">
              R
            </span>
            <div>
              <p>{reply.answer}</p>
              {isCustomFallback ? (
                <a className="rohit-desk__contact-link" href="/contact">
                  Ask Rohit directly
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <form className="rohit-desk__composer" onSubmit={submitQuestion}>
          <label htmlFor="rohit-desk-question">Your own question</label>
          <div className="rohit-desk__composer-control">
            <input
              autoComplete="off"
              id="rohit-desk-question"
              onChange={(event) => setCustomQuestion(event.target.value)}
              placeholder="Ask about a guide, course, or learning path…"
              type="text"
              value={customQuestion}
            />
            <button
              aria-label="Submit question"
              disabled={!customQuestion.trim() || isThinking}
              type="submit"
            >
              {isThinking ? <Sparkles aria-hidden="true" size={17} /> : <Send aria-hidden="true" size={17} strokeWidth={1.8} />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
