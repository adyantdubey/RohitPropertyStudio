"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function EarlyAccessForm({ siteKey }: { siteKey?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const widgetContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey || !widgetContainer.current) return;

    const renderWidget = () => {
      if (!window.turnstile || !widgetContainer.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetContainer.current, {
        sitekey: siteKey,
        theme: "dark",
        size: "flexible",
        action: "academy_early_access",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    let script = document.querySelector<HTMLScriptElement>("script[data-academy-turnstile]");
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.academyTurnstile = "true";
      document.head.appendChild(script);
    }
    if (window.turnstile) renderWidget();
    else script.addEventListener("load", renderWidget, { once: true });

    return () => {
      script?.removeEventListener("load", renderWidget);
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (siteKey && !turnstileToken) {
      setStatus("error");
      setMessage("Please complete the security check before submitting.");
      return;
    }

    const form = new FormData(event.currentTarget);
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          interest: form.get("interest"),
          consent: form.get("consent") === "on",
          website: form.get("website"),
          sourcePath: window.location.pathname,
          turnstileToken,
        }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "The form could not be submitted.");

      setStatus("success");
      setMessage(result.message || "Your interest has been recorded.");
      formRef.current?.reset();
      setTurnstileToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "early_access_completed" } }));
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The form could not be submitted.");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      setTurnstileToken("");
    }
  }

  if (status === "success") {
    return (
      <div className="form__success" role="status">
        <CheckCircle2 size={34} aria-hidden="true" />
        <p className="eyebrow">Interest recorded</p>
        <h3>You are on the early-access list.</h3>
        <p>{message} No payment has been taken.</p>
      </div>
    );
  }

  return (
    <form className="form" ref={formRef} onSubmit={submit} id="early-access-form">
      <div className="form__heading">
        <p className="eyebrow">Course launch list</p>
        <h2>Receive the confirmed launch details.</h2>
        <p>Tell us how to reach you. This form records interest only; it does not create an order or collect payment.</p>
      </div>

      <div className="field field--full">
        <label htmlFor="early-name">Full name</label>
        <input id="early-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="early-email">Email</label>
        <input id="early-email" name="email" type="email" autoComplete="email" maxLength={160} placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="early-phone">Phone or WhatsApp</label>
        <input id="early-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+91 …" />
      </div>
      <div className="field field--full">
        <label htmlFor="early-interest">I am interested as</label>
        <select id="early-interest" name="interest" defaultValue="course-launch">
          <option value="course-launch">An individual learner</option>
          <option value="team-training">A team or company</option>
          <option value="property-enquiry">A Hundred Yards property client</option>
          <option value="general">A general enquiry</option>
        </select>
      </div>
      <div className="form__honeypot" aria-hidden="true">
        <label htmlFor="early-website">Website</label>
        <input id="early-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="form__consent">
        <input name="consent" type="checkbox" required />
        <span>I agree that the Hundred Yards team may use these details to respond about my selected enquiry. See the <a href="/privacy">privacy notice</a>.</span>
      </label>
      {siteKey && <div className="turnstile-slot" ref={widgetContainer} />}
      <div className="form__submit">
        <button className="button button--gold" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Recording interest…" : "Join early access"} <ArrowRight size={17} aria-hidden="true" />
        </button>
        <p>Use either email or phone. We do not ask for payment details here.</p>
      </div>
      {status === "error" && <p className="form__message form__message--error" role="alert">{message} You can also contact <a href="mailto:sales@100yards.in">sales@100yards.in</a>.</p>}
    </form>
  );
}
