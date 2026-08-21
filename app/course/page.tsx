import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Check, X } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import { AreaVisualizer } from "../components/LearningTools";
import { SlideGallery } from "../components/SlideGallery";
import { StatRail } from "../components/StatRail";
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
    <main id="main-content">
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow" data-enter>{course.eyebrow}</p>
            <h1 data-split>{course.title}</h1>
            <p data-enter>{course.promise}</p>
            <div className="page-hero__actions" data-enter>
              <a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">Join early access</a>
              <a className="button button--outline" href="#curriculum">See the curriculum <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="page-hero__media page-hero__media--cover" data-enter>
            <span className="frame frame--zoom"><Image src="/brand/cover.png" alt={`${course.title} course cover`} width={1600} height={900} priority sizes="(max-width: 1000px) 92vw, 32vw" /></span>
            <figcaption><strong>{course.format}</strong><span>{course.status}</span></figcaption>
          </figure>
        </div>
      </section>

      <StatRail />

      <section className="section surface-light">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Fit before purchase</p>
              <h2 data-split>Know whether this foundation matches your starting point.</h2>
            </div>
            <p className="head__note" data-reveal>
              The course is deliberately introductory. It organises vocabulary; it does not replace
              specialist review or guarantee an outcome.
            </p>
          </div>
          <div className="grid grid--2">
            <article className="card fit-card fit-card--yes" data-reveal>
              <p className="eyebrow">Designed for</p>
              <ul>{audiences.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
            </article>
            <article className="card fit-card" data-reveal data-reveal-delay="1">
              <p className="eyebrow eyebrow--plain">Not designed for</p>
              <ul>{notFor.map((item) => <li key={item}><X size={17} aria-hidden="true" />{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section surface-dark" id="curriculum">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Course curriculum</p>
              <h2 data-split>Four chapters. One coherent foundation.</h2>
            </div>
            <p className="head__note" data-reveal>
              Each chapter moves from recognition to context, giving learners a clearer vocabulary for
              the next conversation.
            </p>
          </div>
          <div className="curriculum-list">
            {courseModules.map((module) => (
              <article className="curriculum-item" key={module.number} data-reveal>
                <span className="curriculum-item__num">{module.number}</span>
                <div><h3>{module.title}</h3><p>{module.copy}</p></div>
                <div className="curriculum-item__focus"><small>Learning focus</small><p>{module.outcome}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-deep">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Six real previews</p>
              <h2 data-split>Judge the teaching material directly.</h2>
            </div>
            <p className="head__note" data-reveal>
              Every image below is a genuine slide from the supplied course deck.
            </p>
          </div>
          <SlideGallery />
        </div>
      </section>

      <section className="section surface-light" id="terminology-demo">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Interactive lesson</p>
              <h2 data-split>See why area labels should not be compared blindly.</h2>
            </div>
            <p className="head__note" data-reveal>
              Adjust the illustration to understand how a broader quoted area can grow around the same
              usable carpet area.
            </p>
          </div>
          <div data-reveal><AreaVisualizer /></div>
        </div>
      </section>

      <section className="section surface-dark">
        <div className="shell format__grid">
          <div data-reveal>
            <p className="eyebrow">What is confirmed today</p>
            <h2 data-split>A real course preview with an honest launch status.</h2>
          </div>
          <dl className="offer__facts" data-reveal data-reveal-delay="1">
            <div><dt>Course</dt><dd>{course.title}</dd></div>
            <div><dt>Core material</dt><dd>{course.format}</dd></div>
            <div><dt>Level</dt><dd>{course.level}</dd></div>
            <div><dt>Price</dt><dd><em>To be announced before payment opens</em></dd></div>
            <div><dt>Current action</dt><dd>Join early access without paying</dd></div>
          </dl>
        </div>
      </section>

      <section className="section surface-deep">
        <div className="shell boundary__grid">
          <div data-reveal>
            <p className="eyebrow">Professional boundary</p>
            <h2 data-split>Foundational knowledge is a starting point, not a property verdict.</h2>
          </div>
          <ul className="checklist">
            {courseBoundaries.map((boundary) => (
              <li key={boundary} data-reveal><Check size={18} aria-hidden="true" /><span>{boundary}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-light" id="faq">
        <div className="shell faq__grid">
          <div className="faq__intro" data-reveal>
            <p className="eyebrow">Course questions</p>
            <h2>Everything currently confirmed.</h2>
            <p>These answers will be updated when pricing, delivery and access terms are final.</p>
          </div>
          <div className="accordion">
            {faqs.map((faq) => (
              <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta title="Be first to receive the confirmed release details." />
    </main>
  );
}
