import type { Metadata } from "next";
import Link from "@/components/Link";
import { sponsor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Advertise on Tickora: sponsored articles, press releases, newsletter",
  description: "Reach crypto, fintech and hard-asset readers across Europe. Clearly labelled sponsored articles, press releases and newsletter placements.",
  alternates: { canonical: "/advertise" },
};

const PACKAGES = [
  {
    name: "Sponsored article",
    tint: "tint-violet",
    body: "A full article about your product or research, edited by us for clarity and compliance. Labelled \"Sponsored\" with your name at the top, and kept in our Sponsored section.",
    bullets: ["Published in /sponsored with your name", "Promoted in the newsletter once", "Stays online with its label"],
  },
  {
    name: "Press release",
    tint: "tint-cyan",
    body: "Your announcement published as received after a basic check, in our Press Releases section. Fast turnaround for launches, listings and funding news.",
    bullets: ["Published within 2 working days", "Labelled \"Press release\"", "Kept out of search results"],
  },
  {
    name: "Newsletter spot",
    tint: "tint-mint",
    body: "A short, labelled sponsor block in our newsletter, written in our style so readers actually read it.",
    bullets: ["One sponsor per issue", "Labelled \"Sponsored\"", "Plain text and one link"],
  },
  {
    name: "Section partner",
    tint: "tint-amber",
    body: "A labelled partner slot on one of our hubs, such as Hyperliquid, Memes or Fintech, for a month at a time. It never changes our data, rankings or ratings.",
    bullets: ["One partner per hub", "Labelled \"Partner\"", "Monthly, cancel any time"],
  },
];

export default function AdvertisePage() {
  const mail = sponsor.email ? `mailto:${sponsor.email}?subject=${encodeURIComponent("Advertising on Tickora")}` : null;
  return (
    <main className="page">
      <section className="hero" style={{ padding: "64px 0 56px" }}>
        <div className="aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="wrap stack" style={{ gap: 16, maxWidth: 820 }}>
          <span className="eyebrow" style={{ color: "#a5f3fc" }}>
            Advertise
          </span>
          <h1 style={{ margin: 0, fontSize: "clamp(36px, 5.5vw, 58px)", lineHeight: 1.03, color: "#fff" }}>
            Reach readers who follow crypto and fintech in Europe
          </h1>
          <p style={{ margin: 0, fontSize: 19, color: "#cbd5e1", maxWidth: 640 }}>
            Sponsored articles, press releases and newsletter placements, always clearly labelled. Rates on request.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            {mail ? (
              <a href={mail} className="btn rotator-cta">
                Email us: {sponsor.email}
              </a>
            ) : (
              <span className="btn rotator-cta" aria-disabled="true">
                Contact email coming soon
              </span>
            )}
            <Link href="/advertising-policy" className="btn" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
              Read our advertising policy
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap stack" style={{ gap: 48, paddingTop: 40 }}>
        <section className="stack" style={{ gap: 16 }} aria-labelledby="pk-h">
          <h2 id="pk-h" className="section-title">
            What you can book
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {PACKAGES.map((p) => (
              <article key={p.name} className={`tint ${p.tint} stack`} style={{ gap: 10 }}>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>{p.name}</strong>
                <p style={{ margin: 0, color: "var(--ink-2)" }}>{p.body}</p>
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 4 }} className="small">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="card stack" style={{ gap: 10 }} aria-labelledby="rules-h">
          <h2 id="rules-h" style={{ margin: 0, fontSize: 22 }}>
            The rules, so there are no surprises
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6, color: "var(--ink-2)" }}>
            <li>Every paid piece is labelled, and every paid link carries rel=&quot;sponsored&quot;. We don&apos;t sell links that pass search ranking, and we don&apos;t promise rankings.</li>
            <li>Paying never changes our news coverage, data tables, comparisons or ratings.</li>
            <li>Crypto-asset services aimed at EU readers must be authorised under MiCA. We check.</li>
            <li>We decline guaranteed-return offers, presales built on urgency, anonymous teams without a product, unlicensed brokers and gambling.</li>
            <li>We edit for clarity, accuracy and compliance, and may add risk warnings.</li>
          </ul>
          <p className="small muted" style={{ margin: 0 }}>
            Full details: <Link href="/advertising-policy">advertising policy</Link> · <Link href="/how-we-make-money">how we make money</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
