import type { Metadata } from "next";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { getCoin } from "@/lib/coins";
import { direction, formatChange, formatCompactEur, formatNumber, formatPrice } from "@/lib/format";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { SAMPLE_MARKETS } from "@/lib/sample-data";
import { COIN_PROFILES } from "@/content/coin-profiles";
import { CoinBadge } from "@/components/CoinBadge";
import { Converter } from "@/components/Converter";
import { JsonLd } from "@/components/JsonLd";
import { PriceChart } from "@/components/viz/PriceChart";
import { getDict } from "@/i18n/server";

export async function generateStaticParams() {
  // Prerender the coins we have editorial profiles for; others render on first request.
  const ids = new Set([...Object.keys(COIN_PROFILES), ...SAMPLE_MARKETS.map((c) => c.id)]);
  return [...ids].map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/coins/[id]">): Promise<Metadata> {
  const { id } = await params;
  const data = await getCoin(id);
  if (!data) return { title: "Coin not found" };
  const { coin } = data;
  const profile = COIN_PROFILES[id];
  const sym = coin.symbol.toUpperCase();
  return {
    title: `${coin.name} (${sym}) price in EUR: chart and market cap`,
    description: `Live ${coin.name} (${sym}) price in euros, market cap, supply, 7-day chart and a ${sym} to EUR converter. Plain-English guide and FAQs for EU readers.`,
    alternates: { canonical: `/coins/${id}` },
    // Quality gate: only coins with a human-written profile may be indexed.
    robots: site.indexable && profile ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function CoinPage({ params }: PageProps<"/[lang]/coins/[id]">) {
  const { id } = await params;
  const [data, { t, intl }] = await Promise.all([getCoin(id), getDict()]);
  if (!data) notFound();
  const { coin, sample } = data;
  const profile = COIN_PROFILES[id];
  const sym = coin.symbol.toUpperCase();
  const d24 = direction(coin.change24h);
  const d7 = direction(coin.change7d);

  const stats = [
    { label: "Market cap", value: formatCompactEur(coin.marketCap) },
    { label: "24h volume", value: formatCompactEur(coin.volume24h) },
    { label: "Circulating supply", value: `${formatNumber(coin.circulatingSupply)} ${sym}` },
    { label: "Max supply", value: coin.maxSupply ? `${formatNumber(coin.maxSupply)} ${sym}` : "No fixed cap" },
    { label: "All-time high", value: formatPrice(coin.ath) },
    { label: "7d change", value: formatChange(coin.change7d), cls: d7 },
    { label: "Market cap rank", value: coin.rank ? `#${coin.rank}` : "—" },
    { label: "Price currency", value: "EUR" },
  ];

  return (
    <main className="wrap page" style={{ gap: 28, paddingTop: 20 }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Coins", path: "/coins" },
          { name: coin.name, path: `/coins/${id}` },
        ])}
      />
      {profile && <JsonLd data={faqJsonLd(profile.faqs)} />}

      <nav aria-label="Breadcrumb" className="small muted" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/coins">Coins</Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--ink)" }} aria-current="page">
          {coin.name}
        </span>
      </nav>

      <section style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
        <div className="stack" style={{ gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <CoinBadge id={coin.id} name={coin.name} image={coin.image} size={44} />
            <h1 style={{ margin: 0, fontSize: 36 }}>{coin.name} price</h1>
            <span className="mono muted">{sym}</span>
            {coin.rank && <span className="chip tiny" style={{ fontWeight: 600 }}>Rank #{coin.rank}</span>}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 14 }}>
            <span className="mono" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              {formatPrice(coin.price)}
            </span>
            <span className={`mono ${d24}`} style={{ fontSize: 18, fontWeight: 600 }}>
              {formatChange(coin.change24h)} (24h)
            </span>
          </div>
          {sample ? (
            <span className="sample-flag" style={{ alignSelf: "flex-start" }}>Sample data: live prices unavailable</span>
          ) : (
            <span className="tiny muted">Price in EUR. Data: CoinGecko, refreshed about every minute.</span>
          )}
        </div>
      </section>

      {id === "hyperliquid" && (
        <Link href="/hyperliquid" className="card" style={{ background: "var(--mint-bg)", borderColor: "var(--mint-line)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <strong style={{ color: "var(--mint-ink)" }}>Go deeper: the Tickora Hyperliquid hub</strong>
          <span className="small" style={{ color: "var(--mint-ink)" }}>How it works, HIP-3, risks and guides →</span>
        </Link>
      )}

      <div className="row" style={{ alignItems: "flex-start" }}>
        <div className="col-main stack" style={{ gap: 28, flexBasis: 600 }}>
          <section className="stack" style={{ gap: 12 }} aria-labelledby="chart-h">
            <h2 id="chart-h" style={{ margin: 0, fontSize: 18 }}>
              Last 7 days
            </h2>
            <PriceChart data={coin.sparkline} intl={intl} hint={t.viz.chartHint} color={d7 === "down" ? "#b42318" : coin.id === "hyperliquid" ? "#0A5C46" : "#1f4fd8"} />
          </section>

          <section className="stack" style={{ gap: 14 }} aria-labelledby="stats-h">
            <h2 id="stats-h" style={{ margin: 0, fontSize: 22 }}>
              Key statistics
            </h2>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <div className="label">{s.label}</div>
                  <div className={`value ${s.cls ?? ""}`}>{s.value}</div>
                </div>
              ))}
            </div>
          </section>

          {profile ? (
            <>
              <section className="prose stack" aria-labelledby="about-h">
                <h2 id="about-h" style={{ marginTop: 0 }}>
                  What is {coin.name}?
                </h2>
                {profile.summary.map((p) => (
                  <p key={p.slice(0, 24)} style={{ margin: "0 0 12px" }}>
                    {p}
                  </p>
                ))}
                <p className="small muted" style={{ margin: 0 }}>
                  Reviewed by {profile.reviewedBy ?? "[editor, before launch]"} · Last updated {profile.updated}
                </p>
              </section>
              <section className="stack" style={{ maxWidth: 760 }} aria-labelledby="faq-h">
                <h2 id="faq-h" style={{ margin: "0 0 6px", fontSize: 22 }}>
                  {coin.name} FAQ
                </h2>
                {profile.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p style={{ margin: "10px 0 0", color: "var(--ink-2)" }}>{f.a}</p>
                  </details>
                ))}
              </section>
            </>
          ) : (
            <p className="notice">A written guide to {coin.name} is coming. Until then this page shows market data only.</p>
          )}
        </div>

        <aside className="col-side stack" style={{ gap: 20 }}>
          <Converter symbol={coin.symbol} priceEur={coin.price} />
          <section className="card stack" style={{ gap: 10 }} aria-labelledby="buy-h">
            <h2 id="buy-h" style={{ margin: 0, fontSize: 20 }}>
              Where to buy {coin.name}
            </h2>
            <p className="small muted" style={{ margin: 0 }}>
              We&apos;ll list only providers authorised under MiCA in your country, from ESMA&apos;s public register.
            </p>
            <span className="soon" style={{ alignSelf: "flex-start" }}>
              Coming with the MiCA tracker
            </span>
          </section>
        </aside>
      </div>

      <p className="notice">
        Prices are indicative and may be delayed. Nothing on this page is investment advice. Crypto-assets are volatile and you can lose
        all the money you put in. <Link href="/disclaimer">Disclaimer</Link>
      </p>
    </main>
  );
}
