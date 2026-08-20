import type { ReactNode } from "react";
import { CinematicPageHero, type CinematicHeroMedia } from "./CinematicPageHero";

type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  aside?: ReactNode;
  theme?: "paper" | "blue" | "ink" | "orange";
};

export function PageHero({
  index,
  eyebrow,
  title,
  body,
  aside,
  theme = "paper",
}: PageHeroProps) {
  const pageKey = `${index} ${eyebrow}`.toLowerCase();
  let media: CinematicHeroMedia = {
    poster: "/media/interior-daylight.jpg",
    alt: "Daylit contemporary property interior",
    width: 1800,
    height: 1200,
    parallax: 7,
    showPauseControl: false,
  };

  if (pageKey.includes("about")) {
    media = {
      poster: "/media/rohit-standin.jpg",
      alt: "Temporary stock portrait stand-in beside modern architecture; not Rohit",
      width: 1400,
      height: 1867,
      objectPosition: "50% 42%",
      parallax: 6,
      showPauseControl: false,
    };
  } else if (pageKey.includes("course")) {
    media = {
      poster: "/media/interior-daylight.jpg",
      videoSrc: "/media/interior-walkthrough.mp4",
      alt: "Slow view through a bright contemporary interior",
      width: 1800,
      height: 1200,
      parallax: 7,
    };
  } else if (pageKey.includes("result")) {
    media = {
      poster: "/media/blueprint-hands.jpg",
      alt: "Hands reviewing architectural plans and evidence",
      width: 1800,
      height: 1200,
      parallax: 6,
      showPauseControl: false,
    };
  } else if (pageKey.includes("insight")) {
    media = {
      poster: "/media/facade-detail.jpg",
      alt: "Close view of a geometric architectural facade",
      width: 1800,
      height: 1200,
      parallax: 8,
      showPauseControl: false,
    };
  } else if (pageKey.includes("contact")) {
    media = {
      poster: "/media/interior-soft.jpg",
      alt: "Quiet contemporary interior",
      width: 1800,
      height: 1200,
      parallax: 5,
      showPauseControl: false,
    };
  }

  return (
    <CinematicPageHero
      className={`page-hero page-hero-${theme}`}
      index={index}
      eyebrow={eyebrow}
      title={title}
      body={body}
      aside={aside}
      theme={theme}
      media={media}
    />
  );
}
