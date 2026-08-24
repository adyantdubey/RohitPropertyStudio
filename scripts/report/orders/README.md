# Per-order report data

One JSON per commissioned report, named `<project-slug>.json` (slugs from
app/lib/datalab/projects.json). Every field is optional — a missing field prints as
"pending official pull" instead of a guess. Fill ONLY with values read from the named
official source; the generator never invents anything.

Grade inputs (page 4): `"complaintsFinding": "none"` (15 pts), `"ecFinding": "clean"` (15),
`"approvalsFinding": "verified"` (10) — or partial scores via complaintsScore/ecScore/approvalsScore.
Site documentation (page 8): put images in `scripts/report/orders/<slug>/` named
`map`, `photo-1`, `photo-2`, `photo-3` (.jpg/.png) — they embed automatically.

```json
{
  "mcaEntity": "Sobha Limited · CIN L45201KA1995PLC018475",
  "mcaIncorporated": "1995 · Bengaluru",
  "mcaDirectors": "…",
  "mcaAsOf": "2026-09",
  "approvals": "…as listed on the K-RERA filing…",
  "approvalsAsOf": "2026-09",
  "ecPeriod": "2004–2026",
  "ecTransactions": "…",
  "ecMortgages": "…",
  "ecNotes": "…",
  "guidanceValue": "₹… per sq ft (survey no. …)",
  "trendNote": "…"
}
```

Build: `node scripts/report/make-report.mjs <slug>`  (add `--specimen` for a watermarked
sample). Output lands in scripts/report/out/. Requires the repo's Playwright install.
