import Link from "next/link";
import { Suspense } from "react";
import { getCoin, getTopCoins, type CoinMarket } from "@/lib/coins";
import { listEntries } from "@/lib/content";
import { direction, formatChange, formatPrice } from "@/lib/format";
import { getHyperliquidStats } from "@/lib/hyperliquid";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { CoinBadge } from "@/components/CoinBadge";
import { JsonLd } from "@/components/JsonLd";
import { MarketsTable } from "@/components/MarketsTable";
import { Sparkline } from "@/components/Sparkline";
import { StoryCard } from "@/components/StoryCard";

const usdCompact = (v: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(v);

/* ───────────── Hero: market pulse card ───────────── */
async function MarketPulse() {
  const [{ coins, sample }, hl] = await Promise.all([getTopCoins(50), getHyperliquidStats()]);
  const pick = ["hyperliquid", "bitcoin", "ethereum", "solana"]
    .map((id) => coins.find((c) => c.id === id))
    .filter((c): c is CoinMarket => !!c);
  return (
    <div className="glass stack" style={{ padding: 22, gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
          <span className="live-dot" /> Market pulse
        </span>
        <span className="tiny" style={{ color: "rgba(255,255,255,0.6)" }}>
          {sample ? "Sample data" : "EUR · 24h"}
        </span>
      </div>
      {pick.map((c) => {
        const d = direction(c.change24h);
        return (
          <Link
            key={c.id}
            href={c.id === "hyperliquid" ? "/hyperliquid" : `/coins/${c.id}`}
            style={{ display: "grid", gridTemplateColumns: "auto 1fr 90px auto", alignItems: "center", gap: 12, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <CoinBadge id={c.id} name={c.name} image={c.image} size={30} />
            <span className="stack">
              <strong style={{ fontSize: 15 }}>{c.name}</strong>
              <span className="mono tiny" style={{ color: "rgba(255,255,255,0.6)" }}>
                {c.symbol.toUpperCase()}
              </span>
            </span>
            <span style={{ color: d === "down" ? "#fb923c" : "#34d399" }}>
              <Sparkline data={c.sparkline} width={90} height={28} />
            </span>
            <span className="stack" style={{ alignItems: "flex-end" }}>
              <span className="mono" style={{ fontWeight: 600 }}>{formatPrice(c.price)}</span>
              <span className="mono tiny" style={{ color: d === "down" ? "#fb923c" : "#34d399" }}>
                {formatChange(c.change24h)}
              </span>
            </span>
          </Link>
        );
      })}
      {hl && (
        <Link href="/hyperliquid" className="tiny" style={{ marginTop: 8, padding: "10px 12px", borderRadius: 12, background: "rgba(20,184,166,0.16)", color: "#99f6e4", display: "flex", justifyContent: "space-between" }}>
          <span>Hyperliquid 24h volume</span>
          <strong className="mono">{usdCompact(hl.stats.totalVolume24hUsd)}</strong>
        </Link>
      )}
    </div>
  );
}

/* ───────────── Top movers ───────────── */
async function Movers() {
  const { coins } = await getTopCoins(50);
  const valid = coins.filter((c) => c.change24h != null && !["tether", "usd-coin"].includes(c.id));
  const sorted = [...valid].sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0));
  const gainers = sorted.filter((c) => (c.change24h ?? 0) > 0).slice(0, 4);
  const losers = [...sorted].reverse().filter((c) => (c.change24h ?? 0) < 0).slice(0, 4);
  const col = (title: string, list: CoinMarket[], up: boolean) => (
    <div className="stack" style={{ gap: 10 }}>
      <span className="cat" style={{ color: up ? "var(--up)" : "var(--down)" }}>
        {up ? "▲ Biggest gainers" : "▼ Biggest fallers"}
      </span>
      {list.length === 0 && <span className="small muted">Nothing to show right now.</span>}
      {list.map((c) => (
        <Link key={c.id} href={`/coins/${c.id}`} className="mover">
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CoinBadge id={c.id} name={c.name} image={c.image} />
            <strong>{c.name}</strong>
          </span>
          <span className={`mono ${direction(c.change24h)}`} style={{ fontWeight: 600 }}>
            {formatChange(c.change24h)}
          </span>
        </Link>
      ))}
      <span className="sr-only">{title}</span>
    </div>
  );
  return (
    <div className="movers">
      {col("Gainers", gainers, true)}
      {col("Fallers", losers, false)}
    </div>
  );
}

/* ───────────── Hyperliquid spotlight ───────────── */
async function HypeBand() {
  const [data, hl] = await Promise.all([getCoin("hyperliquid"), getHyperliquidStats()]);
  const coin = data?.coin;
  return (
    <section
      className="reveal"
      style={{ borderRadius: 24, padding: "36px 36px 28px", color: "#fff", background: "radial-gradient(circle at 85% 10%, rgba(94,234,212,0.35), transparent 45%), linear-gradient(135deg, #042f2e, #0f172a 60%, #1e1b4b)" }}
      aria-labelledby="hl-h"
    >
      <div className="row" style={{ gap: 28, alignItems: "flex-end" }}>
        <div className="stack" style={{ flex: "2 1 420px", gap: 12 }}>
          <span className="cat" style={{ color: "#5eead4" }}>Spotlight · Hyperliquid</span>
          <h2 id="hl-h" style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.08 }}>
            The on-chain exchange Wall Street is now chasing
          </h2>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: 17, maxWidth: 560 }}>
            US ETFs, the NYSE owner and Kraken&apos;s parent are all building on it. Live exchange data, how it works and what it means for you in Europe.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
            <Link href="/hyperliquid" className="btn" style={{ background: "#5eead4", color: "#042f2e" }}>
              Open the Hyperliquid hub
            </Link>
            <Link href="/learn/hyperliquid-hip-3-explained" className="btn" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}>
              HIP-3 explained
            </Link>
          </div>
        </div>
        <div className="stack" style={{ flex: "1 1 260px", gap: 4 }}>
          <span className="tiny" style={{ color: "#94a3b8" }}>HYPE / EUR {data?.sample ? "· sample" : ""}</span>
          <span className="mono" style={{ fontSize: 38, fontWeight: 600 }}>{formatPrice(coin?.price)}</span>
          <span className="mono" style={{ color: direction(coin?.change7d) === "down" ? "#fb923c" : "#34d399", fontWeight: 600 }}>
            {formatChange(coin?.change7d)} 7d
          </span>
          {hl && (
            <span className="tiny" style={{ color: "#99f6e4", marginTop: 6 }}>
              Exchange: {usdCompact(hl.stats.totalVolume24hUsd)} 24h volume · {usdCompact(hl.stats.totalOpenInterestUsd)} open interest
            </span>
          )}
        </div>
      </div>
      <div style={{ color: "#5eead4", marginTop: 18 }}>
        <Sparkline data={coin?.sparkline ?? []} width={1000} height={90} strokeWidth={2.5} />
      </div>
    </section>
  );
}

