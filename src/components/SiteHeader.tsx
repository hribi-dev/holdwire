import Link from "@/components/Link";
import { nav, site } from "@/lib/site";
import { getDict } from "@/i18n/server";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LOGO_VARIANT, LogoMark } from "./Logo";
import { NavLinks } from "./NavLinks";

export async function SiteHeader() {
  const { t, locale } = await getDict();
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
    </header>
  );
}
