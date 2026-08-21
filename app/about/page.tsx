import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { brand } from "../lib/brand";
import { trustValues } from "../lib/companyContent";

export const metadata: Metadata = {
  title: `About ${brand.name}`,
  description: `${brand.name} is ${brand.professionalTitle} at ${brand.organizationName}, based in Bengaluru, with more than a decade of real-estate experience as published by Hundred Yards.`,
};

const publicStory = [
  {
    number: "01",
    marker: "EXPERIENCE / REAL ESTATE",
    title: "More than a decade in real estate",
    copy: "Hundred Yards credits Rohitt with more than a decade of hands-on real-estate experience across market-facing, customer, and leadership roles.",
  },
  {
    number: "02",
    marker: "FOUNDATION / ENGINEERING",
    title: "Engineering-trained",
    copy: "An Electronics & Communication engineering background informs the analytical, structured way he approaches markets, teams, and customer decisions.",
  },
  {
    number: "03",
    marker: "LEADERSHIP / BENGALURU",
    title: `Managing Director, ${brand.organizationName}`,
    copy: "As Managing Director, he leads a customer-focused real-estate advisory working from Kalyan Nagar, Bengaluru.",
  },
  {
    number: "04",
    marker: "PUBLIC EDUCATION / VIDEO",
    title: brand.mediaLabel,
    copy: "Through Reel Se Real Estate, he brings project visits, market observations, buyer education, and leadership conversations into public view.",
  },
] as const;

const publishedPrinciples = trustValues.map((principle, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: principle.title,
  copy: principle.copy,
}));

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
            Real-estate leadership,
            <br />
            <em>made useful to people.</em>
          </>
        }
        body={`${brand.name} is ${brand.professionalTitle} at ${brand.organizationName}. He connects market experience, customer-first advisory, team leadership, and accessible property education.`}
        aside={<span>LEADERSHIP / ADVISORY / EDUCATION</span>}
        theme="ink"
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
          <p className="eyebrow">THE LEADERSHIP ROLE</p>
          <blockquote>
            <span>{brand.name.toUpperCase()}</span>
            {brand.professionalTitle}
            <em> / {brand.organizationName}</em>
          </blockquote>
          <p>
            Rohitt leads Hundred Yards with a focus on transparent advice,
            personalised property solutions, market knowledge, technology, and
            dependable support across the customer journey.
          </p>
          <p className="about-editorial-role-note">Bengaluru-based · Managing Director · Real-estate educator and digital creator</p>
        </div>
      </section>

      <section className="story-rail about-editorial-story section-pad section-ink authority-about-story">
        <SectionHeading
          light
          eyebrow="THE EXPERIENCE BEHIND THE WORK"
          title={
            <>
              Market experience.
              <br />
              <em>Leadership with a clear point of view.</em>
            </>
          }
          body="A career that brings together analytical training, hands-on property experience, company leadership, and public education."
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
          <p className="eyebrow">ONE LEADER / THREE PUBLIC ROLES</p>
          <h2>
            Advisory. Leadership.
            <br />
            <em>Education in public.</em>
          </h2>
          <p>
            Rohitt&apos;s work moves between active property advisory through
            Hundred Yards, leadership of a growing real-estate team, and practical
            education for buyers and professionals.
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
          eyebrow="THE HUNDRED YARDS TRUST FRAMEWORK"
          title={
            <>
              Five principles behind
              <br />
              <em>the customer experience.</em>
            </>
          }
          body="Transparency, reliability, understanding, service excellence, and timely execution guide how Hundred Yards wants every client interaction to feel."
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
          <p className="eyebrow">HUNDRED YARDS / OFFICIAL CHANNELS</p>
          <h2>Explore the company behind the advisory.</h2>
          <p>
            Discover the team, current property opportunities, Bengaluru office,
            and the public channels where Rohitt continues the real-estate conversation.
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
        <p className="eyebrow eyebrow-light">WORK WITH ROHITT &amp; HUNDRED YARDS</p>
        <h2>
          Start your property search.
          <br />
          <em>Or begin with the Academy.</em>
        </h2>
        <div className="authority-about-closing__actions">
          <Link className="button button-light" href="/advisory">
            Explore property advisory <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
          <Link className="text-link text-link-light" href="/courses">
            Visit the Academy <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
