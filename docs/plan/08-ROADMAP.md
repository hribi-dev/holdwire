# 08 — Roadmap & execution checklist

Owner tags: **[CLAUDE]** · **[HRIBI]** · **[BOTH]**. Mark blocked items with `⛔ waiting on HRIBI`.
Timeline assumes ~10 h/week from Hribi plus 1 freelance editor from phase 2.

---

## Phase 0 — Decisions & foundations (Week 0–2)
**Exit criteria:** name + domain owned, entity path chosen, accounts created, repo exists.

- [x] [CLAUDE] Brand name shortlist round 1 (→ `10`); working name **Holdwire**, final pick open
- [ ] [HRIBI] Choose name; buy domain (+ common typos/.io/.co if cheap); decide new vs aged domain
- [ ] [CLAUDE] If aged domain: audit candidates (Wayback history, backlink profile, past spam)
- [ ] [HRIBI] Decide entity, budget tier, language (EN-first recommended)
- [x] [HRIBI] GitHub repo `hribi-dev/holdwire` (private) created
- [ ] [HRIBI] Create: Vercel team, Cloudflare, Neon/Supabase, email (Google Workspace), Beehiiv; share access
- [ ] [HRIBI] Book lawyer intro call (entity, media register, MiCA marketing, contracts)
- [x] [CLAUDE] Competitor teardown (→ `11`): CMC, CoinGecko, CoinDesk, The Block, Decrypt, Finextra, Hodinkee, WatchCharts, Bitcoinist/NewsBTC-style PR sites (structure, page types, rate cards)
- [x] [CLAUDE] Topical maps for Crypto + Fintech (→ `12`; seed queries, volumes pending SEO tool/GSC)
- [ ] [CLAUDE] Brand starter kit: logo concepts, color/type system (Hribi picks)
- [x] [CLAUDE] Set up `/seo-system/`: business context, 15-prompt library (`seo-system/prompts/`), AI-search prompt list (competitor files: next)
- [ ] [HRIBI] Paste the @bloggersarvesh article text into `/seo-system/source-article.md` ⛔

## Phase 1 — Build the MVP (Week 2–6)
**Exit criteria:** site live on the domain, Lighthouse ≥95 mobile, all legal pages, GSC verified, 100+ quality pages.

- [x] [CLAUDE] Scaffold Next.js 16 site (pushed to `hribi-dev/holdwire`): homepage, /coins, /coins/[id], trust pages, sitemap/robots, JSON-LD, sponsored-link enforcement + tests
- [x] [CLAUDE] CI on GitHub Actions (test, lint, typecheck, build)
- [ ] [CLAUDE] Add Payload CMS + Postgres (needs Neon account; until then content is Markdown in the repo with a reviewer gate)
- [x] [HRIBI] Repo connected to Vercel (project `hribis-projects/holdwire`); auto-deploys on every push to main
- [x] [CLAUDE] Design mockup: homepage + coin page (Design canvas "Holdwire — website mockup")
- [ ] [CLAUDE] CMS collections (Article, Author, Entity types, Topic, Sponsor, Glossary, Redirect) with publish guards
- [x] [CLAUDE] Templates built: home, Hyperliquid hub, coins list, coin, guide (/learn), glossary, sponsored, press release, trust pages
- [ ] [CLAUDE] Templates still to build: vertical hubs, topic hubs, exchange, company, author, tool, report
- [ ] [CLAUDE] SEO layer: metadata, JSON-LD builders, sitemaps (incl. news), robots, IndexNow, redirects, breadcrumbs, OG images, RSS
- [x] [CLAUDE] Sponsored enforcement (labels in code, `rel="sponsored"` rewrite, noindex PRs, sponsor name required) + tests
- [ ] [HRIBI] Buy data API plan (CoinGecko Analyst or equivalent); add keys to Vercel ⛔
- [x] [CLAUDE] Hyperliquid live exchange stats (volume, OI, funding) on the hub
- [ ] [CLAUDE] Crypto data pipeline + price ticker + coin pages (top 500, quality-gated): top 50 live, 4 profiles written
- [ ] [CLAUDE] Tools v1: crypto converter, DCA calculator, staking yield calculator
- [x] [CLAUDE] Draft legal/policy pages (→ `content-pipeline/pages/`) · [ ] [HRIBI] lawyer review → publish
- [ ] [HRIBI] Author identities: your editor-in-chief bio/photo; recruit 1–2 contributors
- [x] [CLAUDE] Briefs for first 15 launch guides (→ `content-pipeline/briefs/launch-guides-p1.md`)
- [ ] [CLAUDE] Write 30 launch pieces: 3/30 drafted (What is Bitcoin, MiCA explained, HIP-3 explained) → [HRIBI]/editor review
- [ ] [CLAUDE] 150 glossary terms: 33/150 drafted
- [ ] [HRIBI] Verify GSC, Bing Webmaster, GA4/Plausible; submit sitemaps
- [ ] [BOTH] Launch: soft launch → fix → public launch (X thread, network)

