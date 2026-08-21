"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, PanelsTopLeft, Presentation } from "lucide-react";
import { useMemo, useState } from "react";
import {
  products,
  type Product,
  type ProductKind,
} from "../lib/content";

export type CatalogProduct = Product;

type CatalogFilter = "all" | ProductKind;

type ReleaseCopy = {
  status: "Prepared / launch setup pending" | "Coming soon" | "In development";
  summary: string;
  availability: string;
  action: string;
  href: string;
};

const kindLabels: Record<ProductKind, string> = {
  deck: "Training deck",
  pdf: "Field guide",
  toolkit: "Toolkit",
};

const releaseCopy: Record<string, ReleaseCopy> = {
  "before-you-buy-field-guide": {
    status: "Coming soon",
    summary:
      "Rohitt is developing the first edition as a practical, general-education companion for the questions that deserve time before a property commitment.",
    availability:
      "There is no finished PDF or purchase gateway today. Release details will be shared only after the guide is complete and reviewed.",
    action: "Join the first-access list",
    href: "/contact?interest=field-guide#contact-form",
  },
  "basics-of-real-estate-training-deck": {
    status: "Prepared / launch setup pending",
    summary:
      "A real 49-slide PowerPoint resource carrying 100 Yards branding, covering real-estate foundations, property formats, construction, approvals, areas, charges, UDS, and payment-plan examples.",
    availability:
      "The training file exists. Pricing, buyer licence, payment, protected delivery, support, and refund terms are still being configured.",
    action: "View the prepared resource",
    href: "/courses/basics-of-real-estate-training-deck",
  },
  "deal-room-toolkit": {
    status: "In development",
    summary:
      "A supporting review toolkit is being explored. Its contents, format, licence, and release date have not been finalised.",
    availability: "No toolkit or download is available today.",
    action: "View development status",
    href: "/courses/deal-room-toolkit",
  },
};

const mediaByKind = {
  deck: {
    src: "/media/real-estate-training-deck-cover.png",
    alt: "Cover of the 100 Yards Basics of Real Estate training deck",
  },
  pdf: {
    src: "/media/interior-daylight.jpg",
    alt: "A sunlit residential interior with contrasting materials and plants",
  },
  toolkit: {
    src: "/media/facade-detail.jpg",
    alt: "Close editorial view of a geometric building facade in daylight",
  },
} as const satisfies Record<ProductKind, { src: string; alt: string }>;

type CourseCatalogProps = {
  items?: readonly CatalogProduct[];
  heading?: string;
};

export function CourseCatalog({
  items = products,
  heading = "One prepared resource. Two ideas still taking shape.",
}: CourseCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("all");
  const orderedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        const aRank = a.slug === "basics-of-real-estate-training-deck" ? 0 : 1;
        const bRank = b.slug === "basics-of-real-estate-training-deck" ? 0 : 1;
        return aRank - bRank;
      }),
    [items],
  );
  const filters = useMemo(
    () => [
      "all" as const,
      ...Array.from(new Set(orderedItems.map((item) => item.kind))),
    ],
    [orderedItems],
  );
  const visibleProducts = useMemo(
    () =>
      activeFilter === "all"
        ? orderedItems
        : orderedItems.filter((item) => item.kind === activeFilter),
    [activeFilter, orderedItems],
  );
  const isSingleResult = visibleProducts.length === 1;

  return (
    <section
      className="course-editorial-catalog authority-academy-catalog"
      aria-labelledby="course-catalog-title"
    >
      <header className="course-editorial-catalog-header authority-academy-catalog__header">
        <div>
          <p className="course-editorial-catalog-eyebrow">
            ACADEMY ROADMAP / CURRENT STATUS
          </p>
          <h2 id="course-catalog-title">{heading}</h2>
        </div>
        <div className="course-editorial-catalog-intro">
          <p className="course-editorial-catalog-summary">
            The 49-slide Basics of Real Estate deck is a prepared training
            resource. Before You Buy and The Deal Room remain future concepts.
            Purchase and protected download are not open yet.
          </p>
          <p className="course-editorial-stock-disclosure">
            The featured cover comes from the uploaded 100 Yards training deck.
            Remaining photography is licensed editorial stock, not product
            content, a Rohitt listing, or evidence of a client outcome.
          </p>
        </div>
      </header>

      <div className="course-editorial-catalog-toolbar authority-academy-catalog__toolbar">
        <div
          className="course-editorial-catalog-filters"
          role="group"
          aria-label="Filter planned Academy resources by format"
        >
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter}
              className={`course-editorial-filter${activeFilter === filter ? " is-active" : ""}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter === "all" ? "All planned resources" : kindLabels[filter]}
            </button>
          ))}
        </div>
        <p className="course-editorial-catalog-count" aria-live="polite">
          Showing {visibleProducts.length} of {items.length}
        </p>
      </div>

      <div
        className={`course-editorial-card-grid authority-academy-catalog__grid${isSingleResult ? " course-editorial-card-grid--single" : ""}`}
      >
        {visibleProducts.map((product) => {
          const media = mediaByKind[product.kind];
          const release = releaseCopy[product.slug];
          const collectionIndex =
            orderedItems.findIndex((item) => item.slug === product.slug) + 1;
          const ProductIcon =
            product.kind === "deck"
              ? Presentation
              : product.kind === "pdf"
                ? FileText
                : PanelsTopLeft;

          return (
            <article
              className={`course-editorial-card authority-academy-card${product.slug === "basics-of-real-estate-training-deck" ? " course-editorial-card--featured authority-academy-card--flagship" : ""}${isSingleResult ? " course-editorial-card--single" : ""}`}
              key={product.slug}
            >
              <figure className="course-editorial-card-media">
                <Link
                  aria-label={`View the status of ${product.title}`}
                  className="course-editorial-card-image-link"
                  href={`/courses/${product.slug}`}
                >
                  <Image
                    alt={media.alt}
                    className="course-editorial-card-image"
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    src={media.src}
                  />
                </Link>
                <span className="course-editorial-card-coordinate">
                  R/{String(collectionIndex).padStart(2, "0")} · {kindLabels[product.kind]}
                </span>
                <span className="course-editorial-card-icon" aria-hidden="true">
                  <ProductIcon size={28} strokeWidth={1.25} />
                </span>
                <figcaption>
                  {product.kind === "deck"
                    ? "Cover preview from the uploaded 100 Yards training deck."
                    : "Editorial stock image. Not a product preview or property recommendation."}
                </figcaption>
              </figure>

              <div className="course-editorial-card-content">
                <div className="course-editorial-card-meta">
                  <span>{release.status}</span>
                  <span>{kindLabels[product.kind]}</span>
                </div>

                <h3>
                  <Link href={`/courses/${product.slug}`}>{product.title}</Link>
                </h3>
                {product.subtitle ? (
                  <p className="course-editorial-card-subtitle">{product.subtitle}</p>
                ) : null}
                <p className="course-editorial-card-description">{release.summary}</p>

                <div className="course-editorial-card-use authority-academy-card__availability">
                  <small>CURRENT STATUS</small>
                  <p>{release.availability}</p>
                </div>

                <Link className="course-editorial-card-link" href={release.href}>
                  {release.action}
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
