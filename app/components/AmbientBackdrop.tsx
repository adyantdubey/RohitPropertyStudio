"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient cinematic backdrop.
 *
 * Layer order (bottom to top):
 *   1. canvas  — a generated, slowly drifting skyline. Always present, ~4KB of code,
 *                so the hero never depends on a video file existing.
 *   2. video   — optional. If the file is missing or the browser refuses to play it,
 *                the element removes itself and the canvas simply stays visible.
 *   3. scrim   — brand gradient that guarantees text contrast whatever is behind it.
 *   4. grain   — film grain, purely atmospheric.
 */
export function AmbientBackdrop({ video, poster }: { video?: string; poster?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  /* ---------- generated skyline ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Deterministic pseudo-random so the skyline is identical on every render.
    let seed = 20260821;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    type Block = { x: number; w: number; h: number; lights: Array<[number, number]> };
    type Layer = { speed: number; base: number; tone: string; blocks: Block[]; span: number };

    const buildLayer = (speed: number, base: number, tone: string, minW: number, maxW: number, minH: number, maxH: number): Layer => {
      const blocks: Block[] = [];
      let x = 0;
      while (x < 3200) {
        const w = minW + random() * (maxW - minW);
        const h = minH + random() * (maxH - minH);
        const lights: Array<[number, number]> = [];
        const cols = Math.max(1, Math.floor(w / 13));
        const rows = Math.max(1, Math.floor(h / 16));
        for (let c = 0; c < cols; c += 1) {
          for (let r = 0; r < rows; r += 1) {
            if (random() > 0.86) lights.push([c, r]);
          }
        }
        blocks.push({ x, w, h, lights });
        x += w + 3 + random() * 16;
      }
      return { speed, base, tone, blocks, span: x };
    };

    const layers: Layer[] = [
      buildLayer(0.0045, 0.60, "#131d31", 46, 120, 0.16, 0.42),
      buildLayer(0.0105, 0.74, "#0e1626", 38, 96, 0.14, 0.34),
      buildLayer(0.0210, 0.88, "#080f1b", 30, 78, 0.10, 0.24),
    ];

    let width = 0;
    let height = 0;
    let frame = 0;
    let elapsed = 0;
    let last = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      // Sky: cool near-black falling to a warm horizon.
      const sky = context.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#070c16");
      sky.addColorStop(0.58, "#0d1526");
      sky.addColorStop(1, "#141d33");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, height);

      // Horizon glow, drifting slowly across the width.
      const glowX = width * (0.42 + Math.sin(elapsed * 0.00007) * 0.22);
      const glow = context.createRadialGradient(glowX, height * 0.92, 0, glowX, height * 0.92, height * 0.85);
      glow.addColorStop(0, "rgba(198,161,91,0.17)");
      glow.addColorStop(0.55, "rgba(198,161,91,0.045)");
      glow.addColorStop(1, "rgba(198,161,91,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      // Hairline horizon, drawn behind the skyline.
      context.fillStyle = "rgba(198,161,91,0.16)";
      context.fillRect(0, height * 0.885, width, 1);

      layers.forEach((layer) => {
        const offset = (elapsed * layer.speed) % layer.span;
        const baseline = height * layer.base;
        context.fillStyle = layer.tone;
        for (let pass = 0; pass < 2; pass += 1) {
          const shift = pass * layer.span;
          layer.blocks.forEach((block) => {
            const x = block.x - offset + shift;
            if (x > width + 140 || x + block.w < -140) return;
            const h = block.h * height;
            context.fillRect(x, baseline - h, block.w, h + height);
            context.fillStyle = "rgba(226,199,142,0.5)";
            block.lights.forEach(([c, r]) => {
              const lx = x + 6 + c * 13;
              const ly = baseline - h + 9 + r * 16;
              if (lx > x + block.w - 5 || ly > baseline - 6) return;
              context.fillRect(lx, ly, 2.5, 3.5);
            });
            context.fillStyle = layer.tone;
          });
        }
      });
    };

    const loop = (now: number) => {
      if (!last) last = now;
      elapsed += Math.min(now - last, 48);
      last = now;
      draw();
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || frame) return;
      last = 0;
      frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw();
    if (!reduced) start();

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(host);

    const onResize = () => { resize(); draw(); };
    const onVisibility = () => (document.hidden ? stop() : start());
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  /* ---------- optional video layer ---------- */
  useEffect(() => {
    const element = videoRef.current;
    if (!element || !video) return;

    // Under reduced motion or Save-Data we simply never call play(). With
    // preload="none" and no autoplay attribute the file is never downloaded and
    // the element stays at opacity 0, so the canvas remains the backdrop.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || connection?.saveData) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void element.play().catch(() => setVideoOk(false));
      else element.pause();
    }, { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [video]);

  return (
    <div className="backdrop" ref={hostRef} aria-hidden="true">
      <canvas className="backdrop__canvas" ref={canvasRef} />
      {video && videoOk && (
        <video
          className={`backdrop__video${videoReady ? " is-ready" : ""}`}
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoOk(false)}
          src={video}
        />
      )}
      <div className="backdrop__scrim" />
      <div className="backdrop__grain" />
    </div>
  );
}
