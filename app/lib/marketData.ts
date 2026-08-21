/**
 * Source-dated market context.
 *
 * Rules for this file (they mirror the site's credibility standard):
 *   - Every figure names its source and its as-of date, and both are rendered.
 *   - Nothing here is a forecast. Historical, published figures only.
 *   - When a figure goes stale, update it or remove it — never leave it silently old.
 *
 * The `hpiSeries` array is intentionally EMPTY until someone fills it from RBI's
 * official quarterly House Price Index download (rbi.org.in → Statistics →
 * Data Releases → House Price Index; Bengaluru column, new base 2022-23 = 100).
 * The animated chart renders only when at least 6 quarters are present — the
 * section shows the sourced figures below either way.
 */

export type MarketNote = {
  value: number;
  format: "percent" | "inr" | "count";
  decimals?: number;
  label: string;
  detail: string;
  source: string;
  asOf: string;
};

export const marketNotes: MarketNote[] = [
  {
    value: 2.2,
    format: "percent",
    decimals: 1,
    label: "All-India house price growth, year on year",
    detail: "RBI's House Price Index across 18 cities rose 2.2% year on year in Q2 FY2025-26 (index 112.7, base 2022-23 = 100).",
    source: "Reserve Bank of India, House Price Index",
    asOf: "Q2 FY2025-26 · published Nov 2025",
  },
  {
    value: 79525,
    format: "inr",
    label: "Average Bengaluru residential price, per sq metre",
    detail: "Knight Frank Research put Bengaluru's average residential price at ₹79,525 per square metre in H2 2025, about 12% higher than a year earlier.",
    source: "Knight Frank Research",
    asOf: "H2 2025",
  },
  {
    value: 55373,
    format: "count",
    label: "Homes sold in Bengaluru in 2025",
    detail: "Bengaluru recorded 55,373 residential sales in 2025 — essentially level with 2024 — while new launches grew about 23%.",
    source: "Knight Frank Research",
    asOf: "Calendar year 2025",
  },
];

/** [quarter label, index value] — e.g. ["Q1 FY23", 100.0]. Fill from RBI's official file. */
export const hpiSeries: Array<[string, number]> = [];

export const hpiSource = "Reserve Bank of India, House Price Index for Bengaluru (base 2022-23 = 100)";
