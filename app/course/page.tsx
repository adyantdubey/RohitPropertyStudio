import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Check, X } from "lucide-react";
import { CourseCta } from "../components/CourseCta";
import { AreaVisualizer } from "../components/LearningTools";
import { SlideGallery } from "../components/SlideGallery";
import { VerifiedStatRail } from "../components/VerifiedStatRail";
import { audiences, course, courseBoundaries, courseModules, faqs } from "../lib/siteContent";

export const metadata: Metadata = {
  title: course.title,
  description: `Curriculum, real slide previews and launch details for ${course.title}.`,
  alternates: { canonical: "/course" },
};

const notFor = [
  "Anyone looking for transaction-specific legal, tax or investment advice",
  "Anyone expecting a statutory licence, qualification or income guarantee",
  "Anyone looking for project recommendations without current independent checks",
] as const;

export default function CoursePage() {
  return (
    <main id="main-content" className="course-page">
      <section className="course-hero">
        <div className="shell course-hero__grid">
          <div className="course-hero__copy hero-entrance">
            <p className="eyebrow">{course.eyebrow}</p>
            <h1>{course.title}</h1>
            <p className="course-hero__promise">{course.promise}</p>
            <p>{course.description}</p>
            <div className="course-hero__actions">
              <a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">Join early access</a>
              <a className="button button--outline" href="#curriculum">See the curriculum <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="course-hero__cover hero-entrance" data-media-reveal>
            <Image src={course.cover} alt={`${course.title} course cover`} width={1600} height={900} priority sizes="(max-width: 800px) 92vw, 46vw" />
            <div><span>{course.format}</span><strong>{course.status}</strong></div>
          </div>
        </div>
      </section>

      <VerifiedStatRail />

      <section className="section fit-section">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Fit before purchase</p><h2>Know whether this foundation matches your starting point.</h2></div><p>The course is deliberately introductory. It is built to organise vocabulary, not to replace specialist review or guarantee an outcome.</p></div>
          <div className="fit-grid">
            <article className="fit-card fit-card--yes reveal"><p className="eyebrow">Designed for</p><ul>{audiences.map((item) => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul></article>
            <article className="fit-card reveal"><p className="eyebrow">Not designed for</p><ul>{notFor.map((item) => <li key={item}><X size={18} aria-hidden="true" />{item}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="section curriculum" id="curriculum">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Course curriculum</p><h2>Four chapters. One coherent foundation.</h2></div><p>Each chapter moves from recognition to context, giving learners a clearer vocabulary for the next conversation.</p></div>
          <div className="curriculum-list">
            {courseModules.map((module) => (
              <article className="curriculum-item reveal" key={module.number}>
                <span>{module.number}</span>
                <div><h3>{module.title}</h3><p>{module.copy}</p></div>
                <div><small>Learning focus</small><p>{module.outcome}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section course-preview">
        <div className="shell">
          <div className="section-heading section-heading--light reveal"><div><p className="eyebrow">Six real previews</p><h2>Judge the teaching material directly.</h2></div><p>Every image below is a genuine slide from the supplied course deck. Select any preview to inspect it at full size.</p></div>
          <SlideGallery />
        </div>
      </section>

      <section className="section course-tool" id="terminology-demo">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Interactive lesson</p><h2>See why area labels should not be compared blindly.</h2></div><p>Adjust the illustration to understand how a broader quoted area can grow around the same usable carpet area.</p></div>
          <AreaVisualizer />
        </div>
      </section>

      <section className="section course-format">
        <div className="shell course-format__grid">
          <div className="reveal"><p className="eyebrow">What is confirmed today</p><h2>A real course preview with an honest launch status.</h2></div>
          <dl className="reveal">
            <div><dt>Course</dt><dd>{course.title}</dd></div>
            <div><dt>Core material</dt><dd>{course.format}</dd></div>
            <div><dt>Level</dt><dd>{course.level}</dd></div>
            <div><dt>Price</dt><dd>To be announced before payment opens</dd></div>
            <div><dt>Current action</dt><dd>Join early access without paying</dd></div>
          </dl>
        </div>
      </section>

      <section className="section course-boundary course-boundary--dark">
        <div className="shell course-boundary__grid">
          <div className="reveal"><p className="eyebrow">Professional boundary</p><h2>Foundational knowledge is a starting point—not a property verdict.</h2></div>
          <ul>{courseBoundaries.map((boundary) => <li className="reveal" key={boundary}><Check size={18} aria-hidden="true" /><span>{boundary}</span></li>)}</ul>
        </div>
      </section>

      <section className="section faq"><div className="shell faq__grid"><div className="reveal"><p className="eyebrow">Course questions</p><h2>Everything currently confirmed.</h2><p>These answers will be updated when pricing, delivery and access terms are final.</p></div><div className="faq__list">{faqs.map((faq) => <details className="reveal" key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <CourseCta title="Be first to receive the confirmed release details." />
    </main>
  );
}
