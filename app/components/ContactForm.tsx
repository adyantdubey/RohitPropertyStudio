"use client";

import { CheckCircle2, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success";

export type ContactTopic =
  | "course"
  | "pdf"
  | "support"
  | "story"
  | "property"
  | "partnership"
  | "other";

type ContactFormProps = {
  defaultTopic?: ContactTopic;
};

export function ContactForm({ defaultTopic }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    timerRef.current = setTimeout(() => {
      form.reset();
      setStatus("success");
    }, 700);
  }

  if (status === "success") {
    return (
      <div
        aria-live="polite"
        className="contact-form-success cin-contact-form-success"
        ref={successRef}
        role="status"
        tabIndex={-1}
      >
        <span className="contact-form-success__icon" aria-hidden="true">
          <CheckCircle2 size={24} strokeWidth={1.8} />
        </span>
        <p className="contact-form-success__eyebrow">Preview complete</p>
        <h3>Your enquiry flow is ready.</h3>
        <p>
          No details were transmitted. Once Rohit’s approved contact service is
          connected, this is where a secure delivery confirmation will appear.
        </p>
        <button
          className="contact-form-success__reset"
          type="button"
          onClick={() => setStatus("idle")}
        >
          Write another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      aria-busy={status === "submitting"}
      aria-labelledby="contact-form-title"
      className="contact-form cin-contact-form"
      onSubmit={handleSubmit}
    >
      <div className="contact-form__intro">
        <p className="contact-form__kicker">Start a conversation</p>
        <h2 id="contact-form-title">
          Tell Rohit where you are in your property journey.
        </h2>
        <p>
          Share the question that is slowing you down. The more context you
          give, the more useful the reply can be. Do not include confidential
          documents or payment information.
        </p>
        <dl className="cin-contact-form__facts">
          <div>
            <dt>Current state</dt>
            <dd>Local preview</dd>
          </div>
          <div>
            <dt>Live handoff</dt>
            <dd>Not connected</dd>
          </div>
        </dl>
      </div>

      <div className="contact-form__fields">
        <div className="contact-field contact-field--half">
          <label htmlFor="contact-name">Your name</label>
          <input
            autoComplete="name"
            id="contact-name"
            name="name"
            maxLength={100}
            placeholder="e.g. Aarav Mehta"
            required
            type="text"
          />
        </div>

        <div className="contact-field contact-field--half">
          <label htmlFor="contact-email">Email address</label>
          <input
            autoComplete="email"
            id="contact-email"
            name="email"
            maxLength={254}
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>

        <div className="contact-field contact-field--half">
          <label htmlFor="contact-phone">
            Phone number <span>(optional)</span>
          </label>
          <input
            autoComplete="tel"
            id="contact-phone"
            inputMode="tel"
            name="phone"
            maxLength={30}
            placeholder="+91 98765 43210"
            type="tel"
          />
        </div>

        <div className="contact-field contact-field--half">
          <label htmlFor="contact-topic">What can we help with?</label>
          <select
            defaultValue={defaultTopic ?? ""}
            id="contact-topic"
            name="topic"
            required
          >
            <option disabled value="">
              Select an enquiry type
            </option>
            <option value="course">Choosing the right course</option>
            <option value="pdf">PDF or download support</option>
            <option value="support">Purchase or access support</option>
            <option value="story">Share a learner story</option>
            <option value="property">A property-learning question</option>
            <option value="partnership">Speaking or partnership</option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor="contact-message">Your question</label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={1500}
            placeholder="What are you trying to understand or decide?"
            required
            rows={5}
          />
        </div>

        <label className="contact-consent" htmlFor="contact-consent">
          <input id="contact-consent" name="consent" required type="checkbox" />
          <span>
            I understand this prototype does not send or store my details.
          </span>
        </label>

        <div className="contact-form__submit-row">
          <p id="contact-response-note">
            Preview only — preparing this form will not contact Rohit yet.
          </p>
          <button
            aria-describedby="contact-response-note"
            className="contact-form__submit"
            disabled={status === "submitting"}
            type="submit"
          >
            <span>
              {status === "submitting"
                ? "Preparing preview…"
                : "Prepare enquiry preview"}
            </span>
            <Send aria-hidden="true" size={17} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </form>
  );
}
