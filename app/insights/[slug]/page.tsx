import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { getProductBySlug, insights } from "../../lib/content";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

function getInsightBySlug(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) return { title: "Insight not found" };

  return {
    title: insight.title,
    description: insight.summary,
    openGraph: {
      title: `${insight.title} — Rohit Editorial Draft`,
      description: insight.summary,
      images: [{ url: insight.hero.src, alt: insight.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${insight.title} — Rohit Editorial Draft`,
      description: insight.summary,
      images: [insight.hero.src],
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const relatedProduct = getProductBySlug(insight.relatedProductSlug);
  const currentIndex = insights.findIndex((item) => item.slug === insight.slug);
  const nextInsight = insights[(currentIndex + 1) % insights.length];

  return (
    <main id="main-content" className="page-shell insight-editorial-article-page">
      <PageHero
        index={`${insight.index} / FIELD NOTE`}
        eyebrow={`${insight.category.toUpperCase()} / EDITORIAL DRAFT`}
        title={<>{insight.title}</>}
        body={insight.deck}
        aside={<span>{insight.readTime.toUpperCase()} / ROHIT REVIEW REQUIRED</span>}
      />

      <article className="insight-editorial-article">
        <figure className="insight-editorial-article-hero section-pad">
          <Image
            alt={insight.hero.alt}
            height={insight.hero.height}
            priority
            sizes="100vw"
            src={insight.hero.src}
            width={insight.hero.width}
          />
          <figcaption>
            <span>{insight.hero.caption}</span>
            <strong>{insight.reviewLabel}</strong>
          </figcaption>
        </figure>

        <section className="insight-editorial-thesis section-pad section-orange">
          <p className="eyebrow">THE WORKING THESIS</p>
          <p>{insight.thesis}</p>
        </section>

        <div className="insight-editorial-body section-pad">
          <aside className="insight-editorial-article-rail">
            <span>FIELD NOTE / {insight.index}</span>
            <strong>{insight.category}</strong>
            <small>{insight.readTime}</small>
            <p>Placeholder article body. Factual review and Rohit&apos;s approved examples are still required.</p>
          </aside>

          <div className="insight-editorial-sections">
            {insight.sections.map((section, index) => (
              <section className="insight-editorial-section" key={section.heading}>
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.heading}</h2>
                </header>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.fieldNote ? (
                  <blockquote>
                    <span>FIELD NOTE</span>
                    {section.fieldNote}
                  </blockquote>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <section className="insight-editorial-takeaways section-pad section-ink">
          <div>
            <p className="eyebrow eyebrow-light">CARRY FORWARD</p>
            <h2>
              Three questions for
              <br />
              <em>the working record.</em>
            </h2>
          </div>
          <ol>
            {insight.carryForward.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="insight-editorial-disclaimer section-pad">
          <ShieldCheck aria-hidden="true" size={28} />
          <div>
            <p className="eyebrow">EDUCATIONAL BOUNDARY</p>
            <h2>A thinking prompt, not a property conclusion.</h2>
          </div>
          <p>
            This draft provides general educational material only. It does not
            assess a property or provide financial, investment, legal, tax,
            engineering, valuation, brokerage, or property-specific advice.
            Information, terminology, and professional requirements can vary by
            place and circumstance; verify relevant details independently.
          </p>
        </section>
      </article>

      {relatedProduct ? (
        <section className="insight-editorial-related section-pad section-blue">
          <div>
            <p className="eyebrow eyebrow-light">RELATED WORKING RESOURCE</p>
            <h2>{relatedProduct.title}</h2>
          </div>
          <div>
            <strong>{relatedProduct.collectionRole}</strong>
            <p>{relatedProduct.bestWhen}</p>
            <Link className="button button-light" href={`/courses/${relatedProduct.slug}`}>
              Explore the resource <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </section>
      ) : null}

      <nav className="insight-editorial-navigation section-pad" aria-label="Article navigation">
        <Link className="text-link" href="/insights">
          <ArrowLeft aria-hidden="true" size={15} /> All field notes
        </Link>
        <Link className="text-link" href={`/insights/${nextInsight.slug}`}>
          Next: {nextInsight.title} <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </nav>
    </main>
  );
}
