"use client";

import { useMemo, useState } from "react";

function track(event: string) {
  window.dispatchEvent(new CustomEvent("academy:track", { detail: { event } }));
}

/** Teaches comparison discipline: one usable area, several labels stacked around it. */
export function AreaVisualizer() {
  const [carpetArea, setCarpetArea] = useState(900);
  const [wallAllowance, setWallAllowance] = useState(12);
  const [commonAllowance, setCommonAllowance] = useState(24);

  const areas = useMemo(() => {
    const builtUp = Math.round(carpetArea * (1 + wallAllowance / 100));
    const saleable = Math.round(builtUp * (1 + commonAllowance / 100));
    const loading = Math.round(((saleable - carpetArea) / carpetArea) * 100);
    return { builtUp, saleable, loading };
  }, [carpetArea, wallAllowance, commonAllowance]);

  return (
    <div className="tool tool--area">
      <div className="tool__controls">
        <label>
          <span>Example carpet area <strong>{carpetArea} sq ft</strong></span>
          <input type="range" min="500" max="2000" step="25" value={carpetArea}
            onChange={(event) => setCarpetArea(Number(event.target.value))}
            onPointerUp={() => track("area_tool_used")} />
        </label>
        <label>
          <span>Illustrative wall allowance <strong>{wallAllowance}%</strong></span>
          <input type="range" min="5" max="20" value={wallAllowance}
            onChange={(event) => setWallAllowance(Number(event.target.value))} />
        </label>
        <label>
          <span>Illustrative common-area allowance <strong>{commonAllowance}%</strong></span>
          <input type="range" min="10" max="40" value={commonAllowance}
            onChange={(event) => setCommonAllowance(Number(event.target.value))} />
        </label>
        <p className="tool__note tool__note--inline">
          Quoted area is <strong>{areas.loading}%</strong> larger than the carpet area in this example.
        </p>
      </div>

      <div className="area-diagram" aria-live="polite">
        <div className="area-box area-box--saleable" style={{ padding: `${34 + commonAllowance}px ${14 + commonAllowance / 2}px ${14 + commonAllowance / 2}px` }}>
          <span className="area-box__label">Quoted example</span>
          <span className="area-box__value">{areas.saleable} sq ft</span>
          <div className="area-box area-box--built" style={{ padding: `${34 + wallAllowance}px ${12 + wallAllowance / 2}px ${12 + wallAllowance / 2}px` }}>
            <span className="area-box__label">Built-up example</span>
            <span className="area-box__value">{areas.builtUp} sq ft</span>
            <div className="area-box area-box--carpet">
              <span className="area-box__label">Carpet area</span>
              <span className="area-box__value">{carpetArea} sq ft</span>
            </div>
          </div>
        </div>
      </div>

      <p className="tool__note">
        Illustrative learning model only. Projects and documents may use different definitions or
        calculation methods; verify the exact basis before comparing.
      </p>
    </div>
  );
}

const paymentStages = [
  { title: "Booking", percentage: 10 },
  { title: "Agreement milestone", percentage: 10 },
  { title: "Foundation milestone", percentage: 15 },
  { title: "Structure milestone", percentage: 20 },
  { title: "Services milestone", percentage: 20 },
  { title: "Finishing milestone", percentage: 20 },
  { title: "Possession milestone", percentage: 5 },
] as const;

export function PaymentPlanExplorer() {
  const [active, setActive] = useState(0);
  const accumulated = paymentStages.slice(0, active + 1).reduce((sum, stage) => sum + stage.percentage, 0);

  return (
    <div className="tool tool--payment">
      <div className="tool__summary" aria-live="polite">
        <span>Illustrative cumulative payment</span>
        <strong>{accumulated}%</strong>
        <p>By the <b>{paymentStages[active].title.toLowerCase()}</b>, this example schedule has accumulated {accumulated}%.</p>
      </div>

      <div className="stage-list">
        {paymentStages.map((stage, index) => (
          <button
            className={`stage${index <= active ? " is-active" : ""}`}
            key={stage.title}
            type="button"
            aria-pressed={index <= active}
            onClick={() => { setActive(index); track("payment_tool_used"); }}
          >
            <span className="stage__num">{String(index + 1).padStart(2, "0")}</span>
            <span className="stage__title">{stage.title}</span>
            <span className="stage__pct">{stage.percentage}%</span>
          </button>
        ))}
      </div>

      <p className="tool__note">
        This is not a quotation or a recommended payment plan. Actual schedules, triggers, taxes and
        charges must be read from the current project documents.
      </p>
    </div>
  );
}
