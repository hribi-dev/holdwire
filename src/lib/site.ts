export const site = {
  name: "Tickora",
  tagline: "Finance and hard assets, with an EU lens.",
  description:
    "Crypto prices, fintech and hard assets for readers in Europe: live data, honest comparisons, MiCA licensing and plain-English guides.",
  // Priority: explicit setting → Vercel's production domain → this deployment's Vercel URL → local dev.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000"
  ).replace(/\/$/, ""),
  locale: "en",
  // Keep the whole site out of search engines until launch day.
  // Set SITE_INDEXABLE=true in production only.
  indexable: process.env.SITE_INDEXABLE === "true",
  copyrightYear: 2026,
};

/**
 * Sponsor sticker + /advertise page. Leave a value empty to hide that option.
 * - email: where brands send sponsorship enquiries (shown on /advertise and in the sticker).
 * - tips: reader tip addresses; each shows with a copy button in the sticker's "Support us" card.
 */
export const sponsor = {
  email: process.env.NEXT_PUBLIC_SPONSOR_EMAIL || "",
  tips: [
    { label: "Solana (SOL, USDC)", address: process.env.NEXT_PUBLIC_TIP_SOLANA || "" },
    { label: "Ethereum / Base (ETH, USDC)", address: process.env.NEXT_PUBLIC_TIP_EVM || "" },
  ].filter((t) => t.address),
};

export const nav = [
  { key: "news", href: "/news" },
  { key: "blog", href: "/blog" },
  { key: "markets", href: "/coins" },
  { key: "gold", href: "/gold" },
  { key: "movers", href: "/movers" },
  { key: "memes", href: "/memes" },
  { key: "fintech", href: "/fintech" },
  { key: "hyperliquid", href: "/hyperliquid" },
  { key: "school", href: "/school" },
  { key: "learn", href: "/learn" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
