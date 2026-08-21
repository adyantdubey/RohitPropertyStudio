import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, Check, Quote } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { companySource, customerStories } from "../lib/companyContent";

export const metadata: Metadata = {
  title: "Client Stories | Hundred Yards",
  description:
    "First-party customer experiences published by Hundred Yards, including property shortlisting, site visits, remote walkthroughs, and transaction support.",
};

const publicationRules = [
  "Relevant options instead of an overwhelming project list",
  "Straight conversations without pressure to decide",
  "Support from the first site visit through registration",
  "Virtual walkthroughs and local coordination for remote buyers",
  "Clear information around pricing, charges, and the next step",
] as const;

const caseStructure = [
  {
    number: "001",
    title: "A focused shortlist",
    description:
      "Clients describe the value of seeing options that match their requirement rather than spending time on unrelated projects.",
  },
  {
    number: "002",
    title: "Advice without pressure",
    description:
      "Published feedback highlights clear trade-offs, patient answers, and room to make the final decision at the buyer’s pace.",
  },
  {
    number: "003",
    title: "Support through completion",
    description:
      "Site visits, virtual walkthroughs, registration coordination, and continued availability make the journey feel connected.",
  },
] as const;

export default function ResultsPage() {
  return (
    <main
      id="main-content"
      className="page-shell results-editorial-page authority-evidence-page"
    >
      <PageHero
        index="03 / CLIENT STORIES"
        eyebrow="CUSTOMER EXPERIENCES / PUBLISHED BY HUNDRED YARDS"
        title={
          <>
            Property journeys,
            <br />
            <em>remembered for the right reasons.</em>
          </>
        }
        body="First-party feedback from people who describe relevant shortlists, patient guidance, remote walkthroughs, and support through the transaction."
        theme="ink"
        aside={<span>SHORTLIST / VISIT / SUPPORT / COMPLETE</span>}
      />

      <section className="results-editorial-opener authority-evidence-opener section-pad">
        <figure className="results-editorial-process-image">
          <Image
            alt="Hands reviewing architectural drawings on a desk"
            height={3072}
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            src="/media/blueprint-hands.jpg"
            width={2048}
          />
          <figcaption>
            Licensed editorial stock image. It is not a client artifact, Rohitt
            project, transaction record, or proof of an outcome.
          </figcaption>
        </figure>

        <div className="results-editorial-opener-copy">
          <p className="eyebrow">THE CUSTOMER EXPERIENCE</p>
          <h2>
            Guidance that feels
            <br />
            <em>clear, patient, and useful.</em>
          </h2>
          <p>
            The most useful feedback is not about spectacle. It is about being
            understood, seeing relevant projects, getting honest explanations,
            and knowing the team remains available after the first visit.
          </p>
          <p>
            The stories below are concise summaries of first-party testimonials
            currently published on the official Hundred Yards website.
          </p>
        </div>
      </section>

      <section className="results-standard results-editorial-standard authority-evidence-sources section-pad section-ink">
        <SectionHeading
          light
          eyebrow="PUBLISHED CUSTOMER FEEDBACK"
          title={
            <>
              Real people.
              <br />
              <em>Consistent themes.</em>
            </>
          }
          body="Four customer experiences, summarised from the company’s current first-party testimonial collection."
        />

        <div className="results-editorial-case-grid authority-evidence-source-grid">
          {customerStories.map((item, index) => (
            <article key={item.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <small>{item.context}</small>
              <a
                className="text-link"
                href={companySource.website}
                rel="noreferrer"
                target="_blank"
              >
                View the published source
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="results-editorial-case-structure authority-evidence-standard section-pad">
        <SectionHeading
          eyebrow="WHAT CLIENTS VALUE"
          title={
            <>
              Relevance. Transparency.
              <br />
              <em>Follow-through.</em>
            </>
          }
          body="Across the published feedback, three qualities appear repeatedly in how clients describe the Hundred Yards experience."
        />
        <div className="results-editorial-case-grid">
          {caseStructure.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="results-standard results-editorial-standard authority-evidence-gate section-pad section-orange">
        <div className="evidence-board results-editorial-evidence-board">
          <div className="evidence-visual results-editorial-reserved-file">
            <span className="evidence-index">HUNDRED YARDS / SERVICE STANDARD</span>
            <Quote aria-hidden="true" size={36} />
            <strong>A better property experience is built in the details</strong>
            <p>
              Useful shortlists, clear explanations, responsive coordination,
              and support through completion are the standard to keep raising.
            </p>
          </div>

          <div className="evidence-checklist results-editorial-checklist">
            <p className="eyebrow">THE EXPERIENCE CLIENTS DESCRIBE</p>
            {publicationRules.map((item) => (
              <div key={item}>
                <Check aria-hidden="true" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="results-editorial-boundary authority-evidence-boundary section-pad">
        <Quote aria-hidden="true" size={30} />
        <div>
          <p className="eyebrow">SOURCE NOTE</p>
          <h2>First-party feedback, clearly labelled.</h2>
        </div>
        <p>
          These summaries are based on testimonials published by Hundred Yards.
          They are not independently audited and do not promise that every
          property journey will have the same outcome.
        </p>
      </section>

      <section className="story-invite results-editorial-invite authority-evidence-invite section-pad section-blue">
        <div>
          <p className="eyebrow eyebrow-light">START YOUR PROPERTY CONVERSATION</p>
          <h2>
            Let the next client story
            <br />
            <em>begin with your goals.</em>
          </h2>
        </div>
        <p>
          Speak with the Hundred Yards team about a home, investment, sale,
          commercial requirement, or NRI property search.
        </p>
        <Link className="button button-light" href="/contact?type=other#contact-form">
          Book a property consultation <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
