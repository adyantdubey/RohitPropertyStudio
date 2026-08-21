"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, MessageCircle, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type DeskReply = {
  question: string;
  answer: string;
};

const suggestedReplies: DeskReply[] = [
  {
    question: "I am exploring a property. Where should I begin?",
    answer:
      "Use the Advisory route for a human conversation with the Hundred Yards team. If you are here to learn first, the Academy and Insights routes explain Rohitt’s educational work without presenting automated property advice.",
  },
  {
    question: "Can I download the field guide today?",
    answer:
      "Not yet. Before You Buy is clearly marked Coming Soon because the PDF, final price, delivery terms, and payment flow are not live. You can register interest and be contacted when first access is ready.",
  },
  {
    question: "Can this site assess a specific property?",
    answer:
      "No. This guide can explain the site and route you to a human conversation, but it cannot assess a property or provide personalised investment, legal, tax, valuation, engineering, or financial advice.",
  },
];

export function RohitDesk() {
  const [reply, setReply] = useState<DeskReply>(suggestedReplies[0]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [isCustomFallback, setIsCustomFallback] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      const activeRequest = requestRef.current;
      requestRef.current = null;
      activeRequest?.abort();
    },
    [],
  );

  function selectSuggestion(item: DeskReply) {
    setReply(item);
    setCustomQuestion("");
    setIsCustomFallback(false);
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = customQuestion.trim();
    if (!question) return;

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setIsThinking(true);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      const data = (await response.json()) as { answer?: string };
      if (!response.ok || !data.answer) throw new Error("Mistral unavailable");
      setReply({ question, answer: data.answer });
      setIsCustomFallback(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setReply({
        question,
        answer:
          "The optional site guide is not connected, so it will not invent an answer. Continue to the enquiry route for the Hundred Yards team or choose one of the published starting points above.",
      });
      setIsCustomFallback(true);
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsThinking(false);
      }
    }
  }

  return (
    <section
      className="rohit-desk cin-resource-concierge"
      aria-labelledby="rohit-desk-title"
    >
      <div className="rohit-desk__topline">
        <div className="rohit-desk__identity">
          <span className="rohit-desk__mark" aria-hidden="true">
            <MessageCircle size={18} strokeWidth={1.8} />
          </span>
          <div>
          <p className="rohit-desk__label">RKS site guide</p>
            <p className="rohit-desk__availability">
              <span aria-hidden="true" /> Site-backed answers
            </p>
          </div>
        </div>
        <span className="rohit-desk__demo-label">
          <BookOpen aria-hidden="true" size={14} /> Optional Mistral guide
        </span>
      </div>

      <div className="rohit-desk__body">
        <div className="rohit-desk__intro">
          <p className="rohit-desk__eyebrow">Choose the right door</p>
          <h2 id="rohit-desk-title">Advisory, Academy, or a field note?</h2>
          <p>
            Start with a curated answer or ask a short navigation question. Any
            generated response is limited to this site&apos;s published information
            and never replaces a human or qualified professional.
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

        <div
          aria-busy={isThinking}
          aria-live="polite"
          className="rohit-desk__conversation"
        >
          <p className="rohit-desk__question">“{reply.question}”</p>
          <div className="rohit-desk__reply">
            <span className="rohit-desk__reply-mark" aria-hidden="true">
              RG
            </span>
            <div>
              <p>{reply.answer}</p>
              {isCustomFallback ? (
                <Link className="rohit-desk__contact-link" href="#contact-form">
                  Continue to a human enquiry
                  <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <form className="rohit-desk__composer" onSubmit={submitQuestion}>
          <label htmlFor="rohit-desk-question">Ask about this site</label>
          <div className="rohit-desk__composer-control">
            <input
              autoComplete="off"
              id="rohit-desk-question"
              aria-describedby="rohit-desk-note"
              maxLength={500}
              onChange={(event) => setCustomQuestion(event.target.value)}
              placeholder="Ask about advisory, the field guide, or where to begin…"
              type="text"
              value={customQuestion}
            />
            <button
              aria-label={isThinking ? "Checking the site guide" : "Ask the site guide"}
              disabled={!customQuestion.trim() || isThinking}
              type="submit"
            >
              <Send aria-hidden="true" size={17} strokeWidth={1.8} />
            </button>
          </div>
          <span className="sr-only" id="rohit-desk-note">
            Questions are limited to 500 characters. The assistant answers only
            from the published site context.
          </span>
        </form>
      </div>
    </section>
  );
}
