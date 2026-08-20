"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText, PanelsTopLeft } from "lucide-react";
import { useMemo, useState } from "react";
import {
  products,
  type Product,
  type ProductKind,
} from "../lib/content";

export type CatalogProduct = Product;

type CatalogFilter = "all" | ProductKind;

const kindLabels: Record<ProductKind, string> = {
  course: "Course",
  pdf: "Field guide",
  toolkit: "Toolkit",
};

const kindActions: Record<ProductKind, string> = {
  course: "See the course",
  pdf: "Open the field guide",
  toolkit: "Explore the toolkit",
};

const mediaByKind = {
  course: {
    src: "/media/blueprint-hands.jpg",
    alt: "Hands reviewing architectural drawings on a working desk",
    caption:
      "Editorial stock image—not a course screenshot, learner artifact, or Rohit project.",
  },
  pdf: {
    src: "/media/interior-daylight.jpg",
    alt: "A sunlit residential interior with contrasting materials and plants",
    caption:
      "Editorial stock image—not a guide preview, Rohit listing, or learner property.",
  },
  toolkit: {
    src: "/media/facade-detail.jpg",
    alt: "Close editorial view of a geometric building facade in daylight",
    caption:
      "Editorial stock image—not a toolkit screen, Rohit project, or property recommendation.",
  },
} as const satisfies Record<
  ProductKind,
  { src: string; alt: string; caption: string }
>;

type CourseCatalogProps = {
  items?: readonly CatalogProduct[];
  heading?: string;
};

export function CourseCatalog({
  items = products,
  heading = "Choose the instrument that fits the work in front of you.",
}: CourseCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("all");
  const filters = useMemo(
    () => [
      "all" as const,
      ...Array.from(new Set(items.map((item) => item.kind))),
    ],
    [items],
  );
  const visibleProducts = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((item) => item.kind === activeFilter),
    [activeFilter, items],
  );

  return (
    <section
      className="course-catalog course-editorial-catalog"
      aria-labelledby="course-catalog-title"
    >
      <header className="course-catalog__header course-editorial-catalog-header">
        <div>
          <p className="course-catalog__eyebrow">THE LEARNING COLLECTION / 001—003</p>
          <h2 id="course-catalog-title">{heading}</h2>
        </div>
        <div className="course-editorial-catalog-intro">
          <p className="course-catalog__summary">
            Learn the complete decision structure, carry a focused question set
            into a review, or organise active comparisons in one working record.
            Each resource stands alone.
          </p>
          <p className="course-editorial-stock-disclosure">
            Collection photography is temporary editorial stock. It is not a
            product preview, learner result, Rohit project, listing, or
            recommendation.
          </p>
        </div>
      </header>

      <div className="course-catalog__toolbar course-editorial-catalog-toolbar">
        <div
          className="course-catalog__filters"
          role="group"
          aria-label="Filter learning resources by format"
        >
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter}
              className={`course-filter${activeFilter === filter ? " is-active" : ""}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter === "all" ? "All resources" : kindLabels[filter]}
            </button>
          ))}
        </div>
        <p className="course-catalog__count" aria-live="polite">
          Showing {visibleProducts.length} of {items.length}
        </p>
      </div>

      <div className="course-catalog__grid course-editorial-card-grid">
        {visibleProducts.map((product) => {
          const media = mediaByKind[product.kind];
          const collectionIndex = items.findIndex((item) => item.slug === product.slug) + 1;
          const ProductIcon =
            product.kind === "course"
              ? BookOpen
              : product.kind === "pdf"
                ? FileText
                : PanelsTopLeft;

          return (
            <article
              className={`course-card course-editorial-card${product.featured ? " course-card--featured" : ""}`}
              key={product.slug}
            >
              <figure className="course-card__visual course-editorial-card-media">
                <Link
                  aria-label={`Explore ${product.title}`}
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
                <span className="course-card__coordinate">
                  R/{String(collectionIndex).padStart(2, "0")} · {kindLabels[product.kind]}
                </span>
                <span className="course-editorial-card-icon" aria-hidden="true">
                  <ProductIcon size={28} strokeWidth={1.25} />
                </span>
                <figcaption>{media.caption}</figcaption>
                <span className="course-card__visual-line" aria-hidden="true" />
              </figure>

              <div className="course-card__content course-editorial-card-content">
                <div className="course-card__meta">
                  <span>{product.collectionRole}</span>
                  <span>{product.level}</span>
                </div>

                <h3>
                  <Link href={`/courses/${product.slug}`}>{product.title}</Link>
                </h3>
                {product.subtitle ? (
                  <p className="course-editorial-card-subtitle">{product.subtitle}</p>
                ) : null}
                <p className="course-card__description">{product.description}</p>

                <div className="course-editorial-card-use">
                  <small>BEST WHEN</small>
                  <p>{product.bestWhen}</p>
                </div>

                <div className="course-card__outcome course-editorial-card-output">
                  <small>WORKING OUTPUT</small>
                  <p>{product.tangibleOutcome}</p>
                </div>

                <dl className="course-card__details course-editorial-card-specs">
                  <div>
                    <dt>Format</dt>
                    <dd>{product.format}</dd>
                  </div>
                  <div>
                    <dt>Placeholder price</dt>
                    <dd><strong>{product.price.formatted}</strong></dd>
                  </div>
                </dl>

                <Link className="course-card__link" href={`/courses/${product.slug}`}>
                  {kindActions[product.kind]}
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
