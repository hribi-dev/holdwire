/**
 * Enforces Holdwire's paid-link rule in code, not by editor discipline:
 * every outbound link inside sponsored content, press releases or affiliate
 * blocks gets rel="sponsored noopener" (Google's required attribute for paid links).
 *
 * Works on HTML strings (e.g. rendered markdown). Internal links (relative paths,
 * #anchors, or links to our own host) are left alone.
 */
export function enforceSponsoredLinks(html: string, ownHost?: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (tag, attrs: string) => {
    const hrefMatch = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i);
    const href = hrefMatch ? (hrefMatch[2] ?? hrefMatch[3] ?? "") : "";
    if (!isExternal(href, ownHost)) return tag;

    const withoutRel = attrs.replace(/\s+rel\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    const existingRel = attrs.match(/\brel\s*=\s*("([^"]*)"|'([^']*)')/i);
    const tokens = new Set(
      (existingRel ? (existingRel[2] ?? existingRel[3] ?? "") : "")
        .split(/\s+/)
        .filter(Boolean)
        .map((t) => t.toLowerCase())
        .filter((t) => t !== "follow" && t !== "dofollow"),
    );
    tokens.add("sponsored");
    tokens.add("noopener");
    return `<a${withoutRel} rel="${[...tokens].join(" ")}">`;
  });
}

export function isExternal(href: string, ownHost?: string): boolean {
  if (!/^https?:\/\//i.test(href) && !href.startsWith("//")) return false;
  if (!ownHost) return true;
  try {
    const url = new URL(href.startsWith("//") ? `https:${href}` : href);
    return url.host.toLowerCase() !== ownHost.toLowerCase();
  } catch {
    return true;
  }
}

export type ContentKind = "editorial" | "sponsored" | "press-release" | "affiliate";

export function requiresSponsoredLinks(kind: ContentKind): boolean {
  return kind !== "editorial";
}

/** Press releases are kept out of the index by default (see 04-SEO-PLAYBOOK §7). */
export function robotsFor(kind: ContentKind): { index: boolean; follow: boolean } {
  return { index: kind !== "press-release", follow: true };
}
