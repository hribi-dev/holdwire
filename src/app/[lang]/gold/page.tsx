import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/Link";
import { getGoldMarkets } from "@/lib/coins";
import { direction, formatChange, formatPrice } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getDict } from "@/i18n/server";
import { PEOPLE } from "@/content/movers";
import { PAGE_REVIEWS } from "@/content/reviews";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import { RelatedNews } from "@/components/RelatedNews";
import { CompareChart } from "@/components/viz/CompareChart";
import { PriceChart } from "@/components/viz/PriceChart";
import { VoicesGrid } from "@/components/viz/VoicesGrid";

export const metadata: Metadata = {
  title: "Gold price today in euros, and gold vs bitcoin",
  description:
    "Live tokenized gold prices (PAXG, XAUT) in euros, gold against bitcoin over the past week, the ways to own gold in the EU, and the voices worth following.",
  alternates: { canonical: "/gold" },
  robots: PAGE_REVIEWS.gold ? undefined : { index: false, follow: true },
};

const GOLD = "#c9a227";
const BTC = "#f7931a";

/** Sourced context, not live data. Update when gold sets a new record. */
const CONTEXT = {
  recordClose: { usd: 5318, date: "29 January 2026", source: { name: "COMEX settlement data via The Trading Tools", url: "https://www.thetrading.tools/gold-price" } },
  recent: { usd: 4054.45, date: "28 October 2026", source: { name: "StatMuse Money", url: "https://www.statmuse.com/money/ask/gold-price-2026-augustus" } },
};

const WAYS = [
  {
    title: "Bars and coins",
    tint: "tint-amber",
    body: "You own the metal. Investment gold is exempt from VAT across the EU, but you pay a dealer spread and need safe storage or insurance.",
    good: "No issuer or platform between you and the gold",
    watch: "Buy-back spreads, storage, fakes from unknown sellers",
  },
  {
    title: "Exchange-traded gold (ETCs)",
    tint: "tint-cyan",
    body: "Securities backed by gold held in vaults, bought through a normal broker. Easy to buy and sell during market hours.",
    good: "Cheap to trade, no storage hassle",
    watch: "Yearly fees, and you hold a claim, not the metal",
  },
  {
    title: "Tokenized gold (PAXG, XAUT)",
    tint: "tint-violet",
    body: "Crypto tokens where each one represents a troy ounce of gold in a vault: PAX Gold is issued by Paxos, Tether Gold by Tether. They trade around the clock.",
    good: "24/7 trading, small amounts, self-custody possible",
    watch: "Issuer and custodian risk; check the platform is authorised under MiCA",
  },
  {
    title: "Gold futures and perps",
    tint: "tint-pink",
    body: "Some exchanges, including crypto exchanges, offer gold futures and perpetual contracts. You bet on the price; you never own gold.",
    good: "Can go long or short",
    watch: "Leverage and liquidation can wipe out your stake. Not for beginners.",
  },
];

async function Live() {
  const { t, intl } = await getDict();
  const g = await getGoldMarkets();
  const pct = (CONTEXT.recent.usd / CONTEXT.recordClose.usd - 1) * 100;
  const tiles = [
    { label: "PAX Gold (PAXG) · 1 oz", coin: g.paxg },
    ...(g.xaut ? [{ label: "Tether Gold (XAUT) · 1 oz", coin: g.xaut }] : []),
  ];
  return (
    <div className="stack" style={{ gap: 24 }}>
      {g.sample && (
        <span className="sample-flag" style={{ alignSelf: "flex-start" }}>
          {t.common.sample}
        </span>
      )}
      <div className="gold-tiles">
        {tiles.map(({ label, coin }) => (
          <div key={coin.id} className="gold-tile">
            <span className="tiny muted">{label}</span>
            <strong className="mono gold-price">{formatPrice(coin.price)}</strong>
            <span className="small">
              <span className={direction(coin.change24h)}>{formatChange(coin.change24h)}</span> <span className="muted">24h</span> ·{" "}
              <span className={direction(coin.change7d)}>{formatChange(coin.change7d)}</span> <span className="muted">7d</span>
            </span>
          </div>
        ))}
        <div className="gold-tile is-context">
          <span className="tiny muted">Record close (COMEX, USD)</span>
          <strong className="mono gold-price">${CONTEXT.recordClose.usd.toLocaleString("en-US")}</strong>
          <span className="small muted">
            {CONTEXT.recordClose.date}. On {CONTEXT.recent.date} gold was ${CONTEXT.recent.usd.toLocaleString("en-US")}, about {Math.abs(pct).toFixed(0)}% below.
          </span>
        </div>
      </div>

      <section className="card stack" style={{ gap: 10 }} aria-labelledby="gold-chart-h">
        <h2 id="gold-chart-h" style={{ margin: 0, fontSize: 20 }}>
          Gold (PAXG), last 7 days, in euros
        </h2>
        <PriceChart data={g.paxg.sparkline} intl={intl} hint={t.viz.chartHint} color={GOLD} />
      </section>

      {g.btc && (
        <section className="card stack" style={{ gap: 10 }} aria-labelledby="gold-btc-h">
          <h2 id="gold-btc-h" style={{ margin: 0, fontSize: 20 }}>
            Gold vs bitcoin this week
          </h2>
          <p className="small muted" style={{ margin: 0 }}>
            Both start at 0% seven days ago, so you can compare the moves directly. Bitcoin usually swings far more than gold.
          </p>
          <CompareChart
            hint={t.viz.chartHint}
            series={[
              { label: "Gold (PAXG)", color: GOLD, data: g.paxg.sparkline },
              { label: "Bitcoin", color: BTC, data: g.btc.sparkline },
            ]}
          />
        </section>
      )}
      <p className="tiny muted" style={{ margin: 0 }}>
        Live prices: CoinGecko, for tokenized gold, which tracks the gold price closely but can differ slightly. Context figures:{" "}
        <a href={CONTEXT.recordClose.source.url} rel="noopener" target="_blank">
          {CONTEXT.recordClose.source.name}
        </a>
        ,{" "}
        <a href={CONTEXT.recent.source.url} rel="noopener" target="_blank">
          {CONTEXT.recent.source.name}
        </a>
        .
      </p>
    </div>
  );
}

