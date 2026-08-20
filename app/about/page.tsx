import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "About Rohit",
  description:
    "Meet Rohit and the thinking behind his practical approach to real-estate education.",
};

const principles = [
  ["01", "Clarity before urgency.", "A fast answer is not useful when the question has not been framed properly."],
  ["02", "Evidence before excitement.", "Interest can begin the search. Evidence must shape the decision."],
  ["03", "Process before prediction.", "No framework removes uncertainty. A good one makes uncertainty visible."],
  ["04", "Context before conclusions.", "A number matters only when its source, assumptions, and limits are understood."],
  ["05", "People before property.", "The right decision begins with the person's objective—not the asset someone wants to sell."],
];

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageHero
        index="01 / ABOUT"
        eyebrow="ROHIT / THE STORY"
        title={<>Real estate is complex.<br /><em>Learning it shouldn’t be.</em></>}
        body="Rohit teaches a calmer way to think about property—one that separates signal from pressure and turns scattered information into a decision you can examine and explain."
        aside={<span>PERSON / PROCESS / PROPERTY</span>}
      />

      <section className="about-intro section-pad">
        <div className="portrait-stage" aria-label="Stylised portrait placeholder for Rohit">
          <div className="portrait-frame">
            <div className="portrait-head" />
            <div className="portrait-body" />
            <span className="portrait-r">R</span>
            <div className="portrait-grid" />
          </div>
          <div className="portrait-label">
            <span>ROHIT</span>
            <small>REAL ESTATE EDUCATOR</small>
          </div>
        </div>

        <div className="about-manifesto">
          <p className="eyebrow">THE PERSON BEHIND THE PROCESS</p>
          <blockquote>
            “The goal is not to make property feel simple. It is to make the
            <em> next question clear.</em>”
          </blockquote>
          <p>
            The real story, verified career milestones, and Rohit’s own portrait
            will replace this structured placeholder as the brand material is
            supplied. The philosophy is already clear: teach judgement, not hype.
          </p>
        </div>
      </section>

      <section className="story-rail section-pad section-ink">
        <SectionHeading
          light
          eyebrow="THE STORY / IN FOUR MOVEMENTS"
          title={<>Experience becomes useful<br /><em>when it becomes a method.</em></>}
          body="A restrained editorial timeline is ready for Rohit’s verified milestones, markets, projects, and turning points."
        />

        <div className="timeline-grid">
          {[
            ["01", "The beginning", "Origin", "The first encounter with the weight of a major property decision."],
            ["02", "The work", "Practice", "Field experience translated into sharper questions and repeatable review."],
            ["03", "The turn", "Teaching", "Complex lessons rebuilt as frameworks other people can actually use."],
            ["04", "The mission", "Now", "Replace borrowed confidence with clearer records, trade-offs, and next steps."],
          ].map(([number, title, year, copy]) => (
            <article className="timeline-card" key={number}>
              <span>{number}</span>
              <small>{year}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="principles section-pad">
        <SectionHeading
          eyebrow="THE OPERATING PRINCIPLES"
          title={<>The standards beneath<br /><em>every resource.</em></>}
          body="Professional without being distant. Confident without pretending certainty exists."
        />

        <div className="principle-list">
          {principles.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="about-closing section-pad section-blue">
        <p className="eyebrow eyebrow-light">NEXT / THE COLLECTION</p>
        <h2>Learn the system.<br /><em>Carry the judgement.</em></h2>
        <Link className="button button-light" href="/courses">
          Explore Rohit’s resources <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
