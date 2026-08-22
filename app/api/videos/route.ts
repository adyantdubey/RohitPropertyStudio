import { youtube } from "../../lib/labData";

/**
 * Latest videos from Rohitt's YouTube channel, via the public channel feed.
 * Cached at the edge for 6 hours; on any failure the client falls back to a
 * plain channel link, so the site never depends on YouTube being reachable.
 */

type Video = { id: string; title: string; published: string };

function parseFeed(xml: string): Video[] {
  const videos: Video[] = [];
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  for (const entry of entries.slice(0, 9)) {
    const id = entry.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/)?.[1];
    const rawTitle = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    const title = rawTitle
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
    if (id && title) videos.push({ id, title, published });
  }
  return videos;
}

export async function GET() {
  try {
    const response = await fetch(youtube.feedUrl, {
      headers: { Accept: "application/atom+xml, application/xml" },
      cf: { cacheTtl: 21600, cacheEverything: true },
    } as RequestInit);
    if (!response.ok) throw new Error(`feed ${response.status}`);
    const videos = parseFeed(await response.text());
    return Response.json(
      { videos, channel: youtube.url },
      { headers: { "Cache-Control": "public, s-maxage=21600, max-age=3600" } },
    );
  } catch {
    return Response.json(
      { videos: [], channel: youtube.url },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  }
}
