import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { cacheLife } from "next/cache";
import { site } from "./site";
import { parseCover, type Cover } from "./cover";
import { enforceSponsoredLinks, requiresSponsoredLinks, robotsFor, type ContentKind } from "./sponsored";

export type Collection = "news" | "blog" | "guides" | "glossary" | "sponsored" | "press-releases";

const KIND: Record<Collection, ContentKind> = {
  news: "editorial",
  blog: "editorial",
  guides: "editorial",
  glossary: "editorial",
  sponsored: "sponsored",
  "press-releases": "press-release",
};

export type Entry = {
  collection: Collection;
  slug: string;
  title: string;
  /** Optional shorter title for search results and social cards (≤ 60 characters). */
  seoTitle: string | null;
  description: string;
  category: string | null;
  author: string | null;
  /** A named human editor. Without one, the entry is a draft: shown with a banner and never indexed. */
  reviewedBy: string | null;
  published: string | null;
  updated: string | null;
  sponsor: string | null;
  disclosure: string | null;
  sources: { title: string; url: string }[];
  html: string;
  kind: ContentKind;
  draft: boolean;
  indexable: boolean;
  /** Short definition for glossary entries */
  short: string | null;
  /** Template/example entries render at their URL but never appear in lists or sitemaps */
  template: boolean;
  /** Estimated minutes to read */
  readMinutes: number;
  /** Freely licensed cover photo with credit; null falls back to generated cover art */
  cover: Cover | null;
};

const dirFor = (c: Collection) => path.join(process.cwd(), "content", c);

function str(v: unknown): string | null {
  if (v == null || v === "") return null;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

async function parse(collection: Collection, slug: string): Promise<Entry | null> {
  let raw: string;
  try {
    raw = await readFile(path.join(dirFor(collection), `${slug}.md`), "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  const kind = KIND[collection];
  let html = await marked.parse(content, { async: true });
  if (requiresSponsoredLinks(kind)) {
    html = enforceSponsoredLinks(html, new URL(site.url).host);
  }
  const reviewedBy = str(data.reviewedBy);
  const draft = !reviewedBy;
  const robots = robotsFor(kind);
  const sources = Array.isArray(data.sources)
    ? (data.sources as unknown[])
        .map((s) => (typeof s === "object" && s ? (s as Record<string, unknown>) : null))
        .filter((s): s is Record<string, unknown> => !!s && typeof s.url === "string")
        .map((s) => ({ title: String(s.title ?? s.url), url: String(s.url) }))
    : [];

  if (collection === "sponsored" && !data.sponsor) {
    throw new Error(`content/sponsored/${slug}.md is missing "sponsor" — every paid piece must name its sponsor.`);
  }

  return {
    collection,
    slug,
    title: String(data.title ?? slug),
    seoTitle: str(data.seoTitle),
    description: String(data.description ?? ""),
    category: str(data.category),
    author: str(data.author),
    reviewedBy,
    published: str(data.published),
    updated: str(data.updated) ?? str(data.published),
    sponsor: str(data.sponsor),
    disclosure: str(data.disclosure),
    sources,
    html,
    kind,
    draft,
    indexable: site.indexable && !draft && robots.index && data.template !== true,
    short: str(data.short),
    template: data.template === true,
    readMinutes: Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 220)),
    cover: parseCover(data.cover, `content/${collection}/${slug}.md`),
  };
}

export async function getEntry(collection: Collection, slug: string): Promise<Entry | null> {
  "use cache";
  cacheLife("hours");
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  return parse(collection, slug);
}

export async function listEntries(collection: Collection): Promise<Entry[]> {
  "use cache";
  cacheLife("hours");
  let files: string[] = [];
  try {
    files = await readdir(dirFor(collection));
  } catch {
    return [];
  }
  const entries = await Promise.all(
    files.filter((f) => f.endsWith(".md")).map((f) => parse(collection, f.replace(/\.md$/, ""))),
  );
  return entries
    .filter((e): e is Entry => !!e && !e.template)
    .sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? "") || a.title.localeCompare(b.title));
}
