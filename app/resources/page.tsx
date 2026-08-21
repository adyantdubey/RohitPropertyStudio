import type { Metadata } from "next";
import { Check, ChevronDown } from "lucide-react";
import { AcademyGuide } from "../components/AcademyGuide";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import { Glossary } from "../components/Glossary";
import { AreaVisualizer, PaymentPlanExplorer } from "../components/LearningTools";
import { academyResources, siteVisitQuestions } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "Learning Resources",
  description: "Interactive foundational property tools and plain-language resources from Rohit Real Estate Academy.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow" data-enter>Learning resources</p>
            <h1 data-split>Use the language before you memorise it.</h1>
            <p data-enter>Explore foundational terms through simple tools tied directly to the course curriculum.</p>
          </div>
          <div className="page-hero__aside" data-enter>
            <strong>Five resources</strong>
            <p>An AI guide, a searchable reference, two interactive learning models and one focused site-visit checklist.</p>
            <a className="text-link" href="#ask">Start by asking the guide <ChevronDown size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="surface-dark">
        <div className="shell resource-index__grid">
          {academyResources.map((resource) => (
            <a className="resource-index__item" href={resource.href} key={resource.number} data-reveal>
              <span>{resource.number}</span>
              <div><small>{resource.type}</small><strong>{resource.title}</strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="section surface-dark" id="ask">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Ask the Academy</p>
              <h2 data-split>Put any property term to the AI guide.</h2>
            </div>
            <p className="head__note" data-reveal>
              Trained on the same vocabulary the course teaches. It explains terms; it does not give
              advice on projects, prices or investments.
            </p>
          </div>
          <div data-reveal><AcademyGuide /></div>
        </div>
      </section>

      <section className="section surface-light" id="glossary">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Property glossary</p>
              <h2 data-split>Plain-language definitions with visible boundaries.</h2>
            </div>
            <p className="head__note" data-reveal>
              Search the terms that appear in the course. Each definition is intentionally general and
              should be checked against the current project and jurisdiction.
            </p>
          </div>
          <div data-reveal><Glossary /></div>
        </div>
      </section>

      <section className="section surface-dark" id="area-visualizer">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Area terminology visualizer</p>
              <h2 data-split>One usable area. Several possible labels around it.</h2>
            </div>
            <p className="head__note" data-reveal>
              Change the example values and watch the relationships move. The tool teaches comparison
              discipline; it does not calculate a real project area.
            </p>
          </div>
          <div data-reveal><AreaVisualizer /></div>
        </div>
      </section>

      <section className="section surface-light" id="payment-plan">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Payment-plan explorer</p>
              <h2 data-split>Read a schedule as a sequence, not a single percentage.</h2>
            </div>
            <p className="head__note" data-reveal>
              Select each illustrative milestone to see how instalments accumulate over time.
            </p>
          </div>
          <div data-reveal><PaymentPlanExplorer /></div>
        </div>
      </section>

      <section className="section surface-deep" id="site-visit">
        <div className="shell boundary__grid">
          <div data-reveal>
            <p className="eyebrow">Site-visit questions</p>
            <h2 data-split>Carry better questions into the room.</h2>
            <p className="head__note">
              This checklist does not assess a project. It helps you identify the details that still need
              to be shown, explained or independently verified.
            </p>
          </div>
          <ol className="numbered">
            {siteVisitQuestions.map((question, index) => (
              <li key={question} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{question}</p>
                <Check size={17} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section surface-dark">
        <div className="shell notes__grid">
          <div data-reveal>
            <p className="eyebrow">Next in the studio</p>
            <h2 data-split>Source-dated Bengaluru learning notes.</h2>
          </div>
          <div data-reveal data-reveal-delay="1">
            <p>
              Future market notes can use official housing-price and regulatory sources, with the source
              and update date beside every number. They will be published only when there is a reliable
              editorial update process — not generated from an AI prompt.
            </p>
            <span className="notes__tag">Planned after the foundational course launch</span>
          </div>
        </div>
      </section>

      <ClosingCta eyebrow="Continue learning" title="The complete foundation lives inside the course." />
    </main>
  );
}
