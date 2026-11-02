"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/Link";
import { stripLocale } from "@/i18n/config";

export function NavLinks({ items }: { items: { key: string; href: string; label: string }[] }) {
  const path = stripLocale(usePathname() || "/");
  return (
    <nav aria-label="Main" className="main-nav">
      {items.map((item) => {
        const active = path === item.href || path.startsWith(`${item.href}/`);
        return (
          <Link key={item.key} href={item.href} className={`nav-link${active ? " is-active" : ""}${item.key === "hyperliquid" ? " nav-hl" : ""}`} aria-current={active ? "page" : undefined}>
            {item.key === "hyperliquid" && <span className="nav-hl-dot" aria-hidden="true" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
