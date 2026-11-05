import { NextResponse, type NextRequest } from "next/server";
import ROUTES from "./generated/routes.json";

// Keep in sync with src/i18n/config.ts (proxy should not import app modules).
const LOCALES = ["en", "sl", "hr", "sr", "de", "it", "hu", "sk", "cs", "pt", "fr", "es", "ru", "sv", "nb", "da"];

// Every valid first path segment (sections in app/[lang]/ + trust pages in src/lib/pages.ts).
// Anything else gets a real 404 status. Pages are streamed, so a notFound() inside a page can
// only send a soft 404 (status 200 + noindex); catching unknown top-level paths here fixes that.
const TOP_LEVEL = new Set([
  "", "advertise", "blog", "coins", "collectibles", "fintech", "glossary", "gold", "hyperliquid", "learn", "memes", "movers",
  "news", "press-releases", "school", "sponsored", "watches",
  "about", "editorial-policy", "advertising-policy", "how-we-make-money", "disclosures", "corrections", "disclaimer", "privacy",
]);

// Content sections whose second segment must be an existing file (generated at build time).
const SLUGS: Record<string, Set<string>> = Object.fromEntries(Object.entries(ROUTES).map(([k, v]) => [k, new Set(v as string[])]));

/** True when /section/slug points at content that doesn't exist. */
function unknownSlug(section: string, slug: string | undefined) {
  const known = SLUGS[section];
  return Boolean(known && slug && !known.has(decodeURIComponent(slug)));
}

function notFound(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/missing`;
  return NextResponse.rewrite(url);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  // /en/... is the same page as /... → one canonical URL for English.
  if (first === "en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  const parts = pathname.split("/");
  if (LOCALES.includes(first)) {
    const section = parts[2] ?? "";
    return TOP_LEVEL.has(section) && !unknownSlug(section, parts[3]) ? NextResponse.next() : notFound(request, first);
  }
  if (!TOP_LEVEL.has(first) || unknownSlug(first, parts[2])) return notFound(request, "en");

  // Unprefixed = English, served from app/[lang] with lang=en.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|api/|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
