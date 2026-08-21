import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { brand } from "../lib/brand";
import { companyServices } from "../lib/companyContent";

export const metadata: Metadata = {
  title: "Property Advisory with Hundred Yards",
  description: `Start a property conversation with ${brand.name} and ${brand.organizationName} for buyer representation, seller representation, investment consultation, or market analysis in Bengaluru.`,
};

const advisoryRoutes = companyServices.map((service, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: service.title,
  copy: service.description,
  outcome: service.outcome,
}));

const audiences = [
  "First-time and experienced homebuyers",
  "Residential and plotted-property investors",
  "NRIs who need dependable local coordination",
  "Owners preparing to take a property to market",
  "Businesses exploring commercial opportunities",
] as const;

const firstConversation = [
  {
    number: "01",
    title: "Discover",
    copy: "Hundred Yards understands your goals, preferred locations, budget, timing, and non-negotiables.",
  },
  {
    number: "02",
    title: "Shortlist",
    copy: "The team curates relevant opportunities, coordinates visits, and helps you compare projects and locations.",
  },
  {
    number: "03",
    title: "Complete",
    copy: "Negotiation, finance, legal-verification, documentation, registration, and after-sales hand-offs are coordinated around the transaction.",
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
            Your property search,
            <br />
            <em>supported end to end.</em>
          </>
        }
        body={`Buy, sell, or invest with a Bengaluru-based Hundred Yards team led by ${brand.name}—with relevant options, market context, and practical transaction support.`}
        aside={<span>BUY / INVEST / SELL / NRI / COMMERCIAL</span>}
        theme="ink"
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
          <p className="eyebrow">PROPERTY ADVISORY / BENGALURU</p>
          <h2>
            More than a list of projects.
            <br />
            <em>A team through the journey.</em>
          </h2>
          <p>
            Hundred Yards supports homebuyers, investors, NRIs, sellers, and
            businesses across property discovery, shortlisting, project visits,
            comparisons, negotiation, documentation, and registration.
          </p>
          <div className="authority-advisory-intro__actions">
            <Link className="button button-dark" href="/contact?type=property#contact-form">
              Speak with the property team <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <a className="text-link" href="https://100yards.in/" rel="noreferrer" target="_blank">
              Visit Hundred Yards <ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
        </article>
      </section>

      <section className="course-editorial-roles section-pad section-orange authority-advisory-routes" aria-labelledby="advisory-routes-title">
        <header>
          <p className="eyebrow">HOW HUNDRED YARDS CAN HELP / 001—006</p>
          <h2 id="advisory-routes-title">Property support built around real needs.</h2>
        </header>
        <ol className="course-editorial-role-grid authority-advisory-routes__grid">
          {advisoryRoutes.map((route) => (
            <li key={route.number}>
              <span>{route.number}</span>
              <small>HUNDRED YARDS / ADVISORY</small>
              <h3>{route.title}</h3>
              <p>{route.copy}</p>
              <p><strong>{route.outcome}</strong></p>
              <Link href="/contact?type=property#contact-form">
                Enquire about this service <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-editorial-process section-pad authority-advisory-audience">
        <div className="about-editorial-process-copy">
          <p className="eyebrow">WHO WE WORK WITH</p>
          <h2>
            Different property goals.
            <br />
            <em>One connected team.</em>
          </h2>
          <p>
            From a first home in Bengaluru to an investment, remote purchase,
            commercial requirement, or property sale, the advisory starts with
            the outcome that matters to you.
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
          eyebrow="THE HUNDRED YARDS JOURNEY / 001—003"
          title={
            <>
              Discover. Shortlist.
              <br />
              <em>Complete with support.</em>
            </>
          }
          body="A simple service journey that keeps market search, property comparison, and transaction coordination connected."
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
          <p className="eyebrow eyebrow-light">PROPERTY CONSULTATION / BENGALURU</p>
          <h2>
            Tell us what you are
            <br />
            <em>looking for.</em>
          </h2>
        </div>
        <p>
          Share the property type, preferred location, budget range, and timing.
          The Hundred Yards team will respond with the most relevant next step.
        </p>
        <Link className="button button-light" href="/contact?type=property#contact-form">
          Book a property consultation <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
