import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { CinematicMedia } from "../../components/CinematicMedia";
import { CourseCover } from "../../components/CourseCover";
import { getProductBySlug, products, type ProductKind } from "../../lib/content";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const coverVariant = {
  course: "system",
  pdf: "field",
  toolkit: "room",
} as const;

const productMedia: Record<
  ProductKind,
  {
    poster: string;
    mobilePoster?: string;
    videoSrc?: string;
    mobileVideoSrc?: string;
    alt: string;
    width: number;
    height: number;
    objectPosition?: string;
    caption: string;
  }
> = {
  course: {
    poster: "/media/interior-walkthrough-poster.jpg",
    mobilePoster: "/media/interior-walkthrough-poster-mobile.jpg",
    videoSrc: "/media/interior-walkthrough.mp4",
    mobileVideoSrc: "/media/interior-walkthrough-mobile.mp4",
    alt: "A composed residential interior in warm daylight",
    width: 1800,
    height: 2700,
    objectPosition: "50% 58%",
    caption: "Temporary editorial stock media. It is not a Rohit project or listing.",
  },
  pdf: {
    poster: "/media/blueprint-process-poster.jpg",
    mobilePoster: "/media/blueprint-process-poster-mobile.jpg",
    videoSrc: "/media/blueprint-process.mp4",
    mobileVideoSrc: "/media/blueprint-process-mobile.mp4",
    alt: "Hands reviewing an architectural drawing at a work table",
    width: 2048,
    height: 3072,
    objectPosition: "50% 50%",
    caption: "Temporary editorial stock media. The plans are illustrative only.",
  },
  toolkit: {
    poster: "/media/facade-detail.jpg",
    alt: "Geometric facade detail in warm afternoon light",
    width: 1800,
    height: 1170,
    objectPosition: "54% 50%",
    caption: "Temporary editorial stock media. It does not depict a Rohit project.",
  },
};

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

  const media = productMedia[product.kind];

  return (
    <main id="main-content" className={`product-editorial product-editorial--${product.kind}`}>
      <section className="product-editorial-hero">
        <div className="product-editorial-hero__copy">
          <div className="product-editorial-hero__index">
            <span>RESOURCE / {product.kind.toUpperCase()}</span>
            <span>PREVIEW EDITION</span>
          </div>

          <div className="product-editorial-hero__title">
            <p className="cin-kicker">{product.eyebrow}</p>
            <h1>{product.title}</h1>
            {"subtitle" in product && product.subtitle ? (
              <p className="product-editorial-hero__subtitle">{product.subtitle}</p>
            ) : null}
            <p className="product-editorial-hero__tagline">{product.tagline}</p>
          </div>

          <div className="product-editorial-hero__action">
            <Link className="cin-button cin-button-light" href={`/checkout/${product.slug}`}>
              {product.primaryCta} <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <p>
              <span>Preview price</span>
              <strong>{product.price.formatted}</strong>
            </p>
          </div>

          <a className="product-editorial-hero__scroll" href="#purpose">
            Explore the resource <ArrowDown aria-hidden="true" size={15} />
          </a>
        </div>

        <figure className="product-editorial-hero__media">
          <CinematicMedia
            poster={media.poster}
            mobilePoster={media.mobilePoster}
            videoSrc={media.videoSrc}
            mobileVideoSrc={media.mobileVideoSrc}
            alt={media.alt}
            width={media.width}
            height={media.height}
            objectPosition={media.objectPosition}
            priority
            parallax={8}
            controlLabel={`${product.title} editorial video`}
          />
          <div className="product-editorial-hero__cover">
            <CourseCover
              variant={coverVariant[product.kind]}
              title={product.shortTitle}
              className="product-editorial-cover"
            />
          </div>
          <figcaption>{media.caption}</figcaption>
        </figure>

        <div className="product-editorial-hero__facts" aria-label="Resource details">
          <span><small>FORMAT</small>{product.format}</span>
          <span><small>LEVEL</small>{product.level}</span>
          <span><small>ACCESS</small>{product.access.replace("Placeholder: ", "")}</span>
        </div>
      </section>

      <section className="product-editorial-purpose" id="purpose">
        <div className="product-editorial-purpose__lead">
          <p className="cin-kicker">THE ROLE / {product.collectionRole}</p>
          <h2>{product.tagline}</h2>
        </div>
        <div className="product-editorial-purpose__body">
          <p>{product.description}</p>
          <dl>
            <div>
              <dt>Best when</dt>
              <dd>{product.bestWhen}</dd>
            </div>
            <div>
              <dt>You leave with</dt>
              <dd>{product.tangibleOutcome}</dd>
            </div>
          </dl>
          <p className="product-editorial-disclaimer">
            <ShieldCheck aria-hidden="true" size={18} />
            <span>{product.disclaimer}</span>
          </p>
        </div>
      </section>

      <section className="product-editorial-fit">
        <header>
          <p className="cin-kicker">FIT / BEFORE YOU COMMIT</p>
          <h2>Built for a clear moment.<br /><em>Not every promise.</em></h2>
        </header>
        <div className="product-editorial-fit__grid">
          <article>
            <span>01 / DESIGNED FOR</span>
            {product.idealFor.map((item) => (
              <p key={item}><Check aria-hidden="true" size={16} />{item}</p>
            ))}
          </article>
          <article>
            <span>02 / NOT DESIGNED FOR</span>
            {product.notFor.map((item) => (
              <p key={item}><i aria-hidden="true">×</i>{item}</p>
            ))}
          </article>
        </div>
      </section>

      <section className="product-editorial-inside" id="inside">
        <div className="product-editorial-inside__intro">
          <div>
            <p className="cin-kicker">THE CONTENT / 001—006</p>
            <h2>A complete structure,<br /><em>not a content dump.</em></h2>
          </div>
          <p>Every section moves from framing the question to recording a responsible next step.</p>
        </div>

        <div className="product-editorial-inside__layout">
          <figure className="product-editorial-inside__visual">
            <CinematicMedia
              poster={product.kind === "toolkit" ? "/media/interior-soft.jpg" : "/media/blueprint-hands.jpg"}
              alt="Editorial view of the thinking and documentation behind a property decision"
              width={product.kind === "toolkit" ? 1200 : 2048}
              height={product.kind === "toolkit" ? 800 : 3072}
              sizes="(max-width: 900px) 100vw, 40vw"
              objectPosition="50% 52%"
              parallax={5}
              showPauseControl={false}
            />
            <figcaption>Editorial stock image / illustrative process</figcaption>
          </figure>

          <ol className="product-editorial-curriculum">
            {product.sections.map((section) => (
              <li key={section.number}>
                <span>{section.number}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="product-editorial-includes">
        <div className="product-editorial-includes__heading">
          <p className="cin-kicker">YOUR WORKING MATERIAL</p>
          <h2>What arrives<br /><em>with the resource.</em></h2>
        </div>
        <div className="product-editorial-includes__grid">
          {product.includes.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="product-editorial-purchase">
        <div>
          <small>{product.kind.toUpperCase()} / ROHIT</small>
          <h2>{product.title}</h2>
          <p>{product.price.formatted} <span>preview price</span></p>
        </div>
        <Link className="cin-button cin-button-dark" href={`/checkout/${product.slug}`}>
          Continue to checkout <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
