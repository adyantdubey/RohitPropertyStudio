"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type RevealProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  start?: string;
  once?: boolean;
};

/**
 * A progressively enhanced entrance wrapper. Its server-rendered state is
 * visible; GSAP only prepares it as hidden after hydration when motion is safe.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.72,
  distance = 28,
  start = "top 88%",
  once = true,
  ...props
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let context: gsap.Context | null = null;
    let observer: IntersectionObserver | null = null;

    const clearAnimation = () => {
      observer?.disconnect();
      observer = null;
      context?.revert();
      context = null;
    };

    const setupAnimation = () => {
      clearAnimation();

      if (reducedMotionQuery.matches) {
        gsap.set(element, { clearProps: "opacity,transform,visibility" });
        return;
      }

      context = gsap.context(() => {
        // There is deliberately no matching hidden style in the rendered JSX:
        // content remains available when JavaScript is absent.
        gsap.set(element, { opacity: 0, y: distance });

        const tween = gsap.to(element, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          paused: true,
          clearProps: once ? "opacity,transform" : undefined,
        });

        try {
          ScrollTrigger.create({
            trigger: element,
            start,
            once,
            onEnter: () => tween.play(),
            onLeaveBack: once ? undefined : () => tween.reverse(),
          });
        } catch {
          // IntersectionObserver keeps the basic reveal usable if a runtime or
          // embedded browser cannot initialize ScrollTrigger.
          observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) return;
              tween.play();
              if (once) observer?.disconnect();
            },
            { rootMargin: "0px 0px -12% 0px" },
          );
          observer.observe(element);
        }
      }, element);
    };

    setupAnimation();
    reducedMotionQuery.addEventListener("change", setupAnimation);

    return () => {
      reducedMotionQuery.removeEventListener("change", setupAnimation);
      clearAnimation();
    };
  }, [delay, distance, duration, once, start]);

  return (
    <div ref={elementRef} {...props}>
      {children}
    </div>
  );
}

