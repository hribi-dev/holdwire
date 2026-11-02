/**
 * Supported languages. English is the default and lives at unprefixed URLs (/news);
 * every other language is prefixed (/sl/news). `src/proxy.ts` rewrites unprefixed
 * paths to /en/... internally, so the app tree is app/[lang]/...
 *
 * SEO rule (see docs/plan/04-SEO-PLAYBOOK.md): non-English pages stay noindex until
 * their main content is translated AND reviewed by a native speaker. Only then do they
 * get hreflang alternates. Machine-translated chrome around English articles is not
 * enough to be indexed (scaled-content risk).
 */

export const LOCALES = ["en", "sl", "hr", "sr", "de", "it", "hu", "sk", "cs", "pt", "fr", "es", "ru", "sv", "nb", "da"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const hasLocale = (v: string | undefined | null): v is Locale => !!v && (LOCALES as readonly string[]).includes(v);

export const LOCALE_INFO: Record<Locale, { native: string; flag: string; intl: string }> = {
  en: { native: "English", flag: "🇬🇧", intl: "en-IE" },
  sl: { native: "Slovenščina", flag: "🇸🇮", intl: "sl-SI" },
  hr: { native: "Hrvatski", flag: "🇭🇷", intl: "hr-HR" },
  sr: { native: "Srpski", flag: "🇷🇸", intl: "sr-Latn-RS" },
  de: { native: "Deutsch", flag: "🇩🇪", intl: "de-DE" },
  it: { native: "Italiano", flag: "🇮🇹", intl: "it-IT" },
  hu: { native: "Magyar", flag: "🇭🇺", intl: "hu-HU" },
  sk: { native: "Slovenčina", flag: "🇸🇰", intl: "sk-SK" },
  cs: { native: "Čeština", flag: "🇨🇿", intl: "cs-CZ" },
  pt: { native: "Português", flag: "🇵🇹", intl: "pt-PT" },
  fr: { native: "Français", flag: "🇫🇷", intl: "fr-FR" },
  es: { native: "Español", flag: "🇪🇸", intl: "es-ES" },
  ru: { native: "Русский", flag: "🇷🇺", intl: "ru-RU" },
  sv: { native: "Svenska", flag: "🇸🇪", intl: "sv-SE" },
  nb: { native: "Norsk", flag: "🇳🇴", intl: "nb-NO" },
  da: { native: "Dansk", flag: "🇩🇰", intl: "da-DK" },
};

export const LOCALE_GROUPS: { label: string; locales: Locale[] }[] = [
  { label: "Slovenia & Balkans", locales: ["sl", "hr", "sr"] },
  { label: "Central Europe", locales: ["de", "hu", "cs", "sk"] },
  { label: "Western & Southern Europe", locales: ["en", "fr", "it", "es", "pt"] },
  { label: "Nordics", locales: ["sv", "nb", "da"] },
  { label: "Other", locales: ["ru"] },
];

/** Prefix an internal path with the locale. External links, anchors and English are untouched. */
export function localize(href: string, locale: string | undefined): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (!locale || locale === DEFAULT_LOCALE || !hasLocale(locale)) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Remove a locale prefix from a browser pathname. */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (hasLocale(seg)) {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname || "/";
}
