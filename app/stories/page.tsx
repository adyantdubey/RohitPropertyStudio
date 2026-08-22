import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import { brand, clientFeedback } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "Client Stories",
  description: "Published Hundred Yards property-client feedback and the evidence standard used by Rohitt Real Estate Academy.",
  alternates: { canonical: "/stories" },
};

const evidenceStandards = [
  "Identify whether feedback concerns property service or course learning.",
  "Preserve the meaning of the published source without adding outcomes.",
  "Link to the source and avoid presenting company feedback as a course review.",
  "Publish learner ratings only after genuine learners and consent exist.",
] as const;

export default function StoriesPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow" data-enter>Client stories</p>
            <h1 data-split>Proof should become more specific as the claim becomes stronger.</h1>
          </div>
          <div className="page-hero__aside" data-enter>
            <strong>Current evidence</strong>
            <p>Published Hundred Yards property-service feedback. No course ratings are shown, because the course has not launched.</p>
          </div>
        </div>
      </section>

      <section className="section surface-light">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Hundred Yards property clients</p>
              <h2>In their words</h2>
            </div>
            <p className="head__note">
              Concise paraphrases of feedback published by Hundred Yards, labelled for their actual context.
            </p>
          </div>
          <div className="story-grid">
            {clientFeedback.map((story) => (
              <article className="story-card" key={story.name}>
                <p className="eyebrow">{story.theme}</p>
                <blockquote>“{story.quote}”</blockquote>
                <footer><strong>{story.name}</strong><span>Hundred Yards property client · not a course learner</span></footer>
              </article>
            ))}
          </div>
          <a className="text-link stories-source" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
            Review the published Hundred Yards source <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="section surface-dark">
        <div className="shell boundary__grid">
          <div>
            <p className="eyebrow">Our evidence standard</p>
            <h2>No simulated students. No borrowed success numbers.</h2>
            <p className="head__note">
              Future learner evidence will be kept separate from brokerage and property-service evidence
              so visitors always know what a testimonial supports.
            </p>
          </div>
          <ul className="checklist">
            {evidenceStandards.map((standard) => (
              <li key={standard}><Check size={18} aria-hidden="true" /><span>{standard}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-deep">
        <div className="shell bridge__grid">
          <div className="bridge__mark" aria-hidden="true">100<span>YARDS</span></div>
          <div className="bridge__body">
            <p className="eyebrow">The practice behind the teaching</p>
            <h2>Hundred Yards provides the professional context, not a substitute for course evidence.</h2>
            <p>
              Rohitt&apos;s role as Managing Director and the company&apos;s published client conversations
              establish his real-estate context. The academy must still earn its own learner feedback
              after launch.
            </p>
            <div className="bridge__links">
              <a className="text-link" href={brand.aboutUrl} target="_blank" rel="noreferrer">Official Rohitt profile <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a className="text-link" href={brand.galleryUrl} target="_blank" rel="noreferrer">Hundred Yards gallery <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta eyebrow="From practice to foundation" title="Explore the material behind Rohitt’s first course." />
    </main>
  );
}
