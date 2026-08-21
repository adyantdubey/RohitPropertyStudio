# 100 Yards Academy — Site v2 Plan
**Goal:** take the current site from "clean but simple" to a cinematic, video-led course site that still reads as professional and trustworthy — not a showreel of animation tricks.

Prepared 21 Aug 2026. Decisions already agreed: full front-end rebuild · video from free stock **plus** Rohit's own footage · Adyant deploys, Claude only builds · repo safety fixed first.

---

## 1. What I found in the code

**Stack:** React 19 + vinext (Next-style App Router) + hand-written CSS + GSAP/ScrollTrigger, deployed as a Cloudflare Worker (`rohit-property-studio`). D1 database for leads, Analytics Engine for events, Cloudflare Images for image optimisation. GitHub: `adyantdubey/RohitPropertyStudio`.

**Two problems fixed before anything else**

| Problem | State |
| --- | --- |
| `app/layout.tsx` imported `app/academy-expansion.css`, which never existed — the build crashed and ~130 CSS classes across 6 pages had no styling at all | Fixed. Stylesheet written, build verified green |
| ~50 files of unfinished work sitting uncommitted in the folder, one power cut from being lost | Committed to branch `codex/academy-expansion` in two labelled commits |

**Why the site feels simple — the honest list**

1. **One motion idea, used everywhere.** Everything fades up 20px. No hierarchy, so nothing feels important.
2. **No video, and almost no photography.** One portrait of Rohit. That's it.
3. **The course cover is clipart.** A cartoon hand holding a cartoon house, sitting next to a serious editorial headline. It is the single biggest credibility leak on the page — it is also the OG image shared on WhatsApp and LinkedIn.
4. **Hero layout bug.** The caption block overlaps the cover image at 1440px.
5. **Flat rhythm.** Every section is: eyebrow → serif H2 → grid. Eleven times in a row. There is no build-up and no climax.
6. **The best asset is buried.** 49 real teaching slides exist; 6 are shown, in a plain two-column grid.
7. **Broken grid math.** 4 outcome cards in a 3-column grid leaves an orphan.
8. **Tailwind is installed but unused** — dead config that will confuse future work.
9. **Empty route folders** (`advisory`, `results`, `media`, `_sites-preview`) left over from earlier drafts.

---

## 2. The design standard we hold ourselves to

The line between "premium" and "kids' work" is discipline, not restraint. Five rules:

1. **One signature move per page.** The homepage gets a pinned horizontal curriculum. The course page gets a scroll-scrubbed area diagram. Not both on both.
2. **Motion serves reading.** 0.4–0.9s, `power2/power3` easing. No bounce, no spin, no elastic, no confetti, nothing rotating. Text never parallaxes.
3. **Video is evidence or atmosphere, never wallpaper.** If a clip does not make the claim next to it more believable, it does not ship.
4. **Everything degrades.** Reduced-motion, JS-off, video-blocked, and 3G all produce a site that still sells.
5. **Performance is a design constraint.** LCP under 2.5s on 4G, total JS under 150KB, hero video under 2.5MB. A slow luxurious site is just a slow site.

**Visual direction:** keep carbon/gold/silver — it is genuinely good. Extend it: warmer gold gradient for light, a deep architectural blue-black as a third ground, film-grain overlay on video, and a real type scale (currently one big serif idea doing all the work).

---

## 3. Where video goes

| Placement | Clip | Source |
| --- | --- | --- |
| Hero background | Bengaluru skyline or a project at golden hour, 8s loop, darkened to 35%, gold-graded | Stock, India-specific |
| Instructor section | Rohit to camera, 20–30s, subtitled, muted until clicked | **Rohit** |
| Section dividers ×3 | 3s texture loops — site walk, keys handover, drawings on a table — revealed as scroll-scrubbed masks | Rohit's projects preferred, stock as fallback |
| Proof strip | Slow micro-loop behind the stat counters | Stock |

**Technical rules:** MP4 (h.264) + WebM, poster frame always, `muted playsinline loop preload="none"`, `IntersectionObserver` pauses off-screen video, disabled entirely on `prefers-reduced-motion` and `Save-Data`. Served as static assets from the Worker — free. Cloudflare Stream is paid and not needed at this size.

---

