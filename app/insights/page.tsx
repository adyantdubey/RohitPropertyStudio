import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { CinematicMedia } from "../components/CinematicMedia";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { insights } from "../lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Editorial drafts from Rohit's decision room on property questions, due diligence, comparison, and learning.",
};

const featuredInsight = insights.find(
  (insight) => insight.slug === "your-shortlist-is-a-hypothesis",
) ?? insights[0];

export default function InsightsPage() {
  return (
    <main id="main-content" className="page-shell insight-editorial-index">
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
        body="Five complete editorial drafts explore observation, comparison, diligence, price context, and shortlisting. Each remains clearly marked for Rohit's factual review before publication."
        theme="orange"
        aside={<span>READ / QUESTION / VERIFY</span>}
      />

      <section className="featured-note insight-editorial-feature section-pad">
        <figure className="insight-editorial-feature-media">
          <Image
            alt={featuredInsight.hero.alt}
            height={featuredInsight.hero.height}
            priority
            sizes="(max-width: 900px) 100vw, 54vw"
            src={featuredInsight.hero.src}
            width={featuredInsight.hero.width}
          />
          <figcaption>{featuredInsight.hero.caption}</figcaption>
        </figure>

        <article className="insight-editorial-feature-copy">
          <div className="insight-editorial-article-meta">
            <span>{featuredInsight.category}</span>
            <span><Clock3 aria-hidden="true" size={14} /> {featuredInsight.readTime}</span>
          </div>
          <p className="eyebrow">FEATURED FIELD NOTE / {featuredInsight.index}</p>
          <h2>{featuredInsight.title}</h2>
          <p>{featuredInsight.deck}</p>
          <span className="draft-chip">{featuredInsight.reviewLabel}</span>
          <Link className="text-link" href={`/insights/${featuredInsight.slug}`}>
            Read the editorial draft <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </article>
      </section>

      <section className="insight-index insight-editorial-library section-pad section-ink">
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
          body="These are substantive placeholder articles, not published claims. Images are editorial stock and every draft needs Rohit's review."
        />

        <div className="insight-editorial-card-grid">
          {insights.map((insight) => (
            <article className="insight-editorial-card" key={insight.slug}>
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
                <small>{insight.reviewLabel}</small>
                <Link className="insight-editorial-card-link" href={`/insights/${insight.slug}`}>
                  Read draft <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="insight-editorial-method section-pad">
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
            Editorial stock footage—not a Rohit listing, project,
            recommendation, or learner property.
          </figcaption>
        </figure>
        <div className="insight-editorial-method-copy">
          <p className="eyebrow">THE EDITORIAL METHOD</p>
          <h2>Observe first. Interpret carefully.</h2>
          <p>
            Every field note is designed to separate an observation from a
            claim, an assumption from evidence, and a general learning prompt
            from property-specific advice. Final articles should add Rohit&apos;s
            reviewed examples and cite reliable sources wherever factual or
            jurisdiction-sensitive information appears.
          </p>
        </div>
      </section>

      <section className="newsletter insight-editorial-newsletter section-pad section-blue">
        <div>
          <p className="eyebrow eyebrow-light">THE FIELD NOTE / PREVIEW</p>
          <h2>
            One useful question
            <br />
            <em>at a time.</em>
          </h2>
        </div>
        <div className="newsletter-form">
          <p>
            The newsletter name, cadence, provider, and sending address require
            Rohit&apos;s approval before this preview accepts subscriptions.
          </p>
          <form>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              disabled
              id="newsletter-email"
              placeholder="Subscriptions open after launch"
              type="email"
            />
            <button disabled type="button" aria-label="Newsletter signup unavailable in preview">
              <ArrowUpRight aria-hidden="true" />
            </button>
          </form>
          <small>Preview only. No email address is collected on this page.</small>
        </div>
      </section>
    </main>
  );
}
