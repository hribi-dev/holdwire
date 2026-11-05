import type { Metadata } from "next";
import Link from "@/components/Link";
import { Suspense } from "react";
import { getMemeFeed, MIN_LIQUIDITY_USD } from "@/lib/memes";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/dictionaries";
import { MemeExplorer } from "@/components/viz/MemeExplorer";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { RelatedNews } from "@/components/RelatedNews";
import { PAGE_REVIEWS } from "@/content/reviews";

const REVIEWED_BY = PAGE_REVIEWS.memes;

export const metadata: Metadata = {
  title: "Trending memecoins on Solana, Base and BNB Chain",
  description:
    "Live trending memecoin pools across Solana, Base and BNB Chain, pump.fun tokens trading on PumpSwap, and plain-English explainers on launchpads, apps and the risks.",
  alternates: { canonical: "/memes" },
  robots: REVIEWED_BY ? undefined : { index: false, follow: true },
};

const LIME = "#4d7c0f";


const venues = [
  {
    name: "pump.fun",
    kind: "Launchpad · Solana",
    body: "Anyone can create a token in a minute. It trades on a bonding curve first, then moves (\"graduates\") to the PumpSwap DEX once enough is bought.",
    url: "https://pump.fun",
  },
  {
    name: "Fomo",
    kind: "Trading app · Solana, Base, BNB Chain, Monad",
    body: "A social, mobile-first memecoin app where you see what other traders buy. It overtook Axiom in daily Solana trading-terminal volume in mid-2026.",
    url: "https://fomo.family",
  },
  {
    name: "GeckoTerminal & DEX Screener",
    kind: "Data",
    body: "Free trackers that index every DEX pool. Note: DEX Screener's \"boosted\" tokens are paid promotion, not organic interest.",
    url: "https://www.geckoterminal.com",
  },
];

export default async function Memes() {
  const { t } = await getDict();
  const m = t.pages.memes;
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Memes", path: "/memes" }])} />
      <section className="tint tint-mint" style={{ borderRadius: 0, padding: 0, background: "var(--lime-hero)" }}>
        <div className="wrap stack" style={{ gap: 14, padding: "56px 24px 44px" }}>
          <span className="cat" style={{ color: LIME }}>{m.tag}</span>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {m.title}
          </h1>
          <p style={{ margin: 0, fontSize: 18, maxWidth: 700, color: "var(--ink-2)" }}>{fmt(m.lede, { min: `$${(MIN_LIQUIDITY_USD / 1000).toFixed(0)}k` })}</p>
          <p className="notice" role="note" style={{ margin: 0, maxWidth: 700, background: "var(--card)", color: "var(--ink)" }}>
            <strong>{m.warnTitle}</strong> {m.warn}
          </p>
          <span className="tiny muted">
            Data: <a href="https://www.geckoterminal.com" rel="noopener" target="_blank">GeckoTerminal</a>
            {REVIEWED_BY ? ` · Reviewed by ${REVIEWED_BY}` : " · Draft, awaiting editor review"}
          </span>
        </div>
      </section>

      <div className="wrap stack" style={{ gap: 44, paddingTop: 40, paddingBottom: 64 }}>
        <Suspense fallback={<p className="muted">{t.common.loading}</p>}>
          <MemeData />
        </Suspense>

        <section className="stack" style={{ gap: 16 }}>
          <h2 className="section-title">{m.venues}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {venues.map((v) => (
              <a key={v.name} href={v.url} rel="nofollow noopener" target="_blank" className="card stack" style={{ gap: 6 }}>
                <span className="cat" style={{ color: LIME }}>{v.kind}</span>
                <strong style={{ fontSize: 18 }}>{v.name} ↗</strong>
                <span className="small muted">{v.body}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="tint stack" style={{ gap: 10, background: "var(--lime-tint)" }}>
          <span className="cat" style={{ color: LIME }}>{m.before}</span>
          <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 4 }}>
            {m.checklist.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <span className="small">
            <Link href="/glossary">{t.home.glossaryCta}</Link>
          </span>
        </section>

        <RelatedNews categories={["Memes"]} />

        <p className="notice" style={{ margin: 0 }}>
          Disclosure: Tickora&apos;s founder works with Solana projects HumidiFi and Harmonic. Pools on those venues can appear in this data;
          they are ranked the same way as everything else. Not investment advice.
        </p>
      </div>
    </main>
  );
}

async function MemeData() {
  const [{ pools, sample }, { t }] = await Promise.all([getMemeFeed(), getDict()]);
  const v = t.viz;
  const m = t.pages.memes;
  return (
    <section className="stack" style={{ gap: 16 }} aria-label={m.title}>
      {sample && (
        <p className="notice" style={{ margin: 0 }}>
          {t.common.sample}
        </p>
      )}
      <p className="small muted" style={{ margin: 0 }}>{m.pumpNote}</p>
      <MemeExplorer
        pools={pools}
        labels={{
          token: v.token,
          price: v.price,
          change24h: v.change24h,
          volume: v.volume,
          liquidity: v.liquidity,
          marketCap: v.marketCap,
          age: v.age,
          buysSells: v.buysSells,
          all: v.all,
          network: v.network,
          sortBy: v.sortBy,
          newBadge: v.newBadge,
          onlyNew: v.onlyNew,
          noResults: v.noResults,
          bubbles: m.bubbles,
          bubblesNote: m.bubblesNote,
        }}
      />
    </section>
  );
}
