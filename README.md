# yc-tech

Personal site for Yaechan Lee (이예찬) — Enterprise AI × Go-to-Market × Strategy.

Live: https://yc-tech.vercel.app

## Stack

React 19 · Vite 8 · Tailwind 4 · Framer Motion · Vercel (static + serverless functions)

## Features

- Bilingual (KR/EN) with client-side toggle
- STRIX case study at `/case-study/strix`
- **Objection Simulator** (`/api/objection-simulator`) — takes a one-line pitch, returns three stakeholder objections (CFO / Security / End User) via Claude Sonnet 4.6. IP-based rate limit via Upstash Redis.

## Local development

```bash
npm install
npm run dev       # Vite dev server
npm run build     # production build
npm run lint
```

## Environment variables

Required for the Objection Simulator (`/api/objection-simulator.js`):

| Variable | Required | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key. Without it the endpoint returns 503 with a fallback URL. |
| `UPSTASH_REDIS_REST_URL` | No | Enables 5 req / 24h per-IP rate limit. Without it, rate limiting is disabled. |
| `UPSTASH_REDIS_REST_TOKEN` | No | Pair with the URL above. |

Static pages work without any env vars.

## Deploy

```bash
vercel --prod
```

SPA rewrite for case-study routes is configured in `vercel.json`.
