import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import { DealDecoder } from "../components/lab/DealDecoder";
import { EmiEstimator } from "../components/lab/EmiEstimator";
import { PropertyQuiz } from "../components/lab/PropertyQuiz";
import { RentVsBuySimulator } from "../components/lab/RentVsBuySimulator";
import { TrueCostSimulator } from "../components/lab/TrueCostSimulator";
import { YouTubeRail } from "../components/lab/YouTubeRail";

export const metadata: Metadata = {
  title: "Property Lab",
  description: "Interactive simulators, an AI deal decoder and a property vocabulary quiz — play with the numbers before you face them in real life.",
  alternates: { canonical: "/lab" },
};

const instruments = [
  { number: "01", title: "True Cost Simulator", href: "#true-cost", type: "Simulator" },
  { number: "02", title: "Rent vs Buy Simulator", href: "#rent-vs-buy", type: "Simulator" },
  { number: "03", title: "EMI & Eligibility", href: "#emi", type: "Estimator" },
  { number: "04", title: "AI Deal Decoder", href: "#decoder", type: "AI tool" },
  { number: "05", title: "Property IQ Quiz", href: "#quiz", type: "Ten questions" },
] as const;

export default function LabPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <AmbientBackdrop />
        <div className="shell page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow" data-enter>Property Lab</p>
            <h1 data-split>Play with the numbers before you face them in real life.</h1>
            <p data-enter>
              Five instruments built from the same material the course teaches. Real statutory rates
              where the law sets them, your own assumptions everywhere else.
            </p>
            <div className="page-hero__actions" data-enter>
              <a className="button button--gold" href="#true-cost">Start with the true cost <ChevronDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="page-hero__aside" data-enter>
            <strong>Honest by design</strong>
            <p>Every legal rate names its source. Every assumption is a slider you control. Nothing here predicts, recommends or replaces professional verification.</p>
          </div>
        </div>
      </section>

      <section className="surface-dark">
        <div className="shell resource-index__grid resource-index__grid--5">
          {instruments.map((item) => (
            <a className="resource-index__item" href={item.href} key={item.number} data-reveal>
              <span>{item.number}</span>
              <div><small>{item.type}</small><strong>{item.title}</strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="section surface-light" id="true-cost">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">01 · True Cost Simulator</p>
              <h2 data-split>Why an ₹80 lakh home never costs ₹80 lakh.</h2>
            </div>
            <p className="head__note" data-reveal>
              Stamp duty, cess, surcharge, registration and GST — the statutory charges every buyer in
              Karnataka meets, on real current rates.
            </p>
          </div>
          <div data-reveal><TrueCostSimulator /></div>
        </div>
      </section>

      <section className="section surface-dark" id="rent-vs-buy">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">02 · Rent vs Buy Simulator</p>
              <h2 data-split>The oldest argument in property, as a picture.</h2>
            </div>
            <p className="head__note" data-reveal>
              Fifteen years, two paths, five sliders. Watch how small changes in assumptions flip the
              answer — that is the real lesson.
            </p>
          </div>
          <div data-reveal><RentVsBuySimulator /></div>
        </div>
      </section>

      <section className="section surface-light" id="emi">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">03 · EMI &amp; Eligibility</p>
              <h2 data-split>What a lender might actually stretch to.</h2>
            </div>
            <p className="head__note" data-reveal>
              The half-of-income rule banks commonly apply, turned into a dial. An orientation, not an
              offer.
            </p>
          </div>
          <div data-reveal><EmiEstimator /></div>
        </div>
      </section>

      <section className="section surface-deep" id="decoder">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">04 · AI Deal Decoder</p>
              <h2 data-split>Paste the jargon. Get it in plain English.</h2>
            </div>
            <p className="head__note" data-reveal>
              SBUA, PLC, corpus, CLP 10:80:10 — drop any line from a quote or brochure and the AI
              translates it, then lists what to verify in writing.
            </p>
          </div>
          <div data-reveal><DealDecoder /></div>
        </div>
      </section>

      <section className="section surface-dark" id="quiz">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">05 · Property IQ Quiz</p>
              <h2 data-split>Ten questions. How fluent are you already?</h2>
            </div>
            <p className="head__note" data-reveal>
              Drawn straight from the 49-slide course material. Instant feedback, honest score.
            </p>
          </div>
          <div data-reveal><PropertyQuiz /></div>
        </div>
      </section>

      <section className="section surface-deep" id="watch">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">From the field</p>
              <h2 data-split>The same lessons, walking through real projects.</h2>
            </div>
            <p className="head__note" data-reveal>
              Rohitt&apos;s channel — property tours, area deep dives and market answers from Bengaluru.
            </p>
          </div>
          <div data-reveal><YouTubeRail /></div>
        </div>
      </section>

      <ClosingCta eyebrow="From playing to learning" title="The Lab shows the numbers. The course explains them." />
    </main>
  );
}
