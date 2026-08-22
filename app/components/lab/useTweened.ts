"use client";

import { useEffect, useRef, useState } from "react";

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Tweens an array of numbers toward its target with rAF; instant under reduced motion. */
export function useTweened(target: number[], duration = 420): number[] {
  const [current, setCurrent] = useState(target);
  const fromRef = useRef(target);
  const frame = useRef(0);

  useEffect(() => {
    const ms = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duration;
    const from = fromRef.current.length === target.length ? fromRef.current : target;
    const start = performance.now();
    cancelAnimationFrame(frame.current);
    const tick = (now: number) => {
      const t = ms === 0 ? 1 : Math.min((now - start) / ms, 1);
      const eased = easeOut(t);
      const next = target.map((v, i) => from[i] + (v - from[i]) * eased);
      fromRef.current = next;
      setCurrent(next);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.join("|"), duration]);

  return current;
}

/** Catmull-Rom → cubic bezier: smooth curves instead of polylines. */
export function smoothPath(points: Array<[number, number]>): string {
  if (points.length < 2) return "";
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}
