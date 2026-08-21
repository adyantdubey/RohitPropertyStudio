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

type ReleaseStatus = "Launch list open" | "Coming soon" | "On the roadmap";

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
    kicker: "BUYER FIELD GUIDE / COMING SOON",
    description:
      "Before You Buy is being developed as a practical companion for property visits, project comparisons, document questions, and professional follow-ups before a commitment.",
    availability:
      "Join the first-access list and the Hundred Yards team will share the reviewed edition, price, access, and delivery details when they are ready.",
    knownToday: [
      "A field-ready structure for observations and open questions.",
      "Prompts for project, location, document, and professional-review conversations.",
      "A concise record you can return to after a site visit.",
    ],
    cta: "Join the first-access list",
    href: "/contact?interest=field-guide#contact-form",
  },
  "basics-of-real-estate-training-deck": {
    status: "Launch list open",
    kicker: "49-SLIDE FOUNDATION TRAINING",
    description:
      "Basics of Real Estate is a prepared 49-slide visual foundation carrying 100 Yards branding. It moves from industry and property fundamentals into construction, approvals, area language, common charges, UDS, and payment plans.",
    availability:
      "Preview what is inside and join the launch list. Reviewed pricing, licence, protected delivery, support, and refund terms will be shared before access opens.",
    knownToday: [
      "49 visual training slides across two structured parts.",
      "Property categories, home formats, Vaastu basics, amenities, development, and construction.",
      "Approvals, area terminology, common charges, UDS, and payment-plan examples.",
    ],
    cta: "Join the launch list",
    href: "/contact?interest=training-deck#contact-form",
  },
  "deal-room-toolkit": {
    status: "On the roadmap",
    kicker: "PLANNED PROPERTY REVIEW TOOLKIT",
    description:
      "The Deal Room is a planned working toolkit for keeping property comparisons, documents, assumptions, risks, and professional follow-ups organised.",
    availability:
      "Follow the Academy roadmap and ask the team to notify you when the format and release plan are confirmed.",
    knownToday: [
      "A consistent comparison workspace for multiple properties.",
      "Document, assumption, and risk tracking in one place.",
      "A concise decision memo for the questions that remain open.",
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
            <p className="product-editorial-hero__tagline">{release.description}</p>
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
          <span><small>ACCESS</small>{isTrainingDeck ? "Join launch list" : "Coming soon"}</span>
          <span><small>PAYMENT</small>Not live yet</span>
        </div>
      </section>

      <section
        className="product-editorial-purpose authority-academy-detail__status"
        id="status"
      >
        <div className="product-editorial-purpose__lead">
          <p className="cin-kicker">THE RESOURCE / WHAT TO EXPECT</p>
          <h2>
            {isTrainingDeck
              ? "A practical foundation in the language of real estate."
              : isFieldGuide
                ? "A field companion for the questions that matter."
                : "A working system for property comparison."}
          </h2>
        </div>
        <div className="product-editorial-purpose__body">
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
          <p className="cin-kicker">INSIDE / AT A GLANCE</p>
          <h2>
            Useful structure.
            <br />
            <em>Clear launch expectations.</em>
          </h2>
        </header>
        <div className="product-editorial-fit__grid">
          <article>
            <span>01 / WHAT YOU&apos;LL FIND</span>
            {release.knownToday.map((item) => (
              <p key={item}><Check aria-hidden="true" size={16} />{item}</p>
            ))}
          </article>
          <article>
            <span>02 / LAUNCH NOTE</span>
            <p><i aria-hidden="true">—</i>Checkout and payment are not live yet</p>
            <p><i aria-hidden="true">—</i>No payment details are collected on this site</p>
            <p>
              <i aria-hidden="true">—</i>
              {isTrainingDeck
                ? "Price, licence, delivery, support, and refund terms will be shared before launch"
                : "Final format, access, and release details will be announced when confirmed"}
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
              ? "Join the list for reviewed launch access and pricing."
              : isFieldGuide
              ? "Join the list for the first reviewed edition."
              : "Follow the Academy roadmap and future release plan."}
          </p>
        </div>
        <Link className="cin-button cin-button-dark" href={release.href}>
          {release.cta} <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </main>
  );
}
