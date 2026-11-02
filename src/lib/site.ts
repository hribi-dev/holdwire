export const site = {
  name: "Holdwire",
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
  { label: "News", href: "/news" },
  { label: "Hyperliquid", href: "/hyperliquid" },
  { label: "Markets", href: "/coins" },
  { label: "Memes", href: "/memes" },
  { label: "Fintech", href: "/fintech" },
  { label: "Learn", href: "/learn" },
  { label: "Glossary", href: "/glossary" },
];

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
