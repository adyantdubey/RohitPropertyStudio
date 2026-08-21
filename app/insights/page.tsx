import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { marketInsights as insights } from "../lib/marketInsights";

export const metadata: Metadata = {
  title: "Property Insights",
  description:
    "Bengaluru property insights from Rohitt Kumar Singh on locations, project comparison, site visits, NRI searches, and buyer costs.",
};

const featuredInsight = insights.find(
  (insight) => insight.slug === "north-bengaluru-property-guide",
) ?? insights[0];

export default function InsightsPage() {
  return (
    <main
      id="main-content"
      className="page-shell insight-editorial-index authority-insights-page"
    >
      <PageHero
        index="04 / INSIGHTS"
        eyebrow="BENGALURU PROPERTY INSIGHTS / BUYER EDUCATION"
        title={
          <>
            Bengaluru property.
            <br />
            <em>Explained clearly.</em>
          </>
        }
        body="Location guides, project comparisons, site-visit advice, NRI search guidance, and practical explanations for buyers exploring Bengaluru real estate."
        theme="ink"
        aside={<span>LOCATIONS / PROJECTS / BUYER GUIDES</span>}
      />

      <section className="featured-note insight-editorial-feature authority-insights-feature section-pad">
        <figure className="insight-editorial-feature-media">
          <Image
            alt={featuredInsight.hero.alt}
            height={featuredInsight.hero.height}
            priority
            sizes="(max-width: 900px) 100vw, 54vw"
            src={featuredInsight.hero.src}
            width={featuredInsight.hero.width}
          />
          <figcaption>
            Licensed editorial stock image. It is not a Rohitt listing, client
            property, or recommendation.
          </figcaption>
        </figure>

        <article className="insight-editorial-feature-copy">
          <div className="insight-editorial-article-meta">
            <span>{featuredInsight.category}</span>
            <span><Clock3 aria-hidden="true" size={14} /> {featuredInsight.readTime}</span>
          </div>
          <p className="eyebrow">FEATURED PROPERTY GUIDE / {featuredInsight.index}</p>
          <h2>{featuredInsight.title}</h2>
          <p>{featuredInsight.deck}</p>
          <span className="draft-chip authority-insights-label">
            Bengaluru property insight
          </span>
          <Link className="text-link" href={`/insights/${featuredInsight.slug}`}>
            Read the property guide <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </article>
      </section>

      <section className="insight-index insight-editorial-library authority-insights-library section-pad section-ink">
        <SectionHeading
          light
          eyebrow={`PROPERTY KNOWLEDGE / 001—00${insights.length}`}
          title={
            <>
              Useful reading for
              <br />
              <em>real property decisions.</em>
            </>
          }
          body="Explore the Bengaluru market through location context, project comparisons, buyer fundamentals, remote-search guidance, and field-ready advice."
        />

        <div className="insight-editorial-card-grid">
          {insights.map((insight) => (
            <article className="insight-editorial-card authority-insights-card" key={insight.slug}>
              <Link
                aria-label={`Read ${insight.title}`}
                className="insight-editorial-card-media"
                href={`/insights/${insight.slug}`}
              >
                <Image
                  alt={insight.hero.alt}
                  height={insight.hero.height}
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  src={insight.hero.src}
                  width={insight.hero.width}
                />
              </Link>
              <div className="insight-editorial-card-content">
                <div className="insight-editorial-article-meta">
                  <span>{insight.index} / {insight.category}</span>
                  <span>{insight.readTime}</span>
                </div>
                <h3>
                  <Link href={`/insights/${insight.slug}`}>{insight.title}</Link>
                </h3>
                <p>{insight.summary}</p>
                <small>Property education · current details require verification</small>
                <Link className="insight-editorial-card-link" href={`/insights/${insight.slug}`}>
                  Read insight <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="insight-editorial-method authority-insights-method section-pad">
        <figure className="insight-editorial-method-media">
          <CinematicMedia
            poster="/media/interior-walkthrough-poster.jpg"
            mobilePoster="/media/interior-walkthrough-poster-mobile.jpg"
            videoSrc="/media/interior-walkthrough.mp4"
            mobileVideoSrc="/media/interior-walkthrough-mobile.mp4"
            alt="A composed residential interior in soft natural light"
            width={1200}
            height={800}
            sizes="(max-width: 800px) 100vw, 50vw"
            parallax={5}
            controlLabel="editorial interior video"
          />
          <figcaption>
            Editorial stock footage—not a Rohitt listing, project,
            recommendation, or learner property.
          </figcaption>
        </figure>
        <div className="insight-editorial-method-copy">
          <p className="eyebrow">FROM THE FIELD TO THE PAGE</p>
          <h2>Market context made easier to use.</h2>
          <p>
            Rohitt&apos;s editorial work connects project visits, buyer questions,
            location conversations, and the practical concepts people need when
            they begin comparing property opportunities.
          </p>
        </div>
      </section>

      <section className="newsletter insight-editorial-newsletter authority-insights-first-access section-pad section-blue">
        <div>
          <p className="eyebrow eyebrow-light">BEFORE YOU BUY / FIRST ACCESS</p>
          <h2>
            Take a practical guide
            <br />
            <em>into your next site visit.</em>
          </h2>
        </div>
        <div className="newsletter-form authority-insights-first-access__copy">
          <p>
            The Before You Buy PDF is coming soon. Join the first-access list
            for the reviewed guide, launch details, and future Academy resources.
          </p>
          <Link
            className="button button-light"
            href="/contact?interest=field-guide#contact-form"
          >
            Join the first-access list
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <small>No payment is collected while the guide remains in development.</small>
        </div>
      </section>
    </main>
  );
}
