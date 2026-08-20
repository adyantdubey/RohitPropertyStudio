import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { CourseCover } from "../../components/CourseCover";
import { SectionHeading } from "../../components/SectionHeading";
import { getProductBySlug, products } from "../../lib/content";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const coverVariant = {
  course: "system",
  pdf: "field",
  toolkit: "room",
} as const;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} — Rohit`,
      description: product.description,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${product.title} — Rohit`,
      description: product.description,
      images: [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main id="main-content" className="product-page">
      <section className={`product-hero product-hero-${product.kind}`}>
        <div className="product-hero-grid" aria-hidden="true" />
        <div className="product-hero-copy">
          <p className="eyebrow">{product.eyebrow} / PREVIEW EDITION</p>
          <h1>{product.title}</h1>
          {product.subtitle ? <h2>{product.subtitle}</h2> : null}
          <p>{product.tagline}</p>
          <div className="product-hero-meta">
            <span><small>FORMAT</small>{product.format}</span>
            <span><small>LEVEL</small>{product.level}</span>
            <span><small>ACCESS</small>{product.access.replace("Placeholder: ", "")}</span>
          </div>
        </div>

        <div className="product-cover-stage">
          <div className="product-cover-pages" aria-hidden="true"><span /><span /></div>
          <CourseCover
            variant={coverVariant[product.kind]}
            title={product.shortTitle}
            className="product-main-cover"
          />
          <span className="cover-measure">210 × 297 / DIGITAL EDITION</span>
        </div>

        <div className="product-buy-row">
          <div>
            <span>PREVIEW PRICE</span>
            <strong>{product.price.formatted}</strong>
          </div>
          <Link className="button button-light" href={`/checkout/${product.slug}`}>
            {product.primaryCta} <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
          <a className="product-scroll-link" href="#inside">
            See what’s inside <ArrowDown aria-hidden="true" size={15} />
          </a>
        </div>
      </section>

      <section className="product-positioning section-pad">
        <div>
          <p className="eyebrow">THE PURPOSE</p>
          <h2>{product.tagline}</h2>
        </div>
        <div>
          <p>{product.description}</p>
          <p className="product-disclaimer"><ShieldCheck aria-hidden="true" /> {product.disclaimer}</p>
        </div>
      </section>

      <section className="product-fit section-pad section-orange">
        <SectionHeading
          eyebrow="FIT / BEFORE YOU COMMIT"
          title={<>Know exactly who this<br /><em>was built for.</em></>}
        />
        <div className="fit-grid">
          <div>
            <h3>It is designed for</h3>
            {product.idealFor.map((item) => (
              <p key={item}><Check aria-hidden="true" size={16} />{item}</p>
            ))}
          </div>
          <div>
            <h3>It is not designed for</h3>
            {product.notFor.map((item) => (
              <p key={item}><span aria-hidden="true">×</span>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="inside-product section-pad" id="inside">
        <SectionHeading
          eyebrow="THE CONTENT / 001—006"
          title={<>A complete structure,<br /><em>not a content dump.</em></>}
          body="Each section moves from framing the question to recording a responsible next step."
        />
        <div className="curriculum-stack">
          {product.sections.map((section) => (
            <article key={section.number}>
              <span>{section.number}</span>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="product-includes section-pad section-ink">
        <div>
          <p className="eyebrow eyebrow-light">YOUR WORKING MATERIAL</p>
          <h2>Everything included,<br /><em>nothing disguised.</em></h2>
        </div>
        <div className="includes-grid">
          {product.includes.map((item, index) => (
            <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
          ))}
        </div>
      </section>

      <section className="purchase-bar">
        <div>
          <small>{product.kind.toUpperCase()} / ROHIT</small>
          <strong>{product.title}</strong>
        </div>
        <span>{product.price.formatted} <small>preview</small></span>
        <Link className="button button-blue" href={`/checkout/${product.slug}`}>
          Continue to checkout <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </section>
    </main>
  );
}
