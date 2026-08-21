# Rohit Kumar Singh — Real Estate Academy

A cinematic personal-brand and course site for Rohit Kumar Singh, Managing Director of
Hundred Yards Realtor Pvt Ltd. Built with React 19, vinext, GSAP and Cloudflare Workers.

The Property Academy is visibly pre-launch: there is no PDF, price, payment gateway, order or
digital delivery today. The early-access form records interest only.

## Requirements

- Node.js `>=22.13.0`
- A free Cloudflare account for deployment

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run lint
npm test          # builds, then checks the server-rendered HTML of the main pages
```

## Deploy

Pushing to `main` triggers the Cloudflare build and deploy. To deploy by hand:

```bash
npx wrangler login
npm run deploy
```

Secrets (`MISTRAL_API_KEY`, Turnstile keys) live in the Worker's **Variables and Secrets**,
never in the repository or the build environment.

## Adding video

`public/video/` is empty on purpose — the hero renders a generated skyline canvas, so the site
looks finished with no video at all. Video is an upgrade layer. See `public/video/README.md`
for the file budget, the ffmpeg command, and the one-line switch that turns it on.

## Regenerating brand images

`/brandkit` is an internal, unlinked, `noindex` route containing the artboards behind
`public/brand/cover.png`, `og.png` and `hero-poster.jpg`. Build, serve, and screenshot the
`#cover`, `#og` and `#poster` elements to regenerate them.

## Architecture

- App Router pages and route handlers under `app/`
- Design tokens and stylesheets under `app/styles/` — see `CLAUDE.md` for the surface system
- `AmbientBackdrop` (canvas + optional video) and `MotionLayer` (the whole motion vocabulary)
- `/api/early-access` writes to the D1 database; `/api/events` writes to Analytics Engine
- Cloudflare Images-backed image optimisation
- No payment processor connected. Any future integration must verify payment server-side and
  persist the order before unlocking a download route.

`CLAUDE.md` holds the design, motion and content rules this site is built to.
