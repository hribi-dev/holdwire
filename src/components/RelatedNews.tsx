import Link from "@/components/Link";
import { listEntries } from "@/lib/content";
import { getDict } from "@/i18n/server";
import { StoryCard } from "./StoryCard";

/**
 * The latest news briefs and blog posts for one site section, matched on frontmatter `category`.
 * Renders nothing until there is at least one matching story.
 */
export async function RelatedNews({ categories, limit = 3, title }: { categories: string[]; limit?: number; title?: string }) {
  const [news, blog, { t }] = await Promise.all([listEntries("news"), listEntries("blog"), getDict()]);
  const want = new Set(categories.map((c) => c.toLowerCase()));
  const items = [...news, ...blog]
    .filter((e) => e.category && want.has(e.category.toLowerCase()))
    .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? "") || (b.updated ?? "").localeCompare(a.updated ?? ""))
    .slice(0, limit);
  if (items.length === 0) return null;
  return (
    <section className="stack" style={{ gap: 16 }} aria-labelledby="related-news-h">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <h2 id="related-news-h" className="section-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="live-dot" aria-hidden="true" /> {title ?? t.common.latestNews}
        </h2>
        <Link href="/news" className="small" style={{ color: "var(--accent)", fontWeight: 600 }}>
          {t.common.allNews}
        </Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
        {items.map((e) => (
          <StoryCard key={`${e.collection}/${e.slug}`} entry={e} />
        ))}
      </div>
    </section>
  );
}
