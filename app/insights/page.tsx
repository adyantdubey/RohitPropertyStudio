import type { Metadata } from "next";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical notes from Rohit on real-estate questions, due diligence, comparison, and decision process.",
};

const articles = [
  ["FIELD NOTES", "The viewing is not the decision", "How to leave a property visit with observations instead of a vague impression.", "06 MIN"],
  ["DECISION STRATEGY", "A cleaner way to compare unlike properties", "Why one universal score can conceal the trade-offs that actually matter.", "08 MIN"],
  ["DUE DILIGENCE", "Build a red-flag register, not a red-flag panic", "Record concerns, evidence, owners, and next actions without losing the plot.", "05 MIN"],
  ["DECISION STRATEGY", "What to ask before you ask the price", "The context that gives a number meaning—and the questions that should precede comparison.", "07 MIN"],
];

export default function InsightsPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageHero
        index="04 / INSIGHTS"
        eyebrow="NOTES FROM THE DECISION ROOM"
        title={<>Ideas for looking<br /><em>past the listing.</em></>}
        body="Short, practical essays on the questions, records, and trade-offs that shape a property decision. Draft topics are ready for Rohit’s reviewed expertise."
        theme="orange"
        aside={<span>READ / QUESTION / VERIFY</span>}
      />

      <section className="featured-note section-pad">
        <div className="note-visual">
          <div className="note-plan" aria-hidden="true">
            <span />
            <span />
            <span />
            <i>01</i>
          </div>
          <span className="note-coordinate">28°36’50.0”N</span>
        </div>
        <article>
          <p className="eyebrow">FEATURED FIELD NOTE</p>
          <h2>Your shortlist<br />is a <em>hypothesis.</em></h2>
          <p>
            Treat early preferences as ideas to test rather than conclusions to
            defend. A considered shortlist gives every option the same questions.
          </p>
          <span className="draft-chip">EDITORIAL PREVIEW</span>
        </article>
      </section>

      <section className="insight-index section-pad section-ink">
        <SectionHeading
          light
          eyebrow="THE INDEX / 001—004"
          title={<>Questions worth<br /><em>carrying forward.</em></>}
        />
        <div className="article-list">
          {articles.map(([category, title, summary, time], index) => (
            <article key={title}>
              <span className="article-number">0{index + 1}</span>
              <div>
                <small>{category}</small>
                <h3>{title}</h3>
                <p>{summary}</p>
              </div>
              <span className="article-time"><Clock3 aria-hidden="true" size={14} /> {time}</span>
              <span className="article-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter section-pad section-blue">
        <div>
          <p className="eyebrow eyebrow-light">THE FIELD NOTE</p>
          <h2>One useful question<br /><em>at a time.</em></h2>
        </div>
        <div className="newsletter-form">
          <p>Occasional notes from Rohit. No manufactured urgency.</p>
          <form>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Join the Field Note">
              <ArrowUpRight aria-hidden="true" />
            </button>
          </form>
          <small>By subscribing, you agree to receive educational emails. Unsubscribe anytime.</small>
        </div>
      </section>
    </main>
  );
}
