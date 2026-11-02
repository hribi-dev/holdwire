import Link from "next/link";
import { Suspense } from "react";
import { getCoin, getTopCoins } from "@/lib/coins";
import { direction, formatChange, formatPrice } from "@/lib/format";
import { Sparkline } from "@/components/Sparkline";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { MarketsTable } from "@/components/MarketsTable";
import { JsonLd } from "@/components/JsonLd";

const startHere = [
  { kind: "Guide", title: "Best MiCA-licensed exchanges in Europe", dek: "Ranked by licence, fees and country coverage." },
  { kind: "Guide", title: "Hardware vs software wallets", dek: "What to use for €100, €10,000 and more." },
  { kind: "Guide", title: "MiCA explained for crypto users", dek: "What the EU rules protect, and what to check." },
  { kind: "Tool", title: "DCA calculator", dek: "See what regular buying would have returned." },
];

const verticals = [
  { id: "fintech", title: "Fintech", items: ["Revolut vs Wise vs N26 for EU users", "SEPA Instant: what changes for your transfers", "CEE fintech funding tracker"] },
  { id: "watches", title: "Watches", items: ["Secondary watch market report", "Retail vs resale: which references hold value", "How to check a pre-owned watch before you buy"] },
  { id: "collectibles", title: "Collectibles", items: ["Trading cards as an asset class", "Fine wine, art, cars: what the indices track", "Tokenised collectibles: real ownership or not?"] },
];

async function HypeSpotlight() {
  const data = await getCoin("hyperliquid");
  const coin = data?.coin;
  return (
    <Link
      href="/hyperliquid"
      aria-label="Hyperliquid hub"
      style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16, minHeight: 320, borderRadius: "var(--radius)", background: "var(--ink)", color: "#fff", padding: 28 }}
    >
      <span style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "baseline" }}>
        <span className="mono" style={{ color: "#7EE8C9", fontWeight: 600 }}>HYPE / EUR</span>
        {data?.sample && <span className="sample-flag">Sample data</span>}
      </span>
      <span style={{ color: "#7EE8C9" }}>
        <Sparkline data={coin?.sparkline ?? []} width={600} height={150} strokeWidth={3} />
      </span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 40, fontWeight: 600 }}>{formatPrice(coin?.price)}</span>
        <span className="mono" style={{ fontWeight: 600, color: direction(coin?.change24h) === "down" ? "var(--down-on-dark)" : "var(--up-on-dark)" }}>
          {formatChange(coin?.change24h)} 24h · {formatChange(coin?.change7d)} 7d
        </span>
      </span>
    </Link>
  );
}

