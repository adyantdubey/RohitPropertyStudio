"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

type MotionProviderProps = {
  children: ReactNode;
};

type ScrollToTopOptions = {
  immediate?: boolean;
};

type MotionContextValue = {
  reducedMotion: boolean;
  smoothScrollEnabled: boolean;
  refreshScrollTriggers: () => void;
  scrollToTop: (options?: ScrollToTopOptions) => void;
};

const DESKTOP_FINE_POINTER = "(min-width: 768px) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  smoothScrollEnabled: false,
  refreshScrollTriggers: () => undefined,
  scrollToTop: () => undefined,
});

export function useMotion() {
  return useContext(MotionContext);
}

/**
 * Owns the site's single global scroll loop. Section animations should still
 * create and clean up their own GSAP contexts and ScrollTriggers.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const refreshFrameRef = useRef(0);
  const disposedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(false);

  const refreshScrollTriggers = useCallback(() => {
    if (typeof window === "undefined") return;

    window.cancelAnimationFrame(refreshFrameRef.current);
    refreshFrameRef.current = window.requestAnimationFrame(() => {
      if (!disposedRef.current) ScrollTrigger.refresh();
    });
  }, []);

  const scrollToTop = useCallback(({ immediate = true }: ScrollToTopOptions = {}) => {
    if (typeof window === "undefined") return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate, force: true });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: immediate ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    disposedRef.current = false;

    const desktopQuery = window.matchMedia(DESKTOP_FINE_POINTER);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION);

    let removeLenisScrollListener: (() => void) | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    const destroyLenis = () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }

      removeLenisScrollListener?.();
      removeLenisScrollListener = null;

      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (!disposedRef.current) setSmoothScrollEnabled(false);

      // Restore GSAP's defaults when Lenis no longer owns the shared ticker.
      gsap.ticker.lagSmoothing(500, 33);
    };

    const configureLenis = () => {
      destroyLenis();

      const shouldReduceMotion = reducedMotionQuery.matches;
      setReducedMotion(shouldReduceMotion);

      if (!desktopQuery.matches || shouldReduceMotion) {
        document.documentElement.dataset.motion = "native";
        refreshScrollTriggers();
        return;
      }

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });
      lenisRef.current = lenis;

      removeLenisScrollListener = lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.dataset.motion = "smooth";
      setSmoothScrollEnabled(true);
      refreshScrollTriggers();
    };

    const onVisibilityChange = () => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
        refreshScrollTriggers();
      }
    };

    configureLenis();
    desktopQuery.addEventListener("change", configureLenis);
    reducedMotionQuery.addEventListener("change", configureLenis);
    document.addEventListener("visibilitychange", onVisibilityChange);

    void document.fonts.ready.then(() => {
      if (!disposedRef.current) refreshScrollTriggers();
    });

    if (document.readyState !== "complete") {
      window.addEventListener("load", refreshScrollTriggers, { once: true });
    }

    return () => {
      disposedRef.current = true;
      window.cancelAnimationFrame(refreshFrameRef.current);
      window.removeEventListener("load", refreshScrollTriggers);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      desktopQuery.removeEventListener("change", configureLenis);
      reducedMotionQuery.removeEventListener("change", configureLenis);
      delete document.documentElement.dataset.motion;
      destroyLenis();
    };
  }, [refreshScrollTriggers]);

  const value = useMemo<MotionContextValue>(
    () => ({
      reducedMotion,
      smoothScrollEnabled,
      refreshScrollTriggers,
      scrollToTop,
    }),
    [reducedMotion, refreshScrollTriggers, scrollToTop, smoothScrollEnabled],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
