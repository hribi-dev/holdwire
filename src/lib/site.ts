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
 * Contact details used on trust pages ([editor@domain] etc. in content/pages/*.md are replaced
 * with these). One general address is enough; role-specific ones are optional.
 */
export const contact = {
  general: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  editor: process.env.NEXT_PUBLIC_EDITOR_EMAIL || "",
  corrections: process.env.NEXT_PUBLIC_CORRECTIONS_EMAIL || "",
  privacy: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "",
  ads: process.env.NEXT_PUBLIC_SPONSOR_EMAIL || "",
  /** Hosted newsletter signup page (e.g. https://tickora.beehiiv.com/subscribe). Empty = sign-ups not open yet. */
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "",
  /** Legal publisher line, e.g. "Tickora d.o.o., Street 1, 1000 Ljubljana, reg. no. 1234567". */
  publisher: process.env.NEXT_PUBLIC_PUBLISHER || "",
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

/**
 * Title for <title>: the short SEO title if set, else the headline. Long titles skip the
 * " | Tickora" suffix so search results don't cut off the part that matters.
 */
export function metaTitle(title: string, seoTitle?: string | null): string | { absolute: string } {
  const t = seoTitle || title;
  return t.length > 52 ? { absolute: t } : t;
}
