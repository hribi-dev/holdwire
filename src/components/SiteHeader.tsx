import Link from "@/components/Link";
import { nav, site } from "@/lib/site";
import { getDict } from "@/i18n/server";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LOGO_VARIANT, LogoMark } from "./Logo";
import { NavLinks } from "./NavLinks";

export async function SiteHeader() {
  const { t, locale } = await getDict();
  const chips = [
    { href: "/hyperliquid", label: "Hyperliquid", dot: "#14b8a6" },
    { href: "/movers", label: t.nav.movers, dot: "#ef4444" },
    { href: "/memes", label: t.nav.memes, dot: "#84cc16" },
    { href: "/coins/bitcoin", label: "Bitcoin", dot: "#f7931a" },
    { href: "/coins/solana", label: "Solana", dot: "#9945ff" },
    { href: "/coins/ethereum", label: "Ethereum", dot: "#627eea" },
    { href: "/coins", label: t.header.allCoins, dot: null },
  ];
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="logo" aria-label={`${site.name} ${t.header.home}`}>
          <LogoMark />
          <span className={`logo-word logo-${LOGO_VARIANT}`}>{LOGO_VARIANT === "pulse" ? site.name.toUpperCase() : site.name.toLowerCase()}</span>
        </Link>
        <NavLinks items={nav.map((n) => ({ key: n.key, href: n.href, label: t.nav[n.key] }))} />
        <div className="header-actions">
          <LanguageSwitcher current={locale} label={t.header.language} />
          <Link href="/#newsletter" className="btn btn-primary btn-glow">
            {t.header.subscribe}
          </Link>
        </div>
      </div>
      <div className="trend-row">
        <div className="wrap chips">
          <span className="trend-label">{t.header.trending}</span>
          {chips.map((c) => (
            <Link key={c.href} className="chip chip-dot" href={c.href}>
              {c.dot && <span className="dot" style={{ background: c.dot }} aria-hidden="true" />}
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
