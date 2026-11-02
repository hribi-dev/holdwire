import type { Metadata } from "next";
import Link from "@/components/Link";
import { listEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press releases",
  description: "Paid and company-supplied content on Holdwire, always labelled and kept separate from our newsroom.",
  robots: { index: false, follow: true },
};

export default async function Index() {
  const entries = await listEntries("press-releases");
  return (
    <main className="wrap page" style={{ gap: 20 }}>
      <div className="stack" style={{ gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>Press releases</h1>
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
            <Link key={e.slug} href={`/press-releases/${e.slug}`}>
              <span className="tiny muted">{e.sponsor ?? "Company release"} · {e.updated}</span>
              <strong>{e.title}</strong>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
