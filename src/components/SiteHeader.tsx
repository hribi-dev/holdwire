import Link from "@/components/Link";
import { nav, site } from "@/lib/site";
import { getDict } from "@/i18n/server";
import { HeaderIsland } from "./HeaderIsland";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LOGO_VARIANT, LogoMark } from "./Logo";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

/** Header C "Floating island" (Design canvas → Header options). */
export async function SiteHeader() {
  const { t, locale } = await getDict();
  return (
    <header className="site-header">
      <div className="wrap">
        <HeaderIsland>
          <Link href="/" className="logo" aria-label={`${site.name} ${t.header.home}`}>
            <LogoMark animated />
            <span className={`logo-word logo-${LOGO_VARIANT}`}>{LOGO_VARIANT === "pulse" ? site.name.toUpperCase() : site.name.toLowerCase()}</span>
          </Link>
          <NavLinks items={nav.map((n) => ({ key: n.key, href: n.href, label: t.nav[n.key] }))} />
          <div className="header-actions">
            <Link href="/coins" className="live-pill">
              <span className="live-pill-dot" aria-hidden="true" />
              {t.header.live}
            </Link>
            <LanguageSwitcher current={locale} label={t.header.language} />
            <ThemeToggle label={t.header.darkTheme} />
            <Link href="/#newsletter" className="btn btn-primary btn-glow">
              {t.header.subscribe}
            </Link>
          </div>
        </HeaderIsland>
      </div>
    </header>
  );
}
