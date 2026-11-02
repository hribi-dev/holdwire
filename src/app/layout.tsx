import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Ticker, TickerFallback } from "@/components/Ticker";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: crypto prices, fintech and hard assets`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: site.indexable ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0B0E13" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a href="#content" className="skip">
          Skip to content
        </a>
        <Suspense fallback={<TickerFallback />}>
          <Ticker />
        </Suspense>
        <SiteHeader />
        <div id="content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