## Phase 2 — Content engine & indexation (Month 2–4)
**Exit criteria:** 600+ indexed pages, 5–10k organic sessions/mo, Google News applied, newsletter 500+.

- [ ] [CLAUDE] Scheduled news-monitoring task → daily story shortlist
- [ ] [HRIBI] Hire 1 freelance editor/writer (crypto/fintech); onboard to the style guide
- [ ] [BOTH] Output: 5 guides/week, 2–5 news/day, 100 entity pages/week (batched), 30 glossary/week
- [ ] [CLAUDE] Exchanges (100) + fintech companies (200) entity pages
- [ ] [HRIBI] Google News Publisher Center application
- [ ] [CLAUDE] Newsletter templates (daily brief, weekly) + signup flows; [HRIBI] connects Beehiiv
- [ ] [BOTH] Social: brand X/TG/LinkedIn; Claude drafts daily posts, Hribi posts/approves
- [ ] [CLAUDE] Weekly SEO report (scheduled task) running the `09` priority order: fixes → page-2 goldmine → CTR → decay → new content
- [ ] [HRIBI] Give Claude GSC access (or weekly CSV exports) ⛔
- [ ] [CLAUDE] AI-search visibility tracking: 50 target prompts, bi-weekly check
- [ ] [CLAUDE] First data report (e.g., "EU crypto exchange licensing tracker" or "Remittance cost index Balkans", with disclosure)
- [ ] [BOTH] Digital PR: pitch the report; Hribi joins expert-source platforms

## Phase 3 — Authority & expansion (Month 4–8)
**Exit criteria:** 30–50k sessions/mo, 50+ referring domains from real sites, watches/collectibles vertical live.

- [ ] [CLAUDE] Watches + Collectibles topical maps; reference DB schema; first 200 watch reference pages
- [ ] [HRIBI] Recruit a watch/collectibles contributor with real credibility
- [ ] [CLAUDE] Tools v2: watch ROI tracker, collectibles index, remittance cost calculator, embeddable widgets
- [ ] [CLAUDE] Monthly data reports (rotate verticals)
- [ ] [CLAUDE] Content refresh system (stale-page detection from GSC decay)
- [ ] [CLAUDE] Internal-linking engine v2 (auto-suggest from entities/topics)

## Phase 4 — Monetization on (Month 5–9)
**Exit criteria:** first 10 paid placements, media kit public, €3–8k/mo.

- [ ] [CLAUDE] Media kit (page + PDF), rate card, packages, `/advertise` with order form, sponsor CRM
- [ ] [CLAUDE] Advertiser contract + sponsored guidelines drafts → [HRIBI] lawyer review
- [ ] [HRIBI] Close first sponsors from your network (launch pricing)
- [ ] [CLAUDE] Prospect lists + outreach sequences (recent raises, EU-licensed CASPs, fintech launches, watch dealers) → [HRIBI] sends
- [ ] [HRIBI] Agency reseller deals (crypto PR agencies)
- [ ] [BOTH] Ad network application at threshold; CMP (TCF) setup
- [ ] [CLAUDE] Post-campaign reporting template (7/30-day metrics)
- [ ] [CLAUDE] Quarterly audit: sponsored share ≤ 15%, labels, link attributes, GSC manual actions

