"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-entrance",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power2.out", delay: 0.15 },
      );

      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(elements, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08, ease: "power2.out" });
        },
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count || "0");
        const suffix = element.dataset.countSuffix || "";
        const counter = { value: 0 };
        ScrollTrigger.create({
          trigger: element,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: target,
              duration: 0.9,
              ease: "power2.out",
              onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
            });
          },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-media-reveal]").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.78,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      if (window.matchMedia("(min-width: 800px) and (pointer: fine)").matches) {
        document.querySelectorAll<HTMLElement>(".portrait-parallax").forEach((element) => gsap.to(element, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: element.parentElement ?? element, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }));
      }
    });

    return () => context.revert();
  }, [pathname]);

  return null;
}
