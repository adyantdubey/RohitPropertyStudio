"use client";

import { useMemo, useState } from "react";
import { labDefaults } from "../../lib/labData";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const lakh = (n: number) =>
  n >= 10000000
    ? `₹${(n / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`
    : `₹${(n / 100000).toFixed(1).replace(/\.0$/, "")} L`;

export function emi(principal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

/** Rough loan capacity from income, using the FOIR rule banks commonly apply. */
export function EmiEstimator() {
  const [income, setIncome] = useState(150_000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [rate, setRate] = useState(labDefaults.loanRate);
  const [years, setYears] = useState(labDefaults.loanYears);

  const result = useMemo(() => {
    const room = Math.max(income * labDefaults.foir - existingEmi, 0);
    const perLakh = emi(100000, rate, years);
    const principal = (room / perLakh) * 100000;
    const withDownPayment = principal / (1 - labDefaults.downPaymentPct / 100);
    return { room, principal, withDownPayment, perLakh };
  }, [income, existingEmi, rate, years]);

  const gauge = Math.min(result.room / Math.max(income, 1), 0.5) / 0.5;

  return (
    <div className="tool lab-tool">
      <div className="tool__controls">
        <label>
          <span>Net monthly income <strong>{inr(income)}</strong></span>
          <input type="range" min="30000" max="1000000" step="5000" value={income}
            onChange={(e) => setIncome(Number(e.target.value))} />
        </label>
        <label>
          <span>Existing EMIs per month <strong>{inr(existingEmi)}</strong></span>
          <input type="range" min="0" max="300000" step="2500" value={existingEmi}
            onChange={(e) => setExistingEmi(Number(e.target.value))} />
        </label>
        <label>
          <span>Illustrative loan rate <strong>{rate.toFixed(2)}% p.a.</strong></span>
          <input type="range" min="7" max="12" step="0.05" value={rate}
            onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label>
          <span>Tenure <strong>{years} years</strong></span>
          <input type="range" min="5" max="30" step="1" value={years}
            onChange={(e) => setYears(Number(e.target.value))} />
        </label>
      </div>

      <div className="lab-result" aria-live="polite">
        <div className="lab-result__headline">
          <span>Loan a lender might stretch to</span>
          <strong>{lakh(result.principal)}</strong>
          <small>≈ {lakh(result.withDownPayment)} home with a {labDefaults.downPaymentPct}% down payment</small>
        </div>
        <div className="lab-meter">
          <div className="lab-meter__track"><i style={{ width: `${gauge * 100}%` }} /></div>
          <div className="lab-meter__row"><span>EMI room used</span><strong>{inr(result.room)}/month</strong></div>
          <div className="lab-meter__row"><span>EMI per ₹1 lakh borrowed</span><strong>{inr(result.perLakh)}/month</strong></div>
        </div>
      </div>

      <p className="tool__note">
        Illustration only, using the common banking rule of keeping all EMIs near half of net income
        ({(labDefaults.foir * 100).toFixed(0)}% FOIR). Real eligibility depends on the lender, credit
        history, property and documentation — this is not a loan offer or financial advice.
      </p>
    </div>
  );
}
