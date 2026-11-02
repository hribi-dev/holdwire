import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export type AssetHubProps = {
  path: string;
  label: string;
  color: string;
  tint: string;
  title: string;
  lede: string;
  updated: string;
  reviewedBy: string | null;
  drivers: { title: string; body: string }[];
  risks: string[];
  trackers: { name: string; url: string; what: string }[];
  upcoming: string[];
};

export function AssetHub(p: AssetHubProps) {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: p.label, path: p.path }])} />
      <section className={`tint ${p.tint}`} style={{ borderRadius: 0, padding: 0 }}>
        <div className="wrap stack" style={{ gap: 14, padding: "56px 24px 48px" }}>
          <span className="cat" style={{ color: p.color }}>{p.label}</span>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>{p.title}</h1>
          <p style={{ margin: 0, fontSize: 18, maxWidth: 680, color: "var(--ink-2)" }}>{p.lede}</p>
          <span className="tiny muted">
            Updated {p.updated}
            {p.reviewedBy ? ` · Reviewed by ${p.reviewedBy}` : " · Draft, awaiting editor review"}
          </span>
        </div>
      </section>

      <div className="wrap stack" style={{ gap: 40, paddingTop: 40, paddingBottom: 64 }}>
        <section className="stack" style={{ gap: 16 }}>
          <h2 className="section-title">What drives value</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {p.drivers.map((d) => (
              <div key={d.title} className="card stack" style={{ gap: 6 }}>
                <strong>{d.title}</strong>
                <span className="small muted">{d.body}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="stack" style={{ gap: 12 }}>
          <h2 className="section-title">The catches</h2>
          <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
            {p.risks.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </section>

        <section className="stack" style={{ gap: 16 }}>
          <h2 className="section-title">Where prices come from</h2>
          <p className="muted" style={{ margin: 0, maxWidth: 680 }}>
            There is no single exchange price for physical assets. These are the public sources we follow and cite. We have no commercial
            relationship with any of them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {p.trackers.map((t) => (
              <a key={t.name} href={t.url} rel="noopener" target="_blank" className="card stack" style={{ gap: 6 }}>
                <strong>{t.name} ↗</strong>
                <span className="small muted">{t.what}</span>
              </a>
            ))}
          </div>
        </section>

        <section className={`tint ${p.tint} stack`} style={{ gap: 10 }}>
          <span className="cat" style={{ color: p.color }}>Guides on the way</span>
          <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 4 }}>
            {p.upcoming.map((u) => <li key={u}>{u}</li>)}
          </ul>
          <span className="small">
            Want them in your inbox? <Link href="/#newsletter">Join the brief</Link>.
          </span>
        </section>

        <p className="notice" style={{ margin: 0 }}>
          General information, not investment advice. Physical assets can lose value, are hard to sell quickly and cost money to store and
          insure.
        </p>
      </div>
    </main>
  );
}
