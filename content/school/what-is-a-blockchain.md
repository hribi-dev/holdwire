---
level: 2
order: 1
title: "What is a blockchain? A shared notebook nobody can rub out"
description: "Blocks, nodes, miners and validators, explained without the jargon. What a blockchain is good at, and what it can't do."
minutes: 5
reviewedBy:
updated: 2026-11-03
takeaways:
  - "A blockchain is a shared record of transactions that thousands of computers keep identical copies of."
  - "New transactions are grouped into blocks, and each block is linked to the one before, so old entries are very hard to change."
  - "Proof of work (Bitcoin) and proof of stake (Ethereum) are two ways the network agrees on which block comes next."
quiz:
  - q: "Why is it very hard to change an old transaction on a blockchain?"
    options: ["A bank checks every change", "Each block is linked to the previous one and copies are kept by thousands of computers", "The data is stored on one secret server", "Changes are only allowed on weekdays"]
    answer: 1
    why: "Changing an old block would break the links to every block after it, and the thousands of other copies would reject the altered version."
  - q: "What is a 'node'?"
    options: ["A computer that keeps a copy of the blockchain and checks the rules", "A type of coin", "A crypto exchange", "A password"]
    answer: 0
    why: "Nodes store the blockchain and check that new blocks follow the rules. The more independent nodes, the harder the network is to control."
  - q: "You send crypto to the wrong address by mistake. What usually happens?"
    options: ["The bank reverses it automatically", "The blockchain cancels it after 24 hours", "It's usually gone for good unless the receiver sends it back", "Support can undo it"]
    answer: 2
    why: "Blockchain transactions are final. There's no central party that can reverse them, which is why you double-check addresses."
---

## A notebook everyone shares

Picture a notebook where every payment is written down. Normally a bank keeps that notebook, and you trust the bank to keep it honest.

A **blockchain** is the same notebook, except thousands of computers around the world each keep an identical copy. Nobody owns the master copy. When someone sends a payment, the network checks it and every copy gets updated.

## Blocks and chains

Transactions aren't added one by one. They're grouped into **blocks**. Each new block contains a kind of fingerprint (a **hash**) of the block before it. That links the blocks into a **chain**.

If someone tried to change an old payment, that block's fingerprint would change, which would break the link to every block after it. The other copies would spot the difference straight away and ignore the fake version.

## Who adds the next block?

The network needs a fair way to agree on the next block. The two main methods:

- **Proof of work.** Computers called **miners** compete to solve a hard puzzle. The winner adds the block and earns new coins. It costs a lot of electricity, which is what makes cheating expensive. Bitcoin works this way.
- **Proof of stake.** **Validators** lock up (stake) their own coins as a deposit. They take turns proposing blocks, and lose part of their deposit if they cheat. It uses far less energy. Ethereum switched to this in 2022.

The computers that keep copies and check the rules are called **nodes**.

## What blockchains are good at, and what they aren't

Good at:

- Sending value without a bank in the middle, 24/7, across borders.
- Keeping a public record anyone can check.

Not good at:

- **Fixing mistakes.** Transactions are final. Send to the wrong address and it's usually gone.
- **Privacy.** Most blockchains are public. Anyone can see every transaction an address has made.
- **Making something valuable.** "It's on the blockchain" says nothing about whether a project or token is any good.

Next lesson: the first and biggest blockchain, Bitcoin.
