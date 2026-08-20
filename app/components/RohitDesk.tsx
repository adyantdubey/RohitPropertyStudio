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
    question: "Which resource suits a first-time learner?",
    answer:
      "Choose The Property Decision System for a guided, end-to-end foundation. If you want a concise companion for visits and due diligence, begin with Before You Buy.",
  },
  {
    question: "How do the field guide and toolkit differ?",
    answer:
      "Before You Buy organises questions and checks around a property review. The Deal Room is for people already comparing options who need reusable worksheets, registers, and a decision record.",
  },
  {
    question: "Can this guide assess a specific property?",
    answer:
      "No. The guide can explain Rohit’s learning resources and their boundaries, but it cannot assess a property or provide personalised investment, legal, tax, valuation, or financial advice.",
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
          "The live catalogue assistant is not connected in this preview, so it will not invent an answer. Send the question through the enquiry form when live contact is enabled, and Rohit can respond with the right context.",
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
            <p className="rohit-desk__label">Resource guide</p>
            <p className="rohit-desk__availability">
              <span aria-hidden="true" /> Catalogue-backed answers
            </p>
          </div>
        </div>
        <span className="rohit-desk__demo-label">
          <BookOpen aria-hidden="true" size={14} /> Optional AI
        </span>
      </div>

      <div className="rohit-desk__body">
        <div className="rohit-desk__intro">
          <p className="rohit-desk__eyebrow">A quiet place to compare</p>
          <h2 id="rohit-desk-title">Find the useful starting point.</h2>
          <p>
            Start with a curated catalogue answer or ask a short question. Any
            generated response is limited to Rohit’s resource information and
            never replaces professional advice.
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
                  Continue to the enquiry preview
                  <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <form className="rohit-desk__composer" onSubmit={submitQuestion}>
          <label htmlFor="rohit-desk-question">Ask about the resources</label>
          <div className="rohit-desk__composer-control">
            <input
              autoComplete="off"
              id="rohit-desk-question"
              aria-describedby="rohit-desk-note"
              maxLength={500}
              onChange={(event) => setCustomQuestion(event.target.value)}
              placeholder="Ask about format, access, fit, or what is included…"
              type="text"
              value={customQuestion}
            />
            <button
              aria-label={isThinking ? "Checking the catalogue" : "Ask the resource guide"}
              disabled={!customQuestion.trim() || isThinking}
              type="submit"
            >
              <Send aria-hidden="true" size={17} strokeWidth={1.8} />
            </button>
          </div>
          <span className="sr-only" id="rohit-desk-note">
            Questions are limited to 500 characters. The assistant answers only
            from the resource catalogue.
          </span>
        </form>
      </div>
    </section>
  );
}
