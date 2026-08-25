/* eslint-disable @next/next/no-img-element */
import covers from "../../lib/datalab/covers.json";
import { ProjectCover } from "./ProjectCover";

type CoverEntry = { src: string; credit: string };
const manifest = covers as Record<string, CoverEntry>;

/**
 * The project's image slot. A REAL photograph (builder-supplied with written
 * permission, or Hundred Yards' own) placed in public/datalab/covers/<slug>.jpg
 * and registered via `node scripts/build-covers.mjs` wins automatically, with
 * its credit line. Until then the signature drawn cover stands in — never a
 * portal image, never an unlabelled stock photo.
 */
export function ProjectImage({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  const real = manifest[slug];
  if (!real) return <ProjectCover slug={slug} name={name} compact={compact} />;
  return (
    <figure className={`pphoto${compact ? " pphoto--compact" : ""}`}>
      <img src={real.src} alt={`${name} — project photograph`} loading="lazy" />
      <figcaption>{real.credit}</figcaption>
    </figure>
  );
}
