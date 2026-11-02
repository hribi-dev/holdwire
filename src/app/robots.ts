import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    // Preview / pre-launch: keep everything out of search engines.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/*?*"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
