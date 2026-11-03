import Link from "@/components/Link";
import { site } from "@/lib/site";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/dictionaries";

export async function SiteFooter() {
  const { t } = await getDict();
  const f = t.footer;
  return (
    <footer className="site-footer">
      <div className="wrap cols">
        <div style={{ flex: "2 1 280px", display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#fff" }}>{site.name}</span>
          <span>{f.tagline}</span>
        </div>
        <nav aria-label={f.dataTools}>
          <strong>{f.dataTools}</strong>
          <Link href="/hyperliquid">{f.hlHub}</Link>
          <Link href="/coins">{f.coinPrices}</Link>
          <Link href="/memes">{f.memes}</Link>
          <Link href="/coins/bitcoin">Bitcoin</Link>
          <Link href="/coins/ethereum">Ethereum</Link>
        </nav>
        <nav aria-label={f.sections}>
          <strong>{f.sections}</strong>
          <Link href="/fintech">{f.fintech}</Link>
          <Link href="/watches">{f.watches}</Link>
          <Link href="/collectibles">{f.collectibles}</Link>
          <Link href="/learn">{t.nav.learn}</Link>
          <Link href="/glossary">{t.nav.glossary}</Link>
        </nav>
        <nav aria-label={f.company}>
          <strong>{f.company}</strong>
          <Link href="/about">{f.about}</Link>
          <Link href="/editorial-policy">{f.editorial}</Link>
          <Link href="/how-we-make-money">{f.money}</Link>
          <Link href="/advertising-policy">{f.advertising}</Link>
          <Link href="/advertise">{t.sponsor.title}</Link>
          <Link href="/corrections">{f.corrections}</Link>
          <Link href="/disclosures">{f.disclosures}</Link>
        </nav>
      </div>
      <div className="wrap legal">
        {fmt(f.notAdvice, { site: site.name })} <Link href="/disclaimer">{f.readDisclaimer}</Link>. {f.labelled} © {site.copyrightYear} {site.name}
      </div>
    </footer>
  );
}
