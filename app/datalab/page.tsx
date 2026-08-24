import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import { DatalabExplorer } from "../components/datalab/DatalabExplorer";
import registry from "../lib/datalab/projects.json";

export const metadata: Metadata = {
  title: "Bengaluru Property Datalab",
  description:
    "Search Bengaluru's RERA-registered projects by name, builder or locality. Public register facts, source-dated, with zone-wise top picks.",
  alternates: { canonical: "/datalab" },
};

const promoters = new Set(registry.projects.map((p) => p.promoter)).size;
const zones = new Set(registry.projects.map((p) => p.zone)).size;

export default function DatalabPage() {
  return (
    <main id="main-content">
      {/* ---- hero: search-first ---- */}
      <section className="page-hero page-hero--datalab">
        <AmbientBackdrop video="/video/hero.mp4" />
        <div className="shell">
          <div className="page-hero__copy dl-hero__copy">
            <p className="eyebrow" data-enter>The Bengaluru Datalab</p>
            <h1 data-split>Every project has a public record. Read it before you pay for anything.</h1>
            <p data-enter>
              The projects below come from Karnataka&apos;s official RERA register — the same record
              a lawyer checks. Search a name, a builder or a locality.
            </p>
          </div>
          <div className="dl-hero__stats" data-reveal>
            <div className="stat">
              <strong className="stat__value"><span data-count={registry.projects.length}>{registry.projects.length}</span></strong>
              <span className="stat__label">Projects on record</span>
              <span className="stat__source">K-RERA public register</span>
            </div>
            <div className="stat">
              <strong className="stat__value"><span data-count={promoters}>{promoters}</span></strong>
              <span className="stat__label">Builders tracked</span>
              <span className="stat__source">Register promoters</span>
            </div>
            <div className="stat">
              <strong className="stat__value"><span data-count={zones}>{zones}</span></strong>
              <span className="stat__label">Bengaluru zones</span>
              <span className="stat__source">North · East · South · West · Central</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- explorer ---- */}
      <section className="section section--tight surface-dark" id="explore">
        <div className="shell">
          <DatalabExplorer />
        </div>
      </section>

      {/* ---- methodology: the honesty section ---- */}
      <section className="section surface-light" id="method">
        <div className="shell method-note__grid">
          <div>
            <p className="eyebrow">How this data works</p>
            <h2 data-split>Public records, shown plainly.</h2>
          </div>
          <div className="method-note__copy" data-reveal>
            <p>
              Everything here originates from the Karnataka RERA public register — project names,
              builders, localities and registration status, seeded {registry.asOf} and growing with
              every sync. Where a register reference is partial it says so, and every dossier links
              to the official portal so you can confirm the record yourself.
            </p>
            <p>
              The Datalab never shows asking prices from listing portals, never predicts prices and
              never recommends a purchase. Top picks are a published formula over register facts —
              status and builder footprint — nothing more.
            </p>
            <a className="text-link" href={registry.verifyUrl} target="_blank" rel="noreferrer">
              Open the official K-RERA register <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Coming next"
        title="In-depth verified property reports."
        copy="RERA history, ownership trail, builder track record and price context — researched, verified and signed by Rohitt. Join early access to hear when reports open."
      />
    </main>
  );
}
