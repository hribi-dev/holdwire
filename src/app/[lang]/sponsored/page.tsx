import type { Metadata } from "next";
import Link from "@/components/Link";
import { listEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsored",
  description: "Paid and company-supplied content on Tickora, always labelled and kept separate from our newsroom.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/sponsored" },
};

export default async function Index() {
  const entries = await listEntries("sponsored");
  return (
    <main className="wrap page" style={{ gap: 20 }}>
      <div className="stack" style={{ gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>Sponsored</h1>
        <p className="muted" style={{ margin: 0, maxWidth: 680 }}>
          Content in this section is paid for or supplied by companies. It is labelled on every page and kept separate from our newsroom.{" "}
          <Link href="/advertising-policy" style={{ color: "var(--accent)" }}>Our policy</Link>
        </p>
      </div>
      {entries.length === 0 ? (
        <p className="notice">Nothing here yet.</p>
      ) : (
        <div className="headline-list">
          {entries.map((e) => (
            <Link key={e.slug} href={`/sponsored/${e.slug}`}>
              <span className="tiny muted">{e.sponsor ?? "Company release"} · {e.updated}</span>
              <strong>{e.title}</strong>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
