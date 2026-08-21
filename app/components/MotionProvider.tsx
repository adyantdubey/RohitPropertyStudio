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

export type MotionQuality = "full" | "reduced";

type MotionContextValue = {
  reducedMotion: boolean;
  motionQuality: MotionQuality;
  smoothScrollEnabled: boolean;
  refreshScrollTriggers: () => void;
  scrollToTop: (options?: ScrollToTopOptions) => void;
};

const DESKTOP_FINE_POINTER = "(min-width: 768px) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type NavigatorWithDeviceSignals = Navigator & {
  connection?: EventTarget & { saveData?: boolean };
  deviceMemory?: number;
};

function getMotionQuality(
  navigatorValue: NavigatorWithDeviceSignals,
  prefersReducedMotion: boolean,
): MotionQuality {
  const cores = navigatorValue.hardwareConcurrency || undefined;
  const memory = navigatorValue.deviceMemory;
  const saveData = Boolean(navigatorValue.connection?.saveData);
  const veryLowCpu = cores !== undefined && cores <= 2;
  const veryLowMemory = memory !== undefined && memory <= 2;
  const jointlyConstrained =
    cores !== undefined && memory !== undefined && cores <= 4 && memory <= 4;

  return prefersReducedMotion || saveData || veryLowCpu || veryLowMemory || jointlyConstrained
    ? "reduced"
    : "full";
}

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  motionQuality: "reduced",
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
  const refreshTimerRef = useRef<number | null>(null);
  const refreshQueuedRef = useRef(false);
  const lastRefreshRef = useRef(0);
  const disposedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionQuality, setMotionQuality] = useState<MotionQuality>("reduced");
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(false);

  const refreshScrollTriggers = useCallback(() => {
    if (typeof window === "undefined" || refreshQueuedRef.current) return;

    const queueFrame = () => {
      refreshTimerRef.current = null;
      refreshFrameRef.current = window.requestAnimationFrame(() => {
        refreshQueuedRef.current = false;
        if (disposedRef.current) return;
        lastRefreshRef.current = performance.now();
        ScrollTrigger.refresh();
      });
    };

    refreshQueuedRef.current = true;
    const elapsed = performance.now() - lastRefreshRef.current;
    const delay = Math.max(0, 80 - elapsed);
    if (delay > 0) {
      refreshTimerRef.current = window.setTimeout(queueFrame, delay);
    } else {
      queueFrame();
    }
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
    const navigatorSignals = navigator as NavigatorWithDeviceSignals;
    const connection = navigatorSignals.connection;

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
      const nextMotionQuality = getMotionQuality(
        navigatorSignals,
        shouldReduceMotion,
      );
      setReducedMotion(shouldReduceMotion);
      setMotionQuality(nextMotionQuality);
      document.documentElement.dataset.motionQuality = nextMotionQuality;

      if (
        !desktopQuery.matches ||
        shouldReduceMotion ||
        nextMotionQuality === "reduced"
      ) {
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
    connection?.addEventListener("change", configureLenis);
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
      if (refreshTimerRef.current !== null) {
        window.clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      refreshQueuedRef.current = false;
      window.removeEventListener("load", refreshScrollTriggers);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      desktopQuery.removeEventListener("change", configureLenis);
      reducedMotionQuery.removeEventListener("change", configureLenis);
      connection?.removeEventListener("change", configureLenis);
      delete document.documentElement.dataset.motion;
      delete document.documentElement.dataset.motionQuality;
      destroyLenis();
    };
  }, [refreshScrollTriggers]);

  const value = useMemo<MotionContextValue>(
    () => ({
      reducedMotion,
      motionQuality,
      smoothScrollEnabled,
      refreshScrollTriggers,
      scrollToTop,
    }),
    [motionQuality, reducedMotion, refreshScrollTriggers, scrollToTop, smoothScrollEnabled],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
