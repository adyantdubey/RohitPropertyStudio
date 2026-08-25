"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Scale, Search, ShieldCheck, X } from "lucide-react";
import registry from "../../lib/datalab/projects.json";
import { gradeOf } from "../../lib/datalab/grade";
import { localityLatLng, osmEmbedUrl, osmLink } from "../../lib/datalab/geo";
import { GradeDial } from "./GradeDial";
import { ProjectAsk } from "./ProjectAsk";
import { ProjectImage } from "./ProjectImage";
import { media } from "../../lib/siteContent";

type Project = {
  slug: string;
  name: string;
  promoter: string;
  reraRef: string;
  reraComplete: boolean;
  locality: string;
  zone: string;
  status: string;
};

const ZONES = ["All", "North", "East", "South", "West", "Central"] as const;

/** Published ranking formula — order, never opinion. */
const STATUS_WEIGHT: Record<string, number> = {
  "New launch": 3,
  Active: 2,
  Completed: 1,
  Applied: 1,
  Delayed: 0,
  "—": 1,
};

const projects = registry.projects as Project[];

const promoterCounts = projects.reduce<Record<string, number>>((acc, p) => {
  acc[p.promoter] = (acc[p.promoter] || 0) + 1;
  return acc;
}, {});

const rankScore = (p: Project) =>
  (STATUS_WEIGHT[p.status] ?? 1) * 10 + Math.min(promoterCounts[p.promoter] || 1, 8);

const whatsappFor = (p: Project) =>
  `https://wa.me/919916866667?text=${encodeURIComponent(
    `Hi, I found ${p.name} (${p.locality}) on the Bengaluru Datalab and would like to know more.`,
  )}`;

function MiniMap({ project }: { project: Project }) {
  const [view, setView] = useState<"idle" | "map" | "street">("idle");
  const { lat, lng, matched } = localityLatLng(project.locality, project.zone);
  const streetAvailable = Boolean(media.googleMapsEmbedKey);
  const streetUrl = `https://www.google.com/maps/embed/v1/streetview?key=${media.googleMapsEmbedKey}&location=${lat.toFixed(4)},${lng.toFixed(4)}&fov=90`;
  const place = matched ? project.locality.split(",")[0] : `${project.zone} Bengaluru`;
  return (
    <div className="dmap">
      {view !== "idle" && (
        <div className="dmap__tabs" role="tablist" aria-label="Location views">
          <button role="tab" aria-selected={view === "map"} className={view === "map" ? "is-active" : ""} onClick={() => setView("map")}>Locality map</button>
          {streetAvailable && (
            <button role="tab" aria-selected={view === "street"} className={view === "street" ? "is-active" : ""} onClick={() => setView("street")}>Street view</button>
          )}
        </div>
      )}
      {view === "idle" ? (
        <button className="dmap__load" onClick={() => setView("map")}>
          <MapPin size={15} aria-hidden="true" />
          View {place} — map{streetAvailable ? " & street view" : ""}
        </button>
      ) : view === "map" ? (
        <iframe src={osmEmbedUrl(lat, lng)} title={`Approximate locality map for ${project.name}`} loading="lazy" />
      ) : (
        <iframe src={streetUrl} title={`Street view near ${project.name}`} loading="lazy" allowFullScreen />
      )}
      <p className="dmap__note">
        Approximate locality view, not the plot ·{" "}
        <a href={osmLink(lat, lng)} target="_blank" rel="noreferrer">© OpenStreetMap</a>
        {view === "street" ? " · Street imagery © Google" : ""}
      </p>
    </div>
  );
}

