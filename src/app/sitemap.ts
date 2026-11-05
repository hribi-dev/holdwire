import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { TRUST_PAGES } from "@/lib/pages";
import { listEntries } from "@/lib/content";
import { COIN_PROFILES } from "@/content/coin-profiles";
import { PAGE_REVIEWS } from "@/content/reviews";
import { listLessons } from "@/lib/school";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, blog, guides, terms, lessons] = await Promise.all([
    listEntries("news"),
    listEntries("blog"),
    listEntries("guides"),
    listEntries("glossary"),
    listLessons(),
  ]);
  // Hub pages appear once an editor has signed them off in src/content/reviews.ts.
  const hubs = (
    [
      ["gold", "/gold", 0.9],
      ["movers", "/movers", 0.8],
      ["memes", "/memes", 0.7],
      ["fintech", "/fintech", 0.8],
      ["watches", "/watches", 0.6],
      ["collectibles", "/collectibles", 0.6],
    ] as const
  )
    .filter(([key]) => PAGE_REVIEWS[key])
    .map(([, path, priority]) => ({ url: absoluteUrl(path), changeFrequency: "daily" as const, priority }));
  return [
    { url: absoluteUrl("/"), changeFrequency: "hourly", priority: 1 },
    { url: absoluteUrl("/hyperliquid"), changeFrequency: "hourly", priority: 0.95 },
    { url: absoluteUrl("/coins"), changeFrequency: "hourly", priority: 0.9 },
    { url: absoluteUrl("/news"), changeFrequency: "hourly", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/learn"), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/glossary"), changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/school"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/advertise"), changeFrequency: "monthly", priority: 0.3 },
    ...hubs,
    ...lessons
      .filter((l) => l.reviewedBy)
      .map((l) => ({ url: absoluteUrl(`/school/${l.slug}`), lastModified: l.updated ?? undefined, priority: 0.6 })),
    // Quality gates: coin pages need a written profile; guides and terms need a named reviewer.
    ...Object.keys(COIN_PROFILES).map((id) => ({ url: absoluteUrl(`/coins/${id}`), changeFrequency: "hourly" as const, priority: 0.8 })),
    ...news
      .filter((n) => !n.draft)
      .map((n) => ({ url: absoluteUrl(`/news/${n.slug}`), lastModified: n.updated ?? undefined, priority: 0.8 })),
    ...blog
      .filter((b) => !b.draft)
      .map((b) => ({ url: absoluteUrl(`/blog/${b.slug}`), lastModified: b.updated ?? undefined, priority: 0.7 })),
    ...guides
      .filter((g) => !g.draft)
      .map((g) => ({ url: absoluteUrl(`/learn/${g.slug}`), lastModified: g.updated ?? undefined, priority: 0.7 })),
    ...terms
      .filter((t) => !t.draft)
      .map((t) => ({ url: absoluteUrl(`/glossary/${t.slug}`), lastModified: t.updated ?? undefined, priority: 0.4 })),
    ...TRUST_PAGES.map((slug) => ({ url: absoluteUrl(`/${slug}`), changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
