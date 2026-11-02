import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { TRUST_PAGES } from "@/lib/pages";
import { listEntries } from "@/lib/content";
import { COIN_PROFILES } from "@/content/coin-profiles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [guides, terms] = await Promise.all([listEntries("guides"), listEntries("glossary")]);
  return [
    { url: absoluteUrl("/"), changeFrequency: "hourly", priority: 1 },
    { url: absoluteUrl("/hyperliquid"), changeFrequency: "hourly", priority: 0.95 },
    { url: absoluteUrl("/coins"), changeFrequency: "hourly", priority: 0.9 },
    { url: absoluteUrl("/learn"), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/glossary"), changeFrequency: "weekly", priority: 0.6 },
    // Quality gates: coin pages need a written profile; guides and terms need a named reviewer.
    ...Object.keys(COIN_PROFILES).map((id) => ({ url: absoluteUrl(`/coins/${id}`), changeFrequency: "hourly" as const, priority: 0.8 })),
    ...guides
      .filter((g) => !g.draft)
      .map((g) => ({ url: absoluteUrl(`/learn/${g.slug}`), lastModified: g.updated ?? undefined, priority: 0.7 })),
    ...terms
      .filter((t) => !t.draft)
      .map((t) => ({ url: absoluteUrl(`/glossary/${t.slug}`), lastModified: t.updated ?? undefined, priority: 0.4 })),
    ...TRUST_PAGES.map((slug) => ({ url: absoluteUrl(`/${slug}`), changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
