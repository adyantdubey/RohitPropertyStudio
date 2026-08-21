import { ArrowUpRight } from "lucide-react";
import { course } from "../lib/siteContent";
import { hpiSeries, hpiSource, marketNotes } from "../lib/marketData";

function formatValue(note: (typeof marketNotes)[number]) {
  if (note.format === "percent") return `${note.value.toFixed(note.decimals ?? 0)}%`;
  if (note.format === "inr") return `₹${note.value.toLocaleString("en-IN")}`;
  return note.value.toLocaleString("en-IN");
}

/** Self-drawing line chart. Renders only once a real RBI series has been filled in. */
function HpiChart() {
  if (hpiSeries.length < 6) return null;

  const width = 960;
  const height = 320;
  const pad = { top: 24, right: 24, bottom: 40, left: 52 };
  const values = hpiSeries.map(([, v]) => v);
  const min = Math.floor(Math.min(...values) - 2);
  const max = Math.ceil(Math.max(...values) + 2);
  const x = (i: number) => pad.left + (i / (hpiSeries.length - 1)) * (width - pad.left - pad.right);
  const y = (v: number) => pad.top + (1 - (v - min) / (max - min)) * (height - pad.top - pad.bottom);
  const path = hpiSeries.map(([, v], i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = hpiSeries[hpiSeries.length - 1];

  return (
    <figure className="market__chart" data-reveal>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Line chart: ${hpiSource}`}>
        {[0, 0.5, 1].map((t) => {
          const value = min + t * (max - min);
          return (
            <g key={t}>
              <line className="market__grid" x1={pad.left} x2={width - pad.right} y1={y(value)} y2={y(value)} />
              <text className="market__tick" x={pad.left - 10} y={y(value) + 4} textAnchor="end">{Math.round(value)}</text>
            </g>
          );
        })}
        <path className="market__line" d={path} data-draw />
        <circle className="market__dot" cx={x(hpiSeries.length - 1)} cy={y(last[1])} r="4" />
        <text className="market__tick" x={pad.left} y={height - 12}>{hpiSeries[0][0]}</text>
        <text className="market__tick" x={width - pad.right} y={height - 12} textAnchor="end">{last[0]}</text>
      </svg>
      <figcaption>{hpiSource}</figcaption>
    </figure>
  );
}

export function MarketContext() {
  return (
    <section className="section surface-raise" id="market">
      <div className="shell">
        <div className="head">
          <div className="head__main">
            <p className="eyebrow">Market context, source-dated</p>
            <h2 data-split>Numbers are only useful when you know where they came from.</h2>
          </div>
          <p className="head__note" data-reveal>
            The course teaches the vocabulary; this is the published context around it. Every figure
            names its source and its date — the same standard the course holds itself to.
          </p>
        </div>

        <HpiChart />

        <div className="grid grid--3">
          {marketNotes.map((note, index) => (
            <article className="market__note" key={note.label} data-reveal data-reveal-delay={String(index)}>
              <strong className="market__value">{formatValue(note)}</strong>
              <h3>{note.label}</h3>
              <p>{note.detail}</p>
              <footer><span>{note.source}</span><span>{note.asOf}</span></footer>
            </article>
          ))}
        </div>

        <p className="market__boundary" data-reveal>
          Published context, not a recommendation. Market figures change, vary by micro-market, and say
          nothing about any specific project — verify current numbers before acting on them.
          <a className="text-link" href={course.whatsapp} target="_blank" rel="noreferrer" data-track="whatsapp_clicked">
            Discuss with the team <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
