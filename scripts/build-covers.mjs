/**
 * Scans public/datalab/covers/ for real project images and writes the manifest
 * the site reads. Run after adding or removing photos:
 *   node scripts/build-covers.mjs
 *
 * File naming: <project-slug>.jpg|jpeg|png|webp  (slugs from projects.json)
 * Optional credits: covers-credits.json in the same folder,
 *   { "<slug>": "Image: Sobha Ltd media kit, used with permission" }
 * Only add images you have the right to use: builder-supplied with written
 * permission, or Hundred Yards' own photographs. Never portal images.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(ROOT, "public/datalab/covers");
const registry = JSON.parse(readFileSync(path.join(ROOT, "app/lib/datalab/projects.json"), "utf8"));
const slugs = new Set(registry.projects.map((p) => p.slug));

const creditsPath = path.join(dir, "covers-credits.json");
const credits = existsSync(creditsPath) ? JSON.parse(readFileSync(creditsPath, "utf8")) : {};

const manifest = {};
for (const file of (existsSync(dir) ? readdirSync(dir) : [])) {
  const match = file.match(/^(.+)\.(jpe?g|png|webp)$/i);
  if (!match) continue;
  const slug = match[1];
  if (!slugs.has(slug)) { console.warn(`skip ${file}: no project with slug "${slug}"`); continue; }
  manifest[slug] = {
    src: `/datalab/covers/${file}`,
    credit: credits[slug] || "Image: Hundred Yards",
  };
}
writeFileSync(path.join(ROOT, "app/lib/datalab/covers.json"), JSON.stringify(manifest, null, 1));
console.log(`manifest: ${Object.keys(manifest).length} real cover(s)`);
