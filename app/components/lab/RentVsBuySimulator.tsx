"use client";

import { useMemo, useState } from "react";
import { labDefaults } from "../../lib/labData";
import { emi } from "./EmiEstimator";

const lakh = (n: number) => {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  return abs >= 10000000 ? `${sign}₹${(abs / 10000000).toFixed(2)} Cr` : `${sign}₹${(abs / 100000).toFixed(1)} L`;
};

const YEARS = 15;

/**
 * A deliberately simple wealth comparison. Every assumption is a visible
 * slider; the model is explained under the chart. This teaches the shape of
 * the trade-off — it does not decide anyone's life.
 */
export function RentVsBuySimulator() {
  const [price, setPrice] = useState(labDefaults.price);
  const [rent, setRent] = useState(labDefaults.monthlyRent);
  const [appreciation, setAppreciation] = useState(labDefaults.appreciationPct);
  const [investReturn, setInvestReturn] = useState(labDefaults.investReturnPct);
  const [loanRate, setLoanRate] = useState(labDefaults.loanRate);

  const model = useMemo(() => {
    const down = price * (labDefaults.downPaymentPct / 100);
    const upfrontExtras = price * 0.075; // statutory charges, see True Cost tool
    const principal = price - down;
    const monthlyEmi = emi(principal, loanRate, labDefaults.loanYears);
    const monthlyRate = loanRate / 100 / 12;

    const owner: number[] = [];
    const renter: number[] = [];
    let loanBalance = principal;
    let renterPot = down + upfrontExtras; // the renter keeps the upfront money invested
    let currentRent = rent;
    let crossover: number | null = null;

    for (let year = 0; year <= YEARS; year += 1) {
      const homeValue = price * Math.pow(1 + appreciation / 100, year);
      const ownerWealth = homeValue - loanBalance;
      owner.push(ownerWealth);
      renter.push(renterPot);
      if (crossover === null && year > 0 && ownerWealth > renterPot) crossover = year;

      // advance one year, month by month
      for (let m = 0; m < 12; m += 1) {
        const interest = loanBalance * monthlyRate;
        loanBalance = Math.max(loanBalance + interest - monthlyEmi, 0);
        const maintenance = (price * (labDefaults.maintenancePctOfPrice / 100)) / 12;
        const ownerOutgo = monthlyEmi + maintenance;
        const difference = ownerOutgo - currentRent;
        renterPot = renterPot * (1 + investReturn / 100 / 12) + Math.max(difference, 0);
      }
      currentRent *= 1 + labDefaults.rentGrowthPct / 100;
    }
    return { owner, renter, monthlyEmi, crossover };
  }, [price, rent, appreciation, investReturn, loanRate]);

  // chart geometry
  const w = 720, h = 300, pad = { t: 18, r: 16, b: 34, l: 8 };
  const all = [...model.owner, ...model.renter];
  const min = Math.min(...all, 0), max = Math.max(...all) * 1.05;
  const x = (i: number) => pad.l + (i / YEARS) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
  const path = (series: number[]) => series.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  return (
    <div className="tool lab-tool lab-tool--wide">
      <div className="tool__controls">
        <label><span>Property price <strong>{lakh(price)}</strong></span>
          <input type="range" min="3000000" max="30000000" step="250000" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
        <label><span>Rent for a similar home <strong>₹{rent.toLocaleString("en-IN")}/mo</strong></span>
          <input type="range" min="10000" max="150000" step="1000" value={rent} onChange={(e) => setRent(Number(e.target.value))} /></label>
        <label><span>Assumed price growth <strong>{appreciation}% p.a.</strong></span>
          <input type="range" min="0" max="12" step="0.5" value={appreciation} onChange={(e) => setAppreciation(Number(e.target.value))} /></label>
        <label><span>Renter&apos;s investment return <strong>{investReturn}% p.a.</strong></span>
          <input type="range" min="3" max="14" step="0.5" value={investReturn} onChange={(e) => setInvestReturn(Number(e.target.value))} /></label>
        <label><span>Loan rate <strong>{loanRate.toFixed(2)}% p.a.</strong></span>
          <input type="range" min="7" max="12" step="0.05" value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} /></label>
      </div>

      <div className="lab-chart" aria-live="polite">
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
          <line className="lab-chart__axis" x1={pad.l} x2={w - pad.r} y1={y(0)} y2={y(0)} />
          {[5, 10, 15].map((yr) => (
            <text className="lab-chart__tick" key={yr} x={x(yr)} y={h - 12} textAnchor="middle">Yr {yr}</text>
          ))}
          <path className="lab-chart__line lab-chart__line--rent" d={path(model.renter)} />
          <path className="lab-chart__line lab-chart__line--own" d={path(model.owner)} />
          {model.crossover !== null && (
            <circle className="lab-chart__cross" cx={x(model.crossover)} cy={y(model.owner[model.crossover])} r="4.5" />
          )}
          <text className="lab-chart__end" x={w - pad.r} y={y(model.owner[YEARS]) - 7} textAnchor="end">{lakh(model.owner[YEARS])}</text>
          <text className="lab-chart__end lab-chart__end--rent" x={w - pad.r} y={y(model.renter[YEARS]) + 15} textAnchor="end">{lakh(model.renter[YEARS])}</text>
        </svg>
      </div>

      <p className="tool__note">
        A teaching model, not a verdict. It assumes a {labDefaults.downPaymentPct}% down payment plus
        ~7.5% statutory charges which the renter instead keeps invested, EMI {lakh(model.monthlyEmi * 12)}/year
        on a {labDefaults.loanYears}-year loan, {labDefaults.maintenancePctOfPrice}% of price as yearly
        maintenance, and rent growing {labDefaults.rentGrowthPct}% a year. Real life adds taxes,
        vacancies, moves and negotiation — change the sliders and watch how easily the answer flips.
      </p>
    </div>
  );
}
