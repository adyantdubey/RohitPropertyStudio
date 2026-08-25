/**
 * Property Intelligence Report generator — Hundred Yards Academy.
 *
 *   node scripts/report/make-report.mjs <project-slug> [--specimen]
 *
 * Builds an A4 print HTML from the register entry in app/lib/datalab/projects.json
 * plus (optionally) a per-order data file scripts/report/orders/<slug>.json, then
 * prints it to PDF with the bundled Chromium. Slots without verified data render
 * as clearly-marked "pending verification" lines — the generator never invents a
 * fact. --specimen watermarks every page.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const registry = JSON.parse(readFileSync(path.join(ROOT, "app/lib/datalab/projects.json"), "utf8"));

const [slug, ...flags] = process.argv.slice(2);
const SPECIMEN = flags.includes("--specimen");
if (!slug) {
  console.error("Usage: node scripts/report/make-report.mjs <project-slug> [--specimen]");
  console.error("Slugs come from app/lib/datalab/projects.json");
  process.exit(1);
}
const project = registry.projects.find((p) => p.slug === slug);
if (!project) { console.error(`No project with slug "${slug}"`); process.exit(1); }

// Per-order verified data (filled by the office per report). Absent fields stay pending.
const orderPath = path.join(ROOT, "scripts/report/orders", `${slug}.json`);
const order = existsSync(orderPath) ? JSON.parse(readFileSync(orderPath, "utf8")) : {};

const siblings = registry.projects.filter((p) => p.promoter === project.promoter && p.slug !== slug);
const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const reportNo = `HY-PIR-${new Date().getFullYear()}-${String(Math.abs([...slug].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 10000).padStart(4, "0")}`;

/* Statutory rates — keep in sync with app/lib/labData.ts */
const RATES = {
  slabs: [["Up to ₹20 lakh", "2%"], ["₹20–45 lakh", "3%"], ["Above ₹45 lakh", "5%"]],
  registration: "2% (revised from 1% on 31 Aug 2025)",
  cess: "10% of the stamp duty amount",
  surcharge: "2% urban (BBMP) · 3% rural, of the duty amount",
  gst: "5% under construction · 1% affordable · 0% ready with OC",
  source: "Karnataka Dept. of Stamps & Registration",
  gstSource: "CBIC framework",
  asOf: "2026 · re-verified on report date",
};

/* Fonts from the repo cache, if present */
const fontFace = (() => {
  // Each cached font dir ships a style.css with correct style/weight/unicode-range
  // mappings; rewrite its absolute urls to this machine's paths and inline it all.
  const dir = path.join(ROOT, ".vinext/fonts");
  try {
    return readdirSync(dir).map((sub) => {
      const cssPath = path.join(dir, sub, "style.css");
      if (!existsSync(cssPath)) return "";
      return readFileSync(cssPath, "utf8").replace(
        /url\(([^)]*?[/\\]fonts[/\\])([^)]+)\)/g,
        (_m, _prefix, rest) => `url(file://${path.join(dir, rest)})`,
      );
    }).join("\n");
  } catch { return ""; }
})();

const poster = path.join(ROOT, "public/brand/hero-poster.jpg");

/* QR codes — printed verification links */
const QR = await import("qrcode");
const qr = async (text) => QR.toDataURL(text, { margin: 0, width: 220, color: { dark: "#1b2334", light: "#f2f0ea" } });
const qrRera = await qr("https://rera.karnataka.gov.in/viewAllProjects");
const qrAsk = await qr(`https://wa.me/919916866667?text=${encodeURIComponent(`Query about report ${"HY-PIR"}: ${project.name}`)}`);

/* Site documentation — drop files into scripts/report/orders/<slug>/ :
   map.png|jpg and photo-1..photo-3.(png|jpg). Missing files render labeled frames. */
