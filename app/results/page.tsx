import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, FileSearch, ShieldCheck } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "Evidence & Standards | Rohitt Kumar Singh",
  description:
    "The evidence standard behind Rohitt Kumar Singh's public work: sourced claims, consent, context, and no invented testimonials.",
};

const publicEvidence = [
  {
    number: "01",
    title: "Leadership role",
    description:
      "Hundred Yards' official company biography identifies Rohit Kumar Singh as Managing Director.",
    source: "Official Hundred Yards biography",
    href: "https://100yards.in/about-us/",
  },
  {
    number: "02",
    title: "Registered company",
    description:
      "Public corporate records identify Hundred Yards Realtor Private Limited, incorporated in 2023, and list Rohit Kumar Singh as a director.",
    source: "Public company record",
    href: "https://www.indiafilings.com/search/hundred-yards-realtor-private-limited-cin-U68100KA2023PTC180028",
  },
  {
    number: "03",
    title: "Professional scope",
    description:
      "The company's public channels describe buyer and seller representation, investment consultation, market analysis, and end-to-end property support.",
    source: "Official Hundred Yards website",
    href: "https://100yards.in/",
  },
] as const;

const publicationRules = [
  "Name the source behind every factual claim.",
  "Obtain explicit consent for every client quotation, portrait, and shared artifact.",
  "Keep dates, locations, circumstances, and limitations beside performance context.",
  "Never imply guaranteed returns, appreciation, approval, or a transaction outcome.",
  "Correct or remove claims when the supporting source changes.",
] as const;

const caseStructure = [
  {
    number: "001",
    title: "Starting context",
    description:
      "What the person was trying to understand, with private financial and property information removed.",
  },
  {
    number: "002",
    title: "Work performed",
    description:
      "The specific visit, comparison, discussion, or professional verification that actually occurred.",
  },
  {
    number: "003",
    title: "Documented change",
    description:
      "What became clearer or better organised—without turning process evidence into a promised result.",
  },
] as const;

export default function ResultsPage() {
  return (
    <main
      id="main-content"
      className="page-shell results-editorial-page authority-evidence-page"
    >
      <PageHero
        index="03 / EVIDENCE"
        eyebrow="PUBLIC FACTS / PUBLICATION STANDARD"
        title={
          <>
            Credibility should be
            <br />
            <em>possible to inspect.</em>
          </>
        }
        body="This is not a testimonial gallery. It separates what can be sourced today from the standard future client stories must meet before publication."
        theme="ink"
        aside={<span>SOURCES / CONSENT / CONTEXT</span>}
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
          <p className="eyebrow">EVIDENCE BEFORE IMPRESSION</p>
          <h2>
            Trust is stronger
            <br />
            <em>when the source stays visible.</em>
          </h2>
          <p>
            Rohitt&apos;s public role and Hundred Yards&apos; company identity can be
            connected to public sources. Client outcomes require a different
            standard: permission, context, and evidence for every meaningful
            statement.
          </p>
          <p>
            No learner results are published because the Academy has not
            launched. No names, quotations, portraits, transaction totals, or
            financial outcomes have been invented to fill that space.
          </p>
        </div>
      </section>

      <section className="results-standard results-editorial-standard authority-evidence-sources section-pad section-ink">
        <SectionHeading
          light
          eyebrow="WHAT CAN BE SOURCED TODAY"
          title={
            <>
              Public identity,
              <br />
              <em>with the trail attached.</em>
            </>
          }
          body="These links support the narrow claims shown here. They do not independently validate every marketing statement made elsewhere."
        />

        <div className="results-editorial-case-grid authority-evidence-source-grid">
          {publicEvidence.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a
                className="text-link"
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                {item.source}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="results-editorial-case-structure authority-evidence-standard section-pad">
        <SectionHeading
          eyebrow="CASE FILE / THE THREE-PART RECORD"
          title={
            <>
              Situation. Work.
              <br />
              <em>Documented change.</em>
            </>
          }
          body="If a real client story is published later, it must show the process without exposing private information or implying a guaranteed outcome."
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
            <span className="evidence-index">CLIENT CASE / NONE PUBLISHED</span>
            <FileSearch aria-hidden="true" size={36} />
            <strong>No testimonial is being simulated</strong>
            <p>
              A future case opens only after its source, wording, context,
              evidence, and consent have been reviewed.
            </p>
          </div>

          <div className="evidence-checklist results-editorial-checklist">
            <p className="eyebrow">THE PUBLICATION GATE</p>
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
        <ShieldCheck aria-hidden="true" size={30} />
        <div>
          <p className="eyebrow">THE CLAIM BOUNDARY</p>
          <h2>No borrowed credibility.</h2>
        </div>
        <p>
          No fictional clients, generated endorsements, unattributed
          quotations, unsupported awards, learner counts, transaction totals,
          appreciation percentages, or claims that education caused a
          financial result.
        </p>
      </section>

      <section className="story-invite results-editorial-invite authority-evidence-invite section-pad section-blue">
        <div>
          <p className="eyebrow eyebrow-light">HAVE A PROFESSIONAL QUESTION?</p>
          <h2>
            Ask for the source,
            <br />
            <em>scope, or context.</em>
          </h2>
        </div>
        <p>
          The contact route opens an email to the Hundred Yards team. It does
          not collect a testimonial or claim that an enquiry becomes an
          engagement.
        </p>
        <Link className="button button-light" href="/contact?type=other#contact-form">
          Contact the team <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
