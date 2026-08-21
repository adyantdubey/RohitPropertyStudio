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

type NetworkInformation = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (
    callback: (now: number, metadata: unknown) => void,
  ) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type CinematicMediaProps = {
  poster: string;
  mobilePoster?: string;
  alt: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
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
  loadingStrategy?: "eager" | "viewport";
};

/**
 * Poster-first media that only mounts its video source after client capability
 * checks. The poster remains the meaningful image and accessibility fallback.
 */
export function CinematicMedia({
  poster,
  mobilePoster,
  alt,
  videoSrc,
  mobileVideoSrc,
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
  loadingStrategy = priority ? "eager" : "viewport",
}: CinematicMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFrameRef = useRef<number | null>(null);
  const fallbackFrameRef = useRef<number | null>(null);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [saveData, setSaveData] = useState(true);
  const [sourceEnabled, setSourceEnabled] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const allowVideo = Boolean(
    preferencesReady && (videoSrc || mobileVideoSrc) && !reducedMotion && !saveData,
  );
  const shouldMountVideo = Boolean(
    allowVideo && (loadingStrategy === "eager" || sourceEnabled),
  );

  const cancelPendingFrame = () => {
    const video = videoRef.current as VideoWithFrameCallback | null;
    if (videoFrameRef.current !== null) {
      video?.cancelVideoFrameCallback?.(videoFrameRef.current);
      videoFrameRef.current = null;
    }
    if (fallbackFrameRef.current !== null) {
      window.cancelAnimationFrame(fallbackFrameRef.current);
      fallbackFrameRef.current = null;
    }
  };

  const revealAfterDecodedFrame = () => {
    const video = videoRef.current as VideoWithFrameCallback | null;
    if (!video || video.paused || video.ended) return;

    cancelPendingFrame();
    if (video.requestVideoFrameCallback) {
      videoFrameRef.current = video.requestVideoFrameCallback(() => {
        videoFrameRef.current = null;
        if (!video.paused && !video.ended) setVideoReady(true);
      });
      return;
    }

    // `playing` already confirms playback in older browsers. Two paint frames
    // keep the poster in place until the decoded frame can be composited.
    fallbackFrameRef.current = window.requestAnimationFrame(() => {
      fallbackFrameRef.current = window.requestAnimationFrame(() => {
        fallbackFrameRef.current = null;
        if (!video.paused && !video.ended) setVideoReady(true);
      });
    });
  };

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
      setSourceEnabled(false);
      setInViewport(false);
      setVideoReady(false);
      setIsPlaying(false);
      return;
    }

    const playbackObserver = new IntersectionObserver(
      ([entry]) => setInViewport(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    playbackObserver.observe(root);

    const warmupObserver =
      loadingStrategy === "viewport"
        ? new IntersectionObserver(
            ([entry], observer) => {
              if (entry?.isIntersecting) {
                setSourceEnabled(true);
                observer.disconnect();
              }
            },
            { rootMargin: "900px 0px", threshold: 0 },
          )
        : null;
    warmupObserver?.observe(root);

    return () => {
      playbackObserver.disconnect();
      warmupObserver?.disconnect();
    };
  }, [allowVideo, loadingStrategy]);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldMountVideo) return;

    if (!inViewport || !pageVisible || userPaused) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      setIsPlaying(false);
    });
  }, [inViewport, pageVisible, shouldMountVideo, userPaused]);

  useEffect(
    () => () => {
      cancelPendingFrame();
    },
    [],
  );

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
    : !shouldMountVideo
      ? "poster"
      : !videoReady
      ? "loading"
      : isPlaying
        ? "playing"
        : "paused";

  return (
    <div
      ref={rootRef}
      className={`cinematic-media${shouldMountVideo ? " cinematic-media--video" : " cinematic-media--poster"}${className ? ` ${className}` : ""}`}
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
        <picture style={{ display: "block", width: "100%", height: "100%" }}>
          {mobilePoster ? (
            <source srcSet={mobilePoster} media="(max-width: 767px)" />
          ) : null}
          <Image
            className="cinematic-media__poster"
            src={poster}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority && !mobilePoster}
            loading={priority && mobilePoster ? "eager" : undefined}
            fetchPriority={priority ? "high" : undefined}
            draggable={false}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition,
            }}
          />
        </picture>

        {shouldMountVideo ? (
          <video
            ref={videoRef}
            className="cinematic-media__video"
            muted
            playsInline
            loop={loop}
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onLoadStart={() => {
              cancelPendingFrame();
              setVideoReady(false);
            }}
            onPlaying={() => {
              setIsPlaying(true);
              revealAfterDecodedFrame();
            }}
            onPause={() => setIsPlaying(false)}
            onWaiting={() => {
              cancelPendingFrame();
              setVideoReady(false);
              setIsPlaying(false);
            }}
            onStalled={() => {
              cancelPendingFrame();
              setVideoReady(false);
              setIsPlaying(false);
            }}
            onError={() => {
              cancelPendingFrame();
              setVideoReady(false);
              setIsPlaying(false);
            }}
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
          >
            {mobileVideoSrc ? (
              <source src={mobileVideoSrc} media="(max-width: 767px)" />
            ) : null}
            {videoSrc ? <source src={videoSrc} /> : null}
          </video>
        ) : null}
      </div>

      {children ? <div className="cinematic-media__overlay">{children}</div> : null}

      {shouldMountVideo && showPauseControl ? (
        <button
          className="cinematic-media__pause"
          type="button"
          aria-label={`${isPlaying ? "Pause" : "Play"} ${controlLabel}`}
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause aria-hidden="true" size={14} /> : <Play aria-hidden="true" size={14} />}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
      ) : null}
    </div>
  );
}
