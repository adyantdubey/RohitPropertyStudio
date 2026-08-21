import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { SlideGallery } from "./components/SlideGallery";
import { audiences, brand, clientFeedback, course, courseModules, faqs } from "./lib/siteContent";

export const metadata: Metadata = { title: course.title, description: course.description };

export default function HomePage() {
  return (
    <><div className="brand-intro" aria-hidden="true"><span>RK</span><small>Real Estate Academy</small></div><main id="main-content">
      <section className="sales-hero" id="course">
        <div className="shell sales-hero__grid">
          <div className="sales-hero__copy">
            <p className="eyebrow hero-entrance">{course.eyebrow}</p>
            <h1 className="hero-entrance">{course.promise}</h1>
            <p className="sales-hero__lede hero-entrance">A 49-slide visual foundation by {brand.name}, {brand.role} of {brand.company}.</p>
            <div className="sales-hero__actions hero-entrance">
              <a className="button button--gold" href="#inside-course">Preview the course <ArrowDown size={17} aria-hidden="true" /></a>
              <a className="button button--outline" href={course.whatsapp} target="_blank" rel="noreferrer">Join the launch list <ArrowUpRight size={17} aria-hidden="true" /></a>
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

      <section className="credibility-strip" aria-label="Instructor credentials">
        <div className="shell credibility-strip__grid">
          <div><span>Role</span><strong>{brand.role}</strong></div><div><span>Company</span><strong>Hundred Yards</strong></div><div><span>Experience</span><strong>Over a decade</strong></div><div><span>Based in</span><strong>Bengaluru</strong></div>
        </div>
      </section>

      <section className="section course-overview">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">What you will learn</p><h2>A practical foundation for real property conversations.</h2></div><p>The course starts with the essentials, then connects the vocabulary you hear across projects, site visits and sales discussions.</p></div>
          <div className="module-grid">{courseModules.map((module) => <article className="module reveal" key={module.number}><span>{module.number}</span><h3>{module.title}</h3><p>{module.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section course-preview" id="inside-course">
        <div className="shell">
          <div className="section-heading section-heading--light reveal"><div><p className="eyebrow">Inside the course</p><h2>See the actual material before launch.</h2></div><p>These are genuine pages from the supplied 49-slide training deck—not stock mockups or generated course claims.</p></div>
          <SlideGallery />
        </div>
      </section>

      <section className="section instructor" id="instructor">
        <div className="shell instructor__grid">
          <div className="instructor-portrait reveal"><div className="portrait-parallax"><Image src="/media/rohit-kumar-singh.jpg" alt="Rohit Kumar Singh, Managing Director of Hundred Yards Realtor Pvt Ltd" width={1764} height={2352} sizes="(max-width: 760px) 92vw, 42vw" /></div></div>
          <div className="instructor__copy reveal">
            <p className="eyebrow">Your instructor</p><h2>{brand.name}</h2><p className="instructor__role">{brand.role}, {brand.company}</p>
            <p>Rohit is an Electronics &amp; Communication engineering graduate with over a decade of experience in real estate. His work combines analytical thinking, market experience and a practical focus on making property decisions easier to understand.</p>
            <p>This academy translates that field experience into structured, visual learning for people entering or navigating the industry.</p>
            <div className="instructor__links"><a className="text-link" href="/about">Read Rohit&apos;s profile <ChevronRight size={16} aria-hidden="true" /></a><a className="text-link" href={brand.aboutUrl} target="_blank" rel="noreferrer">Official Hundred Yards profile <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </div>
      </section>

      <section className="section audience"><div className="shell audience__grid"><div className="reveal"><p className="eyebrow">Built for a clear start</p><h2>Useful whether you are entering the industry or facing it as a customer.</h2></div><ul className="audience__list">{audiences.map((audience) => <li className="reveal" key={audience}><Check size={20} aria-hidden="true" /><span>{audience}</span></li>)}</ul></div></section>

      <section className="section reviews" id="reviews">
        <div className="shell">
          <div className="section-heading reveal"><div><p className="eyebrow">Hundred Yards client feedback</p><h2>Credibility from real property conversations.</h2></div><p>These are paraphrased property-service reviews published by Hundred Yards. They are not course reviews, because this course has not launched yet.</p></div>
          <div className="review-grid">{clientFeedback.map((review) => <figure className="review reveal" key={review.name}><blockquote>“{review.quote}”</blockquote><figcaption>{review.name}<span>Hundred Yards client</span></figcaption></figure>)}</div>
          <a className="text-link reviews__source" href={brand.companyUrl} target="_blank" rel="noreferrer">View the published source at 100yards.in <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="section offer" id="early-access"><div className="shell offer__grid"><div className="offer__cover reveal"><Image src={course.cover} alt={`${course.title} visual training deck`} width={1600} height={900} sizes="(max-width: 760px) 92vw, 42vw" /></div><div className="offer__copy reveal"><p className="eyebrow">The first release</p><h2>{course.title}</h2><p>{course.description}</p><dl><div><dt>Material</dt><dd>49-slide visual deck</dd></div><div><dt>Level</dt><dd>Foundational</dd></div><div><dt>Price</dt><dd>To be announced</dd></div><div><dt>Status</dt><dd>Early access</dd></div></dl><a className="button button--gold" href={course.whatsapp} target="_blank" rel="noreferrer">Join early access on WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a><a className="offer__email" href={course.email}>Prefer email? Write to {brand.email}</a></div></div></section>

      <section className="section faq" id="faq"><div className="shell faq__grid"><div className="reveal"><p className="eyebrow">Before you join</p><h2>Straight answers about the launch.</h2><p>Payment, final access terms and launch pricing will be published before any order is accepted.</p></div><div className="faq__list">{faqs.map((faq) => <details className="reveal" key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>
    </main></>
  );
}
