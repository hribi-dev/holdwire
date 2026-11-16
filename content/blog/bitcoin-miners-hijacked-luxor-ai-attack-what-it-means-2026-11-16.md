---
title: "Attackers hijack bitcoin mining machines through Luxor's management software in what its CEO calls an AI-enabled attack: what it means"
seoTitle: "Bitcoin miners hijacked via Luxor software: what it means"
description: "Attackers redirected miners' hashrate to another pool through Luxor's Commander tool. Luxor patched it in two hours and blames an AI-enabled attack."
category: Security
author: Tickora
reviewedBy:
published: 2026-11-16
updated: 2026-11-16
sources:
  - title: "The Block: Luxor hit by AI-enabled attack that redirected client hashrate, says vulnerability patched"
    url: https://www.theblock.co/news/business/2026-11-15-luxor-attack-client-hashrate-440810
  - title: "Bitcoin.com News: Luxor confirms bitcoin mining hack and reveals AI-enabled attack"
    url: https://news.bitcoin.com/security/luxor-confirms-bitcoin-mining-hack-and-reveals-ai-enabled-attack/
  - title: "Blockonomi: 64,000 bitcoin mining machines hijacked as OCEAN hashrate nears 50 EH/s"
    url: https://blockonomi.com/64000-bitcoin-mining-machines-hijacked-as-ocean-hashrate-nears-50-eh-s/
  - title: "Cointelegraph via Cryptonews.net: Luxor CEO warns of AI 'dark forest' after bitcoin miner hijack"
    url: https://cryptonews.net/news/security/33756454/
  - title: "Hashrate Index: Hashrate Index Roundup (November 9, 2026)"
    url: https://hashrateindex.com/blog/hashrate-index-roundup-november-9-2026/
cover:
  src: https://images.unsplash.com/photo-1782094673136-5198a372980c
  alt: "Close-up of rows of cooling fans on servers in a data centre"
  credit: "Winston Chen"
  sourceUrl: https://unsplash.com/photos/close-up-of-server-cooling-fans-in-a-vibrant-data-center-iZe21DzHnUg
  license: unsplash
---

**Short version:** Over the weekend, attackers broke into Commander, the fleet-management software that bitcoin mining firm Luxor offers its clients, and pointed some of those clients' machines at a different mining pool. Luxor says it fixed the flaw within two hours, that just over a dozen client accounts were affected and that it will compensate them. Its chief executive says the attack came through an "AI-enabled" route, though Luxor has not yet published technical details.

## What happened

Luxor is a US company that runs a bitcoin mining pool and sells software and services to mining farms. Commander is its tool for managing large fleets of mining machines: it lets an operator change settings, such as which pool a machine works for, across thousands of machines at once.

On Saturday, 14 November, attackers used Commander to change those pool settings on client machines. According to Wu Blockchain, relaying an earlier Bitcoin News report, it started around 8 p.m. US Central time. The redirected machines began working for OCEAN, a separate pool, with the payouts set to a bitcoin address the attackers controlled, Blockonomi reports.

CoreX Hosting, a mining-hosting firm that first raised the alarm, said the attack appeared to end on Sunday, 15 November, when the diverted hashrate (computing power) fell from about 13 EH/s to about 100 PH/s, according to Blockonomi.

How big was it? Early reports said about 64,000 machines, or roughly 13 EH/s, were redirected. **Those figures have not been independently verified**, and Luxor's own account does not confirm them, Bitcoin.com News notes. Luxor says just over a dozen client accounts were hit. For scale: if the 13 EH/s figure is right, it would be about 1.3% of the whole bitcoin network, based on the 979 EH/s seven-day average Hashrate Index reported on 9 November.

OCEAN's own dashboard briefly showed its hashrate approaching 50 EH/s before it fell back towards 40 EH/s, Blockonomi reports. That jump was redirected power, not new machines.

## What Luxor says

According to The Block, Luxor said:

- its on-call engineers patched the flaw within two hours and began restoring machines to their original settings;
- no data was leaked or taken;
- its mining pool and its LuxOS firmware were not affected, and users do not need to do anything;
- it will fully compensate affected clients for the redirected hashrate and publish a post-mortem.

The attackers' haul looks small. Early reports said they earned nothing, but an address CoreX linked to the incident later received two OCEAN payouts worth about 0.162 BTC (roughly $10,500), Cointelegraph reports. The bigger cost falls on the miners, who lost hours of work for their own pools.

## The AI angle

Luxor CEO Nick Hansen posted on X that the attack came through a "sophisticated AI-enabled vector", without explaining how AI was used. He said any company running a substantial crypto business now faces AI-enabled attacks, with automated models probing a firm's whole system for weak spots, according to Cointelegraph. Luxor says it has paused most feature work to focus on security and bought its own GPUs to run AI models for defence.

Luxor has not published evidence for the AI claim yet, Bitcoin.com News points out, so treat it as the company's explanation for now. It does fit a pattern: Cointelegraph notes that Chainalysis disclosed an attack using "offensive agentic techniques" in October, and India's cybersecurity agency warned this month about a group using AI tools against financial firms.

## What this means for you

Most readers don't run mining farms, so this hack doesn't touch your coins directly. Bitcoin itself was not broken: no blocks were rewritten and no wallets were drained. The lessons carry over, though:

- **Management tools are a single point of failure.** One compromised dashboard could change settings on thousands of machines at once. The same is true of exchange accounts, custody apps and any service with a "change all" button. Use strong, unique passwords and an authenticator app or hardware key, never SMS.
- **Attacks are getting faster.** If attackers really are using AI to find flaws, the gap between a bug existing and a bug being used shrinks. Keep wallet apps, firmware and browser extensions up to date.
- **Check where payouts go.** If you mine, stake or receive any automatic payouts, check now and then that the receiving address is still yours.
- **Mining shares and funds.** If you own shares in listed miners, this is a reminder that operational security is part of their risk, alongside the bitcoin price and power costs.

Our lesson on [spotting scams and risks](/school/spotting-scams) covers the basics of protecting accounts.

## What to watch

- **Luxor's post-mortem**, which should say how the attackers got in and what evidence there is for AI involvement.
- **The real size of the attack.** Whether the 64,000-machine and 13 EH/s figures hold up, and how many farms were affected outside Luxor's own count.
- **Other mining software.** Some operators reported unauthorised pool changes several days earlier, Blockonomi notes, and the full extent of the breach is not yet known.

*This article is general information, not investment advice.*
