/**
 * K-RERA full register collector — Bengaluru.
 *
 * Run on a machine with open internet (NOT the build sandbox):
 *   node scripts/collect-rera.mjs
 * Then:
 *   node scripts/build-from-collected.mjs   (writes app/lib/datalab/projects.json)
 *
 * The Karnataka RERA portal (rera.karnataka.gov.in) is a server-rendered app.
 * This script walks its public project search page by page, saving raw HTML to
 * scripts/collected/ so a parse problem never loses a download. Be polite:
 * one request every 1.5s. If the portal's markup changed and parsing fails,
 * send the first saved HTML file back to Claude to adapt the parser.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const BASE = "https://rera.karnataka.gov.in";
const SEARCH_PATHS = ["/viewAllProjects", "/projectViewDetails", "/allProjects"];
const OUT = new URL("./collected/", import.meta.url);
const DELAY_MS = 1500;
const MAX_PAGES = 600; // ~25 rows/page covers the full Bengaluru register

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchText = async (url, init) => {
  const res = await fetch(url, {
    ...init,
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; HundredYardsAcademy/1.0; contact: sales@100yards.in)",
      accept: "text/html,application/xhtml+xml",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
};

const main = async () => {
  mkdirSync(OUT, { recursive: true });

  // 1. Find the live search page.
  let searchPath = null;
  for (const path of SEARCH_PATHS) {
    try {
      const html = await fetchText(BASE + path);
      writeFileSync(new URL(`probe${path.replace(/\//g, "_")}.html`, OUT), html);
      searchPath = path;
      console.log(`found search page: ${path} (${html.length} bytes)`);
      break;
    } catch (error) {
      console.log(`  ${path}: ${error.message}`);
    }
  }
  if (!searchPath) {
    console.error("\nNo known search path responded. Open rera.karnataka.gov.in in a browser,");
    console.error("find the project-search URL, and add it to SEARCH_PATHS at the top.");
    process.exit(1);
  }

  // 2. Page through Bengaluru Urban (district code usually 'Bengaluru Urban').
  //    The portal paginates via query params; both common shapes are tried.
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const file = new URL(`page-${String(page).padStart(3, "0")}.html`, OUT);
    if (existsSync(file)) continue; // resumable
    const candidates = [
      `${BASE}${searchPath}?district=Bengaluru+Urban&page=${page}`,
      `${BASE}${searchPath}?dist=Bengaluru+Urban&pageNo=${page}`,
    ];
    let saved = false;
    for (const url of candidates) {
      try {
        const html = await fetchText(url);
        writeFileSync(file, html);
        console.log(`page ${page}: saved (${html.length} bytes)`);
        saved = true;
        break;
      } catch (error) {
        console.log(`page ${page}: ${error.message}`);
      }
    }
    if (!saved) {
      console.error(`Stopping at page ${page}. If pages 1+ saved fine this is simply the end of the register.`);
      break;
    }
    await sleep(DELAY_MS);
  }
  console.log("\nDone. Now run: node scripts/build-from-collected.mjs");
  console.log("If the saved HTML has no project rows, send scripts/collected/page-001.html to Claude.");
};

main().catch((error) => { console.error(error); process.exit(1); });
