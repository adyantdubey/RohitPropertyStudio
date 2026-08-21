# Hero and section video

This folder is empty on purpose. The site is designed to look finished without any
video: the hero renders a generated skyline canvas. Video is an upgrade layer, not a
dependency.

## Turning the hero video on

1. Put the encoded file here as `hero.mp4`.
2. In `app/lib/siteContent.ts`, set `media.heroVideo` to `"/video/hero.mp4"`.

That is the whole change. The component handles autoplay, muting, pausing off-screen,
and disabling itself under reduced-motion or Save-Data.

## Budget

| File | Max size | Length | Notes |
| --- | --- | --- | --- |
| `hero.mp4` | 2.5 MB | 8-12 s, seamless loop | 1920x1080, h.264, no audio track |
| any other clip | 1.5 MB | 3-6 s | same encode settings |

Encode with ffmpeg:

```bash
ffmpeg -i source.mp4 -t 10 -an -vf "scale=1920:-2,fps=25" \
  -c:v libx264 -profile:v high -crf 30 -preset slow -movflags +faststart hero.mp4
```

Check the result is under 2.5 MB. Raise `-crf` to shrink it; dark footage compresses well.

## Poster frame

`public/brand/hero-poster.jpg` is a generated placeholder. Once real footage exists,
replace it with an actual frame from the clip:

```bash
ffmpeg -i hero.mp4 -ss 00:00:02 -vframes 1 -q:v 4 ../brand/hero-poster.jpg
```
