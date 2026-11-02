import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { TRUST_PAGES } from "@/lib/pages";
import { COIN_PROFILES } from "@/content/coin-profiles";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "hourly", priority: 1 },
    { url: absoluteUrl("/coins"), changeFrequency: "hourly", priority: 0.9 },
    // Only quality-gated coin pages (with a written profile) go in the sitemap.
    ...Object.keys(COIN_PROFILES).map((id) => ({ url: absoluteUrl(`/coins/${id}`), changeFrequency: "hourly" as const, priority: 0.8 })),
    ...TRUST_PAGES.map((slug) => ({ url: absoluteUrl(`/${slug}`), changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
