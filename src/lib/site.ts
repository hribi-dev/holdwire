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

export const nav = [
  { key: "news", href: "/news" },
  { key: "blog", href: "/blog" },
  { key: "markets", href: "/coins" },
  { key: "movers", href: "/movers" },
  { key: "memes", href: "/memes" },
  { key: "fintech", href: "/fintech" },
  { key: "hyperliquid", href: "/hyperliquid" },
  { key: "learn", href: "/learn" },
  { key: "glossary", href: "/glossary" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