## 4. Build phases

**Phase 0 — Foundation** *(2 done, rest ~half a day)*
- ✅ Build fixed, work committed
- Remove unused Tailwind; build a real token layer (spacing, type scale, colour roles, motion durations/eases, z-index)
- Delete the four empty route folders
- Add an internal `/styleguide` page so we can review every component in one place
- Add a Playwright screenshot harness for before/after comparison — already working in my sandbox

**Phase 1 — Motion system** *(~1 day)*
Replace scattered GSAP calls with a documented, reusable layer: line-by-line headline reveals, scroll-scrub bindings, counter animations, route transitions using a carbon veil with the RK mark. One file, one vocabulary, tested against reduced-motion.

**Phase 2 — Video layer** *(~1 day, plus Rohit's footage)*
Build the `<CinematicVideo>` component with all the fallback logic above, source and compress the stock clips, wire the hero.

**Phase 3 — Homepage rebuild** *(~2 days)*
Nine acts with a deliberate arc: cinematic hero → proof rail → the problem, stated editorially → **pinned horizontal curriculum (signature move)** → the 49 slides as a proper gallery with a lightbox → instructor with video → interactive area lesson → reviews as a slow marquee → offer and early-access form with a sticky CTA.

**Phase 4 — Remaining pages** *(~2 days)*
Course, About, Stories, Resources, Contact — same component library, one signature moment each, consistent rhythm.

**Phase 5 — Conversion and credibility** *(~1 day)*
Early-access form fully wired to D1 with Turnstile spam protection and a real success state; scroll-depth and video-play analytics; a proper OG image to replace the clipart.

**Phase 6 — Quality gate** *(~half a day)*
Lighthouse ≥ 90 performance and 100 accessibility on mobile, keyboard and screen-reader pass, Safari video-autoplay check, visual regression across 4 pages × 2 breakpoints.

Roughly **8–9 working days** of build. Phases 0–3 give the visible transformation; that is where I would start.

---

## 5. What I need from Rohit

Blocking items are marked ⛔.

1. ⛔ **The clipart cover replaced.** Either a real photograph of the deck/a project, or I design a typographic cover in the brand system. This one change lifts the whole page.
2. ⛔ **20–30s of Rohit on camera.** A phone in landscape is fine — window light on his face, quiet room, one take, saying who he is and why he built the course.
3. **1–2 minutes of Hundred Yards project footage** — site walks, drone, handovers, anything real. Even rough phone clips beat stock.
4. **All 49 slides** as PNG or PDF. Only 6 are in the repo.
5. **Better portrait** — a second, well-lit shot.
6. **Credibility assets** — RERA number, awards, client logos, press mentions, real review screenshots.
7. **Price and launch date**, when decided.

Items 3–7 can arrive while I build. Items 1 and 2 gate the hero.

---

## 6. Cloudflare access — the honest answer

**Right now: no.** There is no Cloudflare credential in this session, and the bridge to the laptop has no internet, so `wrangler` cannot run there either.

Two ways to change that, both your call:

- **Connect the Cloudflare Developer Platform connector** (it exists in Claude's connector directory) — then I can read the Worker, deployments, D1 and logs directly, which makes debugging deploys much faster.
- **Connect GitHub auto-deploy** — push to `main` and Cloudflare builds and deploys on its own. No tokens shared with anyone, and it is the right long-term setup regardless.

Until then the loop is: I build and verify in my sandbox → you run `npm run deploy` → we look at the live URL together.

**One thing worth knowing:** the `node_modules` in the folder are Windows binaries, so nothing can build inside the laptop bridge (it is Linux). I have set up a full mirror of the project in my own sandbox — install, build, local server, and automated screenshots all working — so I can verify every change visually before you deploy anything.

---

## 7. Tooling

No new plugins needed. `design:design-critique` and `design:accessibility-review` are already available and will be used at each phase gate. I have written a `CLAUDE.md` at the repo root recording the stack, commands, design rules, motion rules and asset budgets, so any future session starts with the same standards instead of re-deriving them.

---

## 8. Suggested first move

Approve Phase 0–2 and I will build the foundation, the motion system and a fully working cinematic hero with stock video. You see the new direction running live on the homepage before we commit to rebuilding the other five pages.