async function Markets() {
  const { coins, sample } = await getTopCoins(50);
  return (
    <>
      <MarketsTable coins={coins.slice(0, 10)} caption="Top cryptocurrencies by market cap, prices in euros" />
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }} className="small">
        <span className="muted">
          {sample ? (
            <span className="sample-flag">Sample data: live prices unavailable</span>
          ) : (
            "Prices in EUR. Data: CoinGecko."
          )}
        </span>
        <Link href="/coins" style={{ fontWeight: 600, color: "var(--accent)" }}>
          All coins →
        </Link>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="wrap page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <h1 className="sr-only">Holdwire: crypto prices, fintech and hard assets for Europe</h1>

      <section className="row" aria-label="Featured">
        <article className="col-main stack" style={{ gap: 16 }}>
          <Suspense fallback={<div style={{ height: 320, borderRadius: "var(--radius)", background: "var(--ink)" }} />}>
            <HypeSpotlight />
          </Suspense>
          <span className="eyebrow">Spotlight · Hyperliquid</span>
          <h2 style={{ margin: 0, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.08 }}>
            <Link href="/hyperliquid">Hyperliquid, explained and tracked: the on-chain exchange everyone trades on</Link>
          </h2>
          <p style={{ margin: 0, fontSize: 18, color: "#374151" }}>
            Live HYPE data, how HyperCore and HyperEVM work, HIP-3 markets, and what using it means for you in Europe.
          </p>
          <div>
            <Link href="/hyperliquid" className="btn btn-primary">
              Open the Hyperliquid hub
            </Link>
          </div>
        </article>
        <aside className="col-side stack">
          <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>Live prices</h2>
          <div className="headline-list">
            <Link href="/coins/hyperliquid">
              <span className="tiny muted">Price page</span>
              <strong>Hyperliquid (HYPE) price today, in euros</strong>
            </Link>
            <Link href="/coins/bitcoin">
              <span className="tiny muted">Price page</span>
              <strong>Bitcoin price today, in euros</strong>
            </Link>
            <Link href="/coins/ethereum">
              <span className="tiny muted">Price page</span>
              <strong>Ethereum price today, in euros</strong>
            </Link>
            <Link href="/coins/solana">
              <span className="tiny muted">Price page</span>
              <strong>Solana price today, in euros</strong>
            </Link>
            <Link href="/coins">
              <span className="tiny muted">Markets</span>
              <strong>Top 50 cryptocurrencies by market cap</strong>
            </Link>
          </div>
        </aside>
      </section>

      <section className="stack" style={{ gap: 16 }} aria-labelledby="markets-h">
        <h2 id="markets-h" className="section-title">
          Markets
        </h2>
        <Suspense fallback={<p className="muted">Loading markets…</p>}>
          <Markets />
        </Suspense>
      </section>

      <section className="band" aria-labelledby="mica-h">
        <div className="stack" style={{ flex: "1 1 420px", gap: 14 }}>
          <span className="eyebrow">Holdwire data</span>
          <h2 id="mica-h" style={{ margin: 0, fontSize: 36 }}>
            MiCA licence tracker
          </h2>
          <p style={{ margin: 0, fontSize: 17 }}>Check whether an exchange can legally serve you in your EU country before you sign up.</p>
          <div>
            <span className="soon" style={{ background: "var(--night-2)", color: "var(--night-text)" }}>
              Launching soon
            </span>
          </div>
        </div>
        <div className="band-stats">
          <div className="band-stat">
            <div className="mono" style={{ fontSize: 26, fontWeight: 600 }}>EU-wide</div>
            <div className="tiny" style={{ color: "var(--night-text)" }}>all member states</div>
          </div>
          <div className="band-stat">
            <div className="mono" style={{ fontSize: 26, fontWeight: 600 }}>Daily</div>
            <div className="tiny" style={{ color: "var(--night-text)" }}>ESMA register sync</div>
          </div>
          <div className="band-stat">
            <div className="mono" style={{ fontSize: 26, fontWeight: 600 }}>Free</div>
            <div className="tiny" style={{ color: "var(--night-text)" }}>to use and cite</div>
          </div>
        </div>
      </section>

      <section id="start-here" className="stack" style={{ gap: 20 }} aria-labelledby="start-h">
        <h2 id="start-h" className="section-title">
          Start here
        </h2>
        <div className="cards">
          {startHere.map((c) => (
            <div key={c.title} className="card stack" style={{ gap: 10 }}>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="eyebrow">{c.kind}</span>
                <span className="soon">Soon</span>
              </span>
              <strong style={{ fontSize: 18, lineHeight: 1.3 }}>{c.title}</strong>
              <span className="small muted">{c.dek}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="row" aria-label="Coverage areas">
        {verticals.map((v) => (
          <div key={v.id} id={v.id} className="stack" style={{ flex: "1 1 300px" }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>{v.title}</h2>
            <div className="link-list">
              {v.items.map((t) => (
                <div key={t}>
                  {t} <span className="soon">Soon</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="newsletter" className="row" style={{ gap: 24 }}>
        <form className="stack" style={{ flex: "1 1 420px", gap: 12, background: "var(--accent-soft)", borderRadius: "var(--radius)", padding: 24 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>The Holdwire Brief</h2>
          <p style={{ margin: 0, color: "#374151" }}>Markets, crypto and hard assets in five minutes. Weekdays, 7:00 CET.</p>
          <label htmlFor="nl-email">Email address</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <input id="nl-email" type="email" placeholder="you@example.com" style={{ flex: "1 1 220px", width: "auto" }} disabled />
            <button type="submit" className="btn btn-primary" disabled>
              Subscribe
            </button>
          </div>
          <span className="tiny muted">Sign-ups open at launch.</span>
        </form>
      </section>
    </main>
  );
}
