import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { brand } from "../lib/brand";

export const metadata: Metadata = {
  title: `About ${brand.name}`,
  description: `${brand.name} is ${brand.professionalTitle} at ${brand.organizationName}, based in Bengaluru, with more than a decade of real-estate experience as published by Hundred Yards.`,
};

const publicStory = [
  {
    number: "01",
    marker: "EXPERIENCE / PUBLISHED PROFILE",
    title: "More than a decade in real estate",
    copy: "Hundred Yards’ official company biography credits its Managing Director with over a decade of hands-on experience in the real-estate sector. That wording is retained as a published company claim, not presented as an independently audited statistic.",
  },
  {
    number: "02",
    marker: "FOUNDATION / PUBLISHED PROFILE",
    title: "Engineering-trained",
    copy: "The same official biography describes him as an Electronics & Communication engineering graduate and connects that foundation to analytical, strategic decision-making.",
  },
  {
    number: "03",
    marker: "LEADERSHIP / BENGALURU",
    title: `Managing Director, ${brand.organizationName}`,
    copy: "Hundred Yards’ public company profile identifies him as Managing Director. The company publishes its contact presence in Kalyan Nagar, Bengaluru.",
  },
  {
    number: "04",
    marker: "PUBLIC EDUCATION / VIDEO",
    title: brand.mediaLabel,
    copy: "Rohitt’s public posts use #ReelSeRealEstate as an active real-estate content series. This site treats it as a public editorial label, not as a registered mark or a claim of ownership.",
  },
] as const;

const publishedPrinciples = [
  {
    number: "01",
    title: "Transparency",
    copy: "Keep information, expectations, process, and the boundaries of a recommendation clear enough to question.",
  },
  {
    number: "02",
    title: "Reliability",
    copy: "Make the quality of follow-through as important as the quality of the first conversation.",
  },
  {
    number: "03",
    title: "Understanding",
    copy: "Begin with the buyer, seller, investor, NRI, or business brief before narrowing the route.",
  },
  {
    number: "04",
    title: "Service Excellence",
    copy: "Connect market expertise, personalised guidance, and transaction support into one accountable experience.",
  },
  {
    number: "05",
    title: "Timely Execution",
    copy: "Keep communication and the next action moving without replacing verification with avoidable urgency.",
  },
] as const;