export default async function GoldPage() {
  const { t, intl } = await getDict();
  const m = t.pages.movers;
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gold", path: "/gold" }])} />
      <section className="gold-hero">
        <div className="gold-hero-shine" aria-hidden="true" />
        <div className="wrap stack" style={{ gap: 14, padding: "56px 24px 48px", position: "relative" }}>
          <span className="cat" style={{ color: "#f3d98b" }}>
            Gold · Live{PAGE_REVIEWS.gold ? "" : " · Draft, awaiting editor review"}
          </span>
          <h1 style={{ margin: 0, fontSize: "clamp(34px, 5.4vw, 60px)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "#fff" }}>
            Gold, live in euros, next to bitcoin
          </h1>
          <p style={{ margin: 0, fontSize: 18, maxWidth: 680, color: "#e7dcc0" }}>
            The oldest store of value against the newest. Live tokenized gold prices, how gold moved against bitcoin this week, and the ways to own gold in the EU.
          </p>
        </div>
      </section>

      <div className="wrap stack" style={{ gap: 48, paddingTop: 36, paddingBottom: 64 }}>
        <Suspense fallback={<p className="muted">{t.common.loading}</p>}>
          <Live />
        </Suspense>

        <section className="stack" style={{ gap: 16 }} aria-labelledby="ways-h">
          <h2 id="ways-h" className="section-title">
            Ways to own gold in the EU
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
            {WAYS.map((w) => (
              <article key={w.title} className={`tint ${w.tint} stack`} style={{ gap: 10 }}>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>{w.title}</strong>
                <p style={{ margin: 0, color: "var(--ink-2)" }}>{w.body}</p>
                <p className="small" style={{ margin: 0 }}>
                  <strong>Good:</strong> {w.good}
                  <br />
                  <strong>Watch out:</strong> {w.watch}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="stack" style={{ gap: 12 }} aria-labelledby="gold-voices-h">
          <h2 id="gold-voices-h" className="section-title">
            Gold vs bitcoin: voices worth following
          </h2>
          <p className="muted" style={{ margin: 0, maxWidth: 720 }}>
            People who argue about gold and bitcoin in public, from both sides. More on the <Link href="/movers">market movers</Link> page.
          </p>
          <VoicesGrid people={PEOPLE} intl={intl} only="Gold" labels={{ all: m.focusAll, latestTake: m.latestTake, follow: m.follow }} />
        </section>

        <RelatedNews categories={["Gold"]} title="Latest gold news" />

        <AdSlot placement="gold" />

        <section className="stack" style={{ gap: 8 }}>
          <span className="small gold-also">
            Also on Tickora: <Link href="/watches">watches as assets</Link> · <Link href="/collectibles">collectibles</Link> · <Link href="/coins/bitcoin">bitcoin price</Link>
          </span>
          <p className="notice" style={{ margin: 0 }}>
            Gold and crypto prices can fall as well as rise. Nothing on this page is investment advice. <Link href="/disclaimer">Disclaimer</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
