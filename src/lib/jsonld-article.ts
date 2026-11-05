import type { Entry } from "./content";
import { absoluteUrl, site } from "./site";
import { sizedCover } from "./cover";

export function articleJsonLd(e: Entry, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": e.kind === "press-release" || e.collection === "news" ? "NewsArticle" : "Article",
    headline: e.title,
    description: e.description,
    datePublished: e.published ?? undefined,
    dateModified: e.updated ?? e.published ?? undefined,
    mainEntityOfPage: absoluteUrl(path),
    ...(e.cover ? { image: [e.cover.src.startsWith("/") ? absoluteUrl(e.cover.src) : sizedCover(e.cover.src, 1600)] } : {}),
    author: e.author ? { "@type": "Person", name: e.author } : { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
    ...(e.kind === "sponsored" && e.sponsor ? { sponsor: { "@type": "Organization", name: e.sponsor } } : {}),
  };
}

export function definedTermJsonLd(e: Entry, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: e.title,
    description: e.short ?? e.description,
    url: absoluteUrl(path),
    inDefinedTermSet: absoluteUrl("/glossary"),
  };
}

/** Open Graph / social preview image for an entry with a cover photo. */
export function coverOgImages(e: Entry) {
  if (!e.cover) return [{ url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: site.name }];
  const url = e.cover.src.startsWith("/") ? absoluteUrl(e.cover.src) : sizedCover(e.cover.src, 1200);
  return [{ url, alt: e.cover.alt }];
}
