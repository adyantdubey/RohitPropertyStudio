"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gstRates, labDefaults, stampDuty } from "../../lib/labData";
import { smoothPath, useTweened } from "./useTweened";

/* ---------- formatting ---------- */
const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const lakh = (n: number) => {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  return abs >= 10000000 ? `${sign}₹${(abs / 10000000).toFixed(2).replace(/\.00$/, "")} Cr` : `${sign}₹${(abs / 100000).toFixed(1).replace(/\.0$/, "")} L`;
};

/* ---------- finance ---------- */
export function emi(principal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

const YEARS = 15;
type Stage = "under" | "affordable" | "ready";

/**
 * One instrument for the whole money story: what the price really becomes,
 * what the loan costs each month, and how owning compares with renting over
 * fifteen years. Every output tweens smoothly as the sliders move.
 */
export function OwnershipSimulator() {
  const [price, setPrice] = useState(labDefaults.price);
  const [stage, setStage] = useState<Stage>("under");
  const [urban, setUrban] = useState(true);
  const [rent, setRent] = useState(labDefaults.monthlyRent);
  const [loanRate, setLoanRate] = useState(labDefaults.loanRate);
  const [appreciation, setAppreciation] = useState(labDefaults.appreciationPct);
  const [investReturn, setInvestReturn] = useState(labDefaults.investReturnPct);

  const model = useMemo(() => {
    // --- true cost ---
    const slab = stampDuty.slabs.find((s) => price <= s.upTo) ?? stampDuty.slabs[2];
    const duty = price * slab.rate;
    const cess = duty * stampDuty.cessOnDuty;
    const surcharge = duty * (urban ? stampDuty.surchargeUrban : stampDuty.surchargeRural);
    const registration = price * stampDuty.registrationRate;
    const gstRate = stage === "ready" ? gstRates.readyWithOC : stage === "affordable" ? gstRates.affordable : gstRates.underConstruction;
    const gst = price * gstRate;
    const extras = duty + cess + surcharge + registration + gst;

    // --- loan ---
    const down = price * (labDefaults.downPaymentPct / 100);
    const principal = price - down;
    const monthlyEmi = emi(principal, loanRate, labDefaults.loanYears);
    const incomeNeeded = monthlyEmi / labDefaults.foir;

    // --- 15-year comparison ---
    const monthlyRate = loanRate / 100 / 12;
    let loanBalance = principal;
    let renterPot = down + extras;
    let currentRent = rent;
    const owner: number[] = [];
    const renter: number[] = [];
    let crossover: number | null = null;
    for (let year = 0; year <= YEARS; year += 1) {
      const homeValue = price * Math.pow(1 + appreciation / 100, year);
      const ownerWealth = homeValue - loanBalance;
      owner.push(ownerWealth);
      renter.push(renterPot);
      if (crossover === null && year > 0 && ownerWealth > renterPot) crossover = year;
      for (let m = 0; m < 12; m += 1) {
        const interest = loanBalance * monthlyRate;
        loanBalance = Math.max(loanBalance + interest - monthlyEmi, 0);
        const maintenance = (price * (labDefaults.maintenancePctOfPrice / 100)) / 12;
        const difference = monthlyEmi + maintenance - currentRent;
        renterPot = renterPot * (1 + investReturn / 100 / 12) + Math.max(difference, 0);
      }
      currentRent *= 1 + labDefaults.rentGrowthPct / 100;
    }
    return { slab, duty, cess, surcharge, registration, gst, gstRate, extras, total: price + extras, monthlyEmi, incomeNeeded, owner, renter, crossover };
  }, [price, stage, urban, rent, loanRate, appreciation, investReturn]);

  /* ---------- tweened outputs ---------- */
  const headline = useTweened(useMemo(() => [model.total, model.extras, model.monthlyEmi, model.incomeNeeded], [model]));
  const bars = useTweened(useMemo(() => [model.duty, model.cess, model.surcharge, model.registration, model.gst], [model]));
  const ownerT = useTweened(model.owner);
  const renterT = useTweened(model.renter);

  const barLabels = [
    `Stamp duty · ${(model.slab.rate * 100).toFixed(0)}%`,
    "Cess · 10% of duty",
    `Surcharge · ${urban ? "2%" : "3%"} of duty`,
    "Registration · 2%",
    `GST · ${(model.gstRate * 100).toFixed(0)}%`,
  ];
  const maxBar = Math.max(...bars, 1);

  /* ---------- chart geometry ---------- */
  const w = 720, h = 280, pad = { t: 16, r: 14, b: 30, l: 8 };
  const all = [...ownerT, ...renterT, 0];
  const min = Math.min(...all), max = Math.max(...all) * 1.05 || 1;
  const x = (i: number) => pad.l + (i / YEARS) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
  const toPoints = (series: number[]): Array<[number, number]> => series.map((v, i) => [x(i), y(v)]);
  const ownerPath = smoothPath(toPoints(ownerT));
  const renterPath = smoothPath(toPoints(renterT));
  const areaPath = `${ownerPath} L${x(YEARS).toFixed(1)},${y(min).toFixed(1)} L${x(0).toFixed(1)},${y(min).toFixed(1)} Z`;

  return (
    <div className="tool lab-tool lab-tool--wide">
      <div className="tool__controls">
        <label><span>Property price <strong>{lakh(price)}</strong></span>
          <input type="range" min="3000000" max="30000000" step="100000" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
        <div className="lab-seg" role="group" aria-label="Property stage">
          <button type="button" className={stage === "under" ? "is-active" : ""} onClick={() => setStage("under")}>Under construction</button>
          <button type="button" className={stage === "affordable" ? "is-active" : ""} onClick={() => setStage("affordable")}>Affordable</button>
          <button type="button" className={stage === "ready" ? "is-active" : ""} onClick={() => setStage("ready")}>Ready + OC</button>
        </div>
        <div className="lab-seg" role="group" aria-label="Location class">
          <button type="button" className={urban ? "is-active" : ""} onClick={() => setUrban(true)}>Urban / BBMP</button>
          <button type="button" className={!urban ? "is-active" : ""} onClick={() => setUrban(false)}>Rural</button>
        </div>
        <label><span>Rent for a similar home <strong>₹{rent.toLocaleString("en-IN")}/mo</strong></span>
          <input type="range" min="10000" max="150000" step="1000" value={rent} onChange={(e) => setRent(Number(e.target.value))} /></label>
        <label><span>Loan rate <strong>{loanRate.toFixed(2)}% p.a.</strong></span>
          <input type="range" min="7" max="12" step="0.05" value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} /></label>
        <label><span>Assumed price growth <strong>{appreciation}% p.a.</strong></span>
          <input type="range" min="0" max="12" step="0.5" value={appreciation} onChange={(e) => setAppreciation(Number(e.target.value))} /></label>
        <label><span>Renter&apos;s investment return <strong>{investReturn}% p.a.</strong></span>
          <input type="range" min="3" max="14" step="0.5" value={investReturn} onChange={(e) => setInvestReturn(Number(e.target.value))} /></label>
      </div>

      <div className="lab-result" aria-live="polite">
        <div className="sim-readouts">
          <div className="sim-readout">
            <span>True cost of this home</span>
            <strong>{lakh(headline[0])}</strong>
            <small>+{inr(headline[1])} statutory charges</small>
          </div>
          <div className="sim-readout">
            <span>EMI · {labDefaults.downPaymentPct}% down, {labDefaults.loanYears} yrs</span>
            <strong>{inr(headline[2])}<em>/mo</em></strong>
            <small>needs roughly {inr(headline[3])}/mo net income</small>
          </div>
        </div>

        <div className="lab-bars">
          {barLabels.map((label, i) => (
            <div className="lab-bar" key={label}>
              <span className="lab-bar__label">{label}</span>
              <span className="lab-bar__track"><i style={{ width: `${Math.max((bars[i] / maxBar) * 100, bars[i] > 999 ? 3 : 0)}%` }} /></span>
              <span className="lab-bar__value">{bars[i] > 999 ? inr(bars[i]) : "—"}</span>
            </div>
          ))}
        </div>

        <div className="lab-chart">
          <div className="lab-chart__legend">
            <span className="lab-chart__key lab-chart__key--own">Owner&apos;s equity</span>
            <span className="lab-chart__key lab-chart__key--rent">Renter&apos;s investments</span>
            <strong>
              {model.crossover
                ? `Owning pulls ahead around year ${model.crossover}, on these assumptions`
                : "Renting stays ahead for all 15 years, on these assumptions"}
            </strong>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} role="img"
            aria-label={`Wealth over ${YEARS} years: owner ends at ${lakh(model.owner[YEARS])}, renter at ${lakh(model.renter[YEARS])}`}>
            <defs>
              <linearGradient id="own-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--gold)" stopOpacity=".22" />
                <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="lab-chart__area" d={areaPath} fill="url(#own-fill)" />
            <line className="lab-chart__axis" x1={pad.l} x2={w - pad.r} y1={y(Math.max(min, 0))} y2={y(Math.max(min, 0))} />
            {[5, 10, 15].map((yr) => (
              <text className="lab-chart__tick" key={yr} x={x(yr)} y={h - 10} textAnchor="middle">Yr {yr}</text>
            ))}
            <path className="lab-chart__line lab-chart__line--rent" d={renterPath} />
            <path className="lab-chart__line lab-chart__line--own" d={ownerPath} />
            {model.crossover !== null && (
              <circle className="lab-chart__cross" cx={x(model.crossover)} cy={y(ownerT[model.crossover] ?? 0)} r="4.5" />
            )}
            <text className="lab-chart__end" x={w - pad.r} y={y(ownerT[YEARS]) - 7} textAnchor="end">{lakh(ownerT[YEARS])}</text>
            <text className="lab-chart__end lab-chart__end--rent" x={w - pad.r} y={y(renterT[YEARS]) + 15} textAnchor="end">{lakh(renterT[YEARS])}</text>
          </svg>
        </div>
      </div>

      <p className="tool__note">
        {stampDuty.source}. {stampDuty.asOf} —{" "}
        <a className="text-link" href={stampDuty.verifyUrl} target="_blank" rel="noreferrer">
          verify on Kaveri <ArrowUpRight size={12} aria-hidden="true" />
        </a>. The comparison is a teaching model: {labDefaults.downPaymentPct}% down payment plus the
        statutory charges kept invested by the renter, {labDefaults.maintenancePctOfPrice}% of price as
        yearly maintenance, rent growing {labDefaults.rentGrowthPct}%/yr, EMI needing income within a
        {" "}{(labDefaults.foir * 100).toFixed(0)}% FOIR. Change the sliders and watch the answer flip —
        that is the lesson. Not a valuation, an offer or advice.
      </p>
    </div>
  );
}
