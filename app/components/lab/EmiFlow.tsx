"use client";

import { useMemo, useState } from "react";
import { labDefaults } from "../../lib/labData";
import { smoothPath, useTweened } from "./useTweened";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const lakh = (n: number) => (n >= 10000000 ? `₹${(n / 10000000).toFixed(2).replace(/\.00$/, "")} Cr` : `₹${(n / 100000).toFixed(1).replace(/\.0$/, "")} L`);

/**
 * The EMI time machine: where every instalment actually goes. Two streams fill
 * the years — interest flowing away (silver) and principal becoming yours
 * (gold) — with a scrubber to stop at any year and read the honest split.
 */
export function EmiFlow() {
  const [amount, setAmount] = useState(6_400_000);
  const [rate, setRate] = useState(labDefaults.loanRate);
  const [years, setYears] = useState(labDefaults.loanYears);
  const [scrub, setScrub] = useState(8);

  const model = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const factor = Math.pow(1 + r, n);
    const emi = r === 0 ? amount / n : (amount * r * factor) / (factor - 1);
    let balance = amount;
    const cumInterest: number[] = [0];
    const cumPrincipal: number[] = [0];
    const yearInterestShare: number[] = [0];
    for (let year = 1; year <= years; year += 1) {
      let yi = 0, yp = 0;
      for (let m = 0; m < 12; m += 1) {
        const interest = balance * r;
        const principal = Math.min(emi - interest, balance);
        balance = Math.max(balance - principal, 0);
        yi += interest; yp += principal;
      }
      cumInterest.push(cumInterest[year - 1] + yi);
      cumPrincipal.push(cumPrincipal[year - 1] + yp);
      yearInterestShare.push(yi + yp > 0 ? yi / (yi + yp) : 0);
    }
    return { emi, cumInterest, cumPrincipal, yearInterestShare, totalPaid: cumInterest[years] + cumPrincipal[years] };
  }, [amount, rate, years]);

  const year = Math.min(scrub, years);
  const readout = useTweened(useMemo(
    () => [model.emi, model.cumInterest[year], model.cumPrincipal[year], model.yearInterestShare[year] * 100, model.totalPaid],
    [model, year],
  ));
  const interestT = useTweened(model.cumInterest);
  const principalT = useTweened(model.cumPrincipal);

  /* chart geometry — stacked: principal (gold, bottom) + interest (silver, above) */
  const w = 720, h = 280, pad = { t: 16, r: 14, b: 30, l: 8 };
  const N = model.cumInterest.length - 1;
  const top = Math.max(interestT[N] + principalT[N], 1) * 1.04;
  const x = (i: number) => pad.l + (i / N) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / top) * (h - pad.t - pad.b);
  const pts = (f: (i: number) => number): Array<[number, number]> => Array.from({ length: N + 1 }, (_, i) => [x(i), y(f(i))]);
  const principalLine = smoothPath(pts((i) => principalT[i]));
  const stackLine = smoothPath(pts((i) => principalT[i] + interestT[i]));
  const baseline = `L${x(N).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;
  const principalArea = `${principalLine} ${baseline}`;
  const interestArea = `${stackLine} L${x(N).toFixed(1)},${y(principalT[N]).toFixed(1)} ${smoothPath(pts((i) => principalT[i]).reverse()).replace(/^M/, "L")} Z`;

  return (
    <div className="tool lab-tool lab-tool--wide emiflow">
      <div className="tool__controls">
        <label><span>Loan amount <strong>{lakh(amount)}</strong></span>
          <input type="range" min="1000000" max="20000000" step="100000" value={amount}
            onChange={(e) => { setAmount(Number(e.target.value)); }} /></label>
        <label><span>Rate <strong>{rate.toFixed(2)}% p.a.</strong></span>
          <input type="range" min="7" max="12" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></label>
        <label><span>Tenure <strong>{years} years</strong></span>
          <input type="range" min="5" max="30" step="1" value={years}
            onChange={(e) => { const v = Number(e.target.value); setYears(v); setScrub((s) => Math.min(s, v)); }} /></label>
        <label><span>Time machine · stop at <strong>year {year}</strong></span>
          <input type="range" min="1" max={years} step="1" value={year}
            onChange={(e) => { setScrub(Number(e.target.value)); window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "emi_flow_used" } })); }} /></label>

        <div className="emiflow__stats">
          <div><span>EMI</span><strong>{inr(readout[0])}/mo</strong></div>
          <div><span>Interest paid by year {year}</span><strong className="emiflow__silver">{lakh(readout[1])}</strong></div>
          <div><span>Actually yours by year {year}</span><strong className="emiflow__gold">{lakh(readout[2])}</strong></div>
          <div><span>Of year-{year} EMIs, going to interest</span><strong>{readout[3].toFixed(0)}%</strong></div>
        </div>
      </div>

      <div className="lab-chart" aria-live="polite">
        <div className="lab-chart__legend">
          <span className="lab-chart__key lab-chart__key--own">Principal — builds your equity</span>
          <span className="lab-chart__key lab-chart__key--rent">Interest — the cost of borrowing</span>
          <strong>{lakh(readout[4])} paid over {years} years for a {lakh(amount)} loan</strong>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} role="img"
          aria-label={`Over ${years} years: ${lakh(model.cumPrincipal[N])} principal and ${lakh(model.cumInterest[N])} interest`}>
          <defs>
            <linearGradient id="flow-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity=".55" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity=".14" />
            </linearGradient>
            <linearGradient id="flow-silver" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ink)" stopOpacity=".30" />
              <stop offset="100%" stopColor="var(--ink)" stopOpacity=".06" />
            </linearGradient>
          </defs>
          <path d={interestArea} fill="url(#flow-silver)" />
          <path d={principalArea} fill="url(#flow-gold)" />
          <path className="lab-chart__line lab-chart__line--own" d={principalLine} />
          <path className="lab-chart__line lab-chart__line--rent" d={stackLine} />
          <line className="emiflow__scan" x1={x(year)} x2={x(year)} y1={pad.t} y2={h - pad.b} />
          <circle className="lab-chart__cross" cx={x(year)} cy={y(principalT[year])} r="4" />
          <circle className="lab-chart__cross emiflow__cross-silver" cx={x(year)} cy={y(principalT[year] + interestT[year])} r="4" />
          {[Math.round(N / 3), Math.round((2 * N) / 3), N].map((yr) => (
            <text className="lab-chart__tick" key={yr} x={x(yr)} y={h - 10} textAnchor="middle">Yr {yr}</text>
          ))}
        </svg>
      </div>

      <p className="tool__note">
        Illustrative amortisation of a fixed-rate loan. Early years are mostly interest — that is not a
        trick, it is how reducing-balance loans work — and part-prepayments in those years shorten the
        loan most. Actual schedules, resets and charges come from the lender&apos;s statement.
      </p>
    </div>
  );
}
