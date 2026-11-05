import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/lib/site";
import { LOCALES, LOCALE_INFO, hasLocale } from "@/i18n/config";
import { DICTIONARIES, fmt } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorSticker } from "@/components/SponsorSticker";
import { sponsor } from "@/lib/site";
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
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: LOCALE_INFO[l].intl.replace("-", "_"),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}: ${t.meta.title}` }],
    },
    twitter: { card: "summary_large_image", images: ["/og.jpg"] },
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
        <SiteHeader />
        {lang !== "en" && (
          <div className="lang-banner">
            <div className="wrap">{fmt(t.common.englishOnly, { language: LOCALE_INFO[lang].native })}</div>
          </div>
        )}
        <div id="content">{children}</div>
        <SiteFooter />
        <SponsorSticker labels={t.sponsor} tips={sponsor.tips} />
      </body>
    </html>
  );
}
