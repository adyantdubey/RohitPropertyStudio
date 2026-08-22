"use client";

import { useMemo, useState } from "react";
import { useTweened } from "./useTweened";

type Layer = "carpet" | "built" | "super";

const AREAS: Record<Layer, { sqft: number; label: string; copy: string }> = {
  carpet: { sqft: 900, label: "Carpet area", copy: "The floor you actually walk on, measured inside the internal walls. This is the only area you can stand in." },
  built: { sqft: 1008, label: "Built-up area", copy: "Carpet plus the walls themselves and attached spaces like the balcony. The flat's physical footprint." },
  super: { sqft: 1250, label: "Super built-up area", copy: "Built-up plus your share of lobbies, lifts and corridors. Most quotes use this — the largest number for the same home." },
};

/** Isometric projection: unit grid → screen. */
const iso = (gx: number, gy: number, gz = 0): [number, number] =>
  [260 + (gx - gy) * 22, 150 + (gx + gy) * 11 - gz * 20];

function poly(points: Array<[number, number, number?]>): string {
  return points.map(([gx, gy, gz]) => iso(gx, gy, gz ?? 0).map((v) => v.toFixed(1)).join(",")).join(" ");
}

/** A flat plate with a visible extruded edge, drawn in iso space. */
function Plate({ x, y, w: pw, h: ph, z = 0, depth = 0.35, className }: { x: number; y: number; w: number; h: number; z?: number; depth?: number; className?: string }) {
  return (
    <g className={className}>
      <polygon className="xray__side" points={poly([[x, y + ph, z], [x + pw, y + ph, z], [x + pw, y + ph, z - depth], [x, y + ph, z - depth]])} />
      <polygon className="xray__side xray__side--r" points={poly([[x + pw, y, z], [x + pw, y + ph, z], [x + pw, y + ph, z - depth], [x + pw, y, z - depth]])} />
      <polygon className="xray__top" points={poly([[x, y, z], [x + pw, y, z], [x + pw, y + ph, z], [x, y + ph, z]])} />
    </g>
  );
}

/**
 * The x-ray apartment: one home, three area definitions, drawn as an
 * isometric cutaway. Switch layers and watch the same flat grow on paper
 * while the walls never move.
 */
export function XrayFlat() {
  const [layer, setLayer] = useState<Layer>("carpet");
  const [sqft] = useTweened(useMemo(() => [AREAS[layer].sqft], [layer]), 500);
  const order: Layer[] = ["carpet", "built", "super"];

  const pick = (next: Layer) => {
    setLayer(next);
    window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "xray_used" } }));
  };

  return (
    <div className="tool lab-tool xray">
      <div className="tool__controls">
        <div className="xray__layers" role="group" aria-label="Area definition">
          {order.map((key) => (
            <button key={key} type="button" className={`xray__layer${layer === key ? " is-active" : ""}`} onClick={() => pick(key)}>
              <strong>{AREAS[key].label}</strong>
              <span>{AREAS[key].sqft.toLocaleString("en-IN")} sq ft</span>
            </button>
          ))}
        </div>
        <div className="xray__readout" aria-live="polite">
          <strong>{Math.round(sqft).toLocaleString("en-IN")} <em>sq ft</em></strong>
          <p>{AREAS[layer].copy}</p>
        </div>
      </div>

      <div className={`xray__stage xray__stage--${layer}`}>
        <svg viewBox="0 0 520 330" role="img" aria-label={`${AREAS[layer].label}: ${AREAS[layer].sqft} square feet`}>
          {/* your share of common areas: lift + corridor block, floating apart */}
          <g className="xray__g xray__g--common">
            <Plate x={-4.6} y={1.2} w={2.2} h={2.2} z={0} className="xray__common" />
            <Plate x={-4.6} y={3.6} w={2.2} h={3.4} z={0} className="xray__common" />
            <polyline className="xray__link" points={`${iso(-2.4, 3.4).join(",")} ${iso(-0.4, 3.4).join(",")}`} />
            <text className="xray__tag" x={iso(-3.5, 0.6)[0]} y={iso(-3.5, 0.6)[1] - 10} textAnchor="middle">your share of lifts &amp; corridors</text>
          </g>

          {/* wall ring + balcony = built-up */}
          <g className="xray__g xray__g--built">
            <Plate x={-0.35} y={-0.35} w={10.7} h={7.7} z={-0.12} depth={0.3} className="xray__walls" />
            <Plate x={10.35} y={2.2} w={1.7} h={3.2} z={0} depth={0.25} className="xray__balcony" />
            <text className="xray__tag" x={iso(11.3, 6.4)[0]} y={iso(11.3, 6.4)[1] + 16} textAnchor="middle">balcony</text>
          </g>

          {/* carpet plate — always lit */}
          <g className="xray__g xray__g--carpet">
            <Plate x={0} y={0} w={10} h={7} z={0.12} depth={0.28} className="xray__carpet" />
            {/* room lines on the carpet */}
            <polyline className="xray__room" points={`${iso(4.2, 0.12, 0.12).join(",")} ${iso(4.2, 4.4, 0.12).join(",")} ${iso(10, 4.4, 0.12).join(",")}`} />
            <polyline className="xray__room" points={`${iso(4.2, 2.4, 0.12).join(",")} ${iso(0, 2.4, 0.12).join(",")}`} />
            <text className="xray__tag xray__tag--gold" x={iso(5, 5.9, 0.12)[0]} y={iso(5, 5.9, 0.12)[1]} textAnchor="middle">the floor you walk on</text>
          </g>
        </svg>
      </div>

      <p className="tool__note">
        Illustrative proportions ({AREAS.carpet.sqft} sq ft carpet growing to {AREAS.super.sqft} sq ft
        quoted). Definitions and loading vary by project — RERA requires carpet area to be stated, so
        always ask for the per-sq-ft rate on carpet before comparing two homes.
      </p>
    </div>
  );
}
