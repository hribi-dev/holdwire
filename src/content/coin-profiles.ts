/**
 * Human-written summaries and FAQs for coin pages.
 * Quality gate: a coin page is indexable ONLY if it has a profile here
 * (see CLAUDE.md rule 4: no thin programmatic pages).
 * Every profile needs a named reviewer before launch.
 */
export type CoinProfile = {
  summary: string[];
  faqs: { q: string; a: string }[];
  reviewedBy: string | null;
  updated: string;
};

export const COIN_PROFILES: Record<string, CoinProfile> = {
  hyperliquid: {
    summary: [
      "Hyperliquid is a blockchain built for trading. Its main product is a fully on-chain exchange where every order, cancellation, trade and liquidation is recorded on the chain, with speeds close to a centralised exchange.",
      "The chain has two parts that share one consensus (HyperBFT): HyperCore, which runs the order books for perpetual futures and spot trading, and HyperEVM, an Ethereum-compatible layer where developers deploy smart contracts that can read HyperCore's prices and balances directly.",
      "HYPE is the network's token. It is staked with validators, pays gas on HyperEVM, and is bought back with protocol fees. Its supply is capped at 1 billion, and it launched with an airdrop in November 2024.",
    ],
    faqs: [
      {
        q: "What is Hyperliquid used for?",
        a: "Mainly trading perpetual futures and spot tokens on an on-chain order book, without handing your funds to a centralised exchange. Developers also build DeFi apps on HyperEVM.",
      },
      {
        q: "What is the difference between HyperCore and HyperEVM?",
        a: "HyperCore is the trading engine (order books, margin, liquidations). HyperEVM is the smart-contract layer. Both run on the same chain, and you move assets between them with Hyperliquid's internal transfer.",
      },
      {
        q: "Is Hyperliquid regulated in the EU?",
        a: "Hyperliquid is a decentralised exchange and is not an authorised provider under MiCA. Some regulators outside the EU have issued investor alerts about it. Check the rules in your country before using it.",
      },
      {
        q: "What is the maximum supply of HYPE?",
        a: "1 billion HYPE. Part of it is released to contributors on a monthly schedule, and part of protocol fee revenue is used to buy HYPE back.",
      },
    ],
    reviewedBy: null,
    updated: "2026-11-02",
  },
  bitcoin: {
    summary: [
      "Bitcoin is a digital currency that runs on a public, decentralised network with no central issuer. It launched in 2009, created by the pseudonymous Satoshi Nakamoto.",
      "Its supply is capped at 21 million coins. New coins are released through mining on a proof-of-work blockchain, and the reward roughly halves every four years.",
    ],
    faqs: [
      {
        q: "How do I buy Bitcoin in the EU?",
        a: "Use a crypto-asset service provider authorised under MiCA in your country, then move larger amounts to a wallet you control.",
      },
      {
        q: "Is Bitcoin regulated under MiCA?",
        a: "MiCA regulates the companies that let you buy, hold or trade Bitcoin, not Bitcoin itself, because Bitcoin has no issuer.",
      },
      {
        q: "What is the maximum supply of Bitcoin?",
        a: "21 million BTC. The limit is set in Bitcoin's software and enforced by the network.",
      },
    ],
    reviewedBy: null,
    updated: "2026-11-02",
  },
  ethereum: {
    summary: [
      "Ethereum is a public blockchain that runs programs called smart contracts. Its native currency, ETH, pays for transactions on the network and can be staked to help secure it.",
      "Ethereum launched in 2015 and moved from proof of work to proof of stake in September 2022, an upgrade known as the Merge.",
    ],
    faqs: [
      { q: "Is Ethereum the same as ETH?", a: "Ethereum is the network; ETH is the currency used on it to pay fees and to stake." },
      { q: "What are gas fees?", a: "Gas is the fee you pay in ETH to have a transaction processed. It rises when the network is busy." },
      { q: "Can I stake ETH in the EU?", a: "Yes, through your own validator, a liquid staking protocol, or a licensed exchange. Each carries different risks." },
    ],
    reviewedBy: null,
    updated: "2026-11-02",
  },
  solana: {
    summary: [
      "Solana is a public blockchain built for fast, low-cost transactions. Its native currency, SOL, pays fees and is staked with validators to secure the network.",
      "Solana uses proof of stake together with a timekeeping technique called proof of history. Its mainnet beta launched in March 2020.",
    ],
    faqs: [
      { q: "Why are Solana fees so low?", a: "Solana processes many transactions in parallel and in quick succession, so the cost per transaction stays small." },
      { q: "Can I stake SOL?", a: "Yes. You delegate SOL to a validator and earn a share of its rewards. Your SOL stays in your control while delegated." },
      { q: "Has Solana had outages?", a: "Yes, the network has had several outages since launch. Reliability has improved, but it remains a risk to weigh." },
    ],
    reviewedBy: null,
    updated: "2026-11-02",
  },
};
