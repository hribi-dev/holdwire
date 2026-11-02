import type { Metadata } from "next";
import Link from "next/link";
import { listEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn: plain-English guides to crypto, Hyperliquid and EU rules",
  description: "Guides to crypto, Hyperliquid, MiCA and money in Europe. Answer first, sources cited, reviewed by an editor.",
  alternates: { canonical: "/learn" },
};

export default async function LearnIndex() {
  const guides = await listEntries("guides");
  const byCategory = new Map<string, typeof guides>();
  for (const g of guides) {
    const k = g.category ?? "Guides";
    byCategory.set(k, [...(byCategory.get(k) ?? []), g]);
  }
  return (
    <main className="wrap page" style={{ gap: 32 }}>
      <div className="stack" style={{ gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>Learn</h1>
        <p className="muted" style={{ margin: 0, maxWidth: 680 }}>
          Plain-English guides. Answer first, sources cited, and every guide reviewed by a named editor before it goes live.
        </p>
      </div>
      {[...byCategory.entries()].map(([cat, items]) => (
        <section key={cat} className="stack" style={{ gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>{cat}</h2>
          <div className="cards">
            {items.map((g) => (
              <Link key={g.slug} href={`/learn/${g.slug}`} className="card stack" style={{ gap: 8 }}>
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="eyebrow">Guide</span>
                  {g.draft && <span className="soon">Draft</span>}
                </span>
                <strong style={{ fontSize: 18, lineHeight: 1.3 }}>{g.title}</strong>
                <span className="small muted">{g.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <p className="small">
        Looking for a term? <Link href="/glossary" style={{ color: "var(--accent)" }}>Browse the glossary</Link>.
      </p>
    </main>
  );
}
