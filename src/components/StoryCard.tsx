import Link from "@/components/Link";
import type { Entry } from "@/lib/content";
import { CoverArt, categoryColor } from "./CoverArt";
import { CoverPhoto } from "./CoverPhoto";

const fmtDate = (d: string | null) =>
  d ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d)) : "";

export function hrefFor(e: Entry) {
  return e.collection === "news" ? `/news/${e.slug}` : e.collection === "blog" ? `/blog/${e.slug}` : `/learn/${e.slug}`;
}

export function StoryCard({ entry, size = "md" }: { entry: Entry; size?: "lg" | "md" | "sm" }) {
  const titleSize = size === "lg" ? "clamp(26px, 3vw, 36px)" : size === "md" ? 20 : 17;
  return (
    <Link href={hrefFor(entry)} className="story reveal">
      {size !== "sm" && (
        <CoverArt seed={entry.slug} category={entry.category} label={entry.collection === "news" ? "News" : entry.collection === "blog" ? "Blog" : "Guide"}>
          {entry.cover && (
            <CoverPhoto
              cover={entry.cover}
              widths={size === "lg" ? [640, 960, 1280] : [400, 640, 800]}
              sizes={size === "lg" ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 700px) 100vw, 33vw"}
              eager={size === "lg"}
            />
          )}
        </CoverArt>
      )}
      <span className="cat" style={{ color: categoryColor(entry.category) }}>
        {entry.category ?? "News"}
      </span>
      <strong style={{ fontFamily: "var(--font-display)", fontSize: titleSize, lineHeight: 1.15, letterSpacing: "-0.015em" }}>{entry.title}</strong>
      {size !== "sm" && <span className="muted" style={{ fontSize: size === "lg" ? 17 : 15 }}>{entry.description}</span>}
      <span className="tiny muted">
        {fmtDate(entry.published)} · {entry.readMinutes} min read
      </span>
    </Link>
  );
}