async function Markets() {
  const { coins, sample } = await getTopCoins(50);
  return (
    <>
      <MarketsTable coins={coins.slice(0, 10)} caption="Top cryptocurrencies by market cap, prices in euros" />
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }} className="small">
        <span className="muted">{sample ? <span className="sample-flag">Sample data: live prices unavailable</span> : "Prices in EUR. Data: CoinGecko."}</span>
        <Link href="/coins" style={{ fontWeight: 600, color: "var(--accent)" }}>
          All coins →
        </Link>
      </div>
    </>
  );
}

const explore = [
  { tint: "tint-cyan", color: "#0e7490", label: "Regulation", title: "MiCA licence check", body: "Is your exchange allowed to serve you? Four checks, two minutes.", href: "/learn/mica-explained" },
  { tint: "tint-pink", color: "#be185d", label: "Fintech", title: "Neobanks & payments", body: "Revolut vs Wise vs N26, SEPA Instant and the real cost of sending money home.", href: null },
  { tint: "tint-amber", color: "#b45309", label: "Watches", title: "Watches as assets", body: "Which references hold value, and how the secondary market really moves.", href: null },
  { tint: "tint-violet", color: "#6d28d9", label: "Collectibles", title: "Hard assets beyond crypto", body: "Cards, wine, art and cars: what the indices track, in plain English.", href: null },
];

