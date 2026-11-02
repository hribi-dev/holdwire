import type { Entry } from "./content";
import { absoluteUrl, site } from "./site";

export function articleJsonLd(e: Entry, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": e.kind === "press-release" || e.collection === "news" ? "NewsArticle" : "Article",
    headline: e.title,
    description: e.description,
    datePublished: e.published ?? undefined,
    dateModified: e.updated ?? e.published ?? undefined,
    mainEntityOfPage: absoluteUrl(path),
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