export function DatalabExplorer() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState<(typeof ZONES)[number]>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const inZone = useMemo(
    () => (zone === "All" ? projects : projects.filter((p) => p.zone === zone)),
    [zone],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return inZone
      .filter((p) => `${p.name} ${p.promoter} ${p.locality}`.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, inZone]);

  const topPicks = useMemo(
    () => [...inZone].sort((a, b) => rankScore(b) - rankScore(a) || a.name.localeCompare(b.name)).slice(0, 6),
    [inZone],
  );

  const open = openSlug ? projects.find((p) => p.slug === openSlug) : null;
  const siblings = open
    ? projects.filter((p) => p.promoter === open.promoter && p.slug !== open.slug).slice(0, 4)
    : [];
  const comparing = compare
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as Project[];

  const toggleCompare = (slug: string) => {
    setCompare((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : current.length >= 2
          ? [current[1], slug]
          : [...current, slug],
    );
  };

  useEffect(() => {
    if (!open && !compareOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpenSlug(null); setCompareOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    if (open) dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, compareOpen]);

  const row = (p: Project) => (
    <button className="dl__row" key={p.slug} onClick={() => setOpenSlug(p.slug)}>
      <span className="dl__row-main">
        <strong>{p.name}</strong>
        <span>{p.promoter}</span>
      </span>
      <span className="dl__row-side">
        <span className="dl__chip dl__chip--zone"><MapPin size={11} aria-hidden="true" />{p.locality}</span>
        <span className={`dl__chip${p.status === "New launch" ? " dl__chip--gold" : ""}`}>{p.status}</span>
      </span>
    </button>
  );

  return (
    <div className="dl">
      {/* ---- search ---- */}
      <div className="dl__search" data-enter>
        <Search size={19} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a project, builder or locality — e.g. Sobha, Whitefield…"
          aria-label="Search Bengaluru projects"
        />
        <span className="dl__search-count">{inZone.length} on record</span>
      </div>

      {results && (
        <div className="dl__results" role="listbox" aria-label="Search results">
          {results.length === 0 && (
            <p className="dl__empty">
              Nothing in the register yet for “{query}”. The register grows with every sync —
              ask us directly and we will look it up.
            </p>
          )}
          {results.map(row)}
        </div>
      )}

      {/* ---- zones ---- */}
      <div className="dl__zones" role="tablist" aria-label="Bengaluru zones">
        {ZONES.map((z) => (
          <button
            key={z}
            role="tab"
            aria-selected={zone === z}
            className={`dl__zone${zone === z ? " is-active" : ""}`}
            onClick={() => { setZone(z); setShowAll(false); }}
          >
            {z}
            <em>{z === "All" ? projects.length : projects.filter((p) => p.zone === z).length}</em>
          </button>
        ))}
      </div>

      {/* ---- top picks ---- */}
      <div className="dl__picks">
        {topPicks.map((p, index) => (
          <button className="dl__pick dl__pick--cover" key={p.slug} onClick={() => setOpenSlug(p.slug)}>
            <ProjectImage slug={p.slug} name={p.name} compact />
            <span className="dl__pick-inner">
              <span className="dl__pick-rank">{String(index + 1).padStart(2, "0")}</span>
              <span className="dl__pick-body">
                <strong>{p.name}</strong>
                <span className="dl__pick-meta">{p.promoter}</span>
                <span className="dl__pick-loc"><MapPin size={12} aria-hidden="true" />{p.locality}</span>
              </span>
              <span className={`dl__chip${p.status === "New launch" ? " dl__chip--gold" : ""}`}>{p.status}</span>
            </span>
          </button>
        ))}
      </div>
      <p className="dl__formula annot">
        Ranked by register status and the builder’s footprint in this register — a published
        formula over public records, not a recommendation. Covers are brand art, not photographs.
      </p>

      <div className="dl__all-toggle">
        <button className="text-link" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Hide the full register view" : `Browse all ${inZone.length} ${zone === "All" ? "tracked" : zone} projects`}
        </button>
      </div>
      {showAll && (
        <div className="dl__results dl__results--all">
          {[...inZone].sort((a, b) => a.name.localeCompare(b.name)).map(row)}
        </div>
      )}

      {/* ---- compare tray ---- */}
      {comparing.length > 0 && (
        <div className="ctray" role="status">
          <Scale size={15} aria-hidden="true" />
          {comparing.map((p) => (
            <span className="ctray__item" key={p.slug}>
              {p.name}
              <button aria-label={`Remove ${p.name} from comparison`} onClick={() => toggleCompare(p.slug)}>
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          ))}
          {comparing.length === 2 ? (
            <button className="button button--gold button--sm" onClick={() => setCompareOpen(true)}>Compare</button>
          ) : (
            <em>pick one more to compare</em>
          )}
        </div>
      )}

      {/* ---- dossier ---- */}
      {open && (
        <div className="dossier" role="dialog" aria-modal="true" aria-label={`${open.name} dossier`}>
          <button className="dossier__backdrop" aria-label="Close dossier" onClick={() => setOpenSlug(null)} />
          <div className="dossier__panel surface-raise" ref={dialogRef} tabIndex={-1}>
            <button className="dossier__close" aria-label="Close" onClick={() => setOpenSlug(null)}>
              <X size={17} aria-hidden="true" />
            </button>
            <ProjectImage slug={open.slug} name={open.name} />
            <p className="eyebrow">Project dossier</p>
            <h3>{open.name}</h3>
            <GradeDial project={open} />
            <dl className="dossier__facts">
              <div><dt>Builder</dt><dd>{open.promoter}</dd></div>
              <div><dt>Locality</dt><dd>{open.locality} · {open.zone} Bengaluru</dd></div>
              <div><dt>Register status</dt><dd>{open.status}</dd></div>
              <div>
                <dt>K-RERA reference</dt>
                <dd className="dossier__rera">
                  <ShieldCheck size={14} aria-hidden="true" />
                  {open.reraRef || "On record — reference pending sync"}
                  {!open.reraComplete && <em> · partial — confirm on the official register</em>}
                </dd>
              </div>
            </dl>
            <a className="text-link" href={registry.verifyUrl} target="_blank" rel="noreferrer">
              Verify on the official K-RERA register <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <MiniMap project={open} />
            <ProjectAsk slug={open.slug} name={open.name} />
            {siblings.length > 0 && (
              <div className="dossier__more">
                <p className="dossier__more-title">Also by {open.promoter} in this register</p>
                {siblings.map((s) => (
                  <button className="dossier__sibling" key={s.slug} onClick={() => setOpenSlug(s.slug)}>
                    {s.name} <span>{s.locality}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="dossier__cta">
              <a className="button button--gold button--sm" href={whatsappFor(open)} target="_blank" rel="noreferrer" data-track="whatsapp_clicked">
                Ask about this project <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <button className="button button--outline button--sm" onClick={() => toggleCompare(open.slug)}>
                <Scale size={14} aria-hidden="true" />
                {compare.includes(open.slug) ? "Remove from comparison" : "Add to comparison"}
              </button>
              <span className="dossier__soon">In-depth verified report — launching soon</span>
            </div>
            <p className="annot">
              Register facts as of {registry.asOf}, from the {registry.source}. This dossier is
              information, not advice — title, approvals and pricing always need direct verification.
            </p>
          </div>
        </div>
      )}

      {/* ---- compare overlay ---- */}
      {compareOpen && comparing.length === 2 && (
        <div className="dossier" role="dialog" aria-modal="true" aria-label="Compare projects">
          <button className="dossier__backdrop" aria-label="Close comparison" onClick={() => setCompareOpen(false)} />
          <div className="dossier__panel dossier__panel--wide surface-raise">
            <button className="dossier__close" aria-label="Close" onClick={() => setCompareOpen(false)}>
              <X size={17} aria-hidden="true" />
            </button>
            <p className="eyebrow">Side by side</p>
            <h3>Two register records, compared.</h3>
            <div className="cgrid">
              <div className="cgrid__head" aria-hidden="true" />
              {comparing.map((p) => (
                <div className="cgrid__head" key={p.slug}>
                  <ProjectImage slug={p.slug} name={p.name} compact />
                  <strong>{p.name}</strong>
                </div>
              ))}
              {([
                ["Builder", (p: Project) => p.promoter],
                ["Locality", (p: Project) => `${p.locality} · ${p.zone}`],
                ["Register status", (p: Project) => p.status],
                ["Builder footprint", (p: Project) => `${promoterCounts[p.promoter]} register entries`],
                ["Record Grade", (p: Project) => {
                  const g = gradeOf(p);
                  return `${g.grade}${g.provisional ? " (provisional)" : ""} · ${g.earned}/${g.possible}`;
                }],
                ["K-RERA reference", (p: Project) => p.reraRef || "On record"],
              ] as Array<[string, (p: Project) => string]>).map(([label, get]) => (
                <div className="cgrid__row" key={label}>
                  <span className="cgrid__label">{label}</span>
                  {comparing.map((p) => <span className="cgrid__cell" key={p.slug}>{get(p)}</span>)}
                </div>
              ))}
            </div>
            <p className="annot">
              Both columns read from the same public register, {registry.asOf}. A comparison of
              records is not a recommendation of either project.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
