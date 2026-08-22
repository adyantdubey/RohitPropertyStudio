"use client";

import { useMemo, useState } from "react";
import { useTweened } from "./useTweened";

const stages = [
  { title: "Booking", pct: 10 },
  { title: "Agreement", pct: 10 },
  { title: "Foundation", pct: 15 },
  { title: "Structure", pct: 20 },
  { title: "Services", pct: 20 },
  { title: "Finishing", pct: 20 },
  { title: "Possession", pct: 5 },
] as const;

/* building geometry */
const B = { left: 96, right: 268, base: 372, top: 84 };
const HEIGHT = B.base - B.top;
const COLS = [108, 132, 156, 180, 204, 228, 252];
const ROWS = Array.from({ length: 14 }, (_, i) => B.base - 16 - i * 20);

/**
 * The signature Lab visual: a construction-linked payment plan as a tower that
 * builds itself. Select a milestone — the paid share of the building rises,
 * windows light up floor by floor, and the crane climbs with the work.
 */
export function ConstructionPlan() {
  const [active, setActive] = useState(2);
  const cumulative = useMemo(() => stages.slice(0, active + 1).reduce((sum, s) => sum + s.pct, 0), [active]);
  const [fill] = useTweened(useMemo(() => [cumulative], [cumulative]), 650);

  const fillTopY = B.base - (fill / 100) * HEIGHT;
  const craneBaseY = Math.max(fillTopY - 26, B.top - 34);

  return (
    <div className="tool lab-tool build">
      <div className="tool__controls">
        <div className="stage-list">
          {stages.map((stage, index) => (
            <button
              className={`stage${index <= active ? " is-active" : ""}`}
              key={stage.title}
              type="button"
              aria-pressed={index <= active}
              onClick={() => {
                setActive(index);
                window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "construction_tool_used" } }));
              }}
            >
              <span className="stage__num">{String(index + 1).padStart(2, "0")}</span>
              <span className="stage__title">{stage.title}</span>
              <span className="stage__pct">{stage.pct}%</span>
            </button>
          ))}
        </div>
      </div>

      <div className="build__stage" aria-live="polite">
        <div className="build__readout">
          <span>Paid by the {stages[active].title.toLowerCase()} milestone</span>
          <strong>{Math.round(fill)}%</strong>
          <small>of the agreement value, on this illustrative schedule</small>
        </div>

        <svg className="build__svg" viewBox="0 0 360 400" role="img"
          aria-label={`Construction-linked plan: ${Math.round(cumulative)}% paid by the ${stages[active].title} milestone`}>
          {/* ground */}
          <line className="build__ground" x1="20" x2="340" y1={B.base} y2={B.base} />
          {/* unbuilt shell */}
          <rect className="build__shell" x={B.left} y={B.top} width={B.right - B.left} height={HEIGHT} />
          {/* built portion, clipped from the bottom */}
          <clipPath id="built-clip">
            <rect x={B.left - 30} y={fillTopY} width={B.right - B.left + 60} height={B.base - fillTopY} />
          </clipPath>
          <g clipPath="url(#built-clip)">
            <rect className="build__built" x={B.left} y={B.top} width={B.right - B.left} height={HEIGHT} />
            {ROWS.map((y) => COLS.map((x) => (
              <rect className="build__window" key={`${x}-${y}`} x={x} y={y} width="12" height="8" />
            )))}
          </g>
          {/* floors above the fill: faint window sockets */}
          {ROWS.filter((y) => y + 8 < fillTopY).map((y) => COLS.map((x) => (
            <rect className="build__socket" key={`s-${x}-${y}`} x={x} y={y} width="12" height="8" />
          )))}
          {/* completion line */}
          <line className="build__level" x1={B.left - 26} x2={B.right + 8} y1={fillTopY} y2={fillTopY} />
          {/* crane: mast, arm, counterweight, cable */}
          <g className="build__crane">
            <line x1={B.right + 34} x2={B.right + 34} y1={B.base} y2={craneBaseY} />
            <line x1={B.right + 34} x2={B.left + 30} y1={craneBaseY} y2={craneBaseY} />
            <line x1={B.right + 34} x2={B.right + 58} y1={craneBaseY} y2={craneBaseY} />
            <rect x={B.right + 50} y={craneBaseY - 4} width="10" height="8" />
            <line x1={B.left + 58} x2={B.left + 58} y1={craneBaseY} y2={Math.min(craneBaseY + 42, B.base - 6)} />
            <rect x={B.left + 52} y={Math.min(craneBaseY + 42, B.base - 6)} width="12" height="6" />
          </g>
        </svg>
      </div>

      <p className="tool__note">
        An illustrative construction-linked schedule — real plans differ per project and every trigger,
        tax and charge must be read from the agreement. The lesson is the shape: most of the money goes
        out while the building is still rising, which is exactly why milestone wording matters.
      </p>
    </div>
  );
}
