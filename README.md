# Holdwire

Finance and hard assets, with an EU lens: crypto prices, fintech, watches and collectibles. Working name; see `docs/plan/` for the full business and SEO plan.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (sponsored-link rules)
npm run build      # production build
```

## Environment variables

Copy `.env.example` to `.env.local`. All are optional for local work.

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonicals, sitemap and JSON-LD |
| `SITE_INDEXABLE` | `true` only on the live production domain. Anything else = `noindex` + `robots.txt` blocks all crawlers |
| `COINGECKO_API_KEY` | CoinGecko key. Without it, the free public API is used (rate-limited) |
| `COINGECKO_API_TIER` | `pro` for a paid plan, otherwise demo/free |

If the price API can't be reached, pages fall back to clearly labelled **sample data**.

## What's here

- `src/app/` — homepage, `/coins`, `/coins/[id]`, trust pages (`/about`, `/editorial-policy`, …), `sitemap.xml`, `robots.txt`
- `src/lib/coins.ts` — CoinGecko data layer (EUR, cached ~1 min)
- `src/lib/sponsored.ts` — enforces `rel="sponsored noopener"` on every paid link (tested)
- `src/content/coin-profiles.ts` — human-written coin summaries; **only coins with a profile are indexable** (quality gate)
- `content/pages/` — trust pages in Markdown (drafts pending legal review)
- `docs/plan/` — strategy, SEO playbook, roadmap, briefs

## Rules

See `CLAUDE.md`. Short version: never sell ranking power, label every paid piece, no thin pages, a human reviews everything before it's published.
