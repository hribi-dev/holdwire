# 11 — Competitor teardown (Holdwire, Nov 2026)

Working brand: **Holdwire** (not final). Sources: public Semrush/Ahrefs/Similarweb summaries, company pages, industry reviews found via web search on 2026-11-02. Traffic figures are third-party estimates; use them for orders of magnitude only.

## 1. The landscape in one picture
| Player | Type | Scale (est.) | How it wins search | How it makes money |
|---|---|---|---|---|
| **CoinMarketCap** | data aggregator | ~3.5M organic visits/mo, 29.5M backlinks, authority ~88 | one live page per coin/exchange; brand searches; "X price" keywords | ads, listings, Binance ecosystem |
| **CoinGecko** | data aggregator | ~79% direct traffic, ~12% Google | brand + coin pages ("pi coin" etc.) | ads, API subscriptions, research |
| **Coinbase** (reference) | exchange | 26.9M organic/mo (2023) | **converter + price + "how to buy"** pages = ~80% of organic | trading fees |
| **CoinDesk** | news + data + events | ~5.7M visits/mo; DR 89, ~2.6M organic | news, 2,263 price pages, indices, research | sponsored ("Thought Leadership"), press releases, sponsor hubs (MEXC, Phemex…), events (Consensus), data/indices |
| **Decrypt** | news + education | ~300K organic/mo (mid-2025) | ranks #1 US for "btc price" with a price page | ads, sponsored, education |
| **The Block** | news + research + data | ~0.9M visits/mo | institutional research, data dashboards | subscriptions, sponsored |
| **Cointelegraph, CCN, Cryptonews, crypto.news, BeInCrypto** | news (volume) | 1–3M visits/mo each | high-volume news + price pages + "best X" lists | sponsored/PR heavy, affiliates |
| **Chainwire, BTCWire, EIN, BrandPush** | PR wires | — | — | sell PR packages that place releases on outlets ($149–$1,399+) |
| **Finextra** | fintech news | — | B2B fintech newswire, 100k+ archive items | advertising, lead-gen, events, research |
| **FinTech Futures** (Informa) | fintech news | 150k+ monthly visitors | B2B news, newsletter 25k+ | sponsored content, advertorials (£5–10k event packages), podcasts, events |
| **WatchCharts** | watch market data | ~0.7M visits/mo, ~47% Google | brand + model price pages; quarterly Morgan Stanley report cited by Bloomberg/Forbes | subscriptions, API, B2B brand reports, AI-assistant integrations |
| **Hodinkee** | watch media | ~1.25M users/mo | editorial authority, community | commerce/collabs; acquired by Watches of Switzerland |

## 2. What this tells us
1. **Crypto news alone is saturated.** One April-2026 analysis of 107 crypto news sites found the top 5 take ~78% of organic traffic. A new site that only does crypto news fights for scraps. → News is for freshness and social, not the traffic engine.
2. **Data/utility pages are the traffic engine.** Coinbase gets ~80% of its organic traffic from price, converter and "how to buy" pages. Decrypt, a news site, ranks #1 for "btc price" with a price page. CoinDesk runs 2,263 price pages. → We build price/converter/"how to buy in the EU" pages from day 1.
3. **Original data gets cited.** WatchCharts' quarterly report with Morgan Stanley is cited by Bloomberg, Yahoo Finance and Forbes. That is the link-earning model. → Monthly Holdwire data reports.
4. **Sponsored content is normal, but kept separate.** CoinDesk runs separate "Thought Leadership" and "Press Releases" sections plus sponsor hubs. → Copy the structure (matches `CLAUDE.md` rules).
5. **PR wires are a distribution channel to sell into.** Chainwire charges $1,399 for 8 guaranteed outlets; cheaper wires start around $149–195. They need outlets with real traffic. → Once we have traffic, become a **partner outlet** for 2–3 wires = recurring PR revenue with zero sales effort.
6. **Fintech B2B pays more per reader.** FinTech Futures sells advertorials inside £5–10k packages to a 150k/mo audience. → Fintech vertical = fewer visitors but higher-value sponsors.
7. **Watch data is a defensible niche.** WatchCharts dominates price data but sells an API. → We license or partner rather than scrape, and win on editorial + EU angle.

## 3. Gaps Holdwire can own
| Gap | Why it's open | What we build |
|---|---|---|
| **EU / MiCA angle** | Big outlets are US-centric | "MiCA-licensed exchanges tracker" built from ESMA's public register; exchange pages showing EU license status; "how to buy X in [EU country]" pages; EU crypto tax guides per country |
| **CEE / Balkans** | Almost no English-language coverage | regional fintech funding tracker, remittance cost index (disclose BalkanPay link), Balkan crypto adoption report |
| **Crypto + alternative assets in one place** | Crypto sites ignore watches/collectibles; watch sites ignore crypto | "Hard assets" angle: BTC vs gold vs Rolex vs art indices, cross-asset dashboards |
| **Honest exchange/broker comparisons for EU users** | Most "best exchange" lists are affiliate-driven and ignore licensing | comparisons ranked by license, fees, EU availability (affiliate only with licensed providers) |
| **Solana-ecosystem depth** | Hribi's insider network | Solana ecosystem hub, protocol entity pages, validator/MEV explainers (disclose Harmonic/HumidiFi ties) |

## 4. Features to copy (and from whom)
- Price page anatomy (Coinbase/CMC): price + chart, stats, ~600-word "about", FAQs, related news, converter widget, "how to buy" link.
- Converter pages `{coin}-to-{fiat}` (Coinbase): huge long-tail.
- Sponsor hub pages (CoinDesk): one page per big sponsor collecting their sponsored pieces, sold as a premium package.
- Indices (CoinDesk, WatchCharts): branded indices = citations + brand searches ("Holdwire Hard Asset Index").
- Newsletters by audience (CoinDesk has 5+): daily crypto brief, weekly fintech, weekly alt-assets.

## 5. Things NOT to copy
- Low-quality PR farms selling "backlinks on DA 70 sites": exactly what Google's spam policies target.
- AI price-prediction pages: YMYL risk, thin.
- Pure news volume (40–50 posts/day): we can't match it and don't need to.

## 6. Open items
- Exact keyword volumes need a paid SEO tool (Ahrefs/Semrush, ~€130/mo) **[HRIBI: decide when]** or GSC data after launch.
- Rate cards: most outlets give prices only on request. Claude can send media-kit requests from a Holdwire address once email exists.
