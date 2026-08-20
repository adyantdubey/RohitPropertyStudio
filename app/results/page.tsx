import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, FileSearch, LockKeyhole } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { proofRequirements } from "../lib/content";

export const metadata: Metadata = {
  title: "The Proof Standard",
  description:
    "How future learner stories will be documented with context, consent, and no implied financial guarantee.",
};

const reservedCaseFiles = [
  {
    number: "001",
    title: "Starting context",
    description:
      "What the learner was trying to understand, without exposing private financial or property information.",
  },
  {
    number: "002",
    title: "The work applied",
    description:
      "The exact lesson, question set, worksheet, or review practice used—with an approved supporting artifact where possible.",
  },
  {
    number: "003",
    title: "The process change",
    description:
      "What became clearer, better organised, or more deliberate; never a promised return or implied transaction result.",
  },
] as const;

export default function ResultsPage() {
  return (
    <main id="main-content" className="page-shell results-editorial-page">
      <PageHero
        index="03 / PROOF"
        eyebrow="THE WORK IN PRACTICE"
        title={
          <>
            Evidence, with its
            <br />
            <em>context intact.</em>
          </>
        }
        body="This preview does not invent learners, quotations, returns, or transaction outcomes. It defines the standard every future story must meet before publication."
        theme="ink"
        aside={<span>EVIDENCE / CONSENT / CONTEXT</span>}
      />

      <section className="results-editorial-opener section-pad">
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
            Editorial stock image. This is not a learner artifact, Rohit project,
            listing, transaction, or evidence of an outcome.
          </figcaption>
        </figure>

        <div className="results-editorial-opener-copy">
          <p className="eyebrow">THE STANDARD BEFORE THE STORY</p>
          <h2>
            Better documentation is
            <br />
            <em>part of the proof.</em>
          </h2>
          <p>
            A useful learner story should show the starting question, the work
            applied, and the specific change in understanding or process. It
            should also preserve what remained uncertain and avoid implying that
            education guaranteed a property or financial outcome.
          </p>
          <p>
            Until Rohit supplies approved material, this route remains a designed
            proof standard—not a testimonial gallery.
          </p>
        </div>
      </section>

      <section className="results-standard results-editorial-standard section-pad section-ink">
        <SectionHeading
          light
          eyebrow="THE PUBLICATION GATE"
          title={
            <>
              A real story must be
              <br />
              <em>specific enough to inspect.</em>
            </>
          }
          body="Every quotation, image, artifact, and factual statement needs an approved source and a recorded consent status."
        />

        <div className="evidence-board results-editorial-evidence-board">
          <div className="evidence-visual results-editorial-reserved-file">
            <span className="evidence-index">CASE / RESERVED</span>
            <FileSearch aria-hidden="true" size={36} />
            <strong>No case study published yet</strong>
            <p>
              This space opens only when context, wording, evidence, and consent
              have been reviewed.
            </p>
          </div>

          <div className="evidence-checklist results-editorial-checklist">
            <p className="eyebrow">BEFORE A STORY GOES LIVE</p>
            {proofRequirements.map((item) => (
              <div key={item}>
                <Check aria-hidden="true" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="results-editorial-case-structure section-pad">
        <SectionHeading
          eyebrow="CASE FILE / THE THREE-PART RECORD"
          title={
            <>
              Situation. Work.
              <br />
              <em>Documented change.</em>
            </>
          }
          body="The structure focuses on learning and decision process rather than constructing a dramatic success story."
        />
        <div className="results-editorial-case-grid">
          {reservedCaseFiles.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="outcome-language results-editorial-outcomes section-pad section-orange">
        <p className="eyebrow">WHAT CAN BE DOCUMENTED RESPONSIBLY</p>
        <div className="outcome-words" aria-label="Learning process outcomes">
          <span>BETTER QUESTIONS</span>
          <span>•</span>
          <span>CLEARER RECORDS</span>
          <span>•</span>
          <span>VISIBLE TRADE-OFFS</span>
        </div>
        <h2>
          What changed in the way
          <br />
          <em>the decision was approached?</em>
        </h2>
      </section>

      <section className="results-editorial-boundary section-pad">
        <LockKeyhole aria-hidden="true" size={30} />
        <div>
          <p className="eyebrow">WHAT WILL NOT APPEAR WITHOUT VERIFICATION</p>
          <h2>No borrowed credibility.</h2>
        </div>
        <p>
          No fictional names, generated portraits, unattributed quotations,
          learner counts, revenue figures, appreciation percentages, or claims
          that a course caused a transaction outcome. If approved financial
          context is ever relevant, it must retain its source, limitations, and
          result-variation language.
        </p>
      </section>

      <section className="story-invite results-editorial-invite section-pad section-blue">
        <div>
          <p className="eyebrow eyebrow-light">USED A ROHIT RESOURCE?</p>
          <h2>
            Share what changed
            <br />
            <em>in your process.</em>
          </h2>
        </div>
        <p>
          Tell us what you understood, organised, compared, or verified
          differently. Submission does not guarantee publication; every story is
          reviewed and used only with explicit consent.
        </p>
        <Link className="button button-light" href="/contact?type=story">
          Share your experience <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
