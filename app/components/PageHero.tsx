import type { ReactNode } from "react";
import { CinematicPageHero, type CinematicHeroMedia } from "./CinematicPageHero";

type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  aside?: ReactNode;
  theme?: "paper" | "blue" | "ink" | "orange";
  media?: CinematicHeroMedia;
};

export function PageHero({
  index,
  eyebrow,
  title,
  body,
  aside,
  theme = "paper",
  media: explicitMedia,
}: PageHeroProps) {
  const pageKey = `${index} ${eyebrow}`.toLowerCase();
  let fallbackMedia: CinematicHeroMedia = {
    poster: "/media/interior-daylight.jpg",
    alt: "Daylit contemporary property interior",
    width: 1800,
    height: 1200,
    parallax: 7,
    showPauseControl: false,
  };

  if (pageKey.includes("about")) {
    fallbackMedia = {
      poster: "/media/facade-detail.jpg",
      alt: "Geometric contemporary facade used as editorial architecture",
      width: 1800,
      height: 1170,
      objectPosition: "50% 50%",
      parallax: 6,
      showPauseControl: false,
    };
  } else if (pageKey.includes("academy")) {
    fallbackMedia = {
      poster: "/media/blueprint-process-poster.jpg",
      mobilePoster: "/media/blueprint-process-poster-mobile.jpg",
      alt: "Hands reviewing architectural drawings on a work table",
      width: 1920,
      height: 1080,
      parallax: 6,
      showPauseControl: false,
    };
  } else if (pageKey.includes("course")) {
    fallbackMedia = {
      poster: "/media/interior-walkthrough-poster.jpg",
      mobilePoster: "/media/interior-walkthrough-poster-mobile.jpg",
      videoSrc: "/media/interior-walkthrough.mp4",
      mobileVideoSrc: "/media/interior-walkthrough-mobile.mp4",
      alt: "Slow view through a bright contemporary interior",
      width: 1800,
      height: 1200,
      parallax: 7,
    };
  } else if (pageKey.includes("result")) {
    fallbackMedia = {
      poster: "/media/blueprint-hands.jpg",
      alt: "Hands reviewing architectural plans and evidence",
      width: 1800,
      height: 1200,
      parallax: 6,
      showPauseControl: false,
    };
  } else if (pageKey.includes("insight")) {
    fallbackMedia = {
      poster: "/media/facade-detail.jpg",
      alt: "Close view of a geometric architectural facade",
      width: 1800,
      height: 1200,
      parallax: 8,
      showPauseControl: false,
    };
  } else if (pageKey.includes("contact")) {
    fallbackMedia = {
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
      className="editorial-page-hero"
      index={index}
      eyebrow={eyebrow}
      title={title}
      body={body}
      aside={aside}
      theme={theme}
      media={explicitMedia ?? fallbackMedia}
    />
  );
}
