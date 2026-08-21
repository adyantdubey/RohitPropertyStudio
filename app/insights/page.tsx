import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "../components/RouteCurtain";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { insights } from "../lib/content";

export const metadata: Metadata = {
  title: "Property Insights | Rohitt Kumar Singh",
  description:
    "Educational field notes from Rohitt Kumar Singh on property questions, due diligence, comparison, and decision discipline.",
};

const featuredInsight = insights.find(
  (insight) => insight.slug === "your-shortlist-is-a-hypothesis",
) ?? insights[0];

export default function InsightsPage() {
  return (
    <main
      id="main-content"
      className="page-shell insight-editorial-index authority-insights-page"
    >
      <PageHero
        index="04 / INSIGHTS"
        eyebrow="NOTES FROM THE DECISION ROOM"
        title={
          <>
            Look past the listing.
            <br />
            <em>Carry better questions.</em>
          </>
        }
        body="Educational field notes on observation, comparison, due diligence, price context, and shortlisting—written to improve the questions, not make the property decision for you."
        theme="orange"
        aside={<span>READ / QUESTION / VERIFY</span>}
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
          <p className="eyebrow">FEATURED FIELD NOTE / {featuredInsight.index}</p>
          <h2>{featuredInsight.title}</h2>
          <p>{featuredInsight.deck}</p>
          <span className="draft-chip authority-insights-label">
            General educational commentary
          </span>
          <Link className="text-link" href={`/insights/${featuredInsight.slug}`}>
            Read the field note <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </article>
      </section>

      <section className="insight-index insight-editorial-library authority-insights-library section-pad section-ink">
        <SectionHeading
          light
          eyebrow={`THE EDITORIAL INDEX / 001—00${insights.length}`}
          title={
            <>
              Questions worth
              <br />
              <em>carrying forward.</em>
            </>
          }
          body="Each note offers a decision discipline you can adapt, then asks you to verify facts, documents, professional requirements, and local rules for your own circumstances."
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
                <small>General education · verify for your circumstances</small>
                <Link className="insight-editorial-card-link" href={`/insights/${insight.slug}`}>
                  Read field note <ArrowUpRight aria-hidden="true" size={15} />
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
          <p className="eyebrow">THE EDITORIAL METHOD</p>
          <h2>Observe first. Interpret carefully.</h2>
          <p>
            Every field note is designed to separate an observation from a
            claim, an assumption from evidence, and a general learning prompt
            from property-specific advice. Factual and jurisdiction-sensitive
            points still need current, independent verification before they are
            used in a real decision.
          </p>
        </div>
      </section>

      <section className="newsletter insight-editorial-newsletter authority-insights-first-access section-pad section-blue">
        <div>
          <p className="eyebrow eyebrow-light">BEFORE YOU BUY / COMING SOON</p>
          <h2>
            Carry the questions
            <br />
            <em>into the next visit.</em>
          </h2>
        </div>
        <div className="newsletter-form authority-insights-first-access__copy">
          <p>
            Rohitt&apos;s first field guide is still being written. There is no PDF
            or checkout today; you can email the Hundred Yards team to ask for
            a first-access update.
          </p>
          <Link
            className="button button-light"
            href="/contact?interest=field-guide#contact-form"
          >
            Join the first-access list
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <small>The contact route prepares an email; this page collects no address.</small>
        </div>
      </section>
    </main>
  );
}
