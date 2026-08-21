import type { Metadata } from "next";
import { TransitionLink as Link } from "../../components/RouteCurtain";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { CinematicMedia } from "../../components/CinematicMedia";
import { CourseCover } from "../../components/CourseCover";
import { getProductBySlug, products, type ProductKind } from "../../lib/content";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

type ReleaseStatus = "Prepared / launch setup pending" | "Coming soon" | "In development";

type ReleaseDetails = {
  status: ReleaseStatus;
  kicker: string;
  description: string;
  availability: string;
  knownToday: readonly string[];
  cta: string;
  href: string;
};

const coverVariant = {
  deck: "system",
  pdf: "field",
  toolkit: "room",
} as const;

const releaseDetails: Record<string, ReleaseDetails> = {
  "before-you-buy-field-guide": {
    status: "Coming soon",
    kicker: "FIRST PLANNED ACADEMY RELEASE",
    description:
      "Rohitt is developing Before You Buy as a practical field guide for people who want to slow the decision down, ask better questions, and keep a clearer record before a property commitment.",
    availability:
      "The guide is still being written and reviewed. There is no finished PDF, download, price, delivery promise, or purchase gateway today.",
    knownToday: [
      "It is being developed as general property education.",
      "It will not approve a property or replace qualified professional advice.",
      "Its final contents, format, price, licence, and release date will be published only after confirmation.",
    ],
    cta: "Join the first-access list",
    href: "/contact?interest=field-guide#contact-form",
  },
  "basics-of-real-estate-training-deck": {
    status: "Prepared / launch setup pending",
    kicker: "UPLOADED 100 YARDS TRAINING RESOURCE",
    description:
      "Basics of Real Estate is a prepared 49-slide PowerPoint resource carrying 100 Yards branding. It moves from industry and property fundamentals into construction, approvals, area language, common charges, UDS, and payment-plan examples.",
    availability:
      "The source deck exists. A current-content review, price, buyer licence, payment, protected delivery, support, and refund terms must be completed before sales open.",
    knownToday: [
      "It is a 49-slide PowerPoint-format training resource.",
      "Its two parts cover real-estate basics, property formats, development, construction, approvals, areas, charges, UDS, and payment plans.",
      "It is general educational material carrying 100 Yards branding, not property-specific advice.",
    ],
    cta: "Ask about launch access",
    href: "/contact?interest=training-deck#contact-form",
  },
  "deal-room-toolkit": {
    status: "In development",
    kicker: "FUTURE SUPPORTING CONCEPT",
    description:
      "Rohitt is exploring a supporting toolkit for people who want to keep property questions, comparisons, and professional follow-ups more organised.",
    availability:
      "There is no finished toolkit, template pack, download, licence, price, or release date today.",
    knownToday: [
      "The concept is intended to support organisation, not make decisions for a buyer.",
      "Its contents and file formats are still being developed.",
      "No download or payment is available.",
    ],
    cta: "Ask about the Academy roadmap",
    href: "/contact?interest=academy#contact-form",
  },
};

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
  deck: {
    poster: "/media/real-estate-training-deck-cover.png",
    alt: "Cover of the 100 Yards Basics of Real Estate training deck",
    width: 1920,
    height: 1080,
    objectPosition: "50% 50%",
    caption: "Authentic cover preview from the uploaded 100 Yards training deck. The full file is not publicly exposed.",
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
    caption: "Licensed editorial stock media. It is not a page from the unfinished guide.",
  },
  toolkit: {
    poster: "/media/facade-detail.jpg",
    alt: "Geometric facade detail in warm afternoon light",
    width: 1800,
    height: 1170,
    objectPosition: "54% 50%",
    caption: "Licensed editorial stock media. It is not a toolkit screen or Rohitt project.",
  },
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const release = releaseDetails[slug];
  if (!product || !release) return {};

  return {
    title: `${product.title} — ${release.status}`,
    description: `${product.title} is ${release.status.toLowerCase()} in Rohitt Kumar Singh's Property Academy.`,
    openGraph: {
      title: `${product.title} — ${release.status}`,
      description: release.description,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${product.title} — ${release.status}`,
      description: release.description,
      images: [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const release = releaseDetails[slug];
  if (!product || !release) notFound();

  const media = productMedia[product.kind];
  const isFieldGuide = slug === "before-you-buy-field-guide";
  const isTrainingDeck = slug === "basics-of-real-estate-training-deck";

  return (
    <main
      id="main-content"
      className={`product-editorial product-editorial--${product.kind} authority-academy-detail`}
    >
      <section className="product-editorial-hero authority-academy-detail__hero">
        <div className="product-editorial-hero__copy">
          <div className="product-editorial-hero__index">
            <span>ROHITT PROPERTY ACADEMY</span>
            <span>{release.status.toUpperCase()}</span>
          </div>

          <div className="product-editorial-hero__title">
            <p className="cin-kicker">{release.kicker}</p>
            <h1>{product.title}</h1>
            {"subtitle" in product && product.subtitle ? (
              <p className="product-editorial-hero__subtitle">{product.subtitle}</p>
            ) : null}
            <p className="product-editorial-hero__tagline">
              {release.availability}
            </p>
          </div>

          <div className="product-editorial-hero__action authority-academy-detail__action">
            <Link className="cin-button cin-button-light" href={release.href}>
              {release.cta} <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <p>
              <span>Current status</span>
              <strong>{release.status}</strong>
            </p>
          </div>

          <a className="product-editorial-hero__scroll" href="#status">
            Read the current status <ArrowDown aria-hidden="true" size={15} />
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
          {!isTrainingDeck ? (
            <div className="product-editorial-hero__cover">
              <CourseCover
                variant={coverVariant[product.kind]}
                title={product.shortTitle}
                status={release.status}
                className="product-editorial-cover"
              />
            </div>
          ) : null}
          <figcaption>{media.caption}</figcaption>
        </figure>

        <div className="product-editorial-hero__facts" aria-label="Release status">
          <span><small>STATUS</small>{release.status}</span>
          <span><small>ACCESS</small>{isTrainingDeck ? "Launch setup pending" : "Not open"}</span>
          <span><small>PAYMENT</small>Not available</span>
        </div>
      </section>

      <section
        className="product-editorial-purpose authority-academy-detail__status"
        id="status"
      >
        <div className="product-editorial-purpose__lead">
          <p className="cin-kicker">CURRENT STATUS / HONESTLY STATED</p>
          <h2>
            {isTrainingDeck
              ? "The training resource exists. The storefront does not."
              : isFieldGuide
                ? "The first edition is taking shape."
                : "The concept is still taking shape."}
          </h2>
        </div>
        <div className="product-editorial-purpose__body">
          <p>{release.description}</p>
          <p>{release.availability}</p>
          <p className="product-editorial-disclaimer">
            <ShieldCheck aria-hidden="true" size={18} />
            <span>
              General educational material only. It will not replace financial,
              investment, legal, tax, technical, engineering, valuation, or
              property-specific advice.
            </span>
          </p>
        </div>
      </section>

      <section className="product-editorial-fit authority-academy-detail__known">
        <header>
          <p className="cin-kicker">WHAT IS CONFIRMED TODAY</p>
          <h2>
            A clear status.
            <br />
            <em>No invented offer.</em>
          </h2>
        </header>
        <div className="product-editorial-fit__grid">
          <article>
            <span>01 / KNOWN TODAY</span>
            {release.knownToday.map((item) => (
              <p key={item}><Check aria-hidden="true" size={16} />{item}</p>
            ))}
          </article>
          <article>
            <span>02 / NOT OPEN TODAY</span>
            <p><i aria-hidden="true">×</i>No checkout or payment collection</p>
            <p><i aria-hidden="true">×</i>No instant download or learner access</p>
            <p>
              <i aria-hidden="true">×</i>
              {isTrainingDeck
                ? "No published price, buyer licence, support, or refund terms"
                : "No promised curriculum, result, or release date"}
            </p>
          </article>
        </div>
      </section>

      <section className="product-editorial-purchase authority-academy-detail__closing">
        <div>
          <small>{release.status.toUpperCase()} / ROHITT PROPERTY ACADEMY</small>
          <h2>{product.title}</h2>
          <p>
            {isTrainingDeck
              ? "Ask to hear when reviewed launch access is ready."
              : isFieldGuide
              ? "Ask to hear when the first verified edition is ready."
              : "Ask the team about the Academy roadmap."}
          </p>
        </div>
        <Link className="cin-button cin-button-dark" href={release.href}>
          {release.cta} <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
