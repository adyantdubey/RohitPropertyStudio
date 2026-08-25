import type { Metadata } from "next";
import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import registry from "../lib/datalab/projects.json";

export const metadata: Metadata = {
  title: "Property Intelligence Reports",
  description:
    "A ten-page, source-cited report on any Bengaluru project: registration record, Record Grade, builder profile, ownership trail, statutory costs and site documentation — reviewed and signed before delivery.",
  alternates: { canonical: "/reports" },
};

const SAMPLE_URL = "/reports/embassy-edge-specimen.pdf";

const sections = [
  ["01", "Project identification & registration", "Every line shows the fact, its official source and the date it was read."],
  ["02", "Record Grade assessment", "An A–E grade of how complete and clean the public record is — a fixed, printed formula, never a buy/don't-buy opinion."],
  ["03", "Promoter profile & track record", "The builder's registrations across the register, plus the corporate record from MCA."],
  ["04", "Encumbrance & ownership history", "The government's own transaction trail for the land, pulled fresh from Kaveri for each report."],
  ["05", "Statutory charges & cost framework", "Stamp duty, registration, cess, surcharge and GST — applied to the actual quoted price, compared with the official guidance value."],
  ["06", "Site documentation", "Locality map and photographs taken during preparation, dated on the caption."],
  ["07", "Due-diligence checklist", "The questions to carry into the room, in order."],
  ["08", "Certification & references", "Citations with verify links, scannable QR codes to the official register, and the reviewer's signature."],
] as const;

export default function ReportsPage() {
  return (
    <main id="main-content">
      {/* ---- hero ---- */}
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow" data-enter>Property Intelligence Reports</p>
            <h1 data-split>Ten pages of record, before lakhs of commitment.</h1>
            <p data-enter>
              A commissioned report reads one project&apos;s complete public record — RERA, Kaveri,
              MCA — verifies it, grades it, and signs it. Information, never investment advice.
            </p>
            <div className="hero__actions" data-enter>
              <a className="button button--gold" href={SAMPLE_URL} target="_blank" rel="noreferrer" data-track="report_sample_opened">
                Read the sample report <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="button button--outline" href="/datalab">
                Browse the Datalab <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="page-hero__aside" data-enter>
            <strong>Commissioning opens soon</strong>
            <p>
              The free specimen shows the full structure. Commissioned reports complete every
              verified section for the property you name, reviewed and signed before delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ---- what's inside ---- */}
      <section className="section surface-dark" id="inside">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">Inside the report</p>
              <h2 data-split>Eight sections. Every figure names its source.</h2>
            </div>
            <p className="head__note" data-reveal>
              The structure below is the actual document — open the specimen and follow along
              page by page.
            </p>
          </div>
          <div className="rp-sections" data-reveal-group>
            {sections.map(([num, title, copy]) => (
              <article className="rp-section" key={num}>
                <span className="rp-section__num">{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- the sample ---- */}
      <section className="section surface-light" id="sample">
        <div className="shell rp-sample__grid">
          <div>
            <p className="eyebrow">The specimen</p>
            <h2 data-split>Judge the report before anyone pays for one.</h2>
          </div>
          <div className="rp-sample__copy" data-reveal>
            <p>
              The specimen covers <strong>Embassy Edge, Devanahalli</strong> — a real entry from the
              register of {registry.projects.length} Bengaluru projects the Datalab tracks. Sections
              that need per-order official pulls are marked <em>pending</em> rather than filled with
              guesses; a commissioned report completes them.
            </p>
            <a className="button button--gold" href={SAMPLE_URL} target="_blank" rel="noreferrer" data-track="report_sample_opened">
              <FileText size={16} aria-hidden="true" /> Open the sample (PDF)
            </a>
            <p className="annot">Watermarked specimen — free to read, share and verify.</p>
          </div>
        </div>
      </section>

      {/* ---- method / honesty ---- */}
      <section className="section surface-dark" id="method">
        <div className="shell rp-method__grid">
          <div>
            <p className="eyebrow">How a report is made</p>
            <h2 data-split>Read from the record. Verified. Signed.</h2>
          </div>
          <div className="rp-method__copy" data-reveal>
            <p>
              Facts are read from the named public source on the date shown and kept verbatim —
              the Karnataka RERA register, Kaveri (guidance values and the Encumbrance
              Certificate), MCA corporate records, RBI and NHB series. Where a record cannot be
              obtained, the line says so; nothing is estimated or generated.
            </p>
            <p className="rp-method__sign">
              <ShieldCheck size={16} aria-hidden="true" />
              Every commissioned report is reviewed and signed by Rohitt Kumar Singh, MD, Hundred
              Yards Realtor Pvt Ltd, before delivery — and never says buy or don&apos;t buy.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Commissioning opens soon"
        title="Be first when reports open."
        copy="Join early access and we will write to you the day commissioning opens — with launch pricing and the property details we need from you."
      />
    </main>
  );
}
