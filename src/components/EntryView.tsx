import Link from "next/link";
import type { Entry } from "@/lib/content";

const LABEL: Record<string, { text: string; bg: string; fg: string } | null> = {
  editorial: null,
  sponsored: { text: "Sponsored", bg: "#FDF0C4", fg: "#6B4E00" },
  "press-release": { text: "Press release", bg: "#E8EDF5", fg: "#2B3A55" },
  affiliate: { text: "Contains affiliate links", bg: "#FDF0C4", fg: "#6B4E00" },
};

/** Shared renderer for guides, sponsored content and press releases. Labels are enforced here, not by editors. */
export function EntryView({ entry, crumbs }: { entry: Entry; crumbs: { name: string; href: string }[] }) {
  const label = LABEL[entry.kind];
  return (
    <main className="wrap page" style={{ gap: 20, paddingTop: 20 }}>
      <nav aria-label="Breadcrumb" className="small muted" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {crumbs.map((c, i) => (
          <span key={c.href} style={{ display: "flex", gap: 8 }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            <Link href={c.href}>{c.name}</Link>
          </span>
        ))}
      </nav>

      <article className="prose stack" style={{ gap: 0 }}>
        {label && (
          <p style={{ margin: "0 0 12px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 6, background: label.bg, color: label.fg }}>
              {label.text}
              {entry.sponsor ? ` · ${entry.sponsor}` : ""}
            </span>
          </p>
        )}
        {entry.draft && (
          <p className="sample-flag" style={{ alignSelf: "flex-start", margin: "0 0 12px" }}>
            Draft: awaiting editor review, not published
          </p>
        )}
        {entry.category && entry.kind === "editorial" && <span className="eyebrow">{entry.category}</span>}
        <h1 style={{ marginTop: 8 }}>{entry.title}</h1>
        {entry.description && <p style={{ fontSize: 19, color: "#374151", marginTop: 0 }}>{entry.description}</p>}
        <p className="small muted" style={{ marginTop: 0 }}>
          {entry.author ? `By ${entry.author}` : "Holdwire"}
          {entry.reviewedBy ? ` · Reviewed by ${entry.reviewedBy}` : ""}
          {entry.updated ? ` · Updated ${entry.updated}` : ""}
        </p>
        {entry.kind === "sponsored" && (
          <p className="notice" style={{ margin: "0 0 8px" }}>
            This article was paid for by {entry.sponsor}. Holdwire&apos;s newsroom did not write it and does not endorse the products mentioned.{" "}
            <Link href="/advertising-policy">How we label sponsored content</Link>
          </p>
        )}
        {entry.kind === "press-release" && (
          <p className="notice" style={{ margin: "0 0 8px" }}>
            Supplied by the company named. Published as received after a basic check; not written or verified by Holdwire&apos;s newsroom.
          </p>
        )}
        {entry.disclosure && (
          <p className="notice" style={{ margin: "0 0 8px" }}>
            <strong>Disclosure:</strong> {entry.disclosure}
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: entry.html }} />
        {entry.sources.length > 0 && (
          <>
            <h2>Sources</h2>
            <ul>
              {entry.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel={entry.kind === "editorial" ? "noopener" : "sponsored noopener"} target="_blank">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>

      <p className="notice" style={{ maxWidth: 760 }}>
        Nothing on this page is investment advice. Crypto-assets are volatile and you can lose all the money you put in.{" "}
        <Link href="/disclaimer">Disclaimer</Link>
      </p>
    </main>
  );
}
