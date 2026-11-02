import type { Metadata } from "next";
import { listEntries } from "@/lib/content";
import { StoryCard } from "@/components/StoryCard";
import { getDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "News: crypto, Hyperliquid, markets and EU regulation",
  description: "What happened, why it matters and what it means for you in Europe. Sourced, plain-English crypto and finance news.",
  alternates: { canonical: "/news" },
};

export default async function NewsIndex() {
  const [news, { t }] = await Promise.all([listEntries("news"), getDict()]);
  const [lead, ...rest] = news;
  return (
    <main className="wrap page" style={{ gap: 36 }}>
      <div className="stack" style={{ gap: 8 }}>
        <span className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="live-dot" /> {t.home.latest}
        </span>
        <h1 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 48px)" }}>{t.pages.news.title}</h1>
        <p className="muted" style={{ margin: 0, maxWidth: 640 }}>
          {t.pages.news.lede}
        </p>
      </div>
      {lead && <StoryCard entry={lead} size="lg" />}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
        {rest.map((e) => (
          <StoryCard key={e.slug} entry={e} />
        ))}
      </div>
    </main>
  );
}
