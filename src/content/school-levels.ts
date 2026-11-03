/**
 * Tickora School: levels in order. Lessons live in content/school/*.md with `level` and `order`
 * in frontmatter. A level with no lessons yet shows as "coming soon" with its planned topics.
 * Lessons follow the reviewer rule like guides: no `reviewedBy` → draft banner + noindex.
 */
export type SchoolLevel = {
  n: number;
  slug: string;
  title: string;
  tagline: string;
  color: string;
  tint: string;
  planned: string[];
};

export const LEVELS: SchoolLevel[] = [
  {
    n: 1,
    slug: "money-basics",
    title: "Money basics",
    tagline: "Inflation, saving, risk and how not to get scammed.",
    color: "#0e7490",
    tint: "tint-cyan",
    planned: [],
  },
  {
    n: 2,
    slug: "crypto-basics",
    title: "Crypto basics",
    tagline: "Blockchains, Bitcoin, wallets, and buying safely in Europe.",
    color: "#6d28d9",
    tint: "tint-violet",
    planned: [],
  },
  {
    n: 3,
    slug: "reading-the-market",
    title: "Reading the market",
    tagline: "Prices, market cap, volume, candles and order books.",
    color: "#b45309",
    tint: "tint-amber",
    planned: ["Price, market cap and supply", "Volume and liquidity", "Reading a candlestick chart", "How an order book works"],
  },
  {
    n: 4,
    slug: "trading-tools",
    title: "Trading tools",
    tagline: "Leverage, perpetual futures, funding rates and Hyperliquid.",
    color: "#0A5C46",
    tint: "tint-mint",
    planned: ["What leverage really does", "Perpetual futures and funding", "Liquidations", "How Hyperliquid works"],
  },
  {
    n: 5,
    slug: "risk-and-mindset",
    title: "Risk and mindset",
    tagline: "Position size, stop-losses, FOMO and memecoin traps.",
    color: "#be185d",
    tint: "tint-pink",
    planned: ["Position sizing", "Stop-losses and plans", "FOMO and revenge trading", "Memecoins: how people lose money"],
  },
];

/** Pass mark for a lesson quiz and a level exam. */
export const PASS_PCT = 70;
