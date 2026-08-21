"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicMedia, type CinematicMediaProps } from "./CinematicMedia";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type CinematicHeroMedia = Pick<
  CinematicMediaProps,
  | "poster"
  | "mobilePoster"
  | "videoSrc"
  | "mobileVideoSrc"
  | "alt"
  | "width"
  | "height"
  | "sizes"
  | "objectPosition"
  | "parallax"
  | "showPauseControl"
  | "loadingStrategy"
>;

export type CinematicPageHeroProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  media?: CinematicHeroMedia;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
  theme?: "paper" | "blue" | "ink" | "orange";
  mediaPosition?: "left" | "right" | "full";
  priority?: boolean;
};

const defaultMedia: CinematicHeroMedia = {
  poster: "/media/hero-poster.jpg",
  videoSrc: "/media/hero-aerial.mp4",
  alt: "Aerial architectural view of a contemporary property district",
  width: 1800,
  height: 1013,
  sizes: "(max-width: 860px) 100vw, 58vw",
  objectPosition: "50% 50%",
  parallax: 8,
};

/**
 * Reusable editorial hero. It is fully readable without JavaScript; motion is
 * applied after hydration and reverted whenever reduced-motion becomes active.
 */
export function CinematicPageHero({
  index,
  eyebrow,
  title,
  body,
  media = defaultMedia,
  actions,
  aside,
  className = "",
  theme = "paper",
  mediaPosition = "right",
  priority = true,
}: CinematicPageHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const generatedId = useId();
  const titleId = `cinematic-hero-${generatedId.replace(/:/g, "")}`;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const mediaQuery = gsap.matchMedia();

    mediaQuery.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 960px)",
      },
      (context) => {
        const { reduce, desktop } = context.conditions as {
          reduce: boolean;
          desktop: boolean;
        };
        const meta = root.querySelector<HTMLElement>(".cinematic-page-hero__meta");
        const titleElement = root.querySelector<HTMLElement>(".cinematic-page-hero__title");
        const bodyElement = root.querySelector<HTMLElement>(".cinematic-page-hero__body");
        const actionsElement = root.querySelector<HTMLElement>(".cinematic-page-hero__actions");
        const mediaMask = root.querySelector<HTMLElement>(".cinematic-page-hero__media-mask");
        const measureLines = root.querySelectorAll<HTMLElement>(
          ".cinematic-page-hero__measure-line",
        );
        const targets = [
          meta,
          titleElement,
          bodyElement,
          actionsElement,
          mediaMask,
          ...measureLines,
        ].filter(Boolean);

        if (reduce) {
          gsap.set(targets, { clearProps: "opacity,transform,clipPath" });
          return;
        }

        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
        entrance
          .from(meta, {
            y: desktop ? 14 : 10,
            opacity: 0,
            duration: 0.48,
          })
          .from(
            titleElement,
            {
              yPercent: desktop ? 108 : 55,
              rotateX: desktop ? -8 : 0,
              duration: desktop ? 0.96 : 0.58,
            },
            0.08,
          )
          .from(
            mediaMask,
            {
              clipPath: desktop ? "inset(0 100% 0 0)" : "inset(8% 0 8% 0)",
              scale: desktop ? 1.025 : 1,
              opacity: desktop ? 1 : 0,
              duration: desktop ? 0.92 : 0.58,
            },
            0.16,
          )
          .from(
            [bodyElement, actionsElement].filter(Boolean),
            { y: desktop ? 22 : 14, opacity: 0, duration: 0.6, stagger: 0.08 },
            0.42,
          )
          .from(
            measureLines,
            { scaleX: 0, duration: 0.72, transformOrigin: "left" },
            0.36,
          );

        if (desktop) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.65,
              },
            })
            .to(".cinematic-page-hero__grid", { yPercent: 3, ease: "none" }, 0)
            .to(".cinematic-page-hero__title-wrap", { yPercent: -4, ease: "none" }, 0)
            .to(".cinematic-page-hero__meta", { yPercent: -2, ease: "none" }, 0);
        }
      },
      root,
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`cinematic-page-hero cinematic-page-hero--${theme} cinematic-page-hero--media-${mediaPosition}${className ? ` ${className}` : ""}`}
      aria-labelledby={titleId}
    >
      <div className="cinematic-page-hero__grid" aria-hidden="true" />

      <div className="cinematic-page-hero__media-mask">
        <CinematicMedia
          {...media}
          className="cinematic-page-hero__media"
          priority={priority}
        />
      </div>

      <div className="cinematic-page-hero__scrim" aria-hidden="true" />

      <div className="cinematic-page-hero__meta">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>

      <div className="cinematic-page-hero__copy">
        <div className="cinematic-page-hero__title-mask">
          <div className="cinematic-page-hero__title-wrap">
            <h1 className="cinematic-page-hero__title" id={titleId}>
              {title}
            </h1>
          </div>
        </div>
        <div className="cinematic-page-hero__body">{body}</div>
        {actions ? <div className="cinematic-page-hero__actions">{actions}</div> : null}
      </div>

      {aside ? <div className="cinematic-page-hero__aside">{aside}</div> : null}

      <div className="cinematic-page-hero__measure" aria-hidden="true">
        <span className="cinematic-page-hero__measure-line" />
        <strong>00</strong>
        <span className="cinematic-page-hero__measure-line" />
      </div>
    </section>
  );
}
