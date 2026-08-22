"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, RotateCcw, X } from "lucide-react";
import { quizQuestions } from "../../lib/labData";

/**
 * Ten questions drawn from the course material. Instant feedback with a short
 * explanation per question, and an honest score at the end that hands over to
 * the early-access list.
 */
export function PropertyQuiz() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[index];
  const total = quizQuestions.length;

  const choose = (option: number) => {
    if (picked !== null) return;
    setPicked(option);
    if (option === question.answer) setScore((s) => s + 1);
    if (index === 0) window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "quiz_started" } }));
  };

  const next = () => {
    if (index + 1 >= total) {
      setFinished(true);
      window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "quiz_completed" } }));
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => { setIndex(0); setPicked(null); setScore(0); setFinished(false); };

  if (finished) {
    const verdict = score >= 9
      ? "Fluent. You already speak property better than many people selling it."
      : score >= 6
        ? "A solid base — the course exists to close exactly the gaps you just felt."
        : "Perfect starting point. Every one of these terms is covered from zero in the course.";
    return (
      <div className="tool lab-tool quiz" aria-live="polite">
        <div className="quiz__score">
          <span>Your property vocabulary score</span>
          <strong>{score}<small>/{total}</small></strong>
          <p>{verdict}</p>
        </div>
        <div className="quiz__actions">
          <a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">
            Learn all 49 slides — join early access <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button className="button button--outline button--sm" type="button" onClick={restart}>
            <RotateCcw size={14} aria-hidden="true" /> Retake
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tool lab-tool quiz">
      <div className="quiz__progress">
        <span>Question {index + 1} / {total}</span>
        <i style={{ width: `${((index + (picked !== null ? 1 : 0)) / total) * 100}%` }} />
      </div>
      <h3 className="quiz__question">{question.question}</h3>
      <div className="quiz__options" role="group" aria-label="Answer options">
        {question.options.map((option, i) => {
          const state = picked === null ? "" : i === question.answer ? " is-right" : i === picked ? " is-wrong" : " is-dim";
          return (
            <button className={`quiz__option${state}`} type="button" key={option} onClick={() => choose(i)} disabled={picked !== null}>
              <span>{option}</span>
              {picked !== null && i === question.answer && <Check size={16} aria-hidden="true" />}
              {picked !== null && i === picked && i !== question.answer && <X size={16} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="quiz__explain" aria-live="polite">
          <p>{question.explain}</p>
          <button className="button button--gold button--sm" type="button" onClick={next}>
            {index + 1 >= total ? "See my score" : "Next question"} <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
