"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MonitorPlay, Play } from "lucide-react";
import { youtube } from "../../lib/labData";

type Video = { id: string; title: string; published: string };

/**
 * Latest uploads from Rohitt's channel. Thumbnails are plain images; the
 * player iframe (youtube-nocookie) loads only after a click, so the page stays
 * fast and nothing is embedded until a visitor asks for it. If the feed is
 * unreachable the rail collapses to a simple channel card.
 */
export function YouTubeRail({ limit = 6 }: { limit?: number }) {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/videos")
      .then((r) => r.json() as Promise<{ videos: Video[] }>)
      .then((data) => { if (!cancelled) setVideos(data.videos.slice(0, limit)); })
      .catch(() => { if (!cancelled) setVideos([]); });
    return () => { cancelled = true; };
  }, [limit]);

  const date = (iso: string) => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  return (
    <div className="yt">
      {videos && videos.length > 0 && (
        <div className="yt__grid">
          {videos.map((video) => (
            <figure className="yt__card" key={video.id}>
              {playing === video.id ? (
                <span className="yt__frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </span>
              ) : (
                <button
                  className="yt__thumb"
                  type="button"
                  onClick={() => {
                    setPlaying(video.id);
                    window.dispatchEvent(new CustomEvent("academy:track", { detail: { event: "video_played" } }));
                  }}
                  aria-label={`Play: ${video.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
                  <span className="yt__play"><Play size={18} aria-hidden="true" /></span>
                </button>
              )}
              <figcaption>
                <strong>{video.title}</strong>
                <span>{date(video.published)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="yt__channel">
        <span className="yt__mark"><MonitorPlay size={20} aria-hidden="true" /></span>
        <div>
          <strong>Realtor Rohitt Kumar Singh on YouTube</strong>
          <p>Property tours, area deep dives and straight answers from the Bengaluru field.</p>
        </div>
        <a className="button button--outline button--sm" href={youtube.subscribeUrl} target="_blank" rel="noreferrer" data-track="youtube_clicked">
          Subscribe <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
