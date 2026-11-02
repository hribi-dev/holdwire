# 03 — Technical architecture

## Stack (recommended)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router), TypeScript** | SSR/ISR for SEO, huge ecosystem, fits Vercel |
| CMS | **Payload CMS** (self-hosted inside the Next app) | Free and open-source, typed, roles/workflows, drafts, versioning, custom fields like `sponsored`, `reviewedBy`. Alt: Sanity (hosted) |
| DB | **Postgres** (Neon or Supabase) | CMS + entity/market data |
| Hosting | **Vercel** (Pro) | ISR, edge, image optimization; you already use it |
| CDN/DNS/WAF | **Cloudflare** (DNS + bot protection) | Speed, scraping protection |
| Media | Vercel Blob or Cloudflare R2 + `next/image` | Cheap, fast |
| Search (on-site) | Postgres full-text first → Meilisearch/Typesense later | |
| Analytics | **GA4 + Plausible** (Plausible = privacy-friendly, clean numbers for the media kit) | |
| Newsletter | **Beehiiv** (built-in ad network & sponsorships) or Resend + own list | |
| Jobs/cron | Vercel Cron / GitHub Actions / Trigger.dev | data refresh, sitemaps, IndexNow pings |
| Monitoring | Sentry + uptime check | |

## URL structure (flat, readable, permanent)
```
/                                  home (top stories, markets ticker, verticals)
/news/                             all news (paginated)
/news/{slug}                       article (news never has date in URL; date in schema)
/crypto/  /markets/  /fintech/  /watches/  /collectibles/  /personal-finance/   vertical hubs
/crypto/{topic}/                   topic hubs (e.g. /crypto/defi/, /crypto/solana/)
/learn/{slug}                      evergreen guides
/glossary/{term}                   glossary
/coins/{asset}                     crypto entity page (live data)
/exchanges/{exchange}              exchange entity page
/companies/{company}               fintech/public company profiles
/watches/{brand}/{reference}       watch reference pages
/collectibles/{category}           collectible category/index pages
/tools/{tool}                      calculators/trackers
/reports/{slug}                    original data reports
/sponsored/{slug}                  sponsored articles (labeled template)
/press-releases/{slug}             press releases (noindex default)
/authors/{name}                    author pages (E-E-A-T)
/about /editorial-policy /advertise /contact /corrections /disclosures
```

## Content model (CMS collections)
- **Article**: title, slug, dek, body (rich text), vertical, topics[], entities[] (coins/companies/watches), type (news | analysis | guide | report | sponsored | press-release), author(s), reviewedBy, sources[], publishedAt, updatedAt, heroImage, faq[], seo override, `isSponsored`, `sponsor` (rel), `disclosure` text, `noindex`.
- **Author**: name, bio, expertise, credentials, social links, photo.
- **Entity** (Coin / Exchange / Company / WatchReference / CollectibleCategory): identifiers, data fields, written summary (human-edited), FAQs, `qualityScore`, `indexable` flag.
- **Topic**: name, vertical, description, parent.
- **Sponsor**: company, contact, contract ref, invoices, links used.
- **Redirect**, **GlossaryTerm**, **Report**, **Tool** config.

## Enforcement in code (non-negotiable)
- Article renderer: if `type ∈ {sponsored, press-release}` → show label banner, add disclosure, rewrite **all** outbound links to `rel="sponsored noopener"`, exclude from "Top stories", homepage hero and related-news modules, and use the separate sitemap.
- Press releases: `noindex, follow` by default (editor can override per piece with a reason logged).
- Publish blocked unless `reviewedBy` is set and `sources[]` is non-empty (except opinion).
- Entity pages: `indexable` only if `qualityScore ≥ threshold` (has summary ≥ N words, live data present, ≥1 related article or FAQ).

## Data pipelines
| Data | Source options | Refresh |
|---|---|---|
| Crypto prices/market caps | CoinGecko API (paid tier for commercial use), CoinMarketCap API, DefiLlama (TVL, free) | 1–5 min (cache at edge) |
| FX | ECB reference rates (free), exchangerate APIs | daily / hourly |
| Stocks | Financial Modeling Prep / Polygon / Alpha Vantage | 15-min delayed |
| Fintech funding | Manual + Crunchbase (paid) + press monitoring | weekly |
| Watches | Manual reference DB to start; WatchCharts-type data needs licensing | monthly |
| Collectibles | Auction results (public), category indices built by us | monthly |
Everything must have licensing that allows commercial display. **[HRIBI]** approves paid data spend.

## Performance targets
- LCP < 2.0s, INP < 200ms, CLS < 0.05 on mobile (field data).
- Pages server-rendered; prices hydrated client-side from a cached endpoint so HTML stays cacheable.
- Images via `next/image`, AVIF/WebP, fixed dimensions. Fonts self-hosted, `display: swap`.
- Ads (later) loaded lazily in reserved slots to protect CLS.

## Repo layout
```
/app            routes
/components     UI
/cms            Payload collections & hooks
/lib            data fetchers, seo helpers, schema builders
/jobs           cron jobs (prices, sitemaps, indexnow, news monitor)
/content-pipeline  briefs & drafts (markdown) before CMS
/docs           these plan files
```
