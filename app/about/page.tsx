import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import {
  aboutStoryChapters,
  brandPrinciples,
  rohitEditorialProfile,
} from "../lib/content";

export const metadata: Metadata = {
  title: "About Rohit",
  description:
    "Meet Rohit and the evidence-led philosophy behind his real-estate learning resources.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell about-editorial-page">
      <PageHero
        index="01 / ABOUT"
        eyebrow="ROHIT / THE DECISION STUDIO"
        title={
          <>
            Property, read clearly.
            <br />
            <em>People, considered first.</em>
          </>
        }
        body="Rohit's work is being shaped around a calmer way to learn property: frame the real question, preserve the evidence, expose the trade-offs, and know what still needs qualified verification."
        aside={<span>PERSON / PROCESS / PROPERTY</span>}
      />

      <section className="about-intro about-editorial-intro section-pad">
        <figure className="about-editorial-portrait portrait-stage">
          <Image
            alt={rohitEditorialProfile.portrait.alt}
            className="about-editorial-portrait-image"
            height={rohitEditorialProfile.portrait.height}
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
            src={rohitEditorialProfile.portrait.src}
            width={rohitEditorialProfile.portrait.width}
          />
          <figcaption className="about-editorial-stock-note">
            <strong>STOCK STAND-IN / NOT ROHIT</strong>
            <span>{rohitEditorialProfile.portrait.caption}</span>
          </figcaption>
        </figure>

        <div className="about-manifesto about-editorial-manifesto">
          <p className="eyebrow">THE PERSON BEHIND THE PROCESS</p>
          <blockquote>
            <span>WORKING BRAND PRINCIPLE / PENDING ROHIT APPROVAL</span>
            “The goal is not to make property feel simple. It is to make the
            <em> next question clear.</em>”
          </blockquote>
          <p>
            The philosophy is deliberately different from a sales pitch. A
            course cannot remove uncertainty, approve a transaction, or replace
            professional diligence. It can teach a person to organise the
            decision, question an assumption, and recognise what remains open.
          </p>
          <p className="about-editorial-role-note">
            Rohit&apos;s biography, current role, and experience remain editorial
            placeholders until he supplies and approves the underlying facts.
          </p>
        </div>
      </section>

      <section className="story-rail about-editorial-story section-pad section-ink">
        <SectionHeading
          light
          eyebrow="THE STORY / FOUR VERIFIED CHAPTERS TO COME"
          title={
            <>
              A personal story should be
              <br />
              <em>specific enough to trust.</em>
            </>
          }
          body="These are publication prompts—not claims. Dates, places, roles, projects, and first-person wording will appear only after Rohit confirms them."
        />

        <div className="timeline-grid about-editorial-chapters">
          {aboutStoryChapters.map((chapter) => (
            <article className="timeline-card about-editorial-chapter" key={chapter.number}>
              <span>{chapter.number}</span>
              <small>{chapter.marker}</small>
              <h3>{chapter.title}</h3>
              <p>{chapter.prompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-editorial-process section-pad">
        <div className="about-editorial-process-copy">
          <p className="eyebrow">FROM INFORMATION TO A WORKING RECORD</p>
          <h2>
            The method lives in the
            <br />
            <em>quality of the questions.</em>
          </h2>
          <p>
            Property information rarely arrives in one neat sequence. The work
            is to distinguish what was observed, what was stated, what has been
            inferred, and what must still be reviewed by an appropriately
            qualified professional.
          </p>
          <ul className="about-editorial-process-list">
            <li><Check aria-hidden="true" size={16} /> Preserve the source.</li>
            <li><Check aria-hidden="true" size={16} /> Name the assumption.</li>
            <li><Check aria-hidden="true" size={16} /> Keep uncertainty visible.</li>
          </ul>
        </div>

        <figure className="about-editorial-process-media">
          <CinematicMedia
            poster="/media/blueprint-hands.jpg"
            videoSrc="/media/blueprint-process.mp4"
            alt="Hands reviewing architectural drawings at a work table"
            width={2048}
            height={3072}
            sizes="(max-width: 800px) 100vw, 50vw"
            parallax={5}
            controlLabel="editorial process video"
          />
          <figcaption>
            Editorial stock process footage. The drawings are illustrative and
            are not represented as Rohit&apos;s work or a learner case.
          </figcaption>
        </figure>
      </section>

      <section className="principles about-editorial-principles section-pad">
        <SectionHeading
          eyebrow="THE OPERATING PRINCIPLES"
          title={
            <>
              The standards beneath
              <br />
              <em>every resource.</em>
            </>
          }
          body="Professional without being distant. Clear without manufacturing certainty."
        />

        <div className="principle-list about-editorial-principle-list">
          {brandPrinciples.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="about-editorial-context section-pad section-orange">
        <figure className="about-editorial-context-image">
          <Image
            alt="Close editorial study of a geometric building facade in daylight"
            height={1170}
            sizes="(max-width: 900px) 100vw, 52vw"
            src="/media/facade-detail.jpg"
            width={1800}
          />
          <figcaption>
            Editorial stock image—not a Rohit project, listing, or transaction.
          </figcaption>
        </figure>
        <div className="about-editorial-context-copy">
          <p className="eyebrow">THE PUBLIC RECORD / BEFORE LAUNCH</p>
          <h2>Authority should arrive with its source.</h2>
          <p>
            The final page will replace prompts with Rohit&apos;s approved portrait,
            biography, career timeline, public role, service boundaries, and
            documented experience. Nothing here is intended to imply a licence,
            affiliation, project history, or result that has not been verified.
          </p>
          <ul>
            {rohitEditorialProfile.launchNeeds.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-closing about-editorial-closing section-pad section-blue">
        <p className="eyebrow eyebrow-light">NEXT / THE COLLECTION</p>
        <h2>
          Learn the system.
          <br />
          <em>Carry the questions.</em>
        </h2>
        <Link className="button button-light" href="/courses">
          Explore Rohit&apos;s resources <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
