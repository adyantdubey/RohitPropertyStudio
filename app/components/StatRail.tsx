import { verifiedStats } from "../lib/siteContent";

/** Verified numbers only — every figure names the source it came from. */
export function StatRail({ bare = false }: { bare?: boolean }) {
  const grid = (
    <div className="shell stat-rail__grid">
      {verifiedStats.map((stat, index) => (
        <article className="stat" key={stat.label}>
          <strong className={`stat__value${index === verifiedStats.length - 1 ? " sketch-ring" : ""}`}>
            <span data-count={stat.value} data-count-suffix={stat.suffix}>{stat.value}{stat.suffix}</span>
            {index === verifiedStats.length - 1 && (
              <svg viewBox="0 0 120 60" aria-hidden="true" preserveAspectRatio="none">
                <path d="M14,32 C10,14 44,4 68,7 C96,10 114,20 110,36 C106,52 66,58 38,53 C18,49 10,42 13,30" />
              </svg>
            )}
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
