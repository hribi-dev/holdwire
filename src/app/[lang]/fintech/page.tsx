import type { Metadata } from "next";
import Link from "@/components/Link";
import { CRITERIA, NEOBANKS_REVIEWED_BY, NEOBANKS_UPDATED, affiliateHref, ranked } from "@/content/neobanks";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { getDict } from "@/i18n/server";

const reviewed = Boolean(NEOBANKS_REVIEWED_BY);

export const metadata: Metadata = {
  title: "Crypto-friendly neobanks in Europe compared (2026)",
  description:
    "Bitpanda, Revolut, Gnosis Pay, Tria and Wirex compared for EU readers: who is licensed, who holds your money, what it really costs and what to watch out for.",
  alternates: { canonical: "/fintech" },
  robots: reviewed ? undefined : { index: false, follow: true },
};

const PINK = "#be185d";

export default async function Fintech() {
  const { t } = await getDict();
  const f = t.pages.fintech;
  const list = ranked();
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fintech", path: "/fintech" }])} />

      <section className="tint tint-pink" style={{ borderRadius: 0, padding: 0 }}>
        <div className="wrap stack" style={{ gap: 14, padding: "56px 24px 48px" }}>
          <span className="cat" style={{ color: PINK }}>{f.tag}</span>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {f.title}
          </h1>
          <p style={{ margin: 0, fontSize: 18, maxWidth: 680, color: "var(--ink-2)" }}>{f.lede}</p>
          <p className="notice" style={{ margin: 0, maxWidth: 680, background: "#fff" }}>
            <strong>Affiliate disclosure:</strong> some links on this page may earn us a commission if you open an account. It costs you
            nothing and doesn&apos;t change the order, which follows the criteria below. We only use paid links for providers authorised
            to serve EU readers. <Link href="/how-we-make-money">How we make money</Link>.
          </p>
          <span className="tiny muted">
            Updated {NEOBANKS_UPDATED}
            {reviewed ? ` · Reviewed by ${NEOBANKS_REVIEWED_BY}` : " · Draft, awaiting editor review"}
          </span>
        </div>
      </section>

      <div className="wrap stack" style={{ gap: 40, paddingTop: 40, paddingBottom: 64 }}>
        <section className="stack" style={{ gap: 16 }} aria-labelledby="how-h">
          <h2 id="how-h" className="section-title">{f.how}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {CRITERIA.map((c, i) => (
              <div key={c.title} className="card stack" style={{ gap: 6 }}>
                <span className="cat" style={{ color: PINK }}>{i + 1}</span>
                <strong>{c.title}</strong>
                <span className="small muted">{c.body}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="stack" style={{ gap: 16 }} aria-labelledby="list-h">
          <h2 id="list-h" className="section-title">{f.providers}</h2>
          <div className="stack" style={{ gap: 16 }}>
            {list.map((n) => {
              const aff = affiliateHref(n);
              return (
                <article key={n.slug} id={n.slug} className="card stack" style={{ gap: 12 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
                    <div className="stack" style={{ gap: 4 }}>
                      <h3 style={{ margin: 0, fontSize: 22 }}>{n.name}</h3>
                      <span className="tiny muted">
                        {n.card} · {n.custody}
                      </span>
                    </div>
                    <span
                      className="tiny"
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontWeight: 700,
                        background: n.euAuthorised ? "#dcfce7" : "#fef3c7",
                        color: n.euAuthorised ? "#166534" : "#92400e",
                      }}
                    >
                      {n.euAuthorised ? "EU authorised" : "EU authorisation not confirmed"}
                    </span>
                  </div>
                  <p className="small" style={{ margin: 0 }}>
                    <strong>Best for:</strong> {n.bestFor}
                  </p>
                  <p className="small muted" style={{ margin: 0 }}>
                    <strong>Licence:</strong> {n.licence}
                  </p>
                  <div className="row" style={{ gap: 24 }}>
                    <div className="stack" style={{ flex: "1 1 240px", gap: 4 }}>
                      <strong className="small">Good</strong>
                      <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
                        {n.pros.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                    <div className="stack" style={{ flex: "1 1 240px", gap: 4 }}>
                      <strong className="small">Watch out</strong>
                      <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
                        {n.watchOuts.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                    {aff ? (
                      <>
                        <a href={aff} rel="sponsored noopener" target="_blank" className="btn btn-primary">
                          Open an account with {n.name}
                        </a>
                        <span className="tiny muted">Affiliate link</span>
                      </>
                    ) : (
                      <a href={n.url} rel="nofollow noopener" target="_blank" className="btn btn-ghost">
                        Visit {n.name}
                      </a>
                    )}
                    <span className="tiny muted">
                      Sources:{" "}
                      {n.sources.map((s, i) => (
                        <span key={s.url}>
                          {i > 0 && ", "}
                          <a href={s.url} rel="noopener" target="_blank">{s.name}</a>
                        </span>
                      ))}{" "}
                      · checked {n.checked}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="notice">
          This is general information, not financial advice. Licences and fees change: check the provider&apos;s own terms and the{" "}
          <a href="https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica" rel="noopener" target="_blank">
            ESMA MiCA register
          </a>{" "}
          before you sign up. New to MiCA? <Link href="/learn/mica-explained">Read our explainer</Link>.
        </section>
      </div>
    </main>
  );
}