export default async function Home() {
  const [news, guides] = await Promise.all([listEntries("news"), listEntries("guides")]);
  const [lead, ...moreNews] = news;

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="aurora" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="grid-lines" aria-hidden="true" />
        <div className="wrap row" style={{ padding: "72px 24px 80px", alignItems: "center", gap: 48 }}>
          <div className="stack" style={{ flex: "3 1 480px", gap: 20 }}>
            <span className="glass tiny" style={{ alignSelf: "flex-start", padding: "6px 12px", borderRadius: 999, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="live-dot" /> Live markets · Crypto, fintech &amp; hard assets for Europe
            </span>
            <h1 style={{ margin: 0, fontSize: "clamp(40px, 6.4vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}>
              Money is moving on-chain.
              <br />
              <span className="grad-text">Follow it here.</span>
            </h1>
            <p style={{ margin: 0, fontSize: 19, color: "#cbd5e1", maxWidth: 560 }}>
              Sourced news, live data and plain-English guides, from Hyperliquid and Bitcoin to MiCA, neobanks and watches.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/news" className="btn" style={{ background: "#fff", color: "var(--ink)", minHeight: 50, padding: "0 22px" }}>
                Read the latest
              </Link>
              <Link href="/hyperliquid" className="btn" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff", minHeight: 50, padding: "0 22px" }}>
                Hyperliquid hub →
              </Link>
            </div>
          </div>
          <div style={{ flex: "2 1 340px", minWidth: 0 }}>
            <Suspense fallback={<div className="glass" style={{ height: 320 }} />}>
              <MarketPulse />
            </Suspense>
          </div>
        </div>
      </section>

      <main className="wrap page" style={{ paddingTop: 56 }}>
        {/* ── Latest ── */}
        {lead && (
          <section className="stack" style={{ gap: 24 }} aria-labelledby="latest-h">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
              <h2 id="latest-h" className="section-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="live-dot" /> Latest
              </h2>
              <Link href="/news" style={{ fontWeight: 600, color: "var(--accent)" }}>
                All news →
              </Link>
            </div>
            <div className="row" style={{ gap: 36, alignItems: "flex-start" }}>
              <div style={{ flex: "3 1 520px", minWidth: 0 }}>
                <StoryCard entry={lead} size="lg" />
              </div>
              <div className="stack" style={{ flex: "2 1 320px", gap: 28, minWidth: 0 }}>
                {moreNews.slice(0, 3).map((e) => (
                  <StoryCard key={e.slug} entry={e} size="sm" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Movers ── */}
        <section className="stack reveal" style={{ gap: 18 }} aria-labelledby="movers-h">
          <h2 id="movers-h" className="section-title">
            Today&apos;s movers
          </h2>
          <Suspense fallback={<p className="muted">Loading…</p>}>
            <Movers />
          </Suspense>
        </section>

        {/* ── Hyperliquid ── */}
        <Suspense fallback={<div style={{ height: 320, borderRadius: 24, background: "#0f172a" }} />}>
          <HypeBand />
        </Suspense>

        {/* ── Learn ── */}
        <section id="start-here" className="stack" style={{ gap: 24 }} aria-labelledby="learn-h">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
            <h2 id="learn-h" className="section-title">
              Start here
            </h2>
            <Link href="/learn" style={{ fontWeight: 600, color: "var(--accent)" }}>
              All guides →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
            {guides.slice(0, 3).map((g) => (
              <StoryCard key={g.slug} entry={g} />
            ))}
            <Link href="/glossary" className="tint tint-violet stack reveal" style={{ gap: 10, justifyContent: "flex-end", minHeight: 220 }}>
              <span className="cat" style={{ color: "#6d28d9" }}>Glossary</span>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.15 }}>Funding rates, liquidations, MiCA… explained in a sentence.</strong>
              <span className="small" style={{ color: "#5b21b6" }}>Browse the glossary →</span>
            </Link>
          </div>
        </section>

        {/* ── Markets ── */}
        <section className="stack reveal" style={{ gap: 16 }} aria-labelledby="markets-h">
          <h2 id="markets-h" className="section-title">
            Markets
          </h2>
          <Suspense fallback={<p className="muted">Loading markets…</p>}>
            <Markets />
          </Suspense>
        </section>

        {/* ── Explore ── */}
        <section className="stack" style={{ gap: 20 }} aria-labelledby="explore-h">
          <h2 id="explore-h" className="section-title">
            Beyond crypto
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {explore.map((x) => {
              const inner = (
                <>
                  <span className="cat" style={{ color: x.color }}>
                    {x.label}
                  </span>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: 21, lineHeight: 1.2 }}>{x.title}</strong>
                  <span className="small" style={{ color: "var(--ink-2)" }}>
                    {x.body}
                  </span>
                  <span className="tiny" style={{ color: x.color, fontWeight: 600 }}>
                    {x.href ? "Read →" : "Coming soon"}
                  </span>
                </>
              );
              return x.href ? (
                <Link key={x.title} href={x.href} className={`tint ${x.tint} stack reveal`} style={{ gap: 10 }}>
                  {inner}
                </Link>
              ) : (
                <div key={x.title} className={`tint ${x.tint} stack reveal`} style={{ gap: 10 }}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section id="newsletter" className="gborder reveal" style={{ padding: 32 }}>
          <form className="row" style={{ gap: 24, alignItems: "center" }}>
            <div className="stack" style={{ flex: "1 1 360px", gap: 8 }}>
              <span className="cat grad-text">The Holdwire Brief</span>
              <h2 style={{ margin: 0, fontSize: 28 }}>Five minutes. Every weekday. 7:00 CET.</h2>
              <p className="muted" style={{ margin: 0 }}>
                Markets, crypto and hard assets, with the Hyperliquid numbers that matter.
              </p>
            </div>
            <div className="stack" style={{ flex: "1 1 360px", gap: 8 }}>
              <label htmlFor="nl-email">Email address</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <input id="nl-email" type="email" placeholder="you@example.com" style={{ flex: "1 1 220px", width: "auto" }} disabled />
                <button type="submit" className="btn btn-primary" disabled>
                  Subscribe
                </button>
              </div>
              <span className="tiny muted">Sign-ups open at launch.</span>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
