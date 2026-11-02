# 12 — Topical map v1: Crypto + Fintech (launch verticals)

Structure: **Pillar → Clusters → Pages**. Priority: **P1** = launch (first 6 weeks), **P2** = months 2–3, **P3** = later.
Page types: `G` guide · `E` entity (programmatic) · `T` tool · `C` comparison · `GL` glossary · `R` report · `H` hub.
Queries are seeds. Volumes and difficulty are to be filled from Ahrefs/Semrush or GSC; nothing is verified yet.

---

## CRYPTO

### ★ Pillar 0: Hyperliquid (top priority, set by Hribi 2026-11-02)
Hub: `/hyperliquid` (live). Gets the homepage lead slot and first position in ticker and nav.

**Coverage balance (Hribi, 2026-11-02):** Holdwire stays a finance-wide site. Hyperliquid is the single biggest topic, not the only one: it holds the homepage lead and first nav slot, and gets roughly a quarter to a third of crypto output (guides, news, data). Everything else in the plan (markets, MiCA, fintech, watches, collectibles) continues at full priority. Report US institutional interest factually (ETFs, ICE/trade.xyz, CFTC process); never claim official endorsement, and note that Hyperliquid's own app is closed to US users.

| Cluster | Pages | Type | Prio |
|---|---|---|---|
| Hub + HYPE coin page | `/hyperliquid`, `/coins/hyperliquid` | H/E | P1 ✅ built |
| How-to | Use Hyperliquid from the EU; bridging/depositing; HyperCore↔HyperEVM transfers | G | P1 |
| Token | HYPE staking, buybacks/Assistance Fund, unlock schedule | G | P1 |
| Upgrades | HIP-3 builder perps, HIP-4 outcome markets, vaults | G | P1 |
| Comparisons | Hyperliquid vs Binance/Bybit/dYdX/other perp DEXs | C | P1 |
| Risk | Liquidations, leverage, regulatory status (MiCA, regulator alerts) | G | P1 |
| Data | Live exchange stats (volume, OI, funding, fees, buybacks) from Hyperliquid public API; weekly Hyperliquid report | T/R | P1→P2 |
| Ecosystem | HyperEVM apps directory, entity pages for major HyperEVM protocols | E | P2 |
| News | Hyperliquid topic hub, daily coverage | news | P1 |
Disclosure: Hribi's own Hyperliquid holdings/trading must be listed on /disclosures.

### Pillar A — Crypto prices & markets (traffic engine)
| Cluster | Pages | Type | Prio | Seed queries |
|---|---|---|---|---|
| Coin pages | top 500 coins `/coins/{coin}` | E | P1 | "{coin} price", "{coin} market cap", "what is {coin}" |
| Converters | top 100 coins × EUR, USD, GBP, CHF `/convert/{coin}-to-{fiat}` | T/E | P1 | "btc to eur", "sol to usd" |
| Market overview | `/crypto/markets`, gainers/losers, trending, categories (DeFi, L1, memecoins, RWA, AI) | H/E | P1 | "crypto market today", "top gainers crypto" |
| Exchanges | 100 exchanges `/exchanges/{x}` with volume, fees, **EU/MiCA status** | E | P2 | "{exchange} review", "is {exchange} safe", "{exchange} fees" |
| Indices | Holdwire Crypto 20 index, BTC dominance, fear/greed-style sentiment | T/R | P3 | "crypto index", "btc dominance" |

### Pillar B — Buying, holding & using crypto (EU-first)
| Cluster | Pages | Type | Prio | Seed queries |
|---|---|---|---|---|
| How to buy | "How to buy {coin} in {country}" for top 20 coins × 10 EU countries (rollout from top 3 countries) | G/E | P1→P2 | "how to buy bitcoin in germany", "buy solana slovenia" |
| Exchanges for EU users | best MiCA-licensed exchanges (overall + per country), X vs Y comparisons | C | P1 | "best crypto exchange europe", "kraken vs bitpanda" |
| Wallets | hardware vs software, best wallets, setup guides (Phantom, Ledger, etc.) | G/C | P1 | "best crypto wallet", "phantom wallet guide" |
| Security | seed phrases, scams, recovering funds, 2FA | G | P1 | "crypto scams", "what is a seed phrase" |
| Stablecoins | USDC/EURC/USDT explainers, MiCA stablecoin rules, euro stablecoins | G/E | P1 | "euro stablecoin", "usdt mica" |
| Payments & cards | crypto cards in EU, off-ramping, remittances | G/C | P2 | "crypto debit card europe", "send money with crypto" |

