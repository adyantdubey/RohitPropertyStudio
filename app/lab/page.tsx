import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { AmbientBackdrop } from "../components/AmbientBackdrop";
import { ClosingCta } from "../components/ClosingCta";
import { ConstructionPlan } from "../components/lab/ConstructionPlan";
import { DealDecoder } from "../components/lab/DealDecoder";
import { EmiFlow } from "../components/lab/EmiFlow";
import { JourneyRail } from "../components/lab/JourneyRail";
import { OwnershipSimulator } from "../components/lab/OwnershipSimulator";
import { XrayFlat } from "../components/lab/XrayFlat";
import { PropertyQuiz } from "../components/lab/PropertyQuiz";
import { YouTubeRail } from "../components/lab/YouTubeRail";

export const metadata: Metadata = {
  title: "Property Lab",
  description: "Interactive simulators, an AI deal decoder and a property vocabulary quiz — play with the numbers before you face them in real life.",
  alternates: { canonical: "/lab" },
};

const instruments = [
  { number: "01", title: "Ownership Simulator", href: "#simulator", type: "The money story" },
  { number: "02", title: "The Build", href: "#build", type: "Payment plan" },
  { number: "03", title: "EMI Time Machine", href: "#emi-flow", type: "Where EMIs go" },
  { number: "04", title: "Buyer's Journey", href: "#journey", type: "Seven steps" },
  { number: "05", title: "X-ray Apartment", href: "#xray", type: "Area anatomy" },
  { number: "06", title: "AI Deal Decoder", href: "#decoder", type: "AI tool" },
  { number: "07", title: "Property IQ Quiz", href: "#quiz", type: "Ten questions" },
  { number: "08", title: "Watch the field", href: "#watch", type: "YouTube" },
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
              Instruments built from the same material the course teaches. Real statutory rates where
              the law sets them, your own assumptions everywhere else.
            </p>
            <div className="page-hero__actions" data-enter>
              <a className="button button--gold" href="#simulator">Open the simulator <ChevronDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="page-hero__aside" data-enter>
            <strong>Honest by design</strong>
            <p>Every legal rate names its source. Every assumption is a slider you control. Nothing here predicts, recommends or replaces professional verification.</p>
          </div>
        </div>
      </section>

      <section className="surface-dark">
        <div className="shell resource-index__grid resource-index__grid--4">
          {instruments.map((item) => (
            <a className="resource-index__item" href={item.href} key={item.number} data-reveal>
              <span>{item.number}</span>
              <div><small>{item.type}</small><strong>{item.title}</strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="section surface-light" id="simulator">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">01 · Ownership Simulator</p>
              <h2 data-split>The whole money story of one home, on one screen.</h2>
            </div>
            <p className="head__note" data-reveal>
              What the quoted price really becomes, what the loan costs each month, and how owning
              compares with renting over fifteen years — every number moves as you drag.
            </p>
          </div>
          <div data-reveal><OwnershipSimulator /></div>
        </div>
      </section>

      <section className="section surface-dark" id="build">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">02 · The Build</p>
              <h2 data-split>Watch your money become a building.</h2>
            </div>
            <p className="head__note" data-reveal>
              A construction-linked plan, drawn: select a milestone and the tower rises to show how much
              of the price is already out of your hands.
            </p>
          </div>
          <div data-reveal><ConstructionPlan /></div>
        </div>
      </section>

      <section className="section surface-light" id="emi-flow">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">03 · EMI Time Machine</p>
              <h2 data-split>Where every instalment actually goes.</h2>
            </div>
            <p className="head__note" data-reveal>
              Gold builds your equity; silver is the cost of borrowing. Scrub through the years and watch
              the balance of power shift.
            </p>
          </div>
          <div data-reveal><EmiFlow /></div>
        </div>
      </section>

      <JourneyRail />

      <section className="section surface-deep" id="xray">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">05 · X-ray Apartment</p>
              <h2 data-split>One flat. Three sizes on paper.</h2>
            </div>
            <p className="head__note" data-reveal>
              Carpet, built-up, super built-up — the same home in cutaway. The walls never move; only the
              definition grows.
            </p>
          </div>
          <div data-reveal><XrayFlat /></div>
        </div>
      </section>

      <section className="section surface-light" id="decoder">
        <div className="shell">
          <div className="head">
            <div className="head__main">
              <p className="eyebrow">06 · AI Deal Decoder</p>
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
              <p className="eyebrow">07 · Property IQ Quiz</p>
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
