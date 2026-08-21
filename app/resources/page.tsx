import type { Metadata } from "next";
import { Check, ChevronDown } from "lucide-react";
import { CourseCta } from "../components/CourseCta";
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
    <main id="main-content" className="resources-page">
      <section className="editorial-hero resources-hero">
        <div className="shell editorial-hero__grid">
          <div className="hero-entrance"><p className="eyebrow">Learning resources</p><h1>Use the language before you memorise it.</h1><p>Explore foundational terms through simple tools tied directly to the course curriculum.</p></div>
          <div className="editorial-hero__aside hero-entrance"><strong>Four resources</strong><p>One searchable reference, two interactive learning models and one focused site-visit checklist.</p><a className="text-link" href="#area-visualizer">Start with the area tool <ChevronDown size={16} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="resource-index">
        <div className="shell resource-index__grid">
          {academyResources.map((resource) => <a className="resource-index__item hero-entrance" href={resource.href} key={resource.number}><span>{resource.number}</span><div><small>{resource.type}</small><strong>{resource.title}</strong></div></a>)}
        </div>
      </section>

      <section className="section resource-section" id="glossary">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Property glossary</p><h2>Plain-language definitions with visible boundaries.</h2></div><p>Search the terms that appear in the course. Each definition is intentionally general and should be checked against the current project and jurisdiction.</p></div>
          <Glossary />
        </div>
      </section>

      <section className="section resource-section resource-section--dark" id="area-visualizer">
        <div className="shell">
          <div className="section-heading section-heading--light reveal"><div><p className="eyebrow">Area terminology visualizer</p><h2>One usable area. Several possible labels around it.</h2></div><p>Change the example values and watch the relationships move. The tool teaches comparison discipline; it does not calculate a real project area.</p></div>
          <AreaVisualizer />
        </div>
      </section>

      <section className="section resource-section" id="payment-plan">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Payment-plan explorer</p><h2>Read a schedule as a sequence, not a single percentage.</h2></div><p>Select each illustrative milestone to see how instalments accumulate over time.</p></div>
          <PaymentPlanExplorer />
        </div>
      </section>

      <section className="section site-visit" id="site-visit">
        <div className="shell site-visit__grid">
          <div className="reveal"><p className="eyebrow">Site-visit questions</p><h2>Carry better questions into the room.</h2><p>This checklist does not assess a project. It helps you identify the details that still need to be shown, explained or independently verified.</p></div>
          <ol>{siteVisitQuestions.map((question, index) => <li className="reveal" key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p><Check size={18} aria-hidden="true" /></li>)}</ol>
        </div>
      </section>

      <section className="section data-notes">
        <div className="shell data-notes__grid">
          <div className="reveal"><p className="eyebrow">Next in the studio</p><h2>Source-dated Bengaluru learning notes.</h2></div>
          <div className="reveal"><p>Future market notes can use official housing-price and regulatory sources, with the source and update date beside every number. They will be published only when there is a reliable editorial update process—not generated from an AI prompt.</p><span>Planned after the foundational course launch</span></div>
        </div>
      </section>

      <CourseCta eyebrow="Continue learning" title="The complete foundation lives inside the course." />
    </main>
  );
}
