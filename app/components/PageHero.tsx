import type { ReactNode } from "react";

type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  aside?: ReactNode;
  theme?: "paper" | "blue" | "ink" | "orange";
};

export function PageHero({
  index,
  eyebrow,
  title,
  body,
  aside,
  theme = "paper",
}: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${theme}`}>
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="page-hero-meta">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <h1>{title}</h1>
      <p className="page-hero-body">{body}</p>
      {aside ? <div className="page-hero-aside">{aside}</div> : null}
      <div className="page-hero-measure" aria-hidden="true">
        <span />
        <strong>00</strong>
        <span />
      </div>
    </section>
  );
}
