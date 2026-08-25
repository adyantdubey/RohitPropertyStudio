// Converts scripts/seed-raw.txt (real rows noted from public K-RERA register
// summaries, Aug 2026) into app/lib/datalab/projects.json.
// Re-run after editing seed-raw.txt: node scripts/build-seed.mjs
import { readFileSync, writeFileSync } from "node:fs";

const ZONES = [
  ["North", ["devanahalli", "bagalur", "bagaluru", "yelahanka", "hebbal", "hennur", "thanisandra", "jakkur", "ivc road", "doddaballapura", "airport", "kogilu", "shettigere", "aerospace", "bellary", "hosahalli", "chikkajala", "rachenalli", "rachenahalli", "nagavara", "manyata", "sahakar nagar", "sanjeevini", "horamavu", "kalkere", "nandi", "north bengaluru"]],
  ["East", ["whitefield", "varthur", "panathur", "sarjapur", "bellandur", "gunjur", "budigere", "hoodi", "old madras", "hoskote", "kannamangala", "belathur", "nallurhalli", "chikkabanahalli", "ramagondanahalli", "soukya", "kodathi", "gattahalli", "hadosiddapura", "kaggadasapura", "yemalur", "hope farm", "cheemasandra", "outer ring road", "k r puram", "krishnarajapura", "marathahalli", "bhoganhalli", "basavanagar", "hal", "harlur", "chansandra", "rammurthynagar", "milestone"]],
  ["South", ["electronic city", "hosur", "begur", "bannerghatta", "kanakapura", "jp nagar", "j p nagar", "anekal", "attibele", "chandapura", "hosa road", "singasandra", "hsr layout", "manchenahalli", "kithiganahalli", "hommadevanahalli", "gottigere", "banashankari", "gowdanapalya", "koramangala", "jayanagar", "basavanagudi", "south bengaluru"]],
  ["West", ["yeshwanthpur", "tumkur road", "rajarajeshwari", "magadi", "nelamangala", "kumbalgodu", "goruguntepalya", "rajajinagar", "mysore road", "kengeri", "jalahalli", "malleshwaram"]],
  ["Central", ["lalbagh", "indiranagar", "richmond", "cunningham", "frazer", "shivajinagar", "vasanthnagar", "sadashivanagar", "ulsoor"]],
];

const zoneOf = (locality) => {
  const l = locality.toLowerCase();
  for (const [zone, keys] of ZONES) if (keys.some((k) => l.includes(k))) return zone;
  return "East";
};

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const rows = readFileSync(new URL("./seed-raw.txt", import.meta.url), "utf8")
  .split("\n").map((l) => l.trim()).filter(Boolean);

const seen = new Set();
const projects = [];
for (const row of rows) {
  const [name, promoter, rera, locality, status] = row.split("|").map((s) => s.trim());
  if (!name) continue;
  const slug = slugify(name);
  if (seen.has(slug)) continue;
  seen.add(slug);
  projects.push({
    slug,
    name,
    promoter: promoter || "",
    // Partial prefixes come from public register summaries; the collector
    // replaces them with full numbers straight from K-RERA.
    reraRef: rera || "",
    reraComplete: /\/\d{6}\/\d{6}$/.test(rera || ""),
    locality,
    zone: zoneOf(locality),
    status: status || "—",
  });
}

const out = {
  city: "Bengaluru",
  source: "Karnataka RERA public register, via published register summaries",
  asOf: "2026-08",
  note: "Seed set. Full register sync via scripts/collect-rera.mjs replaces this file.",
  verifyUrl: "https://rera.karnataka.gov.in/viewAllProjects",
  projects,
};
writeFileSync(new URL("../app/lib/datalab/projects.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(`wrote ${projects.length} projects`);
const byZone = {};
for (const p of projects) byZone[p.zone] = (byZone[p.zone] || 0) + 1;
console.log(byZone);
