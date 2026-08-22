# CLAUDE.md — 100 Yards Academy site

Personal-brand and course site for **Rohitt Kumar Singh**, MD of Hundred Yards Realtor Pvt Ltd
(100yards.in). Product: the "Basics of Real Estate" 49-slide visual course.
Pre-launch — no price, no payment, no delivery yet.

## Stack

- React 19 + **vinext** (Next-style App Router in `app/`) — not Next.js itself
- Hand-written CSS in `app/styles/` (no Tailwind — it was removed deliberately)
- GSAP + ScrollTrigger, loaded only where motion actually needs it
- Cloudflare Worker `rohit-property-studio`; D1 `ACADEMY_DB` (leads),
  Analytics Engine `ACADEMY_ANALYTICS`, Cloudflare Images binding
- Repo `adyantdubey/RohittPropertyStudio`; push to `main` auto-builds and deploys

## Commands

```bash
npm run dev        # local dev
npm run build      # must pass before any commit
npm run lint       # must pass before any commit
npm test           # builds, then asserts the server-rendered HTML
```

**Claude does not deploy.** Push to `main` and Cloudflare does it.

**The Windows `node_modules` cannot build inside the Linux device bridge.** Build in the
cloud sandbox instead: tar the source (excluding `node_modules`, `dist`, `.git`, `.next`,
`.wrangler`, `.vinext/dev`), `npm install`, `npm run build`, serve with
`npx vinext start --port 4321`, and screenshot with Playwright. Copy `.vinext/fonts` across
too — the sandbox cannot reach Google Fonts, so without that cache the screenshots render
in fallback faces and every measurement is wrong.

## Stylesheet architecture

Load order matters; `app/layout.tsx` imports them in this order:

| File | Holds |
| --- | --- |
| `styles/tokens.css` | every colour, type step, space step, motion curve, and the `.surface-*` contracts |
| `styles/base.css` | reset, typography, `.button`, `.eyebrow`, `.text-link`, reveal defaults |
| `styles/components.css` | header, footer, cards, gallery, marquee, tools, forms |
| `styles/home.css` | the homepage acts |
| `styles/pages.css` | page hero and the inner-page blocks |

**Surfaces, not colours.** A section never sets its own background and text colour. It picks
`surface-deep`, `surface-dark`, `surface-raise`, `surface-light` or `surface-gold`, and every
colour inside reads `var(--ink)`, `var(--ink-soft)`, `var(--ink-faint)`, `var(--line)` or
`var(--accent)`. That is what keeps gold legible on both silver and carbon.

**Specificity trap, already paid for once.** A rule like `.some-block p { font-size: … }` also
matches `<p class="eyebrow">` and silently wins, because it is more specific. Every such rule
in this codebase carries `:not(.eyebrow)`. Keep it that way, or give the paragraph its own class.

## Motion contract

`MotionLayer.tsx` is the only place motion is defined. Elements opt in with data attributes:

| Attribute | Effect |
| --- | --- |
| `data-split` | headline words rise out of a mask, once |
| `data-enter` | hero chrome fades up on load |
| `data-reveal` | block fades and lifts on entry (CSS-driven, works without GSAP) |
| `data-count` | number counts up once |
| `data-clip` | media wipes open from the bottom |
| `data-parallax` | media drifts slowly, desktop pointer only |
| `data-scrub-words` | statement words brighten through the scroll |

Rules: 0.4–0.9s, `power2`/`power3` easing. No bounce, spin, elastic or rotation. Text never
parallaxes. One signature move per page — the homepage has the pinned curriculum rail, and
nothing else competes with it. Everything is skipped under `prefers-reduced-motion`.

## Media contract

`AmbientBackdrop.tsx` layers, bottom to top: a generated skyline canvas, an optional video, a
brand scrim, and film grain. **The canvas always works, so no page depends on a video file.**
To switch the hero video on, drop `public/video/hero.mp4` in and set `media.heroVideo` in
`app/lib/siteContent.ts`. Budgets and the ffmpeg recipe are in `public/video/README.md`.

Video is disabled outright under reduced motion and Save-Data, and pauses off-screen.

## AI layer (Workers AI)

`wrangler.jsonc` declares `"ai": { "binding": "AI" }`. Workers AI runs on the FREE plan
(~10k neurons/day) — unlike Analytics Engine it needs no account upgrade. Everything is
built to degrade: if the binding is absent, quota is spent, or the model errors,
`/api/ask` returns `{ fallback: true }` and the client answers from the glossary + a
WhatsApp link. The AI is never load-bearing.

- Route: `app/api/ask/route.ts` — model `@cf/meta/llama-3.1-8b-instruct`, streamed SSE,
  answers capped at 320 tokens, per-visitor and per-isolate daily limits in memory.
