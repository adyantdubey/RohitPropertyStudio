"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { useMotion } from "./MotionProvider";

type NavigateOptions = {
  scroll: boolean;
};

type RouteCurtainContextValue = {
  navigate: (href: string, options: NavigateOptions) => void;
};

const RouteCurtainContext = createContext<RouteCurtainContextValue | null>(null);

export type RouteCurtainProps = {
  children: ReactNode;
  label?: string;
};

/**
 * Opt-in route transition provider. It only animates navigation initiated by
 * TransitionLink, leaving Back/Forward restoration and ordinary links native.
 */
export function RouteCurtain({
  children,
  label = "ROHIT / PROPERTY, READ CLEARLY",
}: RouteCurtainProps) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitioningRef = useRef(false);
  const pendingPathRef = useRef<string | null>(null);
  const shouldScrollRef = useRef(true);
  const { reducedMotion, refreshScrollTriggers, scrollToTop } = useMotion();
  const [announcement, setAnnouncement] = useState("");

  const resetCurtain = useCallback(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    timelineRef.current?.kill();
    gsap.set(curtain, {
      yPercent: 100,
      autoAlpha: 0,
      pointerEvents: "none",
    });
    if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0 });
    transitioningRef.current = false;
    pendingPathRef.current = null;
    document.documentElement.removeAttribute("data-route-transition");
  }, []);

  const navigate = useCallback(
    (href: string, { scroll }: NavigateOptions) => {
      if (transitioningRef.current) return;

      const destination = new URL(href, window.location.href);
      pendingPathRef.current = destination.pathname;
      shouldScrollRef.current = scroll;

      if (reducedMotion || !curtainRef.current) {
        pendingPathRef.current = null;
        router.push(href, { scroll });
        return;
      }

      transitioningRef.current = true;
      document.documentElement.setAttribute("data-route-transition", "true");
      timelineRef.current?.kill();

      timelineRef.current = gsap
        .timeline({
          onComplete: () => router.push(href, { scroll: false }),
        })
        .set(curtainRef.current, {
          yPercent: 100,
          autoAlpha: 1,
          pointerEvents: "auto",
        })
        .set(lineRef.current, { scaleX: 0, transformOrigin: "left" })
        .to(curtainRef.current, {
          yPercent: 0,
          duration: 0.42,
          ease: "power4.inOut",
        })
        .to(
          lineRef.current,
          { scaleX: 1, duration: 0.32, ease: "power3.out" },
          "-=0.2",
        );

      timeoutRef.current = setTimeout(resetCurtain, 5000);
    },
    [reducedMotion, resetCurtain, router],
  );

  useEffect(() => {
    if (!transitioningRef.current || pendingPathRef.current !== pathname) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    if (shouldScrollRef.current) scrollToTop({ immediate: true });

    const frame = window.requestAnimationFrame(() => {
      refreshScrollTriggers();
      timelineRef.current?.kill();
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          const main = document.querySelector<HTMLElement>("main");
          if (main) {
            const hadTabIndex = main.hasAttribute("tabindex");
            if (!hadTabIndex) main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: true });
            if (!hadTabIndex) main.removeAttribute("tabindex");
          }

          setAnnouncement(document.title);
          resetCurtain();
        },
      });
      timelineRef.current.to(curtainRef.current, {
        yPercent: -100,
        duration: 0.56,
        ease: "power4.inOut",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, refreshScrollTriggers, resetCurtain, scrollToTop]);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.documentElement.removeAttribute("data-route-transition");
    },
    [],
  );

  return (
    <RouteCurtainContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtainRef}
        className="route-curtain"
        aria-hidden="true"
        style={{
          position: "fixed",
          zIndex: 1000,
          inset: 0,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          visibility: "hidden",
          pointerEvents: "none",
          background: "var(--paper, #f1efe8)",
          transform: "translateY(100%)",
        }}
      >
        <div className="route-curtain__grid" />
        <div className="route-curtain__content">
          <span className="route-curtain__mark" aria-hidden="true">R</span>
          <small className="route-curtain__label">{label}</small>
        </div>
        <span
          ref={lineRef}
          className="route-curtain__line"
          style={{ position: "absolute", right: "4vw", bottom: "8vh", left: "4vw", height: 1 }}
        />
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </RouteCurtainContext.Provider>
  );
}

export type TransitionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onClick"
> & {
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function TransitionLink({
  href,
  onClick,
  scroll = true,
  target,
  ...props
}: TransitionLinkProps) {
  const context = useContext(RouteCurtainContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !context) return;

    const anchor = event.currentTarget;
    const destination = new URL(href, window.location.href);
    const current = new URL(window.location.href);
    const modifiedClick =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;
    const sameDocumentHash =
      destination.pathname === current.pathname &&
      destination.search === current.search &&
      Boolean(destination.hash);

    if (
      modifiedClick ||
      destination.origin !== current.origin ||
      sameDocumentHash ||
      anchor.hasAttribute("download") ||
      (target && target !== "_self")
    ) {
      return;
    }

    // Query-only changes do not update usePathname, so let Next handle every
    // same-path navigation without placing it behind the curtain.
    if (destination.pathname === current.pathname) {
      return;
    }

    event.preventDefault();
    context.navigate(`${destination.pathname}${destination.search}${destination.hash}`, {
      scroll,
    });
  };

  return <Link {...props} href={href} target={target} scroll={scroll} onClick={handleClick} />;
}
