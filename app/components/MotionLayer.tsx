"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The single motion vocabulary for the whole site.
 *
 *   data-split          headline: words rise out of a mask, once, on entry
 *   data-reveal         block: fades and lifts when it enters the viewport
 *   data-count          number: counts up once
 *   data-clip           media: wipes open from the bottom edge
 *   data-parallax       media: drifts slowly against the scroll
 *   data-scrub-words    statement: words brighten as the block is scrolled through
 *
 * Rules: 0.4-0.9s, power easing, no bounce or rotation, text never parallaxes,
 * and everything is skipped entirely under prefers-reduced-motion.
 */
export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal is CSS-driven so it still works if GSAP never loads.
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let revealObserver: IntersectionObserver | null = null;

    if (reduced) {
      revealTargets.forEach((element) => element.classList.add("is-in"));
    } else {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      revealTargets.forEach((element) => revealObserver?.observe(element));
    }

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>("[data-split], [data-enter]")
        .forEach((element) => { element.style.opacity = "1"; });
      return () => revealObserver?.disconnect();
    }

    gsap.registerPlugin(ScrollTrigger);

    const splitWords = (element: HTMLElement) => {
      if (element.dataset.splitDone === "true") return [];
      const words = (element.textContent || "").split(/\s+/).filter(Boolean);
      element.textContent = "";
      const inners: HTMLElement[] = [];
      words.forEach((word, index) => {
        const outer = document.createElement("span");
        outer.className = "split-word";
        const inner = document.createElement("span");
        inner.className = "split-word__inner";
        inner.textContent = word;
        outer.appendChild(inner);
        element.appendChild(outer);
        if (index < words.length - 1) element.appendChild(document.createTextNode(" "));
        inners.push(inner);
      });
      element.dataset.splitDone = "true";
      return inners;
    };

    const context = gsap.context(() => {
      /* --- headlines --- */
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((element) => {
        const inners = splitWords(element);
        if (!inners.length) return;
        gsap.set(element, { autoAlpha: 1 });
        gsap.fromTo(
          inners,
          { yPercent: 108 },
          {
            yPercent: 0,
            duration: 0.86,
            ease: "power3.out",
            stagger: 0.035,
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          },
        );
      });

      /* --- hero entrance chrome --- */
      gsap.fromTo(
        "[data-enter]",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.07, delay: 0.22 },
      );

      /* --- counters --- */
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count || "0");
        const suffix = element.dataset.countSuffix || "";
        const counter = { value: 0 };
        ScrollTrigger.create({
          trigger: element,
          start: "top 94%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: target,
              duration: 1.05,
              ease: "power2.out",
              onUpdate: () => { element.textContent = `${Math.round(counter.value).toLocaleString("en-IN")}${suffix}`; },
            });
          },
        });
      });

      /* --- self-drawing lines (charts) --- */
      document.querySelectorAll<SVGPathElement>("path[data-draw]").forEach((element) => {
        const length = element.getTotalLength();
        gsap.fromTo(
          element,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          },
        );
      });

      /* --- media wipes --- */
      document.querySelectorAll<HTMLElement>("[data-clip]").forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      /* --- statement: words brighten through the scroll --- */
      document.querySelectorAll<HTMLElement>("[data-scrub-words]").forEach((element) => {
        const inners = splitWords(element);
        if (!inners.length) return;
        ScrollTrigger.create({
          trigger: element,
          start: "top 78%",
          end: "bottom 55%",
          scrub: true,
          onUpdate: (self) => {
            const lit = Math.round(self.progress * inners.length);
            inners.forEach((inner, index) => inner.classList.toggle("is-lit", index < lit));
          },
        });
      });

      /* --- desktop-only parallax on media --- */
      if (window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
          gsap.to(element, {
            yPercent: Number(element.dataset.parallax || "5"),
            ease: "none",
            scrollTrigger: { trigger: element.parentElement ?? element, start: "top bottom", end: "bottom top", scrub: 0.7 },
          });
        });
      }
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 320);

    return () => {
      window.clearTimeout(refresh);
      revealObserver?.disconnect();
      context.revert();
    };
  }, [pathname]);

  return null;
}
