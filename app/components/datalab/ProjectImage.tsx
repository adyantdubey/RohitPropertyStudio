"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import covers from "../../lib/datalab/covers.json";
import { localityLatLng } from "../../lib/datalab/geo";
import { media } from "../../lib/siteContent";
import { ProjectCover } from "./ProjectCover";

type CoverEntry = { src: string; credit: string };
const manifest = covers as Record<string, CoverEntry>;

/**
 * The project's image slot, best available source first:
 *   1. A REAL photograph we have rights to (builder-permissioned or our own),
 *      from public/datalab/covers/<slug>.jpg via `node scripts/build-covers.mjs`.
 *   2. A live Google Street View photograph of the locality (served by Google,
 *      never copied or stored — allowed API use, with attribution). Requires
 *      media.googleMapsEmbedKey with Street View Static API enabled.
 *   3. The signature drawn cover. Never a portal image or unlabelled stock.
 */
export function ProjectImage({
  slug, name, locality, zone, compact = false,
}: { slug: string; name: string; locality: string; zone: string; compact?: boolean }) {
  const [streetFailed, setStreetFailed] = useState(false);
  const real = manifest[slug];

  if (real) {
    return (
      <figure className={`pphoto${compact ? " pphoto--compact" : ""}`}>
        <img src={real.src} alt={`${name} — project photograph`} loading="lazy" />
        <figcaption>{real.credit}</figcaption>
      </figure>
    );
  }

  if (media.googleMapsEmbedKey && !streetFailed) {
    const { lat, lng } = localityLatLng(locality, zone);
    const size = compact ? "480x220" : "640x330";
    const src = `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat.toFixed(4)},${lng.toFixed(4)}&fov=85&return_error_code=true&key=${media.googleMapsEmbedKey}`;
    return (
      <figure className={`pphoto${compact ? " pphoto--compact" : ""}`}>
        <img
          src={src}
          alt={`Street view near ${locality}`}
          loading="lazy"
          onError={() => setStreetFailed(true)}
        />
        <figcaption>Street view near {locality.split(",")[0]} · imagery © Google</figcaption>
      </figure>
    );
  }

  return <ProjectCover slug={slug} name={name} compact={compact} />;
}
