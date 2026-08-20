import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { FaqAccordion } from "../components/FaqAccordion";
import { PageHero } from "../components/PageHero";
import { RohitDesk } from "../components/RohitDesk";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Rohit",
  description:
    "Ask a course question, request support, or contact Rohit about a relevant collaboration.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageHero
        index="05 / CONTACT"
        eyebrow="START WITH THE QUESTION"
        title={<>Bring the question.<br /><em>Find the next step.</em></>}
        body="Choose the reason for reaching out so the message carries the context it needs. No pressure, no false urgency."
        aside={<span>COURSES / SUPPORT / PARTNERSHIPS</span>}
      />

      <section className="contact-routes section-pad">
        {[
          ["01", "Course or PDF", "Content, format, access, or the right starting resource."],
          ["02", "Purchase support", "Payment, email delivery, download, or course access."],
          ["03", "Speaking & partnerships", "Audience, format, dates, and the intended outcome."],
          ["04", "Property enquiry", "Context and help needed; scope is confirmed separately."],
        ].map(([number, title, copy]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="desk-section section-pad section-blue">
        <RohitDesk />
      </section>

      <section className="contact-form-section section-pad">
        <ContactForm />
        <aside className="contact-aside">
          <div className="contact-plan" aria-hidden="true">
            <span />
            <span />
            <span />
            <strong>R</strong>
          </div>
          <p className="eyebrow">A NOTE ON ADVICE</p>
          <p>
            Rohit’s learning resources are educational. Personal legal,
            financial, tax, technical, and valuation questions should be taken
            to an appropriately qualified professional.
          </p>
        </aside>
      </section>

      <section className="faq-section section-pad section-ink">
        <SectionHeading
          light
          eyebrow="QUESTIONS / BEFORE YOU WRITE"
          title={<>A few answers,<br /><em>clearly stated.</em></>}
        />
        <FaqAccordion />
      </section>
    </main>
  );
}
