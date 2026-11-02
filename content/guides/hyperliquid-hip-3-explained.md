---
title: "HIP-3 explained: how anyone can launch markets on Hyperliquid"
description: "Builder-deployed perpetuals in plain English: how HIP-3 works, the 500,000 HYPE stake, trade.xyz and stock perps, and the risks."
category: Hyperliquid
author: Holdwire
reviewedBy:
published: 2026-11-02
updated: 2026-11-02
sources:
  - title: "Hyperliquid docs: HIP-3 builder-deployed perpetuals"
    url: https://hyperliquid.gitbook.io/Hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals
  - title: "The Defiant: builder-deployed perp markets push Hyperliquid to record share of global perps volume"
    url: https://thedefiant.io/builder-deployed-perp-markets-push-hyperliquid-to-record-share-of-global-perps-volume
  - title: "Unchained: ICE invests in trade.xyz"
    url: https://unchainedcrypto.com/?p=50282
---

**HIP-3 lets outside teams launch their own perpetual futures markets on Hyperliquid, without permission from the core team.** A builder stakes 500,000 HYPE as a bond, then lists markets that run on Hyperliquid's order books and matching engine. It is why you can now trade perps on stocks, indices and commodities on Hyperliquid, not just crypto.

## What problem HIP-3 solves

Before HIP-3, the Hyperliquid team decided which perpetual markets existed. That kept quality high, but limited what could be traded. HIP-3 (Hyperliquid Improvement Proposal 3), activated on mainnet in October 2025, opened listing to anyone who meets the on-chain requirements. Hyperliquid's docs call it a key step toward fully decentralising the perp listing process.

## How it works

1. **Stake.** A deployer stakes 500,000 HYPE. The stake is a bond: it can be slashed by validators if the deployer misbehaves, for example by manipulating the price feed its markets use. Hyperliquid's docs say the requirement is expected to fall as the infrastructure matures.
2. **Deploy.** The builder sets up its markets: what is traded, the price oracle, leverage limits and fees.
3. **Trade.** Traders use the same Hyperliquid account and order books. Builder markets inherit Hyperliquid's matching engine, margin system and speed.
4. **Fees.** The builder earns a share of the trading fees from its markets. Hyperliquid's protocol takes a share too, which feeds its HYPE buybacks.

## Who uses it: trade.xyz and stock perps

The largest HIP-3 builder is **trade.xyz**, which lists perpetual futures on stocks, stock indices and commodities. Its markets have handled more than $650 billion in volume in a little over a year, according to the company. In March 2026, S&P Dow Jones Indices licensed the S&P 500 to trade.xyz for a perpetual contract offered to eligible non-US investors.

In October 2026, ICE, the owner of the New York Stock Exchange, took a minority stake in trade.xyz and announced plans for a US market built on this model, subject to approval by the US derivatives regulator.

## Why it matters for HYPE

- Every builder has to **lock up 500,000 HYPE**, taking supply off the market.
- New markets bring **new trading volume and fees**, part of which goes to buybacks.
- It makes Hyperliquid a **platform for exchanges**, not just one exchange.

## The risks

- **Leverage.** Perps on stocks or gold are still leveraged derivatives. You can be liquidated and lose your whole margin.
- **Builder risk.** Each builder sets its own oracle and parameters. A badly run market can misprice or be manipulated, and slashing doesn't necessarily compensate traders.
- **Concentration.** At current HYPE prices the stake is worth tens of millions of euros, so in practice only a few well-funded builders can deploy.
- **Regulation.** Hyperliquid is not authorised under MiCA. Trading stock perps on it is not the same as owning shares, and EU investor protections don't apply.

## FAQ

**Can I launch my own market?**
Only if you can stake 500,000 HYPE and run the market's infrastructure, including a reliable price oracle.

**Are HIP-3 markets riskier than Hyperliquid's own markets?**
They can be. They share Hyperliquid's engine, but each builder controls its own market settings. Check who runs a market before trading it.

**What is HIP-4?**
The next upgrade: outcome markets, contracts that pay out based on real-world events, such as an economic data release.