## Phase 5 — Scale (Month 9–18)
- [ ] [BOTH] Markets + personal-finance verticals
- [ ] [BOTH] Localized editions (SL/HR/SR or DE) with hreflang
- [ ] [CLAUDE] Data API / premium reports exploration
- [ ] [HRIBI] Team: editor-in-chief or managing editor, sales lead (commission)
- [ ] [BOTH] Events / X Spaces series / podcast

---

## Weekly operating rhythm (from Phase 2)
| Day | Claude | Hribi |
|---|---|---|
| Mon | SEO report + week's content plan | Approve plan (15 min) |
| Daily | News shortlist + drafts, social drafts | Pick/approve, post, 30–60 min |
| Wed | Entity batch + glossary batch | Spot-check 5 pages |
| Fri | Refresh list, outreach drafts, sponsor pipeline update | Sales calls / sends |

## Status log
- 2026-11-02 — Plan created. Next: Phase 0 decisions (name/domain, entity, budget).
- 2026-11-02 — Hribi confirmed starting from zero. Name shortlist round 1 + setup checklist in `10-PHASE0-START.md`. ⛔ Waiting on: name pick + .com check, budget tier.
- 2026-11-02 — Working name Holdwire (Hribi can change later). Competitor teardown `11` + topical map `12` + `seo-system/business-context.md` done. ⛔ Waiting on: holdwire.com check/purchase, budget tier (can decide along the way).
- 2026-11-02 — Mockup done (homepage + Bitcoin page). Site build blocked: npm registry not allowed in workspace. Trust pages drafted, 15 launch briefs written. ⛔ Waiting on: registry access, holdwire.com, GitHub repo, mockup feedback.
- 2026-11-02 — MVP site built and pushed to github.com/hribi-dev/holdwire (private). Domain deferred by Hribi. ⛔ Next: Hribi connects the repo to Vercel for a preview link.
- 2026-11-02 — Hribi: Hyperliquid gets top priority. Built /hyperliquid hub, homepage lead, HYPE pinned in ticker/nav, written HYPE profile. Next: Hyperliquid guides + exchange stats from Hyperliquid's public API.
- 2026-11-02 — Clarified: Hyperliquid = most attention, site stays finance-wide (balance rule in `12`). Added 'Why Wall Street is paying attention' timeline (US ETFs, ICE/trade.xyz) to the hub.
- 2026-11-02 — Built: CI, content system (guides/glossary/sponsored/PR with reviewer gate), 3 guide drafts, 33 glossary terms, live Hyperliquid stats, SEO prompt library. Finding: free MiCA trackers already exist (casptracker.eu, MiCA Crypto Alliance) → our MiCA data must be embedded in exchange pages + country how-to-buy guides, not a standalone list. ⛔ Hribi: Vercel, reviewer for guides.
- 2026-11-02 — Live on Vercel; CI green (fixed typecheck ordering). ⛔ Hribi: review 3 guides, disclosure line.
- 2026-11-02: /fintech (neobank comparison incl. Tria, affiliate slots in src/content/neobanks.ts, paid links only for EU-authorised providers), /watches, /collectibles hubs live as noindex drafts. Casino tab on hold (legal: unlicensed gambling ads banned in Slovenia/EU). ⛔ Hribi: affiliate URLs, review hubs, casino decision.
- 2026-11-02: /memes live (noindex draft): GeckoTerminal trending pools Solana/Base/BNB, pump.fun graduates on PumpSwap, $25k liquidity floor, no buy links, no paid-boost rankings. pump.fun/Fomo have no official public API → covered via DEX data + editorial cards.
