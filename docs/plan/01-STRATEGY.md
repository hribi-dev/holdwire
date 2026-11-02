# 01 — Strategy

## 1. What we're building
A finance media + data platform covering **all of finance**, organized as verticals:

| Vertical | Examples | Search intent we target |
|---|---|---|
| Crypto | assets, DeFi, Solana/ETH ecosystems, exchanges, regulation | "what is X", "X price", "X vs Y", news |
| Markets | stocks, ETFs, commodities, macro, rates | explainers, company profiles, news |
| Fintech | neobanks, payments, remittance, B2B fintech | company profiles, comparisons, funding news |
| Watches | Rolex, Patek, AP, independents; secondary market | reference pages, "is X a good investment", market reports |
| Collectibles | cards, sneakers, art, wine, cars, coins | category guides, market indices, auction results |
| Personal finance | savings, tax basics (EU-focused), investing 101 | evergreen guides, calculators |

**Launch focus:** we can't win all six at once on a new domain. Launch with **Crypto + Fintech** (your network and expertise, highest sponsor demand, fastest news cycle). Add **Watches + Collectibles** in phase 3 (lower competition, high-value advertisers, a real gap: few sites combine "alternative assets" with data). Markets and personal finance come last; they are the most competitive.

## 2. The CoinMarketCap lesson
CMC doesn't rank because of its articles. It ranks because it has **one authoritative, live-data page per entity** (asset, exchange, category), with millions of pages that each answer a query better than anyone else. Its news and education then sit on top of a domain that already has authority.

Our version:
- **Entity pages** (programmatic, data-driven): crypto assets, exchanges, fintech companies, watch references, collectible categories. Each has live/maintained data, a written summary, related news and FAQs.
- **Tools** that earn links: calculators (DCA, staking yield, watch ROI, FX/remittance cost), market trackers, a "Collectibles index".
- **Original data/reports** (monthly): e.g., "Secondary watch market report", "Balkan/EU fintech funding tracker". Journalists cite these, and that brings real backlinks.
- **News + analysis** for freshness, Google News and Discover traffic.
- **Evergreen guides + glossary** for topical authority.

## 3. Business model
Revenue, in rough order of when it switches on:
1. **Sponsored articles** (labeled, `rel="sponsored"`), packaged with newsletter + social distribution. Core product.
2. **Press-release distribution** (separate section, low-touch, volume product).
3. **Display/native ads** once traffic is above ~50k sessions/month (crypto-friendly networks first, then premium networks at scale).
4. **Newsletter sponsorships** (often worth more per reader than the site).
5. **Affiliate** (exchanges, brokers, watch marketplaces), only with licensed/MiCA-compliant partners.
6. **Later:** data API / premium reports, events, B2B research.

**What we sell:** audience, reach, brand association and distribution. **What we never sell:** "dofollow backlinks" or "SEO power". Buyers who want only that are the ones who get publishers penalized. See §5.

## 4. Why companies will pay us
- Real, measurable traffic in a niche they care about (we publish a media kit with verified analytics).
- Bundles: article + newsletter mention + X/Telegram post + permanent placement.
- Speed and quality: we write/edit the piece for them (most PR sites just paste).
- Your existing network (Solana ecosystem projects, Harmonic/HumidiFi circles) = the first 10–20 crypto sponsors.

## 5. The #1 risk: Google's spam policies
Google's **site reputation abuse** policy is aimed at third-party content published mainly to borrow a host site's ranking strength. Its **link spam** policy treats paid links that pass ranking credit as spam unless marked `rel="sponsored"` or `rel="nofollow"`. A site whose business is "pay to get posted on our high-authority domain" sits right in the target zone. (The EU Commission has been reviewing whether the policy unfairly hits publishers since Nov 2025, but the policy remains in force. Don't plan around it changing.)

**How we stay safe and still sell:**
- Sponsored content is a **minority** of output (target < 10–15% of published pages), always labeled, always edited by us, always on-topic for finance.
- All paid links are `rel="sponsored"`. This is in the contract and enforced in code.
- Paid content lives in dedicated sections, is excluded from "top stories"/editorial modules, and press releases are `noindex` by default (buyers get distribution and a permanent URL, not rankings).
- We price on **traffic and distribution**, so we don't depend on Google passing link value.
- Diversify early (newsletter, social, ads) so a Google change can't kill revenue.

## 6. Other risks
| Risk | Mitigation |
|---|---|
| New domain = slow rankings (finance is YMYL; expect 6–12 months to real traffic) | Programmatic data pages + tools + Google News + X/Telegram distribution from day 1; consider buying a clean, relevant aged domain (check history; avoid expired-domain abuse) |
| AI-content / scaled-content penalties | Human-edited, sourced, original data; no thin pages (see `05`) |
| Crypto ad/affiliate regulation (MiCA, local rules) | Only promote licensed providers; risk warnings; legal review (see `07`) |
| Credibility (sponsored-heavy sites lose trust) | Public editorial policy, named authors, corrections policy, clear labels |
| Conflicts of interest (your own projects) | Disclosure policy; don't cover your own projects as news without labeling |
| Data licensing | Use APIs whose terms allow commercial display (CoinGecko paid tier, etc.) |

## 7. Budget (rough, first 12 months)
| Item | Lean | Comfortable |
|---|---|---|
| Domain (new / aged) | €15–€50 / €500–€5,000 | — |
| Hosting (Vercel Pro), CMS, DB, CDN | €25–€60/mo | €150/mo |
| Data APIs (crypto, FX, stocks) | €0–€130/mo | €300+/mo |
| SEO tool (Ahrefs/Semrush) | €130/mo | €250/mo |
| Freelance writers/editors w/ finance expertise | €500/mo | €3,000+/mo |
| Legal setup + review | €500–€1,500 one-off | — |
| Design/brand | €0 (Claude + templates) | €1–3k one-off |
| **Total year 1** | **~€10–15k** | **~€40–60k** |

## 8. Success milestones (realistic)
| Month | Target |
|---|---|
| 1–2 | Site live, 300+ indexed pages, GSC clean, first 30 quality articles |
| 3–4 | 5–10k organic sessions/mo, Google News inclusion attempt, newsletter 500 subs |
| 6 | 30–50k sessions/mo, media kit live, first 5–10 paid placements |
| 9 | 100k sessions/mo, steady €3–8k/mo revenue |
| 12 | 200k+ sessions/mo, €10k+/mo, second vertical cluster ranking |
These numbers are targets, not guarantees. Finance SEO on a new domain swings a lot.

## 9. Open decisions (Hribi)
1. **Brand name + domain.** Short, finance-wide (not crypto-only), .com preferred. Claude will propose a shortlist with availability checks.
2. **New domain vs. buying an aged one.**
3. **Legal entity:** existing company (BalkanPay's?) vs. new d.o.o./s.p. Separate is cleaner for conflicts of interest.
4. **Budget tier:** lean or comfortable.
5. **Your weekly time** and whether you hire 1–2 freelance editors from the start.
6. **Language:** English only at launch (recommended), localized editions later.
