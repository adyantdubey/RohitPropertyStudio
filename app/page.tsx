import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { AmbientBackdrop } from "./components/AmbientBackdrop";
import { MarketContext } from "./components/MarketContext";
import { ClosingCta } from "./components/ClosingCta";
import { CurriculumRail } from "./components/CurriculumRail";
import { AreaVisualizer } from "./components/LearningTools";
import { EditorialReviews } from "./components/ReviewMarquee";
import { YouTubeRail } from "./components/lab/YouTubeRail";
import { SlideGallery } from "./components/SlideGallery";
import { StatRail } from "./components/StatRail";
import {
  academyResources,
  audiences,
  brand,
  course,
  courseBoundaries,
  courseSlides,
  faqs,
  learningOutcomes,
  media,
} from "./lib/siteContent";

export const metadata: Metadata = {
  title: course.title,
  description: course.description,
  alternates: { canonical: "/" },
};

const marketTicker = [
  "Hundred Yards Realtor Pvt Ltd",
  "Bengaluru",
  "Coimbatore",
  "Dubai",
  "Phuket",
  "Foundational visual course",
];

export default function HomePage() {
  const heroSlide = courseSlides[2];

  return (
    <main id="main-content">
      {/* ---------- act 1 · the hero ---------- */}
      <section className="hero" id="top">
        <AmbientBackdrop video={media.heroVideo} poster={media.heroPoster} />
        <div className="hero__portrait" aria-hidden="true">
          <Image src="/media/rohit-kumar-singh.jpg" alt="" width={1764} height={2352} priority sizes="42vw" />
        </div>

        <div className="shell hero__inner">
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="eyebrow" data-enter>{course.eyebrow}</p>
              <h1 data-enter>
                Learn the{" "}
                <span className="sketch-word">
                  language
                  <svg viewBox="0 0 100 10" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M2,7 C18,4 34,8 52,5.5 C70,3.5 86,7 98,4.5" />
                  </svg>
                </span>{" "}
                of property before you sell, advise or invest.
              </h1>
              <p className="hero__lede" data-enter>
                A 49-slide visual foundation by {brand.name}, {brand.role} of {brand.company}.
              </p>
              <div className="hero__actions" data-enter>
                <a className="button button--gold" href="/course">
                  Explore the complete course <ArrowDown size={16} aria-hidden="true" />
                </a>
                <a className="button button--outline" href="/contact#early-access-form" data-track="early_access_cta">
                  Join early access <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <p className="hero__status" data-enter>
                <i aria-hidden="true" /> {course.status} · No payment collected
              </p>
            </div>

            <figure className="hero__deck" data-enter>
              <span className="frame frame--zoom">
                <Image src={heroSlide.src} alt={heroSlide.alt} width={1600} height={900} sizes="30vw" />
              </span>
              <figcaption>
                <strong>{course.title}</strong>
                <span className="annot">slide 31 of the actual deck — not a mockup</span>
              </figcaption>
            </figure>
          </div>

          <a className="scroll-cue" href="#why" data-enter>
            Scroll <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="hero__foot">
          <StatRail bare />
        </div>
      </section>

      {/* ---------- act 2 · where the credibility comes from ---------- */}
      <div className="ticker surface-dark" aria-hidden="true">
        <div className="ticker__track">
          {[...marketTicker, ...marketTicker].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>

      {/* ---------- act 3 · the problem, stated ---------- */}
      <section className="section surface-dark" id="why">
        <div className="shell">
          <div className="statement__grid">
            <p className="statement__text" data-scrub-words>
              Property becomes easier to discuss when the words stop competing.
            </p>
            <p className="statement__aside annot">
              — why the course starts with vocabulary, before any project, legal or investment talk
            </p>
          </div>

          <div className="grid grid--4">
            {learningOutcomes.map((outcome) => (
              <article className="card" key={outcome.number}>
                <h3>{outcome.title}</h3>
                <p className="card__body">{outcome.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- act 4 · the signature move ---------- */}
      <CurriculumRail />

      {/* ---------- act 5 · the real material ---------- */}
      <section className="section surface-deep" id="inside-course">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Inside the course</p>
              <h2 data-split>See the actual material before launch.</h2>
            </div>
            <p className="head__note" data-reveal>
              Genuine pages from the supplied 49-slide training deck — not stock mockups or generated
              course claims. Open any slide to inspect it full size.
            </p>
          </div>
          <SlideGallery />
        </div>
      </section>

      {/* ---------- act 6 · the teaching method ---------- */}
      <section className="section surface-dark">
        <div className="shell method__grid">
          <div className="frame frame--corner">
            <Image src="/course/area-terminology.png" alt="Course lesson showing area terminology" width={1600} height={900} sizes="(max-width: 1000px) 92vw, 46vw" />
          </div>
          <div className="method__copy">
            <p className="eyebrow">The teaching method</p>
            <h2>How the slides teach: picture first, term second.</h2>
            <p>
              Visual explanations separate terms that are usually heard together. The aim is not to turn
              one slide into transaction advice; it is to give the learner a clearer place to begin
              asking questions.
            </p>
            <p className="annot">slide 31 of 49, exactly as learners receive it</p>
            <a className="text-link" href="/resources#area-visualizer">
              Try the area visualizer <ChevronRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- act 7 · the interactive lesson ---------- */}
      <section className="section surface-light" id="area-lesson">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Interactive lesson</p>
              <h2>Try a lesson: the same flat, three sizes on paper.</h2>
            </div>
            <p className="head__note" data-reveal>
              Move the sliders and watch a broader quoted area grow around exactly the same carpet area.
            </p>
          </div>
          <div data-reveal><AreaVisualizer /></div>
        </div>
      </section>

      {/* ---------- act 8 · the instructor ---------- */}
      <section className="section surface-dark" id="instructor">
        <div className="shell instructor__grid">
          <div className="instructor__portrait" data-clip>
            <div data-parallax="4">
              <Image src="/media/rohit-kumar-singh.jpg" alt={`${brand.name}, ${brand.role} of ${brand.company}`} width={1764} height={2352} sizes="(max-width: 1000px) 92vw, 36vw" />
            </div>
          </div>
          <div className="instructor__copy">
            <p className="eyebrow">Your instructor</p>
            <h2 data-split>{brand.name}</h2>
            <p className="instructor__role">{brand.role} · {brand.company}</p>
            <p className="instructor__quote">
              “Most people are not confused by property. They are confused by the words used around it.”
            </p>
            <p>
              Rohitt is an Electronics &amp; Communication engineering graduate with over a decade of
              experience in real estate. His work combines analytical thinking, market experience and a
              practical focus on making property decisions easier to understand.
            </p>
            <div className="instructor__links">
              <a className="text-link" href="/about">Read Rohitt&apos;s profile <ChevronRight size={15} aria-hidden="true" /></a>
              <a className="text-link" href={brand.youtube} target="_blank" rel="noreferrer" data-track="youtube_clicked">
                Watch Rohitt on YouTube <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a className="text-link" href={brand.aboutUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
                Official Hundred Yards profile <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- act 8b · market context ---------- */}
      <MarketContext />

      {/* ---------- act 9a · proof ---------- */}
      <section className="section surface-deep" id="reviews">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <h2>What Hundred Yards clients say</h2>
            </div>
            <p className="head__note">
              Paraphrased property-service reviews published by Hundred Yards — not course reviews,
              because the course has not launched yet.
            </p>
          </div>
          <EditorialReviews />
        </div>
        <div className="shell section-foot">
          <a className="text-link" href={brand.companyUrl} target="_blank" rel="noreferrer" data-track="hundred_yards_clicked">
            View the published source <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ---------- act 9a+ · watch ---------- */}
      <section className="section section--tight surface-dark" id="watch">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">From the field</p>
              <h2>The same lessons, walking through real projects.</h2>
            </div>
            <p className="head__note">
              Property tours, area deep dives and market answers on Rohitt&apos;s channel.
            </p>
          </div>
          <YouTubeRail limit={3} />
        </div>
      </section>

      {/* ---------- act 9b · who it is for ---------- */}
      <section className="section surface-dark">
        <div className="shell audience__grid">
          <div className="head__main">
            <h2>Who this is for</h2>
            <p className="head__note">Useful whether you are entering the industry or facing it as a customer.</p>
          </div>
          <ul className="checklist">
            {audiences.map((audience) => (
              <li key={audience}><Check size={19} aria-hidden="true" /><span>{audience}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- act 9c · resources ---------- */}
      <section className="section surface-dark">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <h2>Free tools while you wait</h2>
            </div>
            <p className="head__note">
              Built from the same curriculum — every tool points back to a real learning objective.
            </p>
          </div>
          <div className="grid grid--4">
            <a className="card card--link" href="/lab">
              <span className="card__index">Simulators</span>
              <h3>Property Lab</h3>
              <p className="card__body">One live simulator for the whole money story of a home, an AI deal decoder and a ten-question property quiz.</p>
              <span className="card__cta">Enter the Lab <ArrowUpRight size={14} aria-hidden="true" /></span>
            </a>
            <a className="card card--link" href="/resources#ask">
              <span className="card__index">AI guide</span>
              <h3>Ask the Academy</h3>
              <p className="card__body">Put any property term to an AI guide trained on the course vocabulary. It explains; it never advises on a project or price.</p>
              <span className="card__cta">Ask a question <ArrowUpRight size={14} aria-hidden="true" /></span>
            </a>
            {academyResources.slice(0, 2).map((resource) => (
              <a className="card card--link" href={resource.href} key={resource.number}>
                <span className="card__index">{resource.type}</span>
                <h3>{resource.title}</h3>
                <p className="card__body">{resource.description}</p>
                <span className="card__cta">Open resource <ArrowUpRight size={14} aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- act 9d · the offer ---------- */}
      <section className="section surface-deep" id="early-access">
        <div className="shell offer__grid">
          <div className="frame frame--corner" data-clip>
            <Image src="/brand/cover.png" alt={`${course.title} visual training deck`} width={1600} height={900} sizes="(max-width: 1000px) 92vw, 38vw" />
          </div>
          <div className="offer__panel">
            <p className="eyebrow">The first release</p>
            <h2 data-split>{course.title}</h2>
            <p className="offer__lede">{course.description}</p>
            <dl className="offer__facts">
              <div><dt>Material</dt><dd>49-slide visual deck</dd></div>
              <div><dt>Level</dt><dd>{course.level}</dd></div>
              <div><dt>Price</dt><dd><em>To be announced</em></dd></div>
              <div><dt>Status</dt><dd>Early access — no payment collected</dd></div>
            </dl>
            <div className="hero__actions">
              <a className="button button--gold" href="/contact#early-access-form" data-track="early_access_cta">
                Join early access <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="button button--outline" href={course.whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp_clicked">
                Ask on WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- act 9e · boundaries ---------- */}
      <section className="section surface-dark">
        <div className="shell boundary__grid">
          <div data-reveal>
            <p className="eyebrow">Clear boundaries</p>
            <h2 data-split>Education should clarify what still needs verification.</h2>
          </div>
          <ul className="checklist">
            {courseBoundaries.map((boundary) => (
              <li key={boundary}><Check size={18} aria-hidden="true" /><span>{boundary}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- act 9f · questions ---------- */}
      <section className="section surface-dark" id="faq">
        <div className="shell faq__grid">
          <div className="faq__intro">
            <p className="eyebrow">Before you join</p>
            <h2>Straight answers about the launch.</h2>
            <p>Payment, final access terms and launch pricing will be published before any order is accepted.</p>
          </div>
          <div className="accordion">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
