import { verifiedStats } from "../lib/siteContent";

/** Verified numbers only — every figure names the source it came from. */
export function StatRail({ bare = false }: { bare?: boolean }) {
  const grid = (
    <div className="shell stat-rail__grid">
      {verifiedStats.map((stat) => (
        <article className="stat" key={stat.label} data-reveal>
          <strong className="stat__value" data-count={stat.value} data-count-suffix={stat.suffix}>
            {stat.value}{stat.suffix}
          </strong>
          <span className="stat__label">{stat.label}</span>
          <span className="stat__source">{stat.source}</span>
        </article>
      ))}
    </div>
  );

  if (bare) return grid;
  return (
    <section className="stat-rail surface-dark" aria-label="Verified course and instructor numbers">
      {grid}
    </section>
  );
}
