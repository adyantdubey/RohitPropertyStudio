"use client";

import { ArrowUpRight, BookOpen, FileText } from "lucide-react";
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
  pdf: "PDF",
  toolkit: "Toolkit",
};

type CourseCatalogProps = {
  items?: readonly CatalogProduct[];
  heading?: string;
};

export function CourseCatalog({
  items = products,
  heading = "Choose the depth that fits your next decision.",
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
    <section className="course-catalog" aria-labelledby="course-catalog-title">
      <div className="course-catalog__header">
        <div>
          <p className="course-catalog__eyebrow">The learning collection</p>
          <h2 id="course-catalog-title">{heading}</h2>
        </div>
        <p className="course-catalog__summary">
          Begin with a concise field guide or follow the complete framework.
          Every resource is built to make the next question easier to answer.
        </p>
      </div>

      <div className="course-catalog__toolbar">
        <div className="course-catalog__filters" aria-label="Filter resources">
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter}
              className={`course-filter${activeFilter === filter ? " is-active" : ""}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter === "all" ? "All" : kindLabels[filter]}
            </button>
          ))}
        </div>
        <p className="course-catalog__count" aria-live="polite">
          {visibleProducts.length} {visibleProducts.length === 1 ? "resource" : "resources"}
        </p>
      </div>

      <div className="course-catalog__grid">
        {visibleProducts.map((product, index) => {
          const ProductIcon = product.kind === "course" ? BookOpen : FileText;

          return (
            <article
              className={`course-card${product.featured ? " course-card--featured" : ""}`}
              key={product.slug}
            >
              <div className="course-card__visual" aria-hidden="true">
                <span className="course-card__coordinate">
                  R/{String(index + 1).padStart(2, "0")}
                </span>
                <div className="course-card__document">
                  <ProductIcon size={34} strokeWidth={1.25} />
                  <span>{kindLabels[product.kind]}</span>
                </div>
                <span className="course-card__visual-line" />
              </div>

              <div className="course-card__content">
                <div className="course-card__meta">
                  <span>{kindLabels[product.kind]}</span>
                  <span>{product.level}</span>
                </div>
                <h3>{product.title}</h3>
                <p className="course-card__description">{product.description}</p>
                <p className="course-card__outcome">{product.outcomes[0]}</p>

                <div className="course-card__details">
                  <span>{product.format}</span>
                  <strong>{product.price.formatted}</strong>
                </div>

                <a className="course-card__link" href={`/courses/${product.slug}`}>
                  Explore resource
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
