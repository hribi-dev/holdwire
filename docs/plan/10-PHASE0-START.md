# 10 — Phase 0: starting from zero (2026-11-02)

Status: Hribi has nothing prepared yet (no name, domain, company, or accounts). Phase 0 runs from scratch.

## A. Brand name shortlist (round 1)
Criteria: finance-wide (not crypto-only), short, works in English, `.com` preferred, no existing finance brand with the same name.
Domain availability could NOT be checked from Claude's workspace (whois/registrar sites blocked). **Hribi checks .com availability at a registrar (Porkbun / Cloudflare Registrar / Namecheap).**

| Name | Idea | Conflict check (web search, 2 Nov 2026) | Verdict |
|---|---|---|---|
| **Holdwire** | holdings / HODL + newswire | no finance brand found | ✅ top pick |
| **Ledgerline** | ledger (finance + crypto) + line | no direct match; "FinLedger" (US fintech news) exists, different name | ✅ |
| **Assetwire** | all assets + wire | no brand found; "FinanceWire"/"Citywire" use similar pattern | ✅ |
| **Vaultpost** | vault (watches, gold, collectibles) + post | no exact match, but "Vault" is crowded in fintech (weak trademark) | ⚠️ |
| **Marketfolio** | market + portfolio | no brand found; generic, harder to protect | ⚠️ |
| Assetline | — | used by finance companies (Sri Lanka lender; AU luxury-asset lender) | ❌ |
| Assetry | — | existing SaaS product | ❌ |
| Tickerline | — | "Ticker" space crowded (ticker.app, Ticker by Finology) | ❌ |

Next round: Claude generates 15 more once Hribi says which style he likes (descriptive like "Assetwire" vs. invented like "Kraken"/"Messari").

## B. Hribi's setup checklist (in order)
1. **Pick the name.** Check `.com` at a registrar. Buy it (~€10–15/yr). Also grab the X handle and Telegram username the same day.
2. **Email on the domain**: Google Workspace (~€7/mo) or Zoho Mail (free tier). Needed for every account below.
3. **Accounts (all free to start)**: GitHub, Vercel (Hobby now → Pro at launch), Cloudflare (DNS), Neon (Postgres). Add Claude's work via a GitHub repo you create and connect to this project.
4. **Company**: building can start before the company exists. Register before taking the first payment: d.o.o. (limited liability, recommended for a media business that takes advertiser money) or s.p. Talk to an accountant about tax and VAT, and to a lawyer (see `07`).
5. **Budget tier**: lean (~€10–15k year 1) or comfortable (~€40–60k).
6. **Data API**: not needed until Phase 1 coin pages (CoinGecko paid plan for commercial use).

## C. What Claude does in parallel (needs nothing from Hribi)
- Competitor teardown (CMC, CoinGecko, CoinDesk, The Block, Decrypt, Finextra, Hodinkee, WatchCharts).
- Topical maps for Crypto + Fintech.
- `/seo-system/` scaffold (business context, competitor files, prompt library).
- Brand starter kit once the name is chosen.