- The system prompt is generated from `siteContent.ts` (glossary + chapters) and hard-rules
  the model to vocabulary education only: no legal/tax/price/investment advice, no
  project assessments, no invented statistics. Keep those rules if you touch the prompt.
- UI: `app/components/AcademyGuide.tsx`, section `#ask` on /resources. The glossary's
  no-match state hands its query over via the `academy:guide-ask` window event.
- Local `wrangler dev --local` cannot run the model (needs Cloudflare auth) — the route
  falls back, which is itself the test. The streaming path is verified on production.

## Property Lab rules

`/lab` holds five instruments plus the YouTube rail. The contract:

- Statutory rates (stamp duty, registration, cess, surcharge, GST) live ONLY in
  `app/lib/labData.ts` with `source`/`asOf`, and every tool renders them with a verify link.
  When a rate changes in law, that file is the single place to update.
- Everything user-adjustable is a slider with an illustrative default — never present a
  default as "today's rate". No tool judges a deal, predicts a price, or offers advice;
  each carries a boundary note. Keep that when editing copy.
- The Deal Decoder reuses `/api/ask` with `mode: "decode"` — same limits and fallback. Do not
  add a second AI route.
- The AI route tries MODEL CANDIDATES in order (stream, then non-stream) and remembers the
  first that works. `GET /api/ask` is a health check that reports per-model status and exact
  errors — open it on production whenever the AI "rests". Local dev always fails with
  "Binding AI needs to be run remotely"; that is expected, not a bug.
- The money tools are ONE instrument (`OwnershipSimulator.tsx`): true cost + EMI + rent-vs-buy
  in a single panel, all outputs tweened through the `useTweened` rAF hook (zero-duration under
  reduced motion) with catmull-rom smoothed chart curves. Do not split it back into separate
  graph tools.
- Quiz questions in `labData.ts` must stay answerable from the course material alone.
- Showpieces: ConstructionPlan (tower builds with the payment plan), EmiFlow (stacked
  amortisation streams + year scrubber), XrayFlat (isometric area cutaway), JourneyRail
  (pinned 7-step film-strip, same engine as the homepage rail — at most one pinned section
  per page besides it). All share `useTweened`/`smoothPath` from
  `app/components/lab/useTweened.ts`. Watch the `.tool__controls strong { color: var(--accent) }`
  cascade — controls with gold active backgrounds need `color: inherit` on their strong.

## YouTube integration

`/api/videos` fetches the public channel feed (`labData.youtube.feedUrl`), parses it with
regex (no XML parser needed for Atom entries), caches 6h at the edge, and returns
`{videos: []}` on ANY failure — the `YouTubeRail` component then collapses to a plain
channel card, so the site never depends on YouTube. Thumbnails come from i.ytimg.com; the
iframe (youtube-nocookie.com) loads only after a click. The feed cannot be reached from the
dev sandbox — the empty-fallback path IS the local test; the full rail appears on production.

## Market data rules

`app/lib/marketData.ts` feeds the "Market context, source-dated" homepage section.
Every figure carries `source` and `asOf`, and both render. Historical published figures
only — never forecasts, never unsourced numbers. `hpiSeries` stays EMPTY until someone
fills it from RBI's official House Price Index download (rbi.org.in → Statistics); the
self-drawing chart appears automatically once ≥6 quarters exist. The homepage test suite
enforces that any ₹ figure is accompanied by a named source.

## Brand assets

`/brandkit` is an internal, `noindex`, unlinked route holding the artboards for
`public/brand/cover.png`, `og.png` and `hero-poster.jpg`. Regenerate by building, serving, and
screenshotting `#cover`, `#og` and `#poster` from that page. Do not hand-edit the PNGs.

Course slides in `public/course/` are 1600px wide, 256-colour PNGs. Keep them that way — full
colour PNGs of the same slides were three times the size with no visible gain.

## Budgets

LCP under 2.5s on 4G · hero video under 2.5MB · other clips under 1.5MB · Lighthouse mobile
performance 90+, accessibility 100.

## Content honesty rules

This site makes verifiable claims only.

- Every statistic names its source on screen.
- Client reviews are **Hundred Yards property reviews, not course reviews**, and stay labelled
  that way until the course launches and has real learners.
- No income guarantees, no legal, tax or investment advice, no invented testimonials, no price
  until one is decided.

## Do not

- Do not deploy, or touch the Cloudflare account.
- Do not commit secrets — `MISTRAL_API_KEY` and `TURNSTILE_*` live in Worker secrets.
- Do not add a second animation library. GSAP is enough.
- Do not import a CSS file without creating it. That broke the build once.
- Do not add `playwright` to `package.json`. Screenshot tooling belongs in the sandbox, not in
  the Cloudflare build.
- Do not remove the AI fallback paths — the site must sell with the AI completely dead.
- After every rebuild, restart `wrangler dev` before screenshotting: it snapshots the asset
  directory at startup and serves stale hashes otherwise.
