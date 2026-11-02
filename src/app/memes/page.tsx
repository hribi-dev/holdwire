import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getMemeFeed, MIN_LIQUIDITY_USD } from "@/lib/memes";
import { formatAge, isPumpDex, type MemePool } from "@/lib/memes-parse";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";

const REVIEWED_BY: string | null = null;

export const metadata: Metadata = {
  title: "Memecoins: trending on Solana, Base and BNB Chain, plus pump.fun graduates",
  description:
    "Live trending memecoin pools across Solana, Base and BNB Chain, pump.fun tokens trading on PumpSwap, and plain-English explainers on launchpads, apps and the risks.",
  alternates: { canonical: "/memes" },
  robots: REVIEWED_BY ? undefined : { index: false, follow: true },
};

const LIME = "#4d7c0f";
const NETWORK_LABEL: Record<string, string> = { solana: "Solana", base: "Base", bsc: "BNB Chain" };

const usd = (n: number | null) => {
  if (n === null) return "–";
  if (n >= 1) return n.toLocaleString("en-US", { style: "currency", currency: "USD", notation: n >= 1e5 ? "compact" : "standard", maximumFractionDigits: 2 });
  return "$" + n.toPrecision(3);
};

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

export default function Memes() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Memes", path: "/memes" }])} />
      <section className="tint tint-mint" style={{ borderRadius: 0, padding: 0, background: "linear-gradient(140deg,#f7fee7,#d9f99d)" }}>
        <div className="wrap stack" style={{ gap: 14, padding: "56px 24px 44px" }}>
          <span className="cat" style={{ color: LIME }}>Memes · Live</span>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            What&apos;s moving in memecoins
          </h1>
          <p style={{ margin: 0, fontSize: 18, maxWidth: 700, color: "var(--ink-2)" }}>
            Trending pools on Solana, Base and BNB Chain, refreshed every few minutes. We drop anything with under{" "}
            ${(MIN_LIQUIDITY_USD / 1000).toFixed(0)}k of liquidity, and we never rank by who paid.
          </p>
          <p className="notice" role="note" style={{ margin: 0, maxWidth: 700, background: "#fff", color: "var(--ink)" }}>
            <strong>Read this first:</strong> most memecoins go to zero, many within days. Trending means people are trading it, not that
            it&apos;s safe. Prices can be pushed around by a few wallets. This is data, not a recommendation, and we don&apos;t link to
            buy anything here.
          </p>
          <span className="tiny muted">
            Data: <a href="https://www.geckoterminal.com" rel="noopener" target="_blank">GeckoTerminal</a>
            {REVIEWED_BY ? ` · Reviewed by ${REVIEWED_BY}` : " · Draft, awaiting editor review"}
          </span>
        </div>
      </section>

      <div className="wrap stack" style={{ gap: 44, paddingTop: 40, paddingBottom: 64 }}>
        <Suspense fallback={<p className="muted">Loading live pools…</p>}>
          <MemeTables />
        </Suspense>

        <section className="stack" style={{ gap: 16 }}>
          <h2 className="section-title">Where memecoins live</h2>
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

        <section className="tint stack" style={{ gap: 10, background: "linear-gradient(140deg,#f7fee7,#ecfccb)" }}>
          <span className="cat" style={{ color: LIME }}>Before you touch a memecoin</span>
          <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 4 }}>
            <li>Check who holds the supply. A few wallets holding most of it can dump on everyone else.</li>
            <li>Check liquidity, not just market cap. Thin liquidity means you may not be able to sell.</li>
            <li>Check whether minting and freezing are disabled on the token contract.</li>
            <li>Only use money you are fully prepared to lose.</li>
          </ul>
          <span className="small">
            Terms you&apos;ll meet: <Link href="/glossary">glossary</Link>.
          </span>
        </section>

        <p className="notice" style={{ margin: 0 }}>
          Disclosure: Holdwire&apos;s founder works with Solana projects HumidiFi and Harmonic. Pools on those venues can appear in this data;
          they are ranked the same way as everything else. Not investment advice.
        </p>
      </div>
    </main>
  );
}

