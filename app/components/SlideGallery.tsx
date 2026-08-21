"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { courseSlides } from "../lib/siteContent";

export function SlideGallery() {
  const [active, setActive] = useState<number | null>(null);

  const move = useCallback((step: number) => {
    setActive((current) => (current === null ? null : (current + step + courseSlides.length) % courseSlides.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    document.body.classList.add("is-locked");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [active, move]);

  const selected = active === null ? null : courseSlides[active];

  return (
    <>
      <div className="gallery">
        {courseSlides.map((slide, index) => (
          <button
            className="slide-card"
            key={slide.src}
            type="button"
            data-reveal
            onClick={() => {
              setActive(index);
              window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "course_preview_opened" } }));
            }}
            aria-label={`Open course preview: ${slide.label}`}
          >
            <span className="slide-card__frame">
              <Image src={slide.src} alt={slide.alt} width={1600} height={900} sizes="(max-width: 900px) 92vw, 45vw" />
              <span className="slide-card__badge"><Expand size={17} aria-hidden="true" /></span>
            </span>
            <span className="slide-card__meta">
              <strong>{slide.label}</strong>
              <small>Slide {slide.slide} / 49</small>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Course preview: ${selected.label}`}>
          <button className="lightbox__backdrop" type="button" onClick={() => setActive(null)} aria-label="Close course preview" />
          <div className="lightbox__panel">
            <button className="lightbox__close" type="button" onClick={() => setActive(null)} aria-label="Close course preview">
              <X size={18} aria-hidden="true" />
            </button>
            <Image src={selected.src} alt={selected.alt} width={1600} height={900} priority sizes="92vw" />
            <div className="lightbox__bar">
              <strong>{selected.label}</strong>
              <span>Slide {selected.slide} of 49</span>
              <div className="lightbox__nav">
                <button type="button" onClick={() => move(-1)} aria-label="Previous slide"><ChevronLeft size={18} aria-hidden="true" /></button>
                <button type="button" onClick={() => move(1)} aria-label="Next slide"><ChevronRight size={18} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
