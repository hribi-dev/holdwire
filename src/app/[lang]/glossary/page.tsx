import type { Metadata } from "next";
import Link from "@/components/Link";
import { listEntries } from "@/lib/content";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Crypto and finance glossary",
  description: "Short, plain-English definitions of crypto, trading and finance terms, from APY to Zero-knowledge proofs.",
  alternates: { canonical: "/glossary" },
};

export default async function GlossaryIndex() {
  const { t } = await getDict();
  const terms = (await listEntries("glossary")).sort((a, b) => a.title.localeCompare(b.title));
  const groups = new Map<string, typeof terms>();
  for (const t of terms) {
    const letter = t.title.charAt(0).toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), t]);
  }
  return (
    <main className="wrap page" style={{ gap: 28 }}>
      <div className="stack" style={{ gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>{t.pages.glossary.title}</h1>
        <p className="muted" style={{ margin: 0 }}>
          {fmt(t.pages.glossary.lede, { n: terms.length })}
        </p>
      </div>
      <nav aria-label="Letters" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {[...groups.keys()].map((l) => (
          <a key={l} href={`#letter-${l}`} className="chip mono" style={{ minWidth: 36, textAlign: "center" }}>
            {l}
          </a>
        ))}
      </nav>
      {[...groups.entries()].map(([letter, items]) => (
        <section key={letter} id={`letter-${letter}`} className="stack" style={{ gap: 4 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 24 }}>{letter}</h2>
          {items.map((t) => (
            <Link key={t.slug} href={`/glossary/${t.slug}`} style={{ padding: "10px 0", borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", gap: "2px 16px" }}>
              <strong style={{ flex: "0 0 220px" }}>{t.title}</strong>
              <span className="muted" style={{ flex: "1 1 360px" }}>
                {t.short}
              </span>
            </Link>
          ))}
        </section>
      ))}
    </main>
  );
}