const docDir = path.join(ROOT, "scripts/report/orders", slug);
const docImg = (base) => {
  for (const ext of ["jpg", "jpeg", "png"]) {
    const f = path.join(docDir, `${base}.${ext}`);
    if (existsSync(f)) return `file://${f}`;
  }
  return null;
};
const frames = [
  ["map", "Locality map", "marked with the project, metro and arterial roads"],
  ["photo-1", "Site photograph", "taken during report preparation"],
  ["photo-2", "Site photograph", "approach road and surroundings"],
  ["photo-3", "Site photograph", "construction stage on the visit date"],
].map(([base, title, note]) => {
  const src = docImg(base);
  return src
    ? `<figure class="doc"><img src="${src}"><figcaption>${title} · <em>${note}</em></figcaption></figure>`
    : `<figure class="doc doc--empty"><div><strong>${title}</strong><span>${note} — added during preparation of a commissioned report</span></div></figure>`;
}).join("");

/* ---- Record Grade: a printed formula over verifiable checks. Not advice. ---- */
const CHECKS = [
  { label: "Project found on the K-RERA public register", max: 25,
    earned: 25, basis: "K-RERA register" },
  { label: "Full registration number verified on the portal", max: 10,
    earned: project.reraComplete ? 10 : null, basis: "rera.karnataka.gov.in" },
  { label: "Register status", max: 15,
    earned: ["Active", "New launch", "Completed"].includes(project.status) ? 15 : project.status === "Applied" ? 5 : 0,
    basis: `Status on record: ${project.status}` },
  { label: "Builder's registered footprint (1 pt per register entry, max 10)", max: 10,
    earned: Math.min(siblings.length + 1, 10), basis: "K-RERA register" },
  { label: "No unresolved complaints found against the project", max: 15,
    earned: order.complaintsFinding === "none" ? 15 : typeof order.complaintsScore === "number" ? order.complaintsScore : null,
    basis: "K-RERA complaints record" },
  { label: "Encumbrance trail reviewed, no unreleased charge flagged", max: 15,
    earned: order.ecFinding === "clean" ? 15 : typeof order.ecScore === "number" ? order.ecScore : null,
    basis: "Kaveri 2.0 EC" },
  { label: "Approvals on the RERA filing verified", max: 10,
    earned: order.approvalsFinding === "verified" ? 10 : typeof order.approvalsScore === "number" ? order.approvalsScore : null,
    basis: "K-RERA project filing" },
];
const earned = CHECKS.reduce((a, c) => a + (c.earned ?? 0), 0);
const possible = CHECKS.reduce((a, c) => a + c.max, 0);
const pendingChecks = CHECKS.filter((c) => c.earned === null);
const provisional = pendingChecks.length > 0;
const gradeOf = (n) => (n >= 85 ? "A" : n >= 70 ? "B" : n >= 55 ? "C" : n >= 40 ? "D" : "E");
const grade = gradeOf(Math.round((earned / possible) * 100));
const gradePct = Math.round((earned / possible) * 100);
const checkRows = CHECKS.map((c) => `<tr>
  <td class="v" style="width:96mm">${c.label}</td>
  <td class="s">${c.basis}</td>
  <td class="s" style="text-align:right">${c.earned === null ? '<span class="tbd">pending</span>' : `<strong>${c.earned}</strong>`} / ${c.max}</td>
</tr>`).join("");
const dial = (() => {
  const r = 46, c = 2 * Math.PI * r, frac = earned / possible;
  return `<svg class="dial" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="#d4d1c6" stroke-width="7"/>
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="#c6a15b" stroke-width="7"
      stroke-dasharray="${(c * frac).toFixed(1)} ${c.toFixed(1)}" stroke-linecap="round"
      transform="rotate(-90 60 60)"/>
    <text x="60" y="57" text-anchor="middle" style="font-family:'Playfair Display',Georgia,serif;font-size:34px;fill:#1b2334">${grade}</text>
    <text x="60" y="76" text-anchor="middle" style="font-family:Manrope,sans-serif;font-size:10px;font-weight:800;letter-spacing:.08em;fill:#8a90a0">${earned}/${possible}</text>
  </svg>${provisional ? '<p class="dial-tag">Provisional</p>' : ""}`;
})();

