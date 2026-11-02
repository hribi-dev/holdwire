"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { LOCALE_GROUPS, LOCALE_INFO, localize, stripLocale, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() || "/";
  const base = stripLocale(pathname);
  const ref = useRef<HTMLDetailsElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onDoc = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) el.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") el.open = false;
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const info = LOCALE_INFO[current];
  return (
    <details ref={ref} className="lang-switch">
      <summary aria-label={`${label}: ${info.native}`}>
        <span aria-hidden="true">{info.flag}</span>
        <span className="lang-code">{current.toUpperCase()}</span>
        <span aria-hidden="true" className="lang-caret">▾</span>
      </summary>
      <div className="lang-menu" role="menu">
        <strong className="tiny muted" style={{ padding: "4px 10px" }}>{label}</strong>
        {LOCALE_GROUPS.map((g) => (
          <div key={g.label} className="lang-group">
            <span className="lang-group-label">{g.label}</span>
            {g.locales.map((l) => (
              <a
                key={l}
                role="menuitem"
                href={localize(base, l)}
                hrefLang={l}
                lang={l}
                aria-current={l === current ? "true" : undefined}
                className="lang-item"
              >
                <span aria-hidden="true">{LOCALE_INFO[l].flag}</span> {LOCALE_INFO[l].native}
              </a>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}
