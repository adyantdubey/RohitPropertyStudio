"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient video behind a section. Muted, looped, tinted navy so text stays
 * readable. If the file is missing or playback is refused, the element removes
 * itself and the section quietly keeps its plain surface. Plays only while on
 * screen; never downloads under reduced motion or Save-Data.
 */
export function SectionVideo({ src, opacity = 0.38 }: { src: string; opacity?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || connection?.saveData) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void element.play().catch(() => setOk(false));
      else element.pause();
    }, { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ok]);

  if (!ok) return null;
  return (
    <div className="section-video" aria-hidden="true" style={{ opacity }}>
      <video ref={videoRef} muted loop playsInline preload="none" src={src} onError={() => setOk(false)} />
      <div className="section-video__tint" />
    </div>
  );
}
