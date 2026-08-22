import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import { YouTubeRail } from "../components/lab/YouTubeRail";
import { brand, course, profileTimeline, teachingPrinciples } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "About Rohitt",
  description: `${brand.name}, ${brand.role} of ${brand.company} and instructor of ${course.title}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow" data-enter>About the instructor</p>
            <h1 data-split>Experience from the field, structured for the classroom.</h1>
            <p data-enter>{brand.name} is {brand.role} of {brand.company} and the instructor behind {brand.academy}.</p>
            <div className="page-hero__actions" data-enter>
              <a className="button button--gold" href="/course">Explore the course</a>
              <a className="button button--outline" href={brand.aboutUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
                Official profile <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className="page-hero__media" data-enter>
            <span className="frame frame--corner">
              <Image src="/media/rohit-kumar-singh.jpg" alt={brand.name} width={1764} height={2352} priority sizes="(max-width: 1000px) 92vw, 32vw" />
            </span>
            <figcaption><strong>{brand.name}</strong><span>{brand.role}</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="section surface-light">
        <div className="shell statement-block">
          <p className="eyebrow" data-reveal>Professional profile</p>
          <div className="statement-block__body">
            <h2 data-split>Real estate explained with analytical discipline.</h2>
            <p data-reveal>
              An Electronics &amp; Communication engineering graduate, Rohitt brings over a decade of
              real-estate experience to his work. The official Hundred Yards biography describes an
              analytical, strategic, customer-centric and technology-driven approach.
            </p>
          </div>
        </div>
      </section>

      <section className="section surface-dark">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Professional thread</p>
              <h2 data-split>What connects the engineer, the director and the instructor.</h2>
            </div>
            <p className="head__note" data-reveal>
              The sequence below uses only details supported by Rohitt&apos;s current public professional
              biography. Unverified dates and performance claims are intentionally excluded.
            </p>
          </div>
          <div className="timeline">
            {profileTimeline.map((item, index) => (
              <article className="timeline__item" key={item.marker} data-reveal>
                <span className="timeline__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="timeline__marker">{item.marker}</span>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-light">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Teaching philosophy</p>
              <h2 data-split>Clarity is a method, not a slogan.</h2>
            </div>
            <p className="head__note" data-reveal>
              The academy&apos;s first course converts field vocabulary into a visual sequence while
              keeping the boundary between education and verification explicit.
            </p>
          </div>
          <div className="grid grid--3">
            {teachingPrinciples.map((principle, index) => (
              <article className="card" key={principle.title} data-reveal data-reveal-delay={String(index)}>
                <span className="card__index">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p className="card__body">{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-deep" id="watch">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Watch Rohitt work</p>
              <h2 data-split>Field lessons, on camera.</h2>
            </div>
            <p className="head__note" data-reveal>
              The channel carries what a website cannot: Rohitt walking real Bengaluru projects and
              answering the questions buyers actually ask.
            </p>
          </div>
          <div data-reveal><YouTubeRail /></div>
        </div>
      </section>

      <section className="section surface-dark">
        <div className="shell bridge__grid">
          <div className="bridge__mark" data-reveal aria-hidden="true">100<span>YARDS</span></div>
          <div className="bridge__body" data-reveal data-reveal-delay="1">
            <p className="eyebrow">Professional context</p>
            <h2>{brand.company}</h2>
            <p>
              Hundred Yards is the professional context behind Rohitt&apos;s real-estate work. Its
              published company profile describes services for homebuyers, investors, NRIs and
              businesses, with a stated emphasis on transparency, personalised guidance and transaction
              support.
            </p>
            <p>
              The academy remains a distinct educational platform: company client feedback is labelled
              as property-service evidence, never as course feedback.
            </p>
            <div className="bridge__links">
              <a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
                Visit Hundred Yards <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a className="text-link" href="/stories">Review the evidence standard <ChevronRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta eyebrow="Learn with Rohitt" title="Begin with one focused real-estate foundation." />
    </main>
  );
}
