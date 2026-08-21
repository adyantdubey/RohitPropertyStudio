import type { Metadata } from "next";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { LegalDocument } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Current pre-launch terms for Rohitt Kumar Singh's website.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      code="LGL / 02"
      title="Terms of Use"
      intro="The current ground rules for using this pre-launch professional and educational website."
    >
      <p><strong>Last updated:</strong> 21 August 2026</p>

      <h2>Current site status</h2>
      <p>
        This website presents public professional information, general property
        education, and planned Academy resources. Before You Buy is coming soon;
        the other Academy concepts are in development. No product is currently
        offered for purchase, and no checkout, payment, order, download,
        subscription, or learner account is available.
      </p>

      <h2>Educational boundary</h2>
      <p>
        Site content is general education and commentary. It does not assess or
        approve a property and does not provide financial, investment, legal,
        tax, engineering, technical, valuation, or other property-specific
        professional advice. Verify relevant facts and obtain qualified advice
        for your own circumstances.
      </p>

      <h2>No professional relationship created</h2>
      <p>
        Browsing the site or preparing an email does not create an advisory,
        brokerage, client, fiduciary, or other professional relationship with
        Rohitt Kumar Singh or Hundred Yards Realtor Private Limited. Any future
        engagement requires separately confirmed scope and terms.
      </p>

      <h2>Email contact</h2>
      <p>
        The contact form prepares a message in your own email application. The
        website does not submit or store that form. Do not send identity
        documents, bank details, payment information, confidential property
        records, or other sensitive information by ordinary email.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Unless stated otherwise, the site&apos;s original text, visual system, and
        brand elements may not be copied, republished, resold, or presented as
        another person&apos;s work. Third-party names, marks, photographs, and links
        remain subject to their respective owners&apos; rights.
      </p>

      <h2>External links and availability</h2>
      <p>
        External links are supplied for context and may change without notice.
        The website may be changed, suspended, or interrupted for maintenance,
        security, or circumstances outside reasonable control.
      </p>

      <h2>Questions</h2>
      <p>
        For a question about the current website, write to the Hundred Yards
        team at <a href="mailto:sales@100yards.in">sales@100yards.in</a> or use
        the <Link href="/contact">contact page</Link> to prepare an email.
      </p>
    </LegalDocument>
  );
}
