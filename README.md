# Rohit Property Studio

A cinematic real-estate education and digital-resource website built with React,
Vinext, GSAP, and Cloudflare Workers.

The public app is ready for Cloudflare hosting. Checkout and contact submission
are intentionally preview-only until payment, email, and persistence services are
connected.

## Requirements

- Node.js `>=22.13.0`
- A free Cloudflare account for deployment

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For Rohit Desk, copy `.env.example` to `.env.local` and add a Mistral API key.
Without a key, the interface remains usable and returns its honest local fallback.

## Validate

```bash
npm run lint
npm test
```

`npm test` creates a production build and checks the rendered home, course, and
not-found pages.

## Preview the Cloudflare Worker locally

```powershell
Copy-Item .dev.vars.example .dev.vars
npm run preview:worker
```

The real `.dev.vars` file is ignored by Git.

## Deploy to Cloudflare

Authenticate once, then deploy:

```bash
npx wrangler login
npm run deploy
```

Cloudflare prints the public
`https://rohit-property-studio.<account>.workers.dev` address after deployment.
No purchased domain is required.

To enable Rohit Desk in production, add the key as a Cloudflare runtime secret:

```bash
npx wrangler secret put MISTRAL_API_KEY
```

Never commit that key. `MISTRAL_MODEL` is already configured as a non-secret
Worker variable in `wrangler.jsonc`.

## Automatic deploys from GitHub

In Cloudflare, open **Workers & Pages → Create application → Import a
repository**, select this repository and `main`, then use:

- Build command: `npm run build`
- Deploy command: `npm run deploy:built`

Keep `MISTRAL_API_KEY` in the Worker's **Variables and Secrets**, not in GitHub
or the build environment.

## Current architecture

- App Router pages and route handlers under `app/`
- static editorial media under `public/media/`
- Cloudflare Images-backed `next/image` optimization
- `/api/ask` as the current server-side Mistral endpoint
- no database or payment processor connected yet

Payments can be added later through a server-side provider such as Stripe. That
integration should verify webhooks on the Worker and persist orders before the
download route is unlocked.
