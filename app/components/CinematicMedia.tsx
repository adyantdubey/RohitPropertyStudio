"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./MotionProvider";

type NetworkInformation = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type CinematicMediaProps = {
  poster: string;
  alt: string;
  videoSrc?: string;
  className?: string;
  children?: ReactNode;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  objectPosition?: CSSProperties["objectPosition"];
  parallax?: number;
  loop?: boolean;
  showPauseControl?: boolean;
  controlLabel?: string;
};

/**
 * Poster-first media that only mounts its video source after client capability
 * checks. The poster remains the meaningful image and accessibility fallback.
 */
export function CinematicMedia({
  poster,
  alt,
  videoSrc,
  className = "",
  children,
  width = 1800,
  height = 1013,
  sizes = "100vw",
  priority = false,
  objectPosition = "50% 50%",
  parallax = 0,
  loop = true,
  showPauseControl = true,
  controlLabel = "background video",
}: CinematicMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { refreshScrollTriggers } = useMotion();
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [saveData, setSaveData] = useState(true);
  const [inViewport, setInViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const allowVideo = Boolean(
    preferencesReady && videoSrc && !reducedMotion && !saveData,
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;

    const updatePreferences = () => {
      setReducedMotion(motionQuery.matches);
      setSaveData(Boolean(connection?.saveData));
      setPreferencesReady(true);
    };

    updatePreferences();
    motionQuery.addEventListener("change", updatePreferences);
    connection?.addEventListener("change", updatePreferences);

    return () => {
      motionQuery.removeEventListener("change", updatePreferences);
      connection?.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !allowVideo) {
      setInViewport(false);
      setVideoReady(false);
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px 0px", threshold: 0.08 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [allowVideo]);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !allowVideo) return;

    if (!inViewport || !pageVisible || userPaused) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      setIsPlaying(false);
    });
  }, [allowVideo, inViewport, pageVisible, userPaused]);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const target = motionRef.current;
    if (!root || !target || !preferencesReady || reducedMotion || saveData || !parallax) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const range = Math.max(-18, Math.min(18, parallax));
    const mediaQuery = gsap.matchMedia();
    mediaQuery.add("(min-width: 768px) and (pointer: fine)", () => {
      gsap.fromTo(
        target,
        {
          yPercent: range * -0.5,
          scale: 1 + Math.abs(range) / 100,
        },
        {
          yPercent: range * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    return () => mediaQuery.revert();
  }, [parallax, preferencesReady, reducedMotion, saveData]);

  useEffect(() => {
    if (videoReady) refreshScrollTriggers();
  }, [refreshScrollTriggers, videoReady]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setUserPaused(false);
      void video.play().catch(() => setIsPlaying(false));
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  const state = !allowVideo
    ? "poster"
    : !videoReady
      ? "loading"
      : isPlaying
        ? "playing"
        : "paused";

  return (
    <div
      ref={rootRef}
      className={`cinematic-media${allowVideo ? " cinematic-media--video" : " cinematic-media--poster"}${className ? ` ${className}` : ""}`}
      data-media-state={state}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        overflow: "hidden",
      }}
    >
      <div
        ref={motionRef}
        className="cinematic-media__motion"
        style={{ position: "absolute", inset: 0 }}
      >
        <Image
          className="cinematic-media__poster"
          src={poster}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
          }}
        />

        {allowVideo ? (
          <video
            ref={videoRef}
            className="cinematic-media__video"
            src={videoSrc}
            poster={poster}
            muted
            playsInline
            loop={loop}
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition,
              opacity: videoReady ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          />
        ) : null}
      </div>

      {children ? <div className="cinematic-media__overlay">{children}</div> : null}

      {allowVideo && showPauseControl ? (
        <button
          className="cinematic-media__pause"
          type="button"
          aria-label={`${isPlaying ? "Pause" : "Play"} ${controlLabel}`}
          aria-pressed={userPaused}
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause aria-hidden="true" size={14} /> : <Play aria-hidden="true" size={14} />}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
      ) : null}
    </div>
  );
}
