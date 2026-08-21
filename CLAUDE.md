# CLAUDE.md — 100 Yards Academy site

Personal-brand + course site for **Rohit Kumar Singh**, MD of Hundred Yards Realtor Pvt Ltd (100yards.in).
Product: the "Basics of Real Estate" 49-slide visual course. Pre-launch — no price, no payment, no delivery yet.

## Stack

- React 19 + **vinext** (Next-style App Router, `app/`) — not Next.js itself
- Hand-written CSS (`app/globals.css`, `course-site.css`, `academy-expansion.css`). **Tailwind is installed but unused — do not start using it without a decision.**
- GSAP + ScrollTrigger for motion
- Cloudflare Worker `rohit-property-studio`; D1 `ACADEMY_DB` (leads), Analytics Engine `ACADEMY_ANALYTICS`, Cloudflare Images binding
- Repo: `adyantdubey/RohitPropertyStudio`

## Commands

```bash
npm run dev            # local dev
npm run build          # production build (must pass before any commit)
npm run lint
npm test               # builds, then checks rendered HTML
npm run deploy         # Adyant runs this — Claude does not deploy
```

**The `node_modules` in the Windows folder cannot build in the Linux device bridge.** Build and verify in the cloud sandbox instead: tar the source, install, build, serve with `npx vinext start`, screenshot with Playwright.

## Design rules

- Palette: `--carbon #17191c`, `--silver #d0cfca`, `--gold #c6a15b`. Alternating dark/light section slabs.
- Type: Playfair Display for headings, Manrope for body.
- **One signature motion move per page.** Not every section animates.
- Motion: 0.4–0.9s, `power2`/`power3` easing. No bounce, spin, elastic or rotation. Text never parallaxes.
- Video is evidence or atmosphere, never wallpaper. Poster frame always; `muted playsinline loop preload="none"`; pause off-screen; disabled under `prefers-reduced-motion` and `Save-Data`.
- Everything must work with JS off, video blocked, and reduced motion on.

## Budgets

- LCP < 2.5s on 4G · total JS < 150KB · hero video < 2.5MB · other clips < 1.5MB each · whole site < 20MB
- Lighthouse mobile: performance ≥ 90, accessibility 100

## Content honesty rules

This site makes verifiable claims only. Stats must name their source. Client reviews are **Hundred Yards property reviews, not course reviews**, and must stay labelled that way until the course launches. No income guarantees, no legal/tax/investment advice, no invented testimonials.

## Do not

- Do not deploy or touch the Cloudflare account.
- Do not commit secrets (`MISTRAL_API_KEY` lives in Worker secrets).
- Do not add a second animation library — GSAP is enough.
- Do not import a CSS file without creating it (this broke the build once).
