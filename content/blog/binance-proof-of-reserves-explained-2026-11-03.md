---
title: "Binance's new proof of reserves: what it shows, and what it doesn't"
description: "Binance published a zero-knowledge reserve proof for 10 coins after its $6.3 billion hack. Here is what the proof can tell you, its limits, and what comes next."
category: Markets
author: Tickora
reviewedBy:
published: 2026-11-03
updated: 2026-11-03
sources:
  - title: "The Block: Binance completes latest proof of reserves as it works to restore assets, withdrawals after record hack"
    url: https://www.theblock.co/news/business/2026-11-02-binance-zero-knowledge-proof-of-reserves-snapshot-hack-recovery-432321
  - title: "crypto.news: Binance completes reserve proof for 10 tokens after $6.3B hack"
    url: https://crypto.news/binance-completes-reserve-proof-for-10-tokens-after-6-3b-hack/
  - title: "TokenPost: Binance completes reserve proof, plans a Nov. 4 snapshot"
    url: https://www.tokenpost.com/news/business/46512
  - title: "Bitcoin.com News: Binance has shed $16B since the hack"
    url: https://news.bitcoin.com/exchanges/binance-sheds-15-7b-proof-of-reserves-tuesday/
  - title: "Forex Crunch: Binance routes withdrawals through new wallets"
    url: https://www.forexcrunch.com/blog/2026/11/03/binance-routes-withdrawals-through-new-wallets-but-a-tenth-of-the-breach-remains-uncovered/
cover:
  src: https://images.unsplash.com/photo-1582139329536-e7284fece509
  alt: "A heavy steel bank vault door with a circular locking wheel"
  credit: "Jason Dent"
  sourceUrl: https://unsplash.com/photos/steel-bank-vault-door-locking-wheel-3wPJxh-piRw
  license: unsplash
---

**Short version:** Binance has published a zero-knowledge proof of reserves for 10 major coins, based on a snapshot taken on 31 October, two days after its $6.3 billion hack. It says all 10 are backed at least 1:1, and that it has replaced about 95% of the stolen assets. The proof is a useful check, but it is a picture of one moment, it covers only part of what Binance holds, and it is not an audit.

## What happened

On Monday 2 November, Binance said it had finished the zero-knowledge proof for its reserve snapshot of 00:00 UTC on 31 October, according to The Block and crypto.news. That came a day earlier than the 3 November date the exchange had given, according to crypto.news.

The proof covers 10 assets: BTC, ETH, USDT, BNB, SOL, USDC, XRP, USD1, RLUSD and ZEC. Binance says customer balances in each are backed by reserves of at least 100%. Forex Crunch, citing Binance's own figures, reports bitcoin at 100.04% and BNB at 101.30%.

Binance also says:

- It has **replaced about 95%** of the affected assets with its own money, including its SAFU emergency fund and company treasury, according to crypto.news. The remaining 5% are less liquid tokens it is still buying, according to TokenPost.
- **More withdrawals** were due to reopen in phases on 3 November, after a first batch of 15 networks reopened on 1 November.
- A **new, wider snapshot** is planned for 4 November. Generating its proof should take about 40 to 50 hours, co-CEO Yi He said, according to The Block.

Meanwhile money keeps leaving, though more slowly. Binance's 24-hour net outflows fell to about $3.29 billion, down more than half from a peak of around $7 billion, according to The Block, citing DeFiLlama. Bitcoin.com News, also citing DeFiLlama, says Binance's tracked assets fell from about $144.9 billion on 29 October to about $128.3 billion on 2 November. Part of that drop is falling prices and the theft itself, not only withdrawals.

## How a proof of reserves works

The idea is simple. An exchange shows two things:

1. **What it owes customers.** It takes every customer balance for a coin and adds them up. Each user can check that their own balance was included, without seeing anyone else's. This is the job of the "Merkle tree" and the zero-knowledge proof (zk-SNARK) that Binance uses.
2. **What it holds.** It lists the wallet addresses that hold that coin, which anyone can check on the blockchain.

If holdings are equal to or larger than what is owed, the coin is "fully backed" at that moment.

## What it doesn't show

- **It is one moment.** The snapshot is from 31 October, before withdrawals reopened and billions left. It says nothing about today. That is why the 4 November snapshot matters.
- **It covers 10 coins.** Binance lists far more assets. The proof says nothing about the rest, which includes the less liquid tokens it is still replacing.
- **It shows assets, not debts.** A proof of reserves doesn't show whether the company has other liabilities, such as loans, that could compete for the same money. That is what a full financial audit is for.
- **It is self-reported.** Binance runs the process. The verifier tool is open source and has been audited, according to crypto.news, but no outside auditor has signed off on the numbers.

None of this means the numbers are wrong. It means a proof of reserves answers one narrow question well: did the exchange hold enough of these coins, at this time, to cover these customers?

## What this means for you

- **If you use Binance, check your own balance.** You can log in and use the verification tool on its Proof of Reserves page to confirm your balance was included in the snapshot.
- **Read "fully backed" as "backed on that date".** Look for the next snapshot rather than relying on one.
- **Don't keep more on any exchange than you need.** This week has shown that withdrawals can pause even at the largest exchange in the world. In the EU, MiCA-licensed firms must keep customer assets separate. [Our MiCA guide](/learn/mica-explained) shows how to check a firm.

## What to watch

- **The 4 November snapshot** and its proof, due roughly two days later, and whether it covers more assets.
- **Which coins reopen for withdrawal**, and whether the last 5% of stolen assets is replaced.
- **Binance's technical report** on how the attacker got in.
- **US midterm results** this week, which could shape crypto rules in Congress. We cover [what the vote means for the market](/blog/election-day-crypto-nerves-2026-11-03).
- Separately, Brazil's largest exchange [Mercado Bitcoin paused withdrawals after its own breach](/blog/mercado-bitcoin-hack-2026-11-03) on Monday.

*This article is general information, not investment advice.*
