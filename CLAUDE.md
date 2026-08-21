# CLAUDE.md — 100 Yards Academy site

Personal-brand and course site for **Rohit Kumar Singh**, MD of Hundred Yards Realtor Pvt Ltd
(100yards.in). Product: the "Basics of Real Estate" 49-slide visual course.
Pre-launch — no price, no payment, no delivery yet.

## Stack

- React 19 + **vinext** (Next-style App Router in `app/`) — not Next.js itself
- Hand-written CSS in `app/styles/` (no Tailwind — it was removed deliberately)
- GSAP + ScrollTrigger, loaded only where motion actually needs it
- Cloudflare Worker `rohit-property-studio`; D1 `ACADEMY_DB` (leads),
  Analytics Engine `ACADEMY_ANALYTICS`, Cloudflare Images binding
- Repo `adyantdubey/RohitPropertyStudio`; push to `main` auto-builds and deploys

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