const sourceLinks = [
  {
    label: "Hundred Yards / About",
    href: "https://100yards.in/about-us/",
    copy: "Published leadership biography, experience wording, and company positioning.",
  },
  {
    label: "Hundred Yards / Contact",
    href: "https://100yards.in/contact-us/",
    copy: "Published Bengaluru office and business-contact information.",
  },
  {
    label: "Public creator profile",
    href: brand.sourceLinks.facebook,
    copy: "Public-facing name, digital-creator identity, and current social activity.",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell about-editorial-page authority-about">
      <PageHero
        index="01 / ABOUT"
        eyebrow={`${brand.name.toUpperCase()} / PUBLIC PROFILE`}
        title={
          <>
            Leadership, with
            <br />
            <em>a teacher&apos;s clarity.</em>
          </>
        }
        body={`${brand.name} is ${brand.professionalTitle} at ${brand.organizationName}. His public work connects Bengaluru real-estate leadership, advisory context, and accessible property education.`}
        aside={<span>LEADERSHIP / ADVISORY / EDUCATION</span>}
        media={{
          poster: "/media/hero-aerial-poster.jpg",
          mobilePoster: "/media/hero-aerial-poster-mobile.jpg",
          videoSrc: "/media/hero-aerial.mp4",
          mobileVideoSrc: "/media/hero-aerial-mobile.mp4",
          alt: "Aerial view of contemporary residential architecture",
          width: 1800,
          height: 1013,
          sizes: "(max-width: 860px) 100vw, 58vw",
          objectPosition: "50% 50%",
          parallax: 6,
        }}
      />

      <section className="about-intro about-editorial-intro section-pad authority-about-intro">
        <figure className="about-editorial-portrait portrait-stage authority-about-intro__media">
          <Image
            alt="Contemporary architectural facade used as editorial atmosphere"
            className="about-editorial-portrait-image"
            height={1170}
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
            src="/media/facade-detail.jpg"
            width={1800}
          />
          <div className="authority-about-monogram" aria-hidden="true">
            <span>{brand.initials}</span>
            <small>BENGALURU / INDIA</small>
          </div>
          <figcaption className="about-editorial-stock-note">
            <strong>EDITORIAL ARCHITECTURE IMAGE</strong>
            <span>Temporary atmosphere only; this is not a Hundred Yards project, listing, transaction, or portrait of Rohitt.</span>
          </figcaption>
        </figure>

        <div className="about-manifesto about-editorial-manifesto authority-about-intro__copy">
          <p className="eyebrow">THE PUBLIC ROLE</p>
          <blockquote>
            <span>{brand.name.toUpperCase()}</span>
            {brand.professionalTitle}
            <em> / {brand.organizationName}</em>
          </blockquote>
          <p>
            Hundred Yards publishes a leadership profile built around analytical
            decision-making, customer-centred service, technology-informed
            advisory, transparency, and personalised solutions. This site turns
            that public record into a clear personal platform without inventing
            transactions, results, or professional credentials.
          </p>
          <p className="about-editorial-role-note">
            Name note: this personal brand uses “{brand.name},” matching the
            public creator spelling. The official company biography and corporate
            records use “Rohit Kumar Singh.” Source links preserve the wording used
            by each publisher.
          </p>
        </div>
      </section>

      <section className="story-rail about-editorial-story section-pad section-ink authority-about-story">
        <SectionHeading
          light
          eyebrow="THE PUBLIC STORY / SOURCE CONTEXT RETAINED"
          title={
            <>
              A profile built from
              <br />
              <em>facts people can trace.</em>
            </>
          }
          body="These chapters use published company and public-profile material. Personal or family details are intentionally excluded because they do not establish professional authority."
        />

        <div className="timeline-grid about-editorial-chapters authority-about-story__grid">
          {publicStory.map((chapter) => (
            <article className="timeline-card about-editorial-chapter" key={chapter.number}>
              <span>{chapter.number}</span>
              <small>{chapter.marker}</small>
              <h3>{chapter.title}</h3>
              <p>{chapter.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-editorial-process section-pad authority-about-bridge">
        <div className="about-editorial-process-copy">
          <p className="eyebrow">WHERE THE WORK MEETS</p>
          <h2>
            From an active brief
            <br />
            <em>to an informed audience.</em>
          </h2>
          <p>
            The advisory path belongs to Hundred Yards and begins with a real
            property requirement. The education path belongs to Rohitt&apos;s public
            platform and begins with a useful question. Each has its own scope,
            call to action, and professional boundary.
          </p>
          <ul className="about-editorial-process-list">
            <li><Check aria-hidden="true" size={16} /> Property advisory through Hundred Yards.</li>
            <li><Check aria-hidden="true" size={16} /> Courses and practical learning through Rohitt.</li>
            <li><Check aria-hidden="true" size={16} /> Public video through {brand.mediaLabel}.</li>
          </ul>
        </div>

        <figure className="about-editorial-process-media">
          <CinematicMedia
            poster="/media/blueprint-process-poster.jpg"
            mobilePoster="/media/blueprint-process-poster-mobile.jpg"
            videoSrc="/media/blueprint-process.mp4"
            mobileVideoSrc="/media/blueprint-process-mobile.mp4"
            alt="Hands reviewing architectural drawings at a work table"
            width={2048}
            height={3072}
            sizes="(max-width: 800px) 100vw, 50vw"
            parallax={5}
            controlLabel="editorial architecture process video"
          />
          <figcaption>
            Temporary editorial stock footage. The drawings are illustrative;
            they are not Rohitt&apos;s work, a Hundred Yards project, or client evidence.
          </figcaption>
        </figure>
      </section>

      <section className="principles about-editorial-principles section-pad authority-about-principles">
        <SectionHeading
          eyebrow="PUBLISHED HUNDRED YARDS POSITIONING"
          title={
            <>
              Five principles shaping
              <br />
              <em>the public brand.</em>
            </>
          }
          body="Hundred Yards publishes these five ideas as its TRUST framework. The explanations below translate that framework into concise website language rather than presenting them as quotations from Rohitt."
        />

        <div className="principle-list about-editorial-principle-list">
          {publishedPrinciples.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="about-editorial-context section-pad section-orange authority-about-sources">
        <figure className="about-editorial-context-image">
          <Image
            alt="Bright contemporary residential interior"
            height={2700}
            sizes="(max-width: 900px) 100vw, 52vw"
            src="/media/interior-daylight.jpg"
            width={1800}
          />
          <figcaption>
            Editorial stock image—not a Rohitt or Hundred Yards project, listing,
            recommendation, or transaction.
          </figcaption>
        </figure>
        <div className="about-editorial-context-copy">
          <p className="eyebrow">THE PUBLIC RECORD / READ THE SOURCES</p>
          <h2>Context stays attached to the claim.</h2>
          <p>
            Titles, experience wording, location, and company positioning should
            remain easy to verify. If the source changes, this profile should be
            reviewed rather than quietly preserving an outdated statement.
          </p>
          <ul className="authority-about-sources__list">
            {sourceLinks.map((source) => (
              <li key={source.href}>
                <a href={source.href} rel="noreferrer" target="_blank">
                  <strong>{source.label}</strong>
                  <span>{source.copy}</span>
                  <ExternalLink aria-hidden="true" size={15} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-closing about-editorial-closing section-pad section-blue authority-about-closing">
        <p className="eyebrow eyebrow-light">NEXT / CHOOSE THE WORK</p>
        <h2>
          Bring a property brief.
          <br />
          <em>Or begin with the learning.</em>
        </h2>
        <div className="authority-about-closing__actions">
          <Link className="button button-light" href="/advisory">
            Buy or invest with Hundred Yards <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
          <Link className="text-link text-link-light" href="/courses">
            Learn with {brand.shortName} <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