async function MemeTables() {
  const { pools, sample } = await getMemeFeed();
  const byVolume = (a: MemePool, b: MemePool) => b.volume24hUsd - a.volume24hUsd;
  const sol = pools.filter((p) => p.network === "solana").sort(byVolume).slice(0, 15);
  const pump = pools.filter((p) => isPumpDex(p.dex)).sort(byVolume).slice(0, 10);
  const other = pools.filter((p) => p.network !== "solana").sort(byVolume).slice(0, 10);
  return (
    <>
      {sample && (
        <p className="notice" style={{ margin: 0 }}>
          Sample data: live pool data is unavailable right now, so these numbers are placeholders.
        </p>
      )}
      <PoolTable id="solana" title="Trending on Solana" pools={sol} />
      <PoolTable id="pumpfun" title="pump.fun tokens on PumpSwap" note="Tokens that graduated from pump.fun's bonding curve and now trade on its DEX." pools={pump} />
      <PoolTable id="base-bnb" title="Trending on Base and BNB Chain" pools={other} />
    </>
  );
}

function PoolTable({ id, title, note, pools }: { id: string; title: string; note?: string; pools: MemePool[] }) {
  return (
    <section className="stack" style={{ gap: 12 }} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="section-title">{title}</h2>
      {note && <p className="small muted" style={{ margin: 0 }}>{note}</p>}
      {pools.length === 0 ? (
        <p className="small muted">Nothing above our liquidity floor right now.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr className="tiny muted" style={{ textAlign: "right" }}>
                <th style={{ textAlign: "left", padding: "8px 6px" }}>Token</th>
                <th style={{ padding: "8px 6px" }}>Price</th>
                <th style={{ padding: "8px 6px" }}>24h</th>
                <th style={{ padding: "8px 6px" }}>Volume 24h</th>
                <th style={{ padding: "8px 6px" }}>Liquidity</th>
                <th style={{ padding: "8px 6px" }}>Mcap</th>
                <th style={{ padding: "8px 6px" }}>Age</th>
                <th style={{ padding: "8px 6px" }}>Buys / sells</th>
              </tr>
            </thead>
            <tbody>
              {pools.map((p) => {
                const young = p.ageHours !== null && p.ageHours < 24;
                return (
                  <tr key={p.id} style={{ borderTop: "1px solid var(--line)", textAlign: "right" }}>
                    <td style={{ textAlign: "left", padding: "10px 6px" }}>
                      <a href={p.url} rel="nofollow noopener" target="_blank" style={{ fontWeight: 700 }}>{p.symbol}</a>{" "}
                      <span className="tiny muted">{NETWORK_LABEL[p.network] ?? p.network} · {p.dex}</span>
                      {young && (
                        <span className="tiny" style={{ marginLeft: 6, padding: "2px 6px", borderRadius: 6, background: "#fef3c7", color: "#92400e", fontWeight: 700 }}>
                          New
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "10px 6px", fontFamily: "var(--font-mono)" }}>{usd(p.priceUsd)}</td>
                    <td style={{ padding: "10px 6px", color: p.change24h === null ? undefined : p.change24h >= 0 ? "#15803d" : "#b91c1c" }}>
                      {p.change24h === null ? "–" : `${p.change24h >= 0 ? "▲" : "▼"} ${Math.abs(p.change24h).toFixed(1)}%`}
                    </td>
                    <td style={{ padding: "10px 6px" }}>{usd(p.volume24hUsd)}</td>
                    <td style={{ padding: "10px 6px" }}>{usd(p.liquidityUsd)}</td>
                    <td style={{ padding: "10px 6px" }}>{usd(p.marketCapUsd)}</td>
                    <td style={{ padding: "10px 6px" }}>{formatAge(p.ageHours)}</td>
                    <td style={{ padding: "10px 6px" }} className="tiny">{p.buys24h.toLocaleString("en-US")} / {p.sells24h.toLocaleString("en-US")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
