# Bengaluru Property Datalab + Paid Reports — Build Plan

Decision (Aug 2026): build BOTH together — a free searchable Datalab (lead magnet) and a
paid, Rohitt-signed Property Report (the product). Sale-price data comes from official
per-report Kaveri EC pulls, not scraped portals.

---

## 1. The two products

**Datalab (free, on the site)** — search any Bengaluru project → see RERA registration
status, promoter, approval dates, guidance value band for that area, locality facts
(metro distance, key amenities), market trend context. Every figure shows source + date.
Ends with one button: "Get the full verified report".

**Property Report (paid PDF, ₹1,999–4,999)** — visitor submits a specific property/project
+ pays → system auto-pulls the data + AI drafts sections → **Rohitt reviews, edits and
signs** → branded PDF delivered in 24–48h. His signature IS the product; never ship an
unreviewed report.

Report sections:
1. Identity — project, promoter, RERA no., legal entity (MCA), completion status
2. Legality — RERA status/extensions/complaints, approvals listed in RERA filing
3. Ownership trail — Encumbrance Certificate summary (Kaveri EC, pulled per order)
4. Price check — guidance value vs quoted price, area price trend (RBI HPI/NHB)
5. Builder track record — other projects, delivery history, company age/directors
6. Location — metro/school/hospital distances, flood-zone note, development context
7. Checklist — what the buyer must still verify themselves (keeps us honest + safe)

## 2. Data sources (all legitimate)

| Data | Source | Cost | Access |
| --- | --- | --- | --- |
| Project registrations, promoters, complaints | RERA Karnataka (rera.karnataka.gov.in) — public search | Free | Scheduled collector + manual check per report |
| Guidance values | Kaveri (already in labData.ts pattern) | Free | Periodic refresh |
| Encumbrance Certificate / transaction trail | Kaveri 2.0 online EC | ~₹35–45 per search (govt fee) | Pulled per paid order — Rohitt/office holds the Kaveri login |
| Company details, directors | MCA master data (public) | Free | Per report |
| Court cases | eCourts search | Free | Assisted manual search per report |
| Locality distances/amenities | OpenStreetMap (free) / Google Places API (free tier) | ~Free | API from Worker |
| Price trend | RBI HPI, NHB Residex | Free | Quarterly refresh (feeds the site's market section too) |

**Never**: republish MagicBricks/99acres/Housing/NoBroker listings — their terms ban it and
the business dies with one legal notice. Competitors in this space exist (e.g. LegiScore,
SiteSetu) — validation that people pay; our edge is Rohitt's review + local standing.

## 3. Architecture (stays on the free stack)

```
Collectors (Workers cron / GitHub Actions, scheduled)
        → D1 tables: projects, promoters, guidance_values, localities, market_series
Site: /datalab search page (reads D1)
Order flow: /report → form + Razorpay payment link → orders table
Generator: Worker pulls data + AI drafts → HTML report template → PDF
Review: Rohitt gets draft link → approves/edits → "publish" → email/WhatsApp PDF to buyer
```

New D1 tables: `projects`, `promoters`, `orders`, `reports`, `ec_records`.
No new hosting cost. Razorpay = per-transaction fee only.

## 4. Build order

1. **Week 1–2 — seed + search**: RERA collector for Bengaluru projects → D1; /datalab
   search page (site design language); project detail page with source-dated facts.
2. **Week 2–3 — order + pay**: report order form, Razorpay payment link flow, orders
   table, confirmation emails. (Blocker: Rohitt's merchant KYC — start it NOW, takes days.)
3. **Week 3–4 — generator + review**: report template (HTML→PDF, brand navy/gold),
   auto-pull of RERA/MCA/locality data, AI-drafted prose, private review link for Rohitt,
   one-click approve → deliver.
4. **Then** — EC integration playbook (office pulls EC on Kaveri per order, uploads PDF,
   system extracts the summary), builder track-record pages, refresh crons, ratings
   methodology (published openly so a "rating" is a formula, not an opinion).

## 5. Owner tasks (not code)

- Razorpay (or similar) merchant KYC — PAN, bank, address proof
- Kaveri account for EC pulls + who in the office runs them
- Report pricing decision + a written review SLA (24h? 48h?)
- Disclaimer sign-off: reports are information, not legal/investment advice; buyer's
  lawyer still verifies title

## 6. Honesty rules (carry over from the site)

Every figure names source + date. No fake or estimated numbers presented as records.
Ratings = published formula over sourced data. Reports never say "buy" or "don't buy".
No scraped portal content, ever.
