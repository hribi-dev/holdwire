import { absoluteUrl, site } from "./site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    publishingPrinciples: absoluteUrl("/editorial-policy"),
    correctionsPolicy: absoluteUrl("/corrections"),
    ownershipFundingInfo: absoluteUrl("/how-we-make-money"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes "<" so content can't close the tag). */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
