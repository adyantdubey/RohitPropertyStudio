import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { CourseCta } from "../components/CourseCta";
import { brand, clientFeedback } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "Client Stories",
  description: "Published Hundred Yards property-client feedback and the evidence standard used by Rohit Real Estate Academy.",
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
    <main id="main-content" className="stories-page">
      <section className="editorial-hero">
        <div className="shell editorial-hero__grid">
          <div className="hero-entrance"><p className="eyebrow">Client stories</p><h1>Proof should become more specific as the claim becomes stronger.</h1></div>
          <div className="editorial-hero__aside hero-entrance"><strong>Current evidence</strong><p>Published Hundred Yards property-service feedback. No course ratings are shown because the course has not launched.</p></div>
        </div>
      </section>

      <section className="section story-library">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Hundred Yards property clients</p><h2>What clear guidance looked like in real conversations.</h2></div><p>The following comments are concise paraphrases of feedback published by Hundred Yards and are labelled for their actual context.</p></div>
          <div className="story-grid">
            {clientFeedback.map((story, index) => (
              <article className="story-card reveal" key={story.name}>
                <div className="story-card__number">0{index + 1}</div>
                <p className="eyebrow">{story.theme}</p>
                <blockquote>“{story.quote}”</blockquote>
                <footer><strong>{story.name}</strong><span>Hundred Yards property client · not a course learner</span></footer>
              </article>
            ))}
          </div>
          <a className="text-link stories-source" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">Review the published Hundred Yards source <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="section evidence-standard">
        <div className="shell evidence-standard__grid">
          <div className="reveal"><p className="eyebrow">Our evidence standard</p><h2>No simulated students. No borrowed success numbers.</h2><p>Future learner evidence will be kept separate from brokerage and property-service evidence so visitors always know what a testimonial supports.</p></div>
          <ul>{evidenceStandards.map((standard) => <li className="reveal" key={standard}><Check size={18} aria-hidden="true" /><span>{standard}</span></li>)}</ul>
        </div>
      </section>

      <section className="section practice-bridge">
        <div className="shell practice-bridge__grid">
          <div className="practice-bridge__mark reveal" aria-hidden="true">100<span>YARDS</span></div>
          <div className="reveal"><p className="eyebrow">The practice behind the teaching</p><h2>Hundred Yards provides the professional context—not a substitute for course evidence.</h2><p>Rohit&apos;s role as Managing Director and the company&apos;s published client conversations establish his real-estate context. The academy must still earn its own learner feedback after launch.</p><div className="practice-bridge__links"><a className="text-link" href={brand.aboutUrl} target="_blank" rel="noreferrer">Official Rohit profile <ArrowUpRight size={15} aria-hidden="true" /></a><a className="text-link" href={brand.galleryUrl} target="_blank" rel="noreferrer">Hundred Yards gallery <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
        </div>
      </section>

      <CourseCta eyebrow="From practice to foundation" title="Explore the material behind Rohit’s first course." />
    </main>
  );
}
