---
title: "Wagyu's wrapped Monero token XMR1 crashes 99% on Hyperliquid after a key leak: what it means"
seoTitle: "XMR1 wrapped Monero crashes 99% on Hyperliquid: what it means"
description: "Someone used a leaked deployer key to dump 5.2 million XMR1 tokens on Hyperliquid, taking about $13.5 million. What happened and what it means for you."
category: Hyperliquid
author: Tickora
reviewedBy:
published: 2026-11-21
updated: 2026-11-21
sources:
  - title: "The Block: Wagyu's XMR1 wrapped Monero plunges 99% after $13 million hack as founder promises refunds"
    url: https://www.theblock.co/news/defi/2026-11-20-wagyus-xmr1-wrapped-monero-plunges-99-after-13-million-hack-founder-promises-refunds-444747
  - title: "Bitcoin.com News: Wrapped Monero token XMR1 crashes after $13M exploit, founder vows repayment"
    url: https://news.bitcoin.com/security/wrapped-monero-token-xmr1-crashes-13m-exploit-founder-vows-repayment/
  - title: "Bitquery: XMR1 Hyperliquid hack investigation"
    url: https://bitquery.io/investigations/xmr1-hyperliquid-hack
  - title: "Lookonchain on X: first on-chain report of the XMR1 dump"
    url: https://x.com/lookonchain/status/2123656301561667859
  - title: "PerpetualCow on X: Wagyu post-mortem"
    url: https://x.com/PerpetualCow/status/2123760480061718801
cover:
  src: https://images.unsplash.com/photo-1681833375133-3cf8a514d6b3
  alt: "A bunch of keys hanging from the lock of a weathered door"
  credit: "Katja Ano"
  sourceUrl: https://unsplash.com/photos/a-close-up-of-a-door-with-a-bunch-of-keys-on-it-vFfF9lt3yJ8
  license: unsplash
---

**Short version:** XMR1, a wrapped Monero token issued by the swap service Wagyu, fell from nearly $500 to under $1 in about half an hour on Friday after someone moved 5.2 million tokens out of its deployer wallet and sold them on Hyperliquid. Wagyu's founder blames a breach at a hosting company and has promised personal refunds. Hyperliquid itself was not hacked, and Monero's own coin is unaffected.

## What happened

Early on 20 November, on-chain tracker Lookonchain flagged a large XMR1 sale on Hyperliquid. About 5.2 million XMR1 had moved from the wallet that created the token to an unfamiliar address, Bitcoin.com News reported. Part of it was sold for USDC on Hyperliquid, and the proceeds were swapped into ether.

The price collapsed. XMR1 fell from nearly $500 to as low as $0.65, according to The Block. Blockchain data firm Bitquery estimates about $13.5 million was taken. It says about 364,000 tokens were sold to 388 buyers, and about 7,350 ETH now sits across three wallets (The Block counted nearly 7,500 ETH).

Wagyu's pseudonymous founder, PerpetualCow, said in a post-mortem on X that the deployer key had been exposed through a breach at the Icelandic hosting provider 1984.hosting. He said the key had been on a server he had deleted, but that "logs/files were still kept" by the host. 1984.hosting and Iceland's CERT-IS said the provider had suffered an intrusion and temporarily suspended services, according to Bitcoin.com News, which noted that the founder's account has not been independently verified.

PerpetualCow said everyone who lost money "will be refunded by me personally" and asked for time. Wagyu suspended its service, and no timetable for refunds has been given, The Block reports.

## Why it matters

XMR1 is a wrapped token: an IOU that is meant to be backed one-for-one by real Monero held by Wagyu and redeemable on its platform. Its value depends entirely on the issuer. Whoever controls the deployer key can create or move tokens, and if that key leaks, the market has no way to tell real tokens from dumped ones.

That is what makes this different from a hack of Hyperliquid. The exchange did what an order book does: it matched sell orders from a wallet that held the tokens. Monero (XMR) was not breached either. It traded near $451 on Friday, down about 9% on the day, in line with the wider market sell-off, according to Bitcoin.com News.

It still matters for Hyperliquid. The platform's spot and HIP-3 markets list more and more assets that are issued and managed by third parties, from wrapped coins to stock and commodity perps. Each of those adds a layer of risk that sits outside Hyperliquid's own code: the issuer's keys, servers and honesty. A single exposed key was enough here.

## What this means for you

- **A wrapped token is only as safe as its issuer.** Before you buy one, check who issues it, how it is backed and how redemption works. If you cannot find answers, treat that as a warning.
- **Hyperliquid's own HYPE and its order book were not breached.** But a token being listed on a big venue says nothing about its issuer's security.
- **Don't count on EU rules to cover this.** MiCA's protections apply to authorised providers, and there is no deposit-style compensation scheme for crypto, wrapped tokens included. Our [MiCA explainer](/learn/mica-explained) covers what EU rules do and do not cover.
- **Beware of "refund" scams.** After any exploit, fake refund sites and messages appear quickly. Only follow Wagyu's own official channels, and never share your seed phrase. See [spotting scams](/school/spotting-scams).
- **Self-custody your keys, and know who holds the others.** Our lesson on [wallets and seed phrases](/school/wallets-and-seed-phrases) explains why a single key matters so much.

## What to watch

- Whether Wagyu publishes a refund plan with dates and amounts, and whether it relaunches.
- Where the roughly 7,350 to 7,500 ETH goes next, and whether any of it is frozen.
- Whether 1984.hosting or Icelandic authorities say more about the intrusion and other affected customers.
- Any change in how Hyperliquid's front end labels third-party tokens. Follow it on our [Hyperliquid hub](/hyperliquid).

*This article is general information, not investment advice.*