const tbd = (label = "Completed in your commissioned report — pending official pull") =>
  `<span class="tbd">${label}</span>`;
const val = (v, label) => (v ? String(v) : tbd(label));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

/* ---------- section builders ---------- */

const ledgerRow = (field, value, source, asOf) =>
  `<tr><td class="f">${field}</td><td class="v">${value}</td><td class="s">${source}</td><td class="s">${asOf}</td></tr>`;

const identityLedger = [
  ledgerRow("Project name", esc(project.name), "K-RERA public register", registry.asOf),
  ledgerRow("Promoter / builder", esc(project.promoter), "K-RERA public register", registry.asOf),
  ledgerRow("Locality", `${esc(project.locality)} · ${project.zone} Bengaluru`, "K-RERA public register", registry.asOf),
  ledgerRow("Register status", esc(project.status), "K-RERA public register", registry.asOf),
  ledgerRow("K-RERA registration", `${esc(project.reraRef || "On record")}${project.reraComplete ? "" : " <em>(partial ref — confirmed in commissioned report)</em>"}`, "rera.karnataka.gov.in", registry.asOf),
  ledgerRow("Legal entity (promoter)", val(order.mcaEntity), "MCA master data", val(order.mcaAsOf, "per report")),
  ledgerRow("Approvals on RERA filing", val(order.approvals), "K-RERA project filing", val(order.approvalsAsOf, "per report")),
].join("");

const SIBLING_CAP = 10;
const shownSiblings = siblings.slice(0, SIBLING_CAP);
const siblingRows = siblings.length
  ? shownSiblings.map((s) => `<tr><td class="v">${esc(s.name)}</td><td class="s">${esc(s.locality)}</td><td class="s">${esc(s.status)}</td></tr>`).join("")
    + (siblings.length > SIBLING_CAP ? `<tr><td class="s" colspan="3">+ ${siblings.length - SIBLING_CAP} more registrations by this promoter — full list in the register extract.</td></tr>` : "")
  : `<tr><td class="s" colspan="3">No other projects by this promoter in the current register extract.</td></tr>`;

const checklist = [
  "Ask for the RERA registration certificate and match its number with the register entry cited on page 3.",
  "Have your lawyer read the Encumbrance Certificate for the full period, not a summary of it.",
  "Compare the quoted price with the Kaveri guidance value for the survey number — a large gap in either direction deserves a question.",
  "Confirm which area the price is quoted on: carpet, built-up or super built-up. RERA requires carpet area in the agreement.",
  "Ask for the occupancy certificate timeline in writing, and what the agreement says if it slips.",
  "Verify the khata classification and property-tax status with BBMP before registration.",
  "Confirm GST treatment for your unit's stage of construction against the rates on page 7.",
  "Never treat this report, or any report, as a substitute for your own lawyer's title opinion.",
].map((item, i) => `<li><span class="ck-num">${String(i + 1).padStart(2, "0")}</span><span>${item}</span></li>`).join("");

const watermark = SPECIMEN ? `<div class="wm" aria-hidden="true"></div>` : "";
const specimenRibbon = SPECIMEN ? `<p class="ribbon">Specimen copy — sections marked "pending" are completed and verified in every commissioned report. Not for sale.</p>` : "";

const foot = (n) => `<footer><span>Hundred Yards · Property Intelligence</span><span>${reportNo} · page ${n}</span></footer>`;

const page = (n, body, cls = "") => `<section class="page ${cls}">${watermark}${body}${n ? foot(n) : ""}</section>`;

/* ---------- document ---------- */

