"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gstRates, stampDuty } from "../../lib/labData";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const lakh = (n: number) =>
  n >= 10000000
    ? `₹${(n / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`
    : `₹${(n / 100000).toFixed(1).replace(/\.0$/, "")} L`;

type Stage = "under" | "affordable" | "ready";

/** What a quoted price actually becomes once statutory charges are added. */
export function TrueCostSimulator() {
  const [price, setPrice] = useState(8_000_000);
  const [stage, setStage] = useState<Stage>("under");
  const [urban, setUrban] = useState(true);

  const result = useMemo(() => {
    const slab = stampDuty.slabs.find((s) => price <= s.upTo) ?? stampDuty.slabs[2];
    const duty = price * slab.rate;
    const cess = duty * stampDuty.cessOnDuty;
    const surcharge = duty * (urban ? stampDuty.surchargeUrban : stampDuty.surchargeRural);
    const registration = price * stampDuty.registrationRate;
    const gstRate = stage === "ready" ? gstRates.readyWithOC : stage === "affordable" ? gstRates.affordable : gstRates.underConstruction;
    const gst = price * gstRate;
    const extras = duty + cess + surcharge + registration + gst;
    return { slab, duty, cess, surcharge, registration, gst, gstRate, extras, total: price + extras };
  }, [price, stage, urban]);

  const rows = [
    { label: `Stamp duty (${result.slab.label.split("·")[1]?.trim() ?? ""})`, value: result.duty },
    { label: "Cess · 10% of duty", value: result.cess },
    { label: `Surcharge · ${urban ? "2%" : "3%"} of duty`, value: result.surcharge },
    { label: "Registration · 2%", value: result.registration },
    { label: `GST · ${(result.gstRate * 100).toFixed(0)}%`, value: result.gst },
  ];
  const maxRow = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="tool lab-tool">
      <div className="tool__controls">
        <label>
          <span>Quoted property price <strong>{lakh(price)}</strong></span>
          <input type="range" min="2000000" max="30000000" step="100000" value={price}
            onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <div className="lab-seg" role="group" aria-label="Property stage">
          <button type="button" className={stage === "under" ? "is-active" : ""} onClick={() => setStage("under")}>Under construction</button>
          <button type="button" className={stage === "affordable" ? "is-active" : ""} onClick={() => setStage("affordable")}>Affordable (1% GST)</button>
          <button type="button" className={stage === "ready" ? "is-active" : ""} onClick={() => setStage("ready")}>Ready with OC</button>
        </div>
        <div className="lab-seg" role="group" aria-label="Location class">
          <button type="button" className={urban ? "is-active" : ""} onClick={() => setUrban(true)}>Urban / BBMP</button>
          <button type="button" className={!urban ? "is-active" : ""} onClick={() => setUrban(false)}>Rural</button>
        </div>
      </div>

      <div className="lab-result" aria-live="polite">
        <div className="lab-result__headline">
          <span>The {lakh(price)} home actually costs</span>
          <strong>{lakh(result.total)}</strong>
          <small>+{inr(result.extras)} in statutory charges ({((result.extras / price) * 100).toFixed(1)}% on top)</small>
        </div>
        <div className="lab-bars">
          {rows.map((row) => (
            <div className="lab-bar" key={row.label}>
              <span className="lab-bar__label">{row.label}</span>
              <span className="lab-bar__track"><i style={{ width: `${Math.max((row.value / maxRow) * 100, row.value > 0 ? 3 : 0)}%` }} /></span>
              <span className="lab-bar__value">{row.value > 0 ? inr(row.value) : "—"}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="tool__note">
        {stampDuty.source}. {stampDuty.asOf} —{" "}
        <a className="text-link" href={stampDuty.verifyUrl} target="_blank" rel="noreferrer">
          verify on Kaveri <ArrowUpRight size={12} aria-hidden="true" />
        </a>. GST shown per the standard framework; the applicable rate for a specific project, khata,
        legal and loan charges are extra and must be confirmed in writing.
      </p>
    </div>
  );
}
