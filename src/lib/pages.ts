import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { cacheLife } from "next/cache";
import { contact } from "./site";

export const TRUST_PAGES = [
  "about",
  "editorial-policy",
  "advertising-policy",
  "how-we-make-money",
  "disclaimer",
  "corrections",
  "disclosures",
  "privacy",
] as const;

/** Swap [role@domain] and [publisher …] placeholders for configured details, or a neutral note. */
export function fillPlaceholders(md: string): string {
  return md
    .replace(/\[([a-z]+)@domain\]/g, (_, role: string) => {
      const email = (contact as Record<string, string>)[role] || contact.general;
      return email ? `[${email}](mailto:${email})` : "our contact email (coming soon)";
    })
    .replace(/\[publisher[^\]]*\]/g, contact.publisher || "the publisher (company details coming soon)");
}

export type TrustPage = { slug: string; title: string; html: string; draft: boolean };

function parseFrontmatter(src: string): { data: Record<string, string>; body: string } {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: src };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: src.slice(m[0].length) };
}

export async function getTrustPage(slug: string): Promise<TrustPage | null> {
  "use cache";
  cacheLife("max");
  if (!(TRUST_PAGES as readonly string[]).includes(slug)) return null;
  const file = path.join(process.cwd(), "content", "pages", `${slug}.md`);
  const src = await readFile(file, "utf8");
  const { data, body } = parseFrontmatter(src);
  const html = await marked.parse(fillPlaceholders(body), { async: true });
  return {
    slug,
    title: data.title ?? slug,
    html,
    draft: (data.status ?? "").toLowerCase().startsWith("draft"),
  };
}
