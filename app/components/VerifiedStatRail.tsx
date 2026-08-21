import { verifiedStats } from "../lib/siteContent";

export function VerifiedStatRail({ className = "" }: { className?: string }) {
  return (
    <section className={`verified-stats ${className}`.trim()} aria-label="Verified course and instructor numbers">
      <div className="shell verified-stats__grid">
        {verifiedStats.map((stat) => (
          <article className="verified-stat reveal" key={stat.label}>
            <strong>
              <span data-count={stat.value} data-count-suffix={stat.suffix}>{stat.value}{stat.suffix}</span>
            </strong>
            <div>
              <span>{stat.label}</span>
              <small>{stat.source}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
