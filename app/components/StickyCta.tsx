"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/** Appears once the visitor has passed the first screen, on every page. */
export function StickyCta() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const passedHero = window.scrollY > window.innerHeight * 0.9;
      const distanceToEnd = document.body.scrollHeight - (window.scrollY + window.innerHeight);
      // Stand down once the closing call to action and footer are on screen.
      setShown(passedHero && distanceToEnd > window.innerHeight * 1.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`sticky-cta${shown ? " is-shown" : ""}`}
      href="/contact#early-access-form"
      data-track="early_access_cta"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      Join early access <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
