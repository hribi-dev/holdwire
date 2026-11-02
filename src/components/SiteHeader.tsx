import Link from "@/components/Link";
import { nav, site } from "@/lib/site";
import { getDict } from "@/i18n/server";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./Logo";

export async function SiteHeader() {
  const { t, locale } = await getDict();
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="logo" aria-label={`${site.name} ${t.header.home}`}>
          <LogoMark />
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Main" className="main-nav">
          {nav.map((item) => (
            <Link key={item.key} href={item.href}>
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher current={locale} label={t.header.language} />
          <Link href="/#newsletter" className="btn btn-primary">
            {t.header.subscribe}
          </Link>
        </div>
      </div>
      <div className="wrap chips">
        <span className="muted" style={{ padding: "6px 0", marginRight: 4 }}>
          {t.header.trending}
        </span>
        <Link className="chip" href="/hyperliquid" style={{ background: "#E4F7F1", color: "#0A5C46", fontWeight: 600 }}>
          Hyperliquid
        </Link>
        <Link className="chip" href="/memes" style={{ background: "#ecfccb", color: "#3f6212", fontWeight: 600 }}>
          {t.nav.memes}
        </Link>
        <Link className="chip" href="/coins/bitcoin">Bitcoin</Link>
        <Link className="chip" href="/coins/solana">Solana</Link>
        <Link className="chip" href="/coins/ethereum">Ethereum</Link>
        <Link className="chip" href="/coins">{t.header.allCoins}</Link>
      </div>
    </header>
  );
}
