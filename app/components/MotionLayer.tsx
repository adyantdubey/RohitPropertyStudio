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

      if (window.matchMedia("(min-width: 800px) and (pointer: fine)").matches) {
        gsap.to(".portrait-parallax", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".instructor-portrait", start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      }
    });

    return () => context.revert();
  }, [pathname]);

  return null;
}
