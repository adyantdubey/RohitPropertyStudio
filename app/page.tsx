import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { CourseCta } from "./components/CourseCta";
import { SlideGallery } from "./components/SlideGallery";
import { VerifiedStatRail } from "./components/VerifiedStatRail";
import {
  academyResources,
  audiences,
  brand,
  clientFeedback,
  course,
  courseBoundaries,
  courseModules,
  faqs,
  learningOutcomes,
} from "./lib/siteContent";

export const metadata: Metadata = {
  title: course.title,
  description: course.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <div className="brand-intro" aria-hidden="true"><span>RK</span><small>Real Estate Academy</small></div>
      <main id="main-content">
        <section className="sales-hero" id="course">
          <div className="shell sales-hero__grid">
            <div className="sales-hero__copy">
              <p className="eyebrow hero-entrance">{course.eyebrow}</p>
              <h1 className="hero-entrance">{course.promise}</h1>
              <p className="sales-hero__lede hero-entrance">A 49-slide visual foundation by {brand.name}, {brand.role} of {brand.company}.</p>
              <div className="sales-hero__actions hero-entrance">
                <a className="button button--gold" href="/course">Explore the complete course <ArrowDown size={17} aria-hidden="true" /></a>
                <a className="button button--outline" href="/contact#early-access-form" data-track="early_access_cta">Join early access <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
              <p className="sales-hero__status hero-entrance"><span aria-hidden="true" /> {course.status} · No payment collected</p>
            </div>
            <div className="sales-hero__visual hero-entrance" aria-label="Course and instructor preview">
              <div className="sales-hero__portrait"><Image src="/media/rohit-kumar-singh.jpg" alt="Rohit Kumar Singh" fill priority sizes="(max-width: 760px) 65vw, 27vw" /></div>
              <div className="sales-hero__cover"><Image src={course.cover} alt={`${course.title} course cover`} width={1600} height={900} priority sizes="(max-width: 760px) 72vw, 36vw" /></div>
              <div className="sales-hero__caption"><strong>{course.title}</strong><span>{course.format}</span></div>
            </div>
          </div>
        </section>

        <VerifiedStatRail />

        <section className="section learning-case">
          <div className="shell">
            <div className="section-heading reveal">
              <div><p className="eyebrow">Why this foundation matters</p><h2>Property becomes easier to discuss when the words stop competing.</h2></div>
              <p>The course is designed to organise the vocabulary before a learner attempts deeper project, legal, financial or investment analysis.</p>
            </div>
            <div className="outcome-grid">
              {learningOutcomes.map((outcome) => (
                <article className="outcome-card reveal" key={outcome.number}>
                  <span>{outcome.number}</span><h3>{outcome.title}</h3><p>{outcome.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section course-overview">
          <div className="shell">
            <div className="section-heading reveal"><div><p className="eyebrow">Four learning chapters</p><h2>A practical map for real property conversations.</h2></div><p>The course starts with the essentials, then connects the language used across projects, site visits and sales discussions.</p></div>
            <div className="module-grid">{courseModules.map((module) => <article className="module reveal" key={module.number}><span>{module.number}</span><h3>{module.title}</h3><p>{module.copy}</p></article>)}</div>
            <a className="text-link section-link" href="/course">View the complete curriculum <ChevronRight size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="section course-preview" id="inside-course">
          <div className="shell">
            <div className="section-heading section-heading--light reveal"><div><p className="eyebrow">Inside the course</p><h2>See the actual material before launch.</h2></div><p>These are genuine pages from the supplied 49-slide training deck—not stock mockups or generated course claims.</p></div>
            <SlideGallery />
          </div>
        </section>

        <section className="section course-method">
          <div className="shell course-method__grid">
            <div className="course-method__visual reveal" data-media-reveal>
              <Image src="/course/area-terminology.png" alt="Course lesson showing area terminology" width={1600} height={900} sizes="(max-width: 800px) 92vw, 50vw" />
            </div>
            <div className="course-method__copy reveal">
              <p className="eyebrow">The teaching method</p>
              <h2>See the relationship, then learn the label.</h2>
              <p>Visual explanations help separate terms that are often heard together. The aim is not to turn one slide into transaction advice; it is to give the learner a clearer place to begin asking questions.</p>
              <a className="text-link" href="/resources#area-visualizer">Try the area visualizer <ChevronRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="section instructor" id="instructor">
          <div className="shell instructor__grid">
            <div className="instructor-portrait reveal" data-media-reveal><div className="portrait-parallax"><Image src="/media/rohit-kumar-singh.jpg" alt="Rohit Kumar Singh, Managing Director of Hundred Yards Realtor Pvt Ltd" width={1764} height={2352} sizes="(max-width: 760px) 92vw, 42vw" /></div></div>
            <div className="instructor__copy reveal">
              <p className="eyebrow">Your instructor</p><h2>{brand.name}</h2><p className="instructor__role">{brand.role}, {brand.company}</p>
              <p>Rohit is an Electronics &amp; Communication engineering graduate with over a decade of experience in real estate. His work combines analytical thinking, market experience and a practical focus on making property decisions easier to understand.</p>
              <p>This academy translates that field experience into structured, visual learning for people entering or navigating the industry.</p>
              <div className="instructor__links"><a className="text-link" href="/about">Read Rohit&apos;s profile <ChevronRight size={16} aria-hidden="true" /></a><a className="text-link" href={brand.aboutUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">Official Hundred Yards profile <ArrowUpRight size={15} aria-hidden="true" /></a></div>
            </div>
          </div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="shell">
            <div className="section-heading reveal"><div><p className="eyebrow">Hundred Yards client feedback</p><h2>Credibility from real property conversations.</h2></div><p>These are paraphrased property-service reviews published by Hundred Yards. They are not course reviews, because this course has not launched yet.</p></div>
            <div className="review-grid">{clientFeedback.map((review) => <figure className="review reveal" key={review.name}><span className="review__theme">{review.theme}</span><blockquote>“{review.quote}”</blockquote><figcaption>{review.name}<span>Hundred Yards property client</span></figcaption></figure>)}</div>
            <div className="reviews__actions"><a className="text-link" href="/stories">Read the evidence standard <ChevronRight size={16} aria-hidden="true" /></a><a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">View the published source <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className="section audience"><div className="shell audience__grid"><div className="reveal"><p className="eyebrow">Built for a clear start</p><h2>Useful whether you are entering the industry or facing it as a customer.</h2></div><ul className="audience__list">{audiences.map((audience) => <li className="reveal" key={audience}><Check size={20} aria-hidden="true" /><span>{audience}</span></li>)}</ul></div></section>

        <section className="section resources-preview">
          <div className="shell">
            <div className="section-heading reveal"><div><p className="eyebrow">Learn before the launch</p><h2>Useful tools, built from the same curriculum.</h2></div><p>Explore the terminology instead of reading another generic article. Every resource points back to a real learning objective.</p></div>
            <div className="resource-card-grid">
              {academyResources.slice(0, 3).map((resource) => <a className="resource-card reveal" href={resource.href} key={resource.number}><span>{resource.number} · {resource.type}</span><h3>{resource.title}</h3><p>{resource.description}</p><strong>Open resource <ArrowUpRight size={15} aria-hidden="true" /></strong></a>)}
            </div>
          </div>
        </section>

        <section className="section offer" id="early-access"><div className="shell offer__grid"><div className="offer__cover reveal"><Image src={course.cover} alt={`${course.title} visual training deck`} width={1600} height={900} sizes="(max-width: 760px) 92vw, 42vw" /></div><div className="offer__copy reveal"><p className="eyebrow">The first release</p><h2>{course.title}</h2><p>{course.description}</p><dl><div><dt>Material</dt><dd>49-slide visual deck</dd></div><div><dt>Level</dt><dd>{course.level}</dd></div><div><dt>Price</dt><dd>To be announced</dd></div><div><dt>Status</dt><dd>Early access</dd></div></dl><a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">Join early access <ArrowUpRight size={17} aria-hidden="true" /></a><a className="offer__email" href={course.email}>Prefer email? Write to {brand.email}</a></div></div></section>

        <section className="section course-boundary">
          <div className="shell course-boundary__grid">
            <div className="reveal"><p className="eyebrow">Clear boundaries</p><h2>Education should clarify what still needs verification.</h2></div>
            <ul>{courseBoundaries.map((boundary) => <li className="reveal" key={boundary}><Check size={18} aria-hidden="true" /><span>{boundary}</span></li>)}</ul>
          </div>
        </section>

        <section className="section faq" id="faq"><div className="shell faq__grid"><div className="reveal"><p className="eyebrow">Before you join</p><h2>Straight answers about the launch.</h2><p>Payment, final access terms and launch pricing will be published before any order is accepted.</p></div><div className="faq__list">{faqs.map((faq) => <details className="reveal" key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

        <CourseCta />
      </main>
    </>
  );
}
