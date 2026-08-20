import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Learner Stories",
  description:
    "How learners use Rohit's real-estate frameworks to improve questions, records, and decision process.",
};

const proofStandards = [
  "Approved learner wording",
  "Clear starting context",
  "Specific process change",
  "No implied financial guarantee",
];

export default function ResultsPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageHero
        index="03 / RESULTS"
        eyebrow="THE WORK IN PRACTICE"
        title={<>Progress is not a<br /><em>promise of profit.</em></>}
        body="The stories here will document changes in understanding, preparation, and process—not manufacture success claims before verified learner material exists."
        theme="ink"
        aside={<span>EVIDENCE / CONSENT / CONTEXT</span>}
      />

      <section className="results-standard section-pad">
        <SectionHeading
          eyebrow="THE PROOF STANDARD"
          title={<>Real stories deserve<br /><em>real evidence.</em></>}
          body="This section is intentionally designed as a premium ‘stories being documented’ state until Rohit supplies approved, verifiable material."
        />

        <div className="evidence-board">
          <div className="evidence-visual">
            <span className="evidence-index">CASE / 001</span>
            <div className="evidence-path" aria-hidden="true">
              <span>Situation</span>
              <i />
              <span>Process</span>
              <i />
              <span>Change</span>
            </div>
            <strong>Story reserved</strong>
            <p>Verified learner case study will appear here.</p>
          </div>

          <div className="evidence-checklist">
            <p className="eyebrow">BEFORE A STORY GOES LIVE</p>
            {proofStandards.map((item) => (
              <div key={item}>
                <Check aria-hidden="true" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="outcome-language section-pad section-orange">
        <p className="eyebrow">WHAT WE MEASURE</p>
        <div className="outcome-words" aria-label="Learning outcomes">
          <span>BETTER QUESTIONS</span>
          <span>•</span>
          <span>CLEARER RECORDS</span>
          <span>•</span>
          <span>VISIBLE TRADE-OFFS</span>
        </div>
        <h2>What changed in the way<br /><em>the decision was approached?</em></h2>
      </section>

      <section className="story-invite section-pad">
        <div>
          <p className="eyebrow">USED A ROHIT RESOURCE?</p>
          <h2>Tell us what changed<br /><em>in your process.</em></h2>
        </div>
        <p>
          Share what you understood, organised, compared, or verified
          differently. Every story is reviewed and published only with consent.
        </p>
        <Link className="button button-dark" href="/contact?type=story">
          Share your experience <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
