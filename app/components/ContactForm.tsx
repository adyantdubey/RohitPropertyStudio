"use client";

import { Mail, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

export type ContactTopic =
  | "training-deck"
  | "field-guide"
  | "academy"
  | "property"
  | "partnership"
  | "other";

type ContactFormProps = {
  defaultTopic?: ContactTopic;
};

const recipient = "sales@100yards.in";

const topicLabels: Record<ContactTopic, string> = {
  "training-deck": "Basics of Real Estate training deck — launch access",
  "field-guide": "Before You Buy — first access",
  academy: "Property Academy roadmap",
  property: "Property guidance",
  partnership: "Speaking or partnership",
  other: "General enquiry",
};

function readFormValue(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function ContactForm({ defaultTopic }: ContactFormProps) {
  const [emailHandoffOpened, setEmailHandoffOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = readFormValue(data, "name");
    const email = readFormValue(data, "email");
    const phone = readFormValue(data, "phone");
    const topic = readFormValue(data, "topic") as ContactTopic;
    const message = readFormValue(data, "message");
    const topicLabel = topicLabels[topic] ?? "Website enquiry";
    const subject = `${topicLabel}${name ? ` — ${name}` : ""}`;
    const body = [
      `Hello Hundred Yards team,`,
      "",
      message,
      "",
      "—",
      `Name: ${name}`,
      `Reply email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Enquiry: ${topicLabel}`,
      "",
      "Prepared from Rohitt Kumar Singh's website. Please review before sending.",
    ].join("\n");

    setEmailHandoffOpened(true);
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      aria-labelledby="contact-form-title"
      className="contact-form cin-contact-form authority-contact-form"
      onSubmit={handleSubmit}
    >
      <div className="contact-form__intro authority-contact-form__intro">
        <p className="contact-form__kicker">Write to the company team</p>
        <h2 id="contact-form-title">Give the question the context it needs.</h2>
        <p>
          This form prepares an email in your own mail application. Nothing is
          submitted to or stored by this website. Review the message, then send
          it directly to the Hundred Yards team.
        </p>
        <dl className="cin-contact-form__facts authority-contact-form__facts">
          <div>
            <dt>Recipient</dt>
            <dd>Hundred Yards team</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${recipient}`}>{recipient}</a>
            </dd>
          </div>
          <div>
            <dt>Website storage</dt>
            <dd>None for this form</dd>
          </div>
        </dl>
      </div>

      <div className="contact-form__fields authority-contact-form__fields">
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
          <label htmlFor="contact-email">Reply email</label>
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
          <label htmlFor="contact-topic">Reason for writing</label>
          <select
            defaultValue={defaultTopic ?? ""}
            id="contact-topic"
            name="topic"
            required
          >
            <option disabled value="">
              Select an enquiry type
            </option>
            <option value="training-deck">
              Basics of Real Estate — training deck
            </option>
            <option value="field-guide">Before You Buy — first access</option>
            <option value="academy">Property Academy roadmap</option>
            <option value="property">Property guidance</option>
            <option value="partnership">Speaking or partnership</option>
            <option value="other">General enquiry</option>
          </select>
        </div>

        <div className="contact-field contact-field--full">
          <label htmlFor="contact-message">Your question</label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={1500}
            placeholder="What are you trying to understand, plan, or decide?"
            required
            rows={5}
          />
        </div>

        <label className="contact-consent" htmlFor="contact-consent">
          <input id="contact-consent" name="consent" required type="checkbox" />
          <span>
            I understand this opens my email app. This website does not submit
            or store the information entered above.
          </span>
        </label>

        <div className="contact-form__submit-row authority-contact-form__submit-row">
          <p id="contact-response-note">
            Recipient: Hundred Yards team at {recipient}. You choose whether to
            send the prepared email.
          </p>
          <button
            aria-describedby="contact-response-note"
            className="contact-form__submit"
            type="submit"
          >
            <span>Open email to 100 Yards</span>
            <Send aria-hidden="true" size={17} strokeWidth={1.8} />
          </button>
        </div>

        {emailHandoffOpened ? (
          <p
            aria-live="polite"
            className="contact-form-success authority-contact-form__handoff-note"
            role="status"
          >
            <Mail aria-hidden="true" size={18} />
            Your email application should now be open. Nothing has been sent by
            this website; review the prepared message and send it from your
            email account.
          </p>
        ) : null}
      </div>
    </form>
  );
}
