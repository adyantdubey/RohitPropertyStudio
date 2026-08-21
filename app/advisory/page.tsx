import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { brand } from "../lib/brand";

export const metadata: Metadata = {
  title: "Property Advisory with Hundred Yards",
  description: `Start a property conversation with ${brand.name} and ${brand.organizationName} for buyer representation, seller representation, investment consultation, or market analysis in Bengaluru.`,
};

const advisoryRoutes = [
  {
    number: "01",
    title: "Buyer representation",
    copy: "Bring the purpose, preferred locations, property type, budget frame, and timing so the Hundred Yards team can understand the requirement before discussing options.",
  },
  {
    number: "02",
    title: "Seller representation",
    copy: "Begin with the property context, ownership and documentation status, intended timeline, and the support required for a responsible sales conversation.",
  },
  {
    number: "03",
    title: "Investment consultation",
    copy: "Frame the objective, time horizon, constraints, and risk questions before evaluating residential, plotted, commercial, or other investment opportunities.",
  },
  {
    number: "04",
    title: "Market analysis",
    copy: "Request context around a location or property segment while keeping data sources, assumptions, timing, and the limits of any comparison visible.",
  },
] as const;

const audiences = [
  "Homebuyers looking for a structured place to begin",
  "Investors comparing property categories or locations",
  "NRIs who need a Bengaluru-based coordination path",
  "Sellers who want to discuss representation and next steps",
  "Businesses exploring commercial or investment opportunities",
] as const;

const firstConversation = [
  {
    number: "01",
    title: "Your requirement",
    copy: "What you are trying to buy, sell, compare, or understand—and why the timing matters now.",
  },
  {
    number: "02",
    title: "The decision frame",
    copy: "Location, property category, use case, budget context, time horizon, and non-negotiables.",
  },
  {
    number: "03",
    title: "The support route",
    copy: "Whether the next useful step is a team conversation, market context, a property shortlist, or independent professional review.",
  },
] as const;

