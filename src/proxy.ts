import { NextResponse, type NextRequest } from "next/server";

// Keep in sync with src/i18n/config.ts (proxy should not import app modules).
const LOCALES = ["en", "sl", "hr", "sr", "de", "it", "hu", "sk", "cs", "pt", "fr", "es", "ru", "sv", "nb", "da"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  // /en/... is the same page as /... → one canonical URL for English.
  if (first === "en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (LOCALES.includes(first)) return NextResponse.next();

  // Unprefixed = English, served from app/[lang] with lang=en.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|api/|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
