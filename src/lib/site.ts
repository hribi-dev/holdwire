export const site = {
  name: "Holdwire",
  tagline: "Finance and hard assets, with an EU lens.",
  description:
    "Crypto prices, fintech and hard assets for readers in Europe: live data, honest comparisons, MiCA licensing and plain-English guides.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en",
  // Keep the whole site out of search engines until launch day.
  // Set SITE_INDEXABLE=true in production only.
  indexable: process.env.SITE_INDEXABLE === "true",
  copyrightYear: 2026,
};

export const nav = [
  { label: "Crypto", href: "/coins" },
  { label: "Markets", href: "/coins" },
  { label: "Fintech", href: "/#fintech" },
  { label: "Watches", href: "/#watches" },
  { label: "Collectibles", href: "/#collectibles" },
  { label: "Learn", href: "/#start-here" },
];

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