export default function AdvisoryPage() {
  return (
    <main id="main-content" className="page-shell course-editorial-page authority-advisory">
      <PageHero
        index="02 / ADVISORY"
        eyebrow={`${brand.organizationName.toUpperCase()} / BENGALURU`}
        title={
          <>
            Bring the brief.
            <br />
            <em>Build the right route.</em>
          </>
        }
        body={`${brand.name}, ${brand.professionalTitle}, opens the door to a Hundred Yards-backed property conversation for buyers, sellers, investors, NRIs, and businesses.`}
        aside={<span>BUY / SELL / INVEST / ANALYSE</span>}
        theme="blue"
        media={{
          poster: "/media/interior-walkthrough-poster.jpg",
          mobilePoster: "/media/interior-walkthrough-poster-mobile.jpg",
          videoSrc: "/media/interior-walkthrough.mp4",
          mobileVideoSrc: "/media/interior-walkthrough-mobile.mp4",
          alt: "Slow view through a contemporary residential interior",
          width: 1800,
          height: 1200,
          sizes: "(max-width: 860px) 100vw, 58vw",
          objectPosition: "50% 58%",
          parallax: 6,
        }}
      />

      <section className="course-editorial-opener section-pad authority-advisory-intro">
        <figure className="course-editorial-opener-media">
          <CinematicMedia
            poster="/media/hero-aerial-poster.jpg"
            mobilePoster="/media/hero-aerial-poster-mobile.jpg"
            alt="Aerial view of contemporary residential architecture"
            width={1800}
            height={1013}
            sizes="(max-width: 800px) 100vw, 52vw"
            parallax={6}
            showPauseControl={false}
          />
          <figcaption>
            Temporary editorial architecture footage. It is not a Hundred Yards
            project, listing, recommendation, or evidence of a transaction.
          </figcaption>
        </figure>

        <article className="course-editorial-opener-copy authority-advisory-intro__copy">
          <p className="eyebrow">A CONSULTATION, NOT A PROMISE</p>
          <h2>
            Start with what you need,
            <br />
            <em>not what someone wants to sell.</em>
          </h2>
          <p>
            Hundred Yards publishes a service scope spanning buyer and seller
            representation, investment consultation, market analysis, and
            end-to-end support. The first conversation is designed to understand
            fit and route the requirement; it does not guarantee availability,
            appreciation, finance, legal clearance, or a transaction result.
          </p>
          <div className="authority-advisory-intro__actions">
            <Link className="button button-dark" href="/contact?type=property#contact-form">
              Share your requirement <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <a className="text-link" href="https://100yards.in/" rel="noreferrer" target="_blank">
              Visit Hundred Yards <ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
        </article>
      </section>

      <section className="course-editorial-roles section-pad section-orange authority-advisory-routes" aria-labelledby="advisory-routes-title">
        <header>
          <p className="eyebrow">PUBLISHED SERVICE SCOPE / 001—004</p>
          <h2 id="advisory-routes-title">Choose the conversation that matches the brief.</h2>
        </header>
        <ol className="course-editorial-role-grid authority-advisory-routes__grid">
          {advisoryRoutes.map((route) => (
            <li key={route.number}>
              <span>{route.number}</span>
              <small>HUNDRED YARDS / ADVISORY</small>
              <h3>{route.title}</h3>
              <p>{route.copy}</p>
              <Link href="/contact?type=property#contact-form">
                Start this route <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-editorial-process section-pad authority-advisory-audience">
        <div className="about-editorial-process-copy">
          <p className="eyebrow">WHO CAN BEGIN HERE</p>
          <h2>
            Different requirements.
            <br />
            <em>One clear intake.</em>
          </h2>
          <p>
            Hundred Yards’ published audience includes homebuyers, investors,
            NRIs, and businesses across residential, plotted, commercial, and
            investment opportunities.
          </p>
          <ul className="about-editorial-process-list">
            {audiences.map((audience) => (
              <li key={audience}><Check aria-hidden="true" size={16} /> {audience}</li>
            ))}
          </ul>
        </div>
        <figure className="about-editorial-process-media">
          <Image
            alt="Bright residential interior with natural light"
            height={2700}
            sizes="(max-width: 800px) 100vw, 50vw"
            src="/media/interior-daylight.jpg"
            width={1800}
          />
          <figcaption>
            Editorial stock image / illustrative atmosphere only / not a Hundred Yards listing.
          </figcaption>
        </figure>
      </section>

      <section className="results-standard results-editorial-standard section-pad section-ink authority-advisory-conversation">
        <SectionHeading
          light
          eyebrow="THE FIRST CONVERSATION / 001—003"
          title={
            <>
              Enough context to make
              <br />
              <em>the next step useful.</em>
            </>
          }
          body="The enquiry is an intake, not an engagement agreement. Scope, availability, team ownership, and any applicable commercial terms are confirmed separately."
        />
        <div className="results-editorial-case-grid authority-advisory-conversation__grid">
          {firstConversation.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="course-editorial-boundary section-pad authority-advisory-boundary">
        <ShieldCheck aria-hidden="true" size={30} />
        <div>
          <p className="eyebrow">PROFESSIONAL BOUNDARY</p>
          <h2>Advisory context is not a guaranteed outcome.</h2>
        </div>
        <div>
          <p>
            Property availability, price, documentation, financing, taxation,
            legal position, technical condition, returns, and suitability require
            current verification and, where appropriate, independent qualified
            advice. No page on this site promises appreciation or a transaction
            result.
          </p>
          <a className="text-link" href="https://100yards.in/about-us/" rel="noreferrer" target="_blank">
            Review the published company scope <ExternalLink aria-hidden="true" size={15} />
          </a>
        </div>
      </section>

      <section className="story-invite results-editorial-invite section-pad section-blue authority-advisory-cta">
        <div>
          <p className="eyebrow eyebrow-light">YOUR REQUIREMENT / BENGALURU</p>
          <h2>
            Give the conversation
            <br />
            <em>a useful starting point.</em>
          </h2>
        </div>
        <p>
          Share the property type, preferred location, purpose, timing, and the
          question you need help routing. Avoid sending confidential documents or
          payment details through an initial enquiry.
        </p>
        <Link className="button button-light" href="/contact?type=property#contact-form">
          Start a property enquiry <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