### Pillar C — Learn crypto (authority + glossary)
| Cluster | Pages | Type | Prio |
|---|---|---|---|
| Fundamentals | what is bitcoin/blockchain/ethereum/solana, how mining/staking work, halving | G | P1 |
| DeFi | DEXs, AMMs, lending, liquid staking, yield, impermanent loss, dark pools/MEV | G | P1 |
| Solana ecosystem hub | Solana guide, top protocols (entity pages), validators, MEV/block building, Jito/Harmonic explainer (with disclosure) | H/G/E | P1 |
| Ethereum & L2s | rollups, L2 comparison | G/C | P2 |
| RWA & tokenization | tokenized treasuries, stocks, gold; links to alt-assets vertical | G | P2 |
| Glossary | 300+ terms `/glossary/{term}` | GL | P1 (150) → P2 |

### Pillar D — Regulation & tax (EU focus, YMYL: needs expert review)
| Cluster | Pages | Type | Prio |
|---|---|---|---|
| MiCA | MiCA explained (draft ✅), CASP licensing, **MiCA licence data** built into exchange pages and country how-to-buy guides | G/R/T | P1 |

> Note (2026-11-02): standalone MiCA trackers already exist (casptracker.eu, MiCA Crypto Alliance, Aug 2026). Ours only wins if it is combined with things they lack: fees, EU country availability, Hyperliquid/DEX context, and plain-English guidance on every exchange page.
| Crypto tax by country | Slovenia, Croatia, Germany, Austria, Italy, France, Spain, NL, Poland, Portugal | G | P2 |
| AML / Travel rule | what users need to know | G | P3 |

### Pillar E — Crypto news & analysis
Topic hubs: Bitcoin, Ethereum, Solana, DeFi, Regulation, Exchanges, Stablecoins, Markets. News articles attach to entities so coin/exchange pages show related news automatically. P1 from launch, 2–5/day.

---

## FINTECH

### Pillar F — Fintech companies (entity engine)
| Cluster | Pages | Type | Prio | Seed queries |
|---|---|---|---|---|
| Company profiles | 200 fintechs `/companies/{x}`: neobanks, payments, remittance, brokers, crypto firms; funding, licenses, products | E | P2 | "{company} review", "is {company} legit", "{company} funding" |
| Neobanks Europe | best neobanks, Revolut vs N26 vs Wise etc. | C | P1 | "revolut vs wise", "best neobank europe" |
| Brokers & investing apps | Trade Republic, Scalable, eToro, IBKR comparisons (EU) | C | P2 | "trade republic vs scalable" |
| Remittances | cost to send money to Serbia/Bosnia/etc., best apps; **Remittance Cost Index** (disclose BalkanPay) | T/R/C | P2 | "send money to serbia", "cheapest way to send money to bosnia" |

### Pillar G — Payments & banking tech
| Cluster | Pages | Type | Prio |
|---|---|---|---|
| Payments explained | SEPA Instant, open banking/PSD3, digital euro, BNPL, A2A payments | G | P2 |
| Digital euro & CBDCs | digital euro explainer + tracker | G/R | P2 |
| B2B fintech | embedded finance, BaaS, regtech explainers | G | P3 |

### Pillar H — Fintech funding & industry data
| Cluster | Pages | Type | Prio |
|---|---|---|---|
| CEE/Balkan fintech funding tracker | monthly report + database | R/T | P2 (link magnet) |
| EU fintech news | funding rounds, licenses, launches | news | P1 |

---

## Launch package (P1, first 6 weeks)
- 500 coin pages + 400 converter pages (quality-gated, rolled out in batches of ~100)
- 15 pillar/cluster guides (A–D, Solana hub, neobank comparison)
- MiCA licensed exchanges tracker (flagship)
- 3 tools: converter, DCA calculator, staking yield calculator
- 150 glossary terms
- Daily news from launch

## Internal-linking rules
- Every guide → its pillar hub + 3–5 siblings + all mentioned entities.
- Every entity page → related guides, latest news, converters.
- Glossary terms are linked automatically on first mention in articles (max 5 per article).

## Next
- [CLAUDE] Watches + Collectibles map (Phase 3).
- [HRIBI] Decide on an SEO tool so the seed queries get real volumes; otherwise volumes come from GSC after launch.
