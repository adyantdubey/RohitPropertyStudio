/**
 * Deterministic signature cover for a project — a navy plate with a gold
 * line-drawn skyline generated from the project's slug. No photograph is
 * implied and none is used; this is brand art, not the building.
 */
export function ProjectCover({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  // Small deterministic PRNG seeded by the slug.
  let seed = [...slug].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const W = 320;
  const H = compact ? 96 : 150;
  const base = H - 18;
  const bars: string[] = [];
  let x = 14;
  while (x < W - 20) {
    const w = 14 + rand() * 30;
    const h = 16 + rand() * (H * 0.52);
    bars.push(`M${x.toFixed(1)},${base} v${(-h).toFixed(1)} h${w.toFixed(1)} v${h.toFixed(1)}`);
    // occasional window ticks
    x += w + 6 + rand() * 14;
  }
  const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <span className={`pcover${compact ? " pcover--compact" : ""}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <path d={bars.join(" ")} fill="none" stroke="var(--gold)" strokeOpacity=".55" strokeWidth="1.4" />
        <line x1="8" y1={base} x2={W - 8} y2={base} stroke="var(--gold)" strokeOpacity=".8" strokeWidth="1" />
        <text x={W - 14} y="26" textAnchor="end" className="pcover__mono">{initials}</text>
      </svg>
    </span>
  );
}