const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(project.name)} — Property Intelligence Report</title>
<style>
${fontFace}
:root{
  --navy:#101a2e; --ivory:#e9e7e0; --paper:#f2f0ea; --ink:#1b2334; --ink-soft:#4c5567; --ink-faint:#8a90a0;
  --gold:#c6a15b; --gold-deep:#6f5526; --line:#d4d1c6; --line-dark:#2a3752;
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html{font-family:"Manrope",system-ui,sans-serif;color:var(--ink);font-size:10.5pt;line-height:1.6}
@page{size:A4;margin:0}
.page{position:relative;width:210mm;height:297mm;padding:20mm 18mm 16mm;background:var(--paper);overflow:hidden;page-break-after:always;display:flex;flex-direction:column}
.serif{font-family:"Playfair Display",Georgia,serif}
footer{position:absolute;left:18mm;right:18mm;bottom:9mm;display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:3mm;color:var(--ink-faint);font-size:7pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.wm{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;z-index:9}
.wm::after{content:"SPECIMEN";font-family:"Playfair Display",Georgia,serif;font-size:44pt;letter-spacing:.28em;color:rgba(198,161,91,.13);transform:rotate(-28deg)}
.eyebrow{display:flex;align-items:center;gap:8px;color:var(--gold-deep);font-size:8pt;font-weight:800;letter-spacing:.22em;text-transform:uppercase}
.eyebrow::before{content:"";width:26px;height:1px;background:var(--gold)}
h2{font-family:"Playfair Display",Georgia,serif;font-weight:500;font-size:21pt;line-height:1.12;margin:5mm 0 3mm;max-width:150mm}
.secno{position:absolute;left:6mm;top:19mm;font-family:"Playfair Display",Georgia,serif;font-size:15pt;color:var(--gold)}
p{max-width:158mm}
.lede{font-size:11.5pt;color:var(--ink-soft);line-height:1.7}
.annot{color:var(--ink-faint);font-family:"Playfair Display",Georgia,serif;font-style:italic;font-size:9pt;margin-top:2.5mm}
.tbd{color:var(--ink-faint);font-style:italic;font-weight:500;border-bottom:1px dotted var(--gold)}
table{width:100%;border-collapse:collapse;margin-top:4mm}
th{color:var(--ink-faint);font-size:7pt;font-weight:800;letter-spacing:.14em;text-transform:uppercase;text-align:left;border-bottom:1px solid var(--ink);padding:0 3mm 2mm 0}
td{border-bottom:1px solid var(--line);padding:2.6mm 3mm 2.6mm 0;vertical-align:top}
td.f{color:var(--ink-faint);font-size:7.5pt;font-weight:800;letter-spacing:.1em;text-transform:uppercase;width:34mm;padding-top:3.1mm}
td.v{font-weight:700;font-size:10pt}
td.v em{font-weight:500;font-style:italic;color:var(--ink-faint);font-size:8.5pt}
td.s{color:var(--ink-soft);font-size:8.5pt}
td:last-child{white-space:nowrap}
ul.ck{list-style:none;margin-top:5mm}
ul.ck li{display:flex;gap:5mm;border-top:1px solid var(--line);padding:3.2mm 0;max-width:160mm}
.ck-num{font-family:"Playfair Display",Georgia,serif;color:var(--gold);font-size:13pt;line-height:1.2}
.ribbon{margin-top:4mm;border:1px solid var(--gold);color:var(--gold-deep);font-size:8pt;font-weight:700;letter-spacing:.06em;padding:2.5mm 4mm;max-width:158mm}
/* cover */
.cover{background:var(--navy);color:var(--ivory);justify-content:space-between}
.cover .wm::after{color:rgba(198,161,91,.18)}
.cover-img{position:absolute;inset:auto 0 0 0;height:120mm;background:url("file://${poster}") center/cover;opacity:.34;-webkit-mask-image:linear-gradient(to top,black,transparent);mask-image:linear-gradient(to top,black,transparent)}
.cover-top{display:flex;justify-content:space-between;align-items:center}
.mark{display:inline-grid;place-items:center;width:12mm;height:12mm;border:1px solid var(--gold);color:var(--gold);font-family:"Playfair Display",Georgia,serif;font-size:12pt}
.cover-brand{color:var(--ivory);font-size:8pt;font-weight:800;letter-spacing:.2em;text-transform:uppercase;text-align:right;line-height:1.8}
.cover-brand small{display:block;color:var(--gold);font-size:6.5pt}
.cover-mid{position:relative;z-index:2}
.cover-mid .eyebrow{color:var(--gold)}
.cover h1{font-family:"Playfair Display",Georgia,serif;font-weight:500;font-size:34pt;line-height:1.08;max-width:150mm;margin:6mm 0 4mm}
.cover .where{color:rgba(233,231,224,.75);font-size:12pt}
.cover-foot{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid rgba(198,161,91,.4);padding-top:4mm}
.cover-foot dl{display:grid;grid-template-columns:auto auto auto;gap:2mm 10mm}
.cover-foot dt{color:rgba(233,231,224,.55);font-size:6.5pt;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.cover-foot dd{font-size:9.5pt;font-weight:700;color:var(--ivory)}
.cover-foot .spec{border:1px solid var(--gold);color:var(--gold);font-size:8pt;font-weight:800;letter-spacing:.18em;text-transform:uppercase;padding:2.5mm 5mm}
/* contents */
.toc{margin-top:6mm}
.toc div{display:flex;align-items:baseline;gap:4mm;border-top:1px solid var(--line);padding:3mm 0;max-width:158mm}
.toc .n{font-family:"Playfair Display",Georgia,serif;color:var(--gold);font-size:12pt;width:9mm}
.toc strong{font-size:10.5pt}
.toc span.d{flex:1;border-bottom:1px dotted var(--line)}
.toc em{color:var(--ink-faint);font-style:normal;font-size:8.5pt}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin-top:5mm;max-width:160mm}
.box{border-top:2px solid var(--ink);padding-top:3mm}
.box.gold{border-top-color:var(--gold)}
.box h3{font-size:8pt;font-weight:800;letter-spacing:.16em;text-transform:uppercase;margin-bottom:2mm}
.box p,.box li{font-size:9pt;color:var(--ink-soft)}
.box ul{list-style:none}
.box li{border-top:1px solid var(--line);padding:1.8mm 0}
/* record grade */
.grade-wrap{display:grid;grid-template-columns:44mm minmax(0,1fr);gap:10mm;align-items:start;margin-top:4mm;max-width:164mm}
.dial{width:44mm;height:44mm}
.dial-tag{margin-top:2mm;text-align:center;color:var(--gold-deep);font-size:7.5pt;font-weight:800;letter-spacing:.2em;text-transform:uppercase}
.grade-note{font-size:9pt;color:var(--ink-soft);max-width:110mm}
.grade-note strong{color:var(--ink)}
/* site documentation */
.doc-grid{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:5mm;max-width:164mm}
.doc{border:1px solid var(--line);height:62mm;position:relative;overflow:hidden;background:#eceae2}
.doc img{width:100%;height:calc(100% - 9mm);object-fit:cover;display:block}
.doc figcaption{position:absolute;left:0;right:0;bottom:0;height:9mm;display:flex;align-items:center;padding:0 3mm;background:var(--paper);border-top:1px solid var(--line);font-size:7.5pt;font-weight:700}
.doc figcaption em{font-style:italic;color:var(--ink-faint);font-weight:500;margin-left:2mm}
.doc--empty div{height:100%;display:grid;place-content:center;gap:1.5mm;text-align:center;padding:6mm}
.doc--empty strong{font-size:8pt;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint)}
.doc--empty span{font-size:8pt;color:var(--ink-faint);font-style:italic;max-width:52mm}
/* citations */
.cite-qr{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin-top:5mm;max-width:150mm}
.cite-qr div{display:flex;gap:5mm;align-items:center;border-top:1px solid var(--line);padding-top:4mm}
.cite-qr img{width:24mm;height:24mm}
.cite-qr p{font-size:8.5pt;color:var(--ink-soft)}
.cite-qr strong{display:block;color:var(--ink);font-size:9pt}
/* certification */
.sig{display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:8mm;max-width:160mm}
.sig .line{border-bottom:1px solid var(--ink);height:16mm}
.sig p{font-size:8.5pt;color:var(--ink-soft);margin-top:2mm}
.sig strong{display:block;font-size:10pt;color:var(--ink)}
</style></head><body>

${page(0, `
  <div class="cover-img"></div>
  <div class="cover-top"><span class="mark">RK</span><p class="cover-brand">Hundred Yards Realtor Pvt Ltd<small>Real Estate Academy · Bengaluru</small></p></div>
  <div class="cover-mid">
    <p class="eyebrow">Property Intelligence Report</p>
    <h1>${esc(project.name)}</h1>
    <p class="where">${esc(project.locality)} · ${project.zone} Bengaluru</p>
    ${specimenRibbon}
  </div>
  <div class="cover-foot">
    <dl>
      <dt>Report</dt><dt>Date</dt><dt>Prepared under the review of</dt>
      <dd>${reportNo}</dd><dd>${today}</dd><dd>Rohitt Kumar Singh · MD, Hundred Yards Realtor Pvt Ltd</dd>
    </dl>
    ${SPECIMEN ? '<span class="spec">Specimen</span>' : ""}
  </div>
`, "cover")}

${page(2, `
  <p class="eyebrow">Scope of this report</p>
  <h2>Scope, methodology and limitations.</h2>
  <p class="lede">Every figure in these pages names the public record it came from and the date it was
  read. Where a fact has not yet been pulled from the official source, the line says so plainly —
  nothing here is estimated, assumed or generated.</p>
  <div class="two">
    <div class="box gold"><h3>Within scope</h3><ul>
      <li>A reading of the project's public record: RERA register, company filings, encumbrance trail, statutory rates.</li>
      <li>Source-named and date-stamped, line by line.</li>
      <li>Reviewed and signed by a named professional before delivery.</li>
    </ul></div>
    <div class="box"><h3>Outside scope</h3><ul>
      <li>A recommendation to buy, or not to buy.</li>
      <li>A legal title opinion — your lawyer's opinion remains essential.</li>
      <li>A price prediction, or investment advice of any kind.</li>
    </ul></div>
  </div>
  <div class="toc">
    <div><span class="n">01</span><strong>Project identification &amp; registration</strong><span class="d"></span><em>page 3</em></div>
    <div><span class="n">02</span><strong>Record Grade assessment</strong><span class="d"></span><em>page 4</em></div>
    <div><span class="n">03</span><strong>Promoter profile &amp; track record</strong><span class="d"></span><em>page 5</em></div>
    <div><span class="n">04</span><strong>Encumbrance &amp; ownership history</strong><span class="d"></span><em>page 6</em></div>
    <div><span class="n">05</span><strong>Statutory charges &amp; cost framework</strong><span class="d"></span><em>page 7</em></div>
    <div><span class="n">06</span><strong>Site documentation</strong><span class="d"></span><em>page 8</em></div>
    <div><span class="n">07</span><strong>Due-diligence checklist</strong><span class="d"></span><em>page 9</em></div>
    <div><span class="n">08</span><strong>Certification &amp; references</strong><span class="d"></span><em>page 10</em></div>
  </div>
  <p class="annot">Prepared under the Hundred Yards property-intelligence methodology. Confidential to the commissioning client.</p>
`)}

${page(3, `
  <span class="secno">01</span>
  <p class="eyebrow">Section 01</p>
  <h2>Project identification and registration record.</h2>
  <table>
    <tr><th>Field</th><th>On record</th><th>Source</th><th>As of</th></tr>
    ${identityLedger}
  </table>
  <p class="annot">Every entry above can be independently verified on the official register cited in the source column.</p>
`)}


${page(4, `
  <span class="secno">02</span>
  <p class="eyebrow">Section 02</p>
  <h2>Record Grade assessment.</h2>
  <div class="grade-wrap">
    <div>${dial}</div>
    <p class="grade-note"><strong>The Record Grade is not investment advice and never says buy or don't buy.</strong>
    It grades one thing: how complete and clean this project's public record is, scored by the
    fixed formula below — the same formula for every property, printed so you can check the
    arithmetic. ${provisional ? `This copy shows a <strong>provisional</strong> grade: ${pendingChecks.length}
    checks worth ${pendingChecks.reduce((a, c) => a + c.max, 0)} points are completed only in a
    commissioned report.` : "All checks in this report are complete."}</p>
  </div>
  <table>
    <tr><th>Check</th><th>Basis</th><th style="text-align:right">Points</th></tr>
    ${checkRows}
    <tr><td class="v">Total → grade bands: A ≥85 · B ≥70 · C ≥55 · D ≥40 · E &lt;40</td><td class="s"></td>
    <td class="s" style="text-align:right"><strong>${earned}</strong> / ${possible} · ${gradePct}%</td></tr>
  </table>
`)}

${page(5, `
  <span class="secno">03</span>
  <p class="eyebrow">Section 03</p>
  <h2>Promoter profile: ${esc(project.promoter)}.</h2>
  <p class="lede">The promoter's registrations across the Karnataka RERA register, with current status. The
  commissioned report adds the corporate record from MCA: incorporation, directors and any
  changes of name.</p>
  <table>
    <tr><th>Project</th><th>Locality</th><th>Register status</th></tr>
    ${siblingRows}
  </table>
  <table>
    <tr><th colspan="4">Corporate record (MCA)</th></tr>
    ${ledgerRow("Entity & CIN", val(order.mcaEntity), "MCA master data", "per report")}
    ${ledgerRow("Incorporated", val(order.mcaIncorporated), "MCA master data", "per report")}
    ${ledgerRow("Directors", val(order.mcaDirectors), "MCA master data", "per report")}
  </table>
`)}

${page(6, `
  <span class="secno">04</span>
  <p class="eyebrow">Section 04</p>
  <h2>Encumbrance Certificate summary.</h2>
  <p class="lede">The Encumbrance Certificate is the government's transaction history for the land — every
  registered sale, mortgage and release. It is obtained from Kaveri for the full available
  period and summarised below.</p>
  <table>
    <tr><th>Item</th><th>Finding</th><th>Source</th><th>As of</th></tr>
    ${ledgerRow("EC period examined", val(order.ecPeriod), "Kaveri 2.0 (official)", "per report")}
    ${ledgerRow("Registered transactions", val(order.ecTransactions), "Kaveri 2.0 (official)", "per report")}
    ${ledgerRow("Mortgages / releases", val(order.ecMortgages), "Kaveri 2.0 (official)", "per report")}
    ${ledgerRow("Notes for your lawyer", val(order.ecNotes), "Reviewer", "per report")}
  </table>
  <p class="annot">The certificate is obtained afresh for each commissioned report; the statutory search fee is included in the report fee.</p>
`)}

${page(7, `
  <span class="secno">05</span>
  <p class="eyebrow">Section 05</p>
  <h2>Statutory charges applicable to purchase.</h2>
  <p class="lede">Current Karnataka rates payable in addition to the negotiated price. The commissioned
  report applies these to the actual quoted price and compares it with the official guidance
  value for the survey number.</p>
  <table>
    <tr><th>Levy</th><th>Rate</th><th>Source</th><th>As of</th></tr>
    ${RATES.slabs.map(([band, rate]) => ledgerRow(`Stamp duty · ${band}`, rate, RATES.source, RATES.asOf)).join("")}
    ${ledgerRow("Registration", RATES.registration, RATES.source, RATES.asOf)}
    ${ledgerRow("Cess", RATES.cess, RATES.source, RATES.asOf)}
    ${ledgerRow("Surcharge", RATES.surcharge, RATES.source, RATES.asOf)}
    ${ledgerRow("GST", RATES.gst, RATES.gstSource, RATES.asOf)}
    ${ledgerRow("Guidance value (this property)", val(order.guidanceValue), "Kaveri (official)", "per report")}
    ${ledgerRow("Market trend context", val(order.trendNote), "RBI HPI / NHB Residex", "per report")}
  </table>
`)}


${page(8, `
  <span class="secno">06</span>
  <p class="eyebrow">Section 06</p>
  <h2>Site documentation and locality record.</h2>
  <p class="lede">Commissioned reports include the locality map and photographs taken during preparation,
  each dated on its caption, so the report reflects the site as inspected — not a brochure.</p>
  <div class="doc-grid">${frames}</div>
`)}

${page(9, `
  <span class="secno">07</span>
  <p class="eyebrow">Section 07</p>
  <h2>Pre-purchase due-diligence checklist.</h2>
  <ul class="ck">${checklist}</ul>
`)}

${page(10, `
  <span class="secno">08</span>
  <p class="eyebrow">Section 08</p>
  <h2>Certification, methodology and references.</h2>
  <p class="lede">Method: every fact is read from the named public source on the date shown, kept
  verbatim, and reviewed by the undersigned before delivery. Where a record could not be obtained,
  the line says "pending" rather than guessing. Sources used: Karnataka RERA register · Kaveri 2.0
  (guidance values, EC) · MCA master data · RBI HPI / NHB Residex · official rate notifications.</p>
  <table>
    <tr><th>Source</th><th>Provided</th><th>Where to verify</th><th>Accessed</th></tr>
    ${ledgerRow("Karnataka RERA register", "Registration, promoter, status, footprint", "rera.karnataka.gov.in/viewAllProjects", registry.asOf)}
    ${ledgerRow("Kaveri 2.0 (Govt. of Karnataka)", "Guidance value · Encumbrance Certificate", "kaveri.karnataka.gov.in", val(order.ecAsOf, "per report"))}
    ${ledgerRow("MCA master data", "Promoter's corporate record", "mca.gov.in", val(order.mcaAsOf, "per report"))}
    ${ledgerRow("RBI HPI / NHB Residex", "Market trend context", "rbi.org.in · nhb.org.in", val(order.trendAsOf, "per report"))}
    ${ledgerRow("Dept. of Stamps & Registration", "Statutory rates", "kaveri.karnataka.gov.in", "2026")}
  </table>
  <div class="cite-qr">
    <div><img src="${qrRera}" alt="QR: official K-RERA register"><p><strong>Scan to open the official register</strong>Check any line of this report against the government's own record.</p></div>
    <div><img src="${qrAsk}" alt="QR: WhatsApp"><p><strong>Scan to question this report</strong>Straight to the Hundred Yards desk — reference ${reportNo}.</p></div>
  </div>
  <div class="sig">
    <div><div class="line"></div><p><strong>Rohitt Kumar Singh</strong>Managing Director, Hundred Yards Realtor Pvt Ltd<br>Reviewer of record · ${today}</p></div>
    <div><div class="line"></div><p><strong>Recipient</strong>This report is prepared for the commissioning client and is not a public document.</p></div>
  </div>
  <p class="annot" style="margin-top:8mm">— this report is information, not legal, tax or investment advice; engagement of an independent
  lawyer for title verification is assumed and advised. ${SPECIMEN ? "Specimen copy: not for sale, no client engagement exists." : ""}</p>
`)}

</body></html>`;

mkdirSync(path.join(ROOT, "scripts/report/out"), { recursive: true });
const htmlPath = path.join(ROOT, "scripts/report/out", `${slug}${SPECIMEN ? "-specimen" : ""}.html`);
writeFileSync(htmlPath, html);
console.log("html:", htmlPath);

/* ---- print to PDF ---- */
const { chromium } = await import("playwright");
const exe = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const pageCtx = await browser.newPage();
await pageCtx.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
const pdfPath = htmlPath.replace(/\.html$/, ".pdf");
await pageCtx.pdf({ path: pdfPath, format: "A4", printBackground: true });
await browser.close();
console.log("pdf:", pdfPath);
