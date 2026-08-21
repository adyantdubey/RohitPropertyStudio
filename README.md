# Rohitt Kumar Singh — Modern Property Authority

A cinematic personal-brand website for Rohitt Kumar Singh, Managing Director of
Hundred Yards Realtor Pvt Ltd. It is built with React, Vinext, GSAP, and
Cloudflare Workers.

The public app is ready for Cloudflare hosting. The Property Academy is visibly
pre-launch: there is no PDF, price, payment gateway, order, or digital delivery
today. Contact prepares a message in the visitor's own email app and sends
nothing from the website itself.

## Requirements

- Node.js `>=22.13.0`
- A free Cloudflare account for deployment

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For the optional RKS site guide endpoint, copy `.env.example` to `.env.local` and add a Mistral API key.
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

To enable the optional site guide in production, add the key as a Cloudflare runtime secret:

```bash
npx wrangler secret put MISTRAL_API_KEY
```

Never commit that key. `MISTRAL_MODEL` is already configured as a non-secret
Worker variable in `wrangler.jsonc`.

## Automatic deploys from GitHub

Automatic deployment is not enabled merely by pushing this repository. Connect
the existing Worker to GitHub first: open **Workers & Pages →
rohit-property-studio → Settings → Builds → Connect**, select this repository,
choose `main` as the production branch, then use:

- Build command: `npm run build`
- Deploy command: `npm run deploy:built`

Optionally enable non-production branch builds to receive a preview Worker URL
for pull requests. Once the Git connection exists, pushes to `main` trigger the
production build and deploy automatically.

Keep `MISTRAL_API_KEY` in the Worker's **Variables and Secrets**, not in GitHub
or the build environment.

## Current architecture

- App Router pages and route handlers under `app/`
- static editorial media under `public/media/`
- Cloudflare Images-backed `next/image` optimization
- `/api/ask` as an optional, bounded server-side Mistral site-guide endpoint
- no database or payment processor connected yet

Payments can be added later through a server-side provider. That integration
must verify successful payment server-side and persist the order before any
download route is unlocked.
