import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/lib/site";
import { LOCALES, LOCALE_INFO, hasLocale } from "@/i18n/config";
import { DICTIONARIES, fmt } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Ticker, TickerFallback } from "@/components/Ticker";
import { themeInitScript } from "@/components/ThemeToggle";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = DICTIONARIES[l];
  // Non-English editions stay out of the index until their articles are translated and reviewed.
  const indexable = site.indexable && l === "en";
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}: ${t.meta.title}`, template: `%s | ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    robots: indexable ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: l !== "en" && site.indexable },
    openGraph: { type: "website", siteName: site.name, locale: LOCALE_INFO[l].intl.replace("-", "_") },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: "#0B0E13" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = DICTIONARIES[lang];
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Sets data-theme before first paint (saved choice, else the system setting). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#content" className="skip">
          {t.header.skip}
        </a>
        <Suspense fallback={<TickerFallback />}>
          <Ticker />
        </Suspense>
        <SiteHeader />
        {lang !== "en" && (
          <div className="lang-banner">
            <div className="wrap">{fmt(t.common.englishOnly, { language: LOCALE_INFO[lang].native })}</div>
          </div>
        )}
        <div id="content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
