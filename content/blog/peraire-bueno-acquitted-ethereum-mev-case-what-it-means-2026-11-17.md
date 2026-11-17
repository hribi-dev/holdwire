---
title: "US judge acquits the brothers accused of a $25 million Ethereum bot exploit: what it means"
seoTitle: "Peraire-Bueno brothers acquitted in $25M Ethereum MEV case"
description: "A Manhattan judge cleared Anton and James Peraire-Bueno of wire fraud over a 2023 exploit of Ethereum trading bots. What the ruling does and doesn't say."
category: Security
author: Tickora
reviewedBy:
published: 2026-11-17
updated: 2026-11-17
sources:
  - title: "The Block: Peraire-Bueno brothers acquitted of wire fraud in $25 million Ethereum MEV case"
    url: https://www.theblock.co/news/regulation/2026-11-16-peraire-bueno-brothers-acquitted-ethereum-mev-wire-fraud-441425
  - title: "SpendNode: MIT brothers acquitted in $25M Ethereum exploit case"
    url: https://www.spendnode.io/blog/mit-brothers-acquitted-in-25m-ethereum-exploit-case/
  - title: "Cointelegraph: MEV bot trial ends in mistrial after jury deadlock on brothers' verdict"
    url: https://cointelegraph.com/news/mev-bot-trial-ends-in-mistrial-after-jury-deadlock-on-brothers-verdict
  - title: "ForkLog: US court case against MEV bot attackers ends in mistrial"
    url: https://forklog.com/en/news/us-court-dismisses-case-against-mev-bot-attackers
cover:
  src: https://images.unsplash.com/photo-1767972463877-b64ba4283cd0
  alt: "A wooden judge's gavel next to a closed book on a black background"
  credit: "Sasun Bughdaryan"
  sourceUrl: https://unsplash.com/photos/wooden-gavel-resting-on-a-dark-surface-next-to-book-FaTLrG5-ViE
  license: unsplash
---

**Short version:** A federal judge in Manhattan has acquitted Anton and James Peraire-Bueno, two MIT-educated brothers accused of taking about $25 million from automated Ethereum trading bots in 12 seconds in 2023. Judge Jessica Clarke found that prosecutors had not proved the brothers made "material misrepresentations", which wire fraud requires. The ruling does not say the strategy was fair or legal in every sense, only that it was not proven to be this crime.

## What happened

In April 2023, a group of trading bots on Ethereum lost more than $25 million within seconds, The Block reports. The bots ran "sandwich" strategies: they spot another user's pending trade, buy just before it and sell just after it, profiting from the price move the trade causes. Their profit depends on the order in which transactions land in a block.

Prosecutors said the brothers set a trap. According to the charges, they used "bait" transactions to lure the bots, then took advantage of a flaw in MEV-Boost, software that sits between the firms that build Ethereum blocks and the validators that propose them. That flaw let them see the bots' transactions before they were final and swap in their own, so the bots' trades went wrong and the brothers collected the difference, SpendNode reports. MEV, or "maximal extractable value", is the profit someone can make by choosing the order of transactions in a block.

The Justice Department charged the brothers in May 2024 with wire fraud, conspiracy to commit wire fraud and conspiracy to commit money laundering. Prosecutors said they spent months preparing, used shell companies and moved the money through many addresses and foreign exchanges to hide it. The first trial ended in a mistrial in November 2025 after the jury could not agree, Cointelegraph reported. Jurors had asked the judge to define words such as "unlawful" and "misleading", ForkLog reported.

On 16 November 2026, Judge Clarke granted the defence's motion for acquittal. According to The Block, she said the question was whether the conduct was wire fraud, not whether it was improper or unethical. She noted that the trades did not happen on a regulated market where such conduct would be banned, and that prosecutors had not shown material misrepresentations.

## Why it matters

This was the first US criminal case built around an MEV strategy, and much of the crypto industry watched it as a test. Coin Center's executive director, Peter Van Valkenburgh, had called the prosecution a "massive overstep", The Block notes.

The ruling draws a line between two things: exploiting how a system works, and lying to someone. Wire fraud needs a lie that matters. The judge found the government had not shown one. That will be read by traders and developers as a sign that aggressive onchain strategies against other bots are not automatically fraud under US law.

But it is narrow. It is one district judge's view of one set of facts under the specific laws prosecutors used. It does not make exploiting software bugs legal, and other laws, other countries and civil lawsuits can still apply. The Block did not report whether prosecutors plan any further steps.

## What this means for you

- **Ordinary users were not the targets here.** The victims were professional bots that make money by trading around other people's orders. If you swap tokens on a decentralised exchange, those same bots can take a slice of your trade.
- **Protect your own swaps.** Set a tight slippage limit, and consider wallets or routes that send transactions privately rather than to the public waiting area, which makes sandwiching harder. Our [glossary](/glossary) explains the terms.
- **Don't read this as "code is law".** In the EU, MiCA's market-abuse rules cover crypto-assets traded on authorised platforms, and EU courts are not bound by a US ruling. See [MiCA explained](/learn/mica-explained).
- **Bugs cut both ways.** The case started with a software flaw. If a platform you use has a bug, your funds can be the ones at risk, whatever a court later decides.

## What to watch

- Whether the US Justice Department responds to the ruling.
- Whether lawmakers or regulators try to define MEV abuse more clearly, rather than relying on fraud laws written before blockchains.
- Whether the bot operators who lost money pursue civil claims.

*This article is general information, not investment advice.*
