"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Expand, X } from "lucide-react";
import { courseSlides } from "../lib/siteContent";

export function SlideGallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [active]);

  const selected = active === null ? null : courseSlides[active];

  return (
    <>
      <div className="slide-gallery">
        {courseSlides.map((slide, index) => (
          <button
            className="slide-card reveal"
            key={slide.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Open course preview: ${slide.label}`}
          >
            <span className="slide-card__image">
              <Image src={slide.src} alt={slide.alt} width={1600} height={900} sizes="(max-width: 760px) 92vw, 45vw" />
              <span className="slide-card__expand"><Expand size={18} aria-hidden="true" /></span>
            </span>
            <span className="slide-card__caption">
              <strong>{slide.label}</strong>
              <small>Slide {slide.slide} of 49</small>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="slide-modal" role="dialog" aria-modal="true" aria-label={`Course preview: ${selected.label}`}>
          <button className="slide-modal__backdrop" type="button" onClick={() => setActive(null)} aria-label="Close course preview" />
          <div className="slide-modal__panel">
            <button className="slide-modal__close" type="button" onClick={() => setActive(null)} aria-label="Close course preview">
              <X aria-hidden="true" />
            </button>
            <Image src={selected.src} alt={selected.alt} width={1600} height={900} priority sizes="92vw" />
            <div>
              <strong>{selected.label}</strong>
              <span>Course preview · slide {selected.slide} of 49</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
