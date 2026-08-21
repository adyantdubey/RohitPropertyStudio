import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CourseCta } from "../components/CourseCta";
import { brand, course, profileTimeline, teachingPrinciples } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "About Rohit",
  description: `${brand.name}, ${brand.role} of ${brand.company} and instructor of ${course.title}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <section className="inner-hero about-hero">
        <div className="shell inner-hero__grid">
          <div className="inner-hero__copy hero-entrance"><p className="eyebrow">About the instructor</p><h1>Experience from the field, structured for the classroom.</h1><p>{brand.name} is {brand.role} of {brand.company} and the instructor behind {brand.academy}.</p><div className="about-hero__actions"><a className="button button--gold" href="/course">Explore the course</a><a className="button button--outline" href={brand.aboutUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">Official profile <ArrowUpRight size={17} aria-hidden="true" /></a></div></div>
          <div className="inner-hero__portrait hero-entrance" data-media-reveal><div className="portrait-parallax"><Image src="/media/rohit-kumar-singh.jpg" alt="Rohit Kumar Singh" width={1764} height={2352} priority sizes="(max-width: 800px) 92vw, 38vw" /></div><div className="portrait-caption"><strong>{brand.name}</strong><span>{brand.role} · {brand.company}</span></div></div>
        </div>
      </section>

      <section className="section about-statement">
        <div className="shell about-statement__grid">
          <p className="eyebrow reveal">Professional profile</p>
          <div className="reveal"><h2>Real estate explained with analytical discipline.</h2><p>An Electronics &amp; Communication engineering graduate, Rohit brings over a decade of real-estate experience to his work. The official Hundred Yards biography describes an analytical, strategic, customer-centric and technology-driven approach.</p></div>
        </div>
      </section>

      <section className="section profile-timeline">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Professional thread</p><h2>What connects the engineer, the director and the instructor.</h2></div><p>The sequence below uses only details supported by Rohit&apos;s current public professional biography. Unverified dates and performance claims are intentionally excluded.</p></div>
          <div className="timeline-list">
            {profileTimeline.map((item, index) => <article className="timeline-item reveal" key={item.marker}><span>{String(index + 1).padStart(2, "0")}</span><small>{item.marker}</small><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section teaching-principles">
        <div className="shell">
          <div className="section-heading section-heading--light reveal"><div><p className="eyebrow">Teaching philosophy</p><h2>Clarity is a method, not a slogan.</h2></div><p>The academy&apos;s first course converts field vocabulary into a visual sequence while keeping the boundary between education and verification explicit.</p></div>
          <div className="principle-grid">{teachingPrinciples.map((principle, index) => <article className="principle-card reveal" key={principle.title}><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section company-bridge">
        <div className="shell company-bridge__grid">
          <div className="company-bridge__mark reveal" aria-hidden="true">100<span>YARDS</span></div>
          <div className="reveal"><p className="eyebrow">Professional context</p><h2>{brand.company}</h2><p>Hundred Yards is the professional context behind Rohit&apos;s real-estate work. Its published company profile describes services for homebuyers, investors, NRIs and businesses, with a stated emphasis on transparency, personalised guidance and transaction support.</p><p>The academy remains a distinct educational platform: company client feedback is labelled as property-service evidence, never as course feedback.</p><div className="company-bridge__links"><a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">Visit Hundred Yards <ArrowUpRight size={15} aria-hidden="true" /></a><a className="text-link" href="/stories">Review the evidence standard</a></div></div>
        </div>
      </section>

      <CourseCta eyebrow="Learn with Rohit" title="Begin with one focused real-estate foundation." />
    </main>
  );
}
