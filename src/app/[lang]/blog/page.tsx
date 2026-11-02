import type { Metadata } from "next";
import { listEntries } from "@/lib/content";
import { StoryCard } from "@/components/StoryCard";
import { getDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Blog: the day's biggest crypto and finance story, explained",
  description: "Every day, the story that matters most in crypto and finance, explained in plain English for readers in Europe. Sourced and reviewed.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const [posts, { t }] = await Promise.all([listEntries("blog"), getDict()]);
  const [lead, ...rest] = posts;
  return (
    <main className="wrap page" style={{ gap: 36 }}>
      <div className="stack" style={{ gap: 8 }}>
        <span className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="live-dot" /> {t.pages.blog.tag}
        </span>
        <h1 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 48px)" }}>{t.pages.blog.title}</h1>
        <p className="muted" style={{ margin: 0, maxWidth: 640 }}>{t.pages.blog.lede}</p>
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
