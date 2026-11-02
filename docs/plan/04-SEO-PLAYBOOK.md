# 04 — SEO playbook

Ranking well in finance comes from four things working together: **technical excellence, topical authority, trust signals (E-E-A-T), and earned links.** Volume alone doesn't do it.

## 1. Technical foundation (Claude, built before launch)
- [ ] SSR/ISR on all indexable pages; no client-only content for main text.
- [ ] Unique `<title>` / meta description templates per page type; canonical on every page.
- [ ] JSON-LD: `NewsArticle`/`Article` (with `author` → `Person`, `publisher` → `Organization`, `datePublished`, `dateModified`), `BreadcrumbList`, `FAQPage` (only where real FAQs are visible), `Organization` (with `sameAs`), `WebSite` + `SearchAction`, `Dataset` for reports, `Product`-free (don't fake reviews).
- [ ] Sitemaps split by type: `news-sitemap.xml` (last 48h, Google News format), `articles`, `entities-*`, `learn`, `glossary`, `authors`. Sponsored in its own sitemap. Press releases excluded.
- [ ] `robots.txt`: block search/filter params, admin, previews; allow all else.
- [ ] IndexNow pings (Bing/Yandex) on publish/update; GSC sitemap submission.
- [ ] Pagination with crawlable links; no infinite scroll without paginated fallback.
- [ ] Breadcrumbs everywhere; clean 301 redirect manager; 404 monitoring.
- [ ] Core Web Vitals targets (see `03`). Lighthouse CI on every PR.
- [ ] OG/Twitter cards auto-generated per article/entity.
- [ ] RSS per vertical (feeds aggregators and Google News).
- [ ] `hreflang` ready for later localized editions.

## 2. Topical authority (the main lever)
For each vertical Claude builds a **topical map**: pillar → clusters → supporting pages, with internal links planned before writing.

Example, Crypto launch cluster:
- Pillar: `/learn/crypto` (complete beginner→advanced guide)
- Clusters: wallets, exchanges, DeFi, staking, stablecoins, L1s, Solana ecosystem, regulation (MiCA), taxes in EU countries
- Supporting: glossary terms (300+), entity pages (top 500 coins, top 100 exchanges), "X vs Y" comparisons, how-tos.

Rules:
- Each cluster gets **completed** before starting the next. Depth beats breadth.
- Every article links up to its hub, sideways to 3–5 siblings, and to relevant entity pages. Entity pages link back to news/guides that mention them (automatic via `entities[]`).
- Refresh evergreen pages on a schedule (quarterly; crypto monthly). `dateModified` only changes on real updates.

## 3. Programmatic SEO (the CoinMarketCap engine)
| Template | Count at launch | Unique value per page |
|---|---|---|
| `/coins/{asset}` | 500 → 5,000 | live price/market data, supply, chart, human-edited summary, FAQs, related news |
| `/exchanges/{x}` | 100 | volume, fees, supported regions/licensing (MiCA status), pros/cons |
| `/companies/{x}` | 200 fintechs | funding, products, licenses, news |
| `/glossary/{term}` | 300+ | short definition + example + links |
| `/watches/{brand}/{ref}` | 200 → 2,000 (phase 3) | specs, retail vs secondary price history, news |
| `/tools/*` comparisons | e.g. "{coin} to EUR" converter pages for the top 200 | live conversion + context |

Quality gate: pages roll out in **batches** (e.g., 100/week), watching GSC indexation and engagement. Thin pages stay `noindex` until they're enriched. This keeps us out of the "scaled content abuse" bucket.

## 4. Google News & Discover
- Requirements: clear dates, author bylines + bio pages, About/Contact/Editorial policy, original reporting, fast pages, large images (≥1200px wide, `max-image-preview:large`).
- **[HRIBI]** sets up Google News Publisher Center; Claude prepares all assets.
- Publish timely news **fast** (within 30–60 min of a story) with an original angle: data, context, a quote. Pure rewrites don't get picked up.

## 5. E-E-A-T (trust)
- Real named authors with credentials and `sameAs` links; editor-in-chief page.
- Editorial policy, corrections policy, sponsored-content policy, conflicts disclosure, "How we make money" page.
- Cite primary sources (filings, on-chain data, official announcements).
- "Reviewed by" line on guides; "Last updated" with change notes on evergreen pages.
- Organization schema with company details, address, contact.

## 6. Link earning (no buying)
- **Data reports** (monthly/quarterly) pitched to journalists: watch market index, EU crypto adoption, Balkan fintech funding, remittance cost tracker (fits your BalkanPay expertise; disclose it).
- **Free tools** others embed/link: calculators, embeddable price widgets (with a credit link on the embed, editorially fine because the user chooses to embed).
- **Digital PR** / reactive commentary (Hribi as expert source on HARO-type platforms like Qwoted, Featured).
- Podcast/X Spaces appearances, ecosystem partnerships (Solana projects linking to explainers).
- Never: PBNs, link buying, link exchanges at scale.

## 7. Protecting the domain while selling content
- Sponsored ≤ 10–15% of pages; always on-topic finance; always edited to our standard.
- Separate `/sponsored/` and `/press-releases/` sections, own sitemaps, excluded from editorial modules.
- Press releases `noindex` by default.
- All paid links `rel="sponsored"`.
- Monitor GSC Manual Actions weekly; if traffic to sponsored sections spikes oddly or CTR drops, review.

## 8. Measurement
- GSC: impressions, clicks, indexed pages by type, CWV.
- Rankings for the top 200 target keywords (Ahrefs/Semrush rank tracker).
- Weekly report by Claude: wins, losses, indexation, next actions.
