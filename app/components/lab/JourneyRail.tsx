"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveHorizontal } from "lucide-react";

const steps = [
  { title: "Shortlist & verify", copy: "Check the project's RERA registration, the developer's delivered projects, and whether past towers received their OC.", collect: ["RERA number", "Title flow summary", "Sanctioned plan"] },
  { title: "Site visit", copy: "Walk the site with a written question list — which area definition prices use, what is included, what comes later.", collect: ["Site-visit checklist", "Cost sheet in writing"] },
  { title: "Booking", copy: "The booking form is a contract. Read the cancellation and refund clause before any money moves.", collect: ["Booking form copy", "Cancellation clause", "Payment receipt"] },
  { title: "Agreement of sale", copy: "The document that governs everything after — payment triggers, delay clauses, specifications. Worth a lawyer's hour.", collect: ["Draft agreement", "Payment schedule", "Legal review"] },
  { title: "Loan sanction", copy: "A sanction letter is not a disbursal. Confirm the conditions, the rate type, and when instalments actually flow.", collect: ["Sanction letter", "Rate & reset terms"] },
  { title: "Registration", copy: "Stamp duty, cess, surcharge and registration are paid here — the Ownership Simulator above shows the exact arithmetic.", collect: ["Sale deed", "Stamp duty receipts", "EC after registration"] },
  { title: "Possession & khata", copy: "Snag the unit against specifications, confirm the OC, then transfer the khata and set up maintenance.", collect: ["OC copy", "Possession letter", "Khata transfer"] },
] as const;

/**
 * The buyer's journey as a pinned horizontal film-strip — the same scroll
 * engine as the homepage curriculum rail. Plain horizontal swipe on touch,
 * static columns without JavaScript.
 */
export function JourneyRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !track || !bar) return;
    const canPin = window.matchMedia("(min-width: 1000px) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canPin || reduced) return;

    gsap.registerPlugin(ScrollTrigger);
    section.classList.add("is-pinned");
    const viewport = track.parentElement as HTMLElement;
    const context = gsap.context(() => {
      const distance = () => Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => gsap.set(bar, { scaleX: 0.02 + self.progress * 0.98, transformOrigin: "left" }),
        },
      });
    }, section);

    return () => {
      section.classList.remove("is-pinned");
      context.revert();
    };
  }, []);

  return (
    <section className="rail surface-dark" id="journey" ref={sectionRef}>
      <div className="shell rail__head">
        <div className="head">
          <div className="head__main">
            <p className="eyebrow">04 · The buyer&apos;s journey</p>
            <h2 data-split>Seven doors between shortlisting and holding the keys.</h2>
          </div>
          <p className="head__note" data-reveal>
            What happens at each step, and the paper to collect before walking through the next door.
          </p>
        </div>
      </div>

      <div className="rail__viewport">
        <div className="rail__track" ref={trackRef}>
          {steps.map((step, index) => (
            <article className="rail__panel" key={step.title}>
              <div className="rail__num">{String(index + 1).padStart(2, "0")}<small>Step</small></div>
              <div className="rail__body">
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              <div className="rail__outcome">
                <small>Collect before moving on</small>
                <div className="journey__chips">
                  {step.collect.map((doc) => <span key={doc}>{doc}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell">
        <div className="rail__progress"><i ref={barRef} /></div>
        <p className="rail__hint"><MoveHorizontal size={14} aria-hidden="true" /> Scroll to walk the journey</p>
      </div>
    </section>
  );
}
