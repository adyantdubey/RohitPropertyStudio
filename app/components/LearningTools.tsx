"use client";

import { useMemo, useState } from "react";

function track(event: string) {
  window.dispatchEvent(new CustomEvent("academy:track", { detail: { event } }));
}

export function AreaVisualizer() {
  const [carpetArea, setCarpetArea] = useState(900);
  const [wallAllowance, setWallAllowance] = useState(12);
  const [commonAllowance, setCommonAllowance] = useState(24);
  const areas = useMemo(() => {
    const builtUp = Math.round(carpetArea * (1 + wallAllowance / 100));
    const saleable = Math.round(builtUp * (1 + commonAllowance / 100));
    return { builtUp, saleable };
  }, [carpetArea, wallAllowance, commonAllowance]);

  return (
    <div className="learning-tool area-tool">
      <div className="learning-tool__controls">
        <label>
          <span>Example carpet area <strong>{carpetArea} sq ft</strong></span>
          <input type="range" min="500" max="2000" step="25" value={carpetArea} onChange={(event) => setCarpetArea(Number(event.target.value))} onPointerUp={() => track("area_tool_used")} />
        </label>
        <label>
          <span>Illustrative wall allowance <strong>{wallAllowance}%</strong></span>
          <input type="range" min="5" max="20" value={wallAllowance} onChange={(event) => setWallAllowance(Number(event.target.value))} />
        </label>
        <label>
          <span>Illustrative common-area allowance <strong>{commonAllowance}%</strong></span>
          <input type="range" min="10" max="40" value={commonAllowance} onChange={(event) => setCommonAllowance(Number(event.target.value))} />
        </label>
      </div>
      <div className="area-diagram" aria-live="polite">
        <div className="area-diagram__saleable"><span>Quoted example<br /><strong>{areas.saleable} sq ft</strong></span>
          <div className="area-diagram__built"><span>Built-up example<br /><strong>{areas.builtUp} sq ft</strong></span>
            <div className="area-diagram__carpet"><span>Carpet area<br /><strong>{carpetArea} sq ft</strong></span></div>
          </div>
        </div>
      </div>
      <p className="tool-note">Illustrative learning model only. Projects and documents may use different definitions or calculation methods; verify the exact basis before comparing.</p>
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
    <div className="learning-tool payment-tool">
      <div className="payment-tool__summary" aria-live="polite">
        <span>Illustrative cumulative payment</span>
        <strong>{accumulated}%</strong>
        <p>By the <b>{paymentStages[active].title.toLowerCase()}</b>, this example schedule has accumulated {accumulated}%.</p>
      </div>
      <div className="payment-tool__stages" role="list" aria-label="Illustrative payment stages">
        {paymentStages.map((stage, index) => (
          <button
            className={index <= active ? "is-active" : ""}
            key={stage.title}
            type="button"
            onClick={() => { setActive(index); track("payment_tool_used"); }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage.title}</strong>
            <small>{stage.percentage}% at this stage</small>
          </button>
        ))}
      </div>
      <p className="tool-note">This is not a quotation or recommended payment plan. Actual schedules, triggers, taxes and charges must be read from the current project documents.</p>
    </div>
  );
}
