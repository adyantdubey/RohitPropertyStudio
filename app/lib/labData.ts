/**
 * Property Lab — data layer.
 *
 * Statutory rates carry a source and an as-of date, and both are rendered.
 * Everything user-adjustable (loan rate, appreciation, rent growth) is an
 * illustrative default the visitor controls — never presented as "today's rate".
 */

export const stampDuty = {
  // Karnataka slabs on the higher of consideration or guidance value.
  slabs: [
    { upTo: 2_000_000, rate: 0.02, label: "Up to ₹20 lakh · 2%" },
    { upTo: 4_500_000, rate: 0.03, label: "₹20–45 lakh · 3%" },
    { upTo: Infinity, rate: 0.05, label: "Above ₹45 lakh · 5%" },
  ],
  registrationRate: 0.02, // revised from 1% on 31 Aug 2025
  cessOnDuty: 0.10,       // 10% of the stamp duty amount
  surchargeUrban: 0.02,   // 2% of the stamp duty amount (urban/BBMP)
  surchargeRural: 0.03,   // 3% of the stamp duty amount (rural)
  source: "Karnataka Dept. of Stamps & Registration · registration revised Aug 2025",
  verifyUrl: "https://kaveri.karnataka.gov.in/",
  asOf: "As of 2026 — verify current rates before any transaction",
} as const;

export const gstRates = {
  underConstruction: 0.05, // non-affordable, no input tax credit
  affordable: 0.01,        // qualifying affordable housing
  readyWithOC: 0,          // completed property with occupancy certificate
  source: "GST on real estate (CBIC framework)",
  asOf: "As of 2026 — confirm the applicable rate for the specific project",
} as const;

export const labDefaults = {
  price: 8_000_000,
  loanRate: 8.5,        // % p.a., illustrative
  loanYears: 20,
  downPaymentPct: 20,
  monthlyRent: 30_000,
  rentGrowthPct: 5,     // % p.a.
  appreciationPct: 5,   // % p.a.
  investReturnPct: 7,   // % p.a. on money a renter keeps invested
  maintenancePctOfPrice: 0.35, // % of price per year
  foir: 0.5,            // banks commonly cap EMIs near half of net income
} as const;

export type QuizQuestion = {
  question: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explain: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "The area you can actually walk on inside your flat is called…",
    options: ["Super built-up area", "Carpet area", "Saleable area", "Loading"],
    answer: 1,
    explain: "Carpet area is the usable floor area measured inside the internal walls. Everything broader adds walls or shared spaces.",
  },
  {
    question: "A flat is quoted at 1,250 sq ft saleable but the carpet area is 900 sq ft. The difference is commonly called…",
    options: ["Undivided share", "Setback", "Loading", "FSI"],
    answer: 2,
    explain: "Loading is the gap between carpet area and the broader quoted area, usually shown as a percentage. Always ask which definition a price uses.",
  },
  {
    question: "RERA is best described as…",
    options: [
      "A builders' trade association",
      "A home-loan subsidy scheme",
      "The regulatory framework and state authorities for real estate",
      "A property listing website",
    ],
    answer: 2,
    explain: "RERA is the Real Estate (Regulation and Development) Act, 2016 and the state authorities it created. Projects and agents register under it.",
  },
  {
    question: "Which document concerns permission to occupy a completed building?",
    options: ["Encumbrance certificate", "Occupancy certificate", "Khata", "Allotment letter"],
    answer: 1,
    explain: "The occupancy certificate is issued by the authority after completion requirements are met. Ready property with an OC also changes the GST position.",
  },
  {
    question: "Your proportionate share in the land under an apartment project is the…",
    options: ["Undivided share", "Common area", "Super area", "Carpet ratio"],
    answer: 0,
    explain: "The undivided share (UDS) is your slice of the land itself — it is what remains yours even if the building is ever redeveloped.",
  },
  {
    question: "In a construction-linked payment plan, instalments become due…",
    options: [
      "Every month on a fixed date",
      "When stated construction milestones are reached",
      "Only at possession",
      "Whenever the builder requests",
    ],
    answer: 1,
    explain: "Payments are tied to milestones — foundation, structure, finishing. The exact triggers must be read from the agreement.",
  },
  {
    question: "GST on a completed flat that already has its occupancy certificate is…",
    options: ["5%", "12%", "1%", "Nil"],
    answer: 3,
    explain: "A completed property with an OC is not a supply of construction service, so no GST applies. Under-construction homes commonly carry 5% (1% affordable).",
  },
  {
    question: "In Karnataka, stamp duty on a ₹80 lakh flat falls in which slab?",
    options: ["2%", "3%", "5%", "7%"],
    answer: 2,
    explain: "Above ₹45 lakh the Karnataka slab is 5%, plus cess and surcharge on the duty and a separate registration charge.",
  },
  {
    question: "An encumbrance certificate is used to…",
    options: [
      "Prove the building is earthquake safe",
      "Review registered transactions on a property over a period",
      "Fix the property tax amount",
      "Replace a sale deed",
    ],
    answer: 1,
    explain: "The EC lists registered transactions and claims for a stated period. Useful — but it is not a substitute for full legal due diligence.",
  },
  {
    question: "A booking amount is best understood as…",
    options: [
      "A refundable deposit in every case",
      "An amount governed entirely by the written booking terms",
      "A government fee",
      "The first EMI",
    ],
    answer: 1,
    explain: "Whether and how a booking amount comes back is decided by the written booking and cancellation terms — read them before paying.",
  },
];

export const youtube = {
  channelId: "UCo3D0hn0uWOMmgUWjjfWlsA",
  handle: "@RealtorRohitSingh",
  url: "https://www.youtube.com/@RealtorRohitSingh",
  subscribeUrl: "https://www.youtube.com/@RealtorRohitSingh?sub_confirmation=1",
  feedUrl: "https://www.youtube.com/feeds/videos.xml?channel_id=UCo3D0hn0uWOMmgUWjjfWlsA",
} as const;
