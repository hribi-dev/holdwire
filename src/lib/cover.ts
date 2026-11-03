/**
 * Cover photos for news, blog posts and guides.
 *
 * Only freely licensed photos are allowed, and every one carries its credit and source.
 * Validation is strict on purpose: a bad `cover:` block fails the build (and CI) instead
 * of shipping an uncredited or wrongly licensed image. See docs/plan/13-DAILY-BLOG-BOT.md.
 */

export const COVER_LICENSES = {
  unsplash: { label: "Unsplash License", url: "https://unsplash.com/license", needsCredit: false },
  pexels: { label: "Pexels License", url: "https://www.pexels.com/license/", needsCredit: false },
  cc0: { label: "CC0", url: "https://creativecommons.org/publicdomain/zero/1.0/", needsCredit: false },
  "public-domain": { label: "Public domain", url: null, needsCredit: false },
  "cc-by": { label: "CC BY", url: null, needsCredit: true },
  "cc-by-sa": { label: "CC BY-SA", url: null, needsCredit: true },
  own: { label: "Tickora", url: null, needsCredit: false },
} as const;

export type CoverLicense = keyof typeof COVER_LICENSES;

export type Cover = {
  src: string;
  alt: string;
  /** Photographer or author name, e.g. "Jane Doe" */
  credit: string;
  /** Where the photo was found: the photo's own page on Unsplash, Pexels or Wikimedia Commons */
  sourceUrl: string;
  license: CoverLicense;
  /** Required for CC BY / CC BY-SA: link to the exact licence version, e.g. https://creativecommons.org/licenses/by-sa/4.0/ */
  licenseUrl: string | null;
};

/** Hosts we hotlink from. Unsplash asks API users to hotlink its CDN; the others are stable public CDNs. */
export const COVER_HOSTS = ["images.unsplash.com", "images.pexels.com", "upload.wikimedia.org"] as const;

const SOURCE_HOSTS: Record<string, string[]> = {
  unsplash: ["unsplash.com"],
  pexels: ["www.pexels.com", "pexels.com"],
};

function host(u: string): string | null {
  try {
    const url = new URL(u);
    return url.protocol === "https:" ? url.host : null;
  } catch {
    return null;
  }
}

/** Returns null when there is no cover; throws with a clear message when the cover is invalid. */
export function parseCover(raw: unknown, where: string): Cover | null {
  if (raw == null || raw === "") return null;
  if (typeof raw !== "object" || Array.isArray(raw)) throw new Error(`${where}: "cover" must be an object.`);
  const c = raw as Record<string, unknown>;
  const s = (k: string) => (typeof c[k] === "string" ? (c[k] as string).trim() : "");

  const src = s("src");
  const alt = s("alt");
  const credit = s("credit");
  const sourceUrl = s("sourceUrl");
  const license = s("license") as CoverLicense;
  const licenseUrl = s("licenseUrl") || null;

  if (!(license in COVER_LICENSES)) {
    throw new Error(`${where}: cover.license must be one of ${Object.keys(COVER_LICENSES).join(", ")}.`);
  }
  const isLocal = src.startsWith("/images/");
  if (!isLocal) {
    const h = host(src);
    if (!h || !(COVER_HOSTS as readonly string[]).includes(h)) {
      throw new Error(`${where}: cover.src must be an https URL on ${COVER_HOSTS.join(", ")} or a local /images/ path.`);
    }
  }
  if (alt.length < 8) throw new Error(`${where}: cover.alt must describe the photo (at least 8 characters).`);
  if (!credit) throw new Error(`${where}: cover.credit is required (photographer or author).`);
  if (license !== "own") {
    const sh = host(sourceUrl);
    if (!sh) throw new Error(`${where}: cover.sourceUrl must be the https page the photo came from.`);
    const allowed = SOURCE_HOSTS[license];
    if (allowed && !allowed.includes(sh)) {
      throw new Error(`${where}: cover.sourceUrl for a ${license} photo must be on ${allowed.join(" or ")}.`);
    }
  }
  if (COVER_LICENSES[license].needsCredit && !(licenseUrl && host(licenseUrl))) {
    throw new Error(`${where}: cover.licenseUrl is required for ${license} photos.`);
  }
  return { src, alt, credit, sourceUrl, license, licenseUrl };
}

/** Ask the image CDN for a resized copy, so cards don't download full-size originals. */
export function sizedCover(src: string, width: number): string {
  const h = host(src);
  if (h === "images.unsplash.com") {
    const u = new URL(src);
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", "70");
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    return u.toString();
  }
  if (h === "images.pexels.com") {
    const u = new URL(src);
    u.searchParams.set("auto", "compress");
    u.searchParams.set("cs", "tinysrgb");
    u.searchParams.set("w", String(width));
    return u.toString();
  }
  return src;
}

/** "Photo: Jane Doe / Unsplash", with the licence named where the licence asks for it. */
export function coverCreditText(c: Cover): string {
  const platform =
    c.license === "unsplash" ? "Unsplash" : c.license === "pexels" ? "Pexels" : c.sourceUrl.includes("wikimedia.org") ? "Wikimedia Commons" : null;
  const lic = COVER_LICENSES[c.license].needsCredit ? `, ${COVER_LICENSES[c.license].label}` : "";
  return `Photo: ${c.credit}${platform ? ` / ${platform}` : ""}${lic}`;
}
