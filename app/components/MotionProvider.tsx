"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

type MotionProviderProps = {
  children: ReactNode;
};

const DESKTOP_FINE_POINTER = "(min-width: 768px) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Owns the site's global scroll loop. Section animations should still create
 * and clean up their own GSAP contexts and ScrollTriggers.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const desktopQuery = window.matchMedia(DESKTOP_FINE_POINTER);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION);

    let lenis: Lenis | null = null;
    let removeLenisScrollListener: (() => void) | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let refreshFrame = 0;
    let disposed = false;

    const requestRefresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    const destroyLenis = () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }

      removeLenisScrollListener?.();
      removeLenisScrollListener = null;

      lenis?.destroy();
      lenis = null;

      // Restore GSAP's defaults when Lenis no longer owns the shared ticker.
      gsap.ticker.lagSmoothing(500, 33);
    };

    const configureLenis = () => {
      destroyLenis();

      if (!desktopQuery.matches || reducedMotionQuery.matches) {
        requestRefresh();
        return;
      }

      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });

      removeLenisScrollListener = lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      requestRefresh();
    };

    const onVisibilityChange = () => {
      if (!lenis) return;

      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
        requestRefresh();
      }
    };

    configureLenis();
    desktopQuery.addEventListener("change", configureLenis);
    reducedMotionQuery.addEventListener("change", configureLenis);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Font swaps alter text metrics and therefore ScrollTrigger start/end
    // positions. The cancellation flag prevents a late promise from touching
    // an unmounted provider.
    void document.fonts.ready.then(() => {
      if (!disposed) requestRefresh();
    });

    if (document.readyState !== "complete") {
      window.addEventListener("load", requestRefresh, { once: true });
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", requestRefresh);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      desktopQuery.removeEventListener("change", configureLenis);
      reducedMotionQuery.removeEventListener("change", configureLenis);
      destroyLenis();
    };
  }, []);

  return children;
}

