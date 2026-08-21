"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveHorizontal } from "lucide-react";
import { courseModules } from "../lib/siteContent";

/**
 * The homepage signature move: the four chapters travel sideways while the
 * section is pinned. Without JS, on touch, or under reduced motion this is a
 * plain horizontal scroll container with snap points — the content is identical.
 */
export function CurriculumRail() {
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

    const context = gsap.context(() => {
      const distance = () => Math.max(track.scrollWidth - window.innerWidth + 80, 0);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(bar, { scaleX: 0.02 + self.progress * 0.98, transformOrigin: "left" });
          },
        },
      });
      return () => tween.kill();
    }, section);

    return () => {
      section.classList.remove("is-pinned");
      context.revert();
    };
  }, []);

  return (
    <section className="rail surface-dark" id="curriculum" ref={sectionRef}>
      <div className="shell rail__head">
        <div className="head">
          <div className="head__main">
            <p className="eyebrow">Four learning chapters</p>
            <h2 data-split>A practical map for real property conversations.</h2>
          </div>
          <p className="head__note" data-reveal>
            The course starts with the essentials, then connects the language used across projects,
            site visits and sales discussions.
          </p>
        </div>
      </div>

      <div className="rail__viewport">
        <div className="rail__track" ref={trackRef}>
          {courseModules.map((module) => (
            <article className="rail__panel" key={module.number}>
              <div className="rail__num">{module.number}<small>Chapter</small></div>
              <div className="rail__body">
                <h3>{module.title}</h3>
                <p>{module.copy}</p>
              </div>
              <div className="rail__outcome">
                <small>Learning focus</small>
                <p>{module.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell">
        <div className="rail__progress"><i ref={barRef} /></div>
        <p className="rail__hint"><MoveHorizontal size={14} aria-hidden="true" /> Scroll to move through the chapters</p>
      </div>
    </section>
  );
}
