import type { Metadata } from "next";
import Link from "next/link";
import { getCoin } from "@/lib/coins";
import { direction, formatChange, formatCompactEur, formatNumber, formatPrice } from "@/lib/format";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { COIN_PROFILES } from "@/content/coin-profiles";
import { Converter } from "@/components/Converter";
import { JsonLd } from "@/components/JsonLd";
import { Sparkline } from "@/components/Sparkline";

export const metadata: Metadata = {
  title: "Hyperliquid hub: HYPE price, how it works, HIP-3 and guides",
  description:
    "Everything on Hyperliquid in one place: live HYPE price in euros, how HyperCore and HyperEVM work, HIP-3 and HIP-4 markets, staking, risks and plain-English guides for EU readers.",
  alternates: { canonical: "/hyperliquid" },
};

const MINT = "#0A5C46";
const MINT_SOFT = "#E4F7F1";

const pillars = [
  {
    title: "HyperCore",
    body: "The trading engine. On-chain order books for perpetual futures and spot, with margin and liquidations settled every block.",
  },
  {
    title: "HyperEVM",
    body: "An Ethereum-compatible smart-contract layer on the same chain. Apps can read HyperCore prices and balances directly, without external oracles.",
  },
  {
    title: "HYPE",
    body: "The network token: staked with validators, used for gas on HyperEVM, and bought back with protocol fees. Supply capped at 1 billion.",
  },
];

const upgrades = [
  { code: "HIP-3", title: "Builder-deployed perpetuals", body: "Lets outside teams launch their own perpetual markets on HyperCore by staking HYPE." },
  { code: "HIP-4", title: "Outcome markets", body: "Brings prediction-style contracts, such as markets on economic data releases, to the chain." },
];

const timeline = [
  {
    date: "May 2026",
    text: "Bitwise (BHYP, NYSE) and 21Shares (THYP, Nasdaq) launch the first US-listed Hyperliquid ETFs.",
    source: "https://www.theblock.co/post/403234/grayscale-sets-0-29-fee-hyperliquid-etf-undercutting-bitwise-21shares",
    sourceName: "The Block",
  },
  {
    date: "3 Jun 2026",
    text: "Grayscale lists the Hyperliquid Staking ETF (HYPG) on Nasdaq with a 0.29% fee, the lowest among US Hyperliquid products.",
    source: "https://www.theblock.co/post/403428/grayscale-behind-hype-launc",
    sourceName: "The Block",
  },
  {
    date: "29 Oct 2026",
    text: "ICE, owner of the New York Stock Exchange, takes a minority stake in trade.xyz, the largest market builder on Hyperliquid, and plans a US market for Hyperliquid-based perpetuals, subject to CFTC approval.",
    source: "https://www.bankless.com/read/news/nyse-owner-druckenmiller-back-trade-xyz-hyperliquid-perps-us",
    sourceName: "Bankless",
  },
];

const guides = [
  "How to use Hyperliquid from the EU, step by step",
  "HYPE staking explained: validators, rewards and risks",
  "HIP-3 explained: who can launch markets and why it matters",
  "Hyperliquid vs centralised exchanges: fees, speed and custody",
  "Liquidations on Hyperliquid: how they work and how to avoid them",
  "Hyperliquid vaults explained",
];

export default async function HyperliquidHub() {
  const data = await getCoin("hyperliquid");
  const profile = COIN_PROFILES.hyperliquid;
  const coin = data?.coin ?? null;
  const sample = data?.sample ?? true;

  return (
    <main className="wrap page" style={{ gap: 40, paddingTop: 20 }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Hyperliquid", path: "/hyperliquid" },
        ])}
      />
      <JsonLd data={faqJsonLd(profile.faqs)} />

      <nav aria-label="Breadcrumb" className="small muted" style={{ display: "flex", gap: 8 }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--ink)" }} aria-current="page">
          Hyperliquid
        </span>
      </nav>

      <section style={{ background: "var(--ink)", color: "#fff", borderRadius: 18, padding: "36px 36px 28px" }} className="stack">
        <div className="row" style={{ gap: 28, alignItems: "flex-end" }}>
          <div className="stack" style={{ flex: "2 1 480px", gap: 12 }}>
            <span className="eyebrow" style={{ color: "#7EE8C9" }}>
              Holdwire spotlight
            </span>
            <h1 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.05 }}>Hyperliquid, explained and tracked</h1>
            <p style={{ margin: 0, fontSize: 18, color: "var(--night-text)", maxWidth: 620 }}>
              The on-chain exchange that became crypto&apos;s main venue for perpetual futures. Live HYPE data, how the system works, and what it
              means for you in Europe.
            </p>
          </div>
          <div className="stack" style={{ flex: "1 1 280px", gap: 6 }}>
            <span className="tiny" style={{ color: "var(--night-muted)" }}>
              HYPE price
            </span>
            <span className="mono" style={{ fontSize: 40, fontWeight: 600 }}>
              {formatPrice(coin?.price)}
            </span>
            <span className="mono" style={{ fontWeight: 600, color: direction(coin?.change24h) === "down" ? "var(--down-on-dark)" : "var(--up-on-dark)" }}>
              {formatChange(coin?.change24h)} (24h)
            </span>
            {sample && (
              <span className="sample-flag" style={{ alignSelf: "flex-start" }}>
                Sample data: live prices unavailable
              </span>
            )}
          </div>
        </div>
        {coin && coin.sparkline.length > 1 && (
          <div style={{ color: "#7EE8C9", marginTop: 20 }}>
            <Sparkline data={coin.sparkline} width={1000} height={120} strokeWidth={2.5} label="HYPE price over the last 7 days" />
          </div>
        )}
      </section>

      <section className="stack" style={{ gap: 14 }} aria-labelledby="glance-h">
        <h2 id="glance-h" className="section-title">
          At a glance
        </h2>
        <div className="stats">
          <div className="stat">
            <div className="label">Market cap</div>
            <div className="value">{formatCompactEur(coin?.marketCap)}</div>
          </div>
          <div className="stat">
            <div className="label">24h volume (HYPE token)</div>
            <div className="value">{formatCompactEur(coin?.volume24h)}</div>
          </div>
          <div className="stat">
            <div className="label">7d change</div>
            <div className={`value ${direction(coin?.change7d)}`}>{formatChange(coin?.change7d)}</div>
          </div>
          <div className="stat">
            <div className="label">Max supply</div>
            <div className="value">1,000,000,000 HYPE</div>
          </div>
          <div className="stat">
            <div className="label">Circulating supply</div>
            <div className="value">{coin?.circulatingSupply ? `${formatNumber(coin.circulatingSupply)} HYPE` : "—"}</div>
          </div>
          <div className="stat">
            <div className="label">Market cap rank</div>
            <div className="value">{coin?.rank ? `#${coin.rank}` : "—"}</div>
          </div>
          <div className="stat">
            <div className="label">Token launch</div>
            <div className="value">Nov 2024</div>
          </div>
          <div className="stat">
            <div className="label">Exchange stats</div>
            <div className="value" style={{ fontSize: 13 }}>
              <span className="soon">Coming: volume, OI, fees</span>
            </div>
          </div>
        </div>
        <p className="tiny muted" style={{ margin: 0 }}>
          {sample ? "Sample figures." : "Token data: CoinGecko, in EUR."} Exchange-level data (trading volume, open interest, fees, buybacks) will come
          from Hyperliquid&apos;s public API.
        </p>
      </section>

      <section className="stack" style={{ gap: 16 }} aria-labelledby="why-h">
        <div className="stack" style={{ gap: 6 }}>
          <h2 id="why-h" className="section-title">
            Why Wall Street is paying attention
          </h2>
          <p className="muted" style={{ margin: 0, maxWidth: 760 }}>
            US institutions have moved fast on Hyperliquid this year. Hyperliquid&apos;s own app is still closed to US users; the new US access
            comes through ETFs and regulated partners.
          </p>
        </div>
        <ol className="stack" style={{ listStyle: "none", margin: 0, padding: 0, gap: 0 }}>
          {timeline.map((t) => (
            <li key={t.date} style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", padding: "14px 0", borderTop: "1px solid var(--line)" }}>
              <span className="mono" style={{ flex: "0 0 120px", fontWeight: 600, color: MINT }}>
                {t.date}
              </span>
              <span style={{ flex: "1 1 420px" }}>
                {t.text}{" "}
                <a href={t.source} className="small" style={{ color: "var(--accent)" }} target="_blank" rel="noopener">
                  {t.sourceName}
                </a>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="stack" style={{ gap: 16 }} aria-labelledby="how-h">
        <h2 id="how-h" className="section-title">
          How Hyperliquid works
        </h2>
        <div className="cards">
          {pillars.map((p) => (
            <div key={p.title} className="card stack" style={{ gap: 8, borderTop: `4px solid ${MINT}` }}>
              <strong style={{ fontSize: 20, fontFamily: "var(--font-display)" }}>{p.title}</strong>
              <span style={{ color: "var(--ink-2)" }}>{p.body}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="row" style={{ alignItems: "flex-start" }}>
        <div className="col-main stack" style={{ gap: 32 }}>
          <section className="prose" aria-labelledby="what-h">
            <h2 id="what-h" style={{ marginTop: 0 }}>
              What is Hyperliquid?
            </h2>
            {profile.summary.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="small muted">
              Reviewed by {profile.reviewedBy ?? "[editor, before launch]"} · Last updated {profile.updated}
            </p>
          </section>

          <section className="stack" style={{ gap: 12 }} aria-labelledby="upg-h">
            <h2 id="upg-h" style={{ margin: 0, fontSize: 24 }}>
              Upgrades to know
            </h2>
            {upgrades.map((u) => (
              <div key={u.code} className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span className="mono" style={{ background: MINT_SOFT, color: MINT, fontWeight: 700, padding: "4px 10px", borderRadius: 8, flex: "none" }}>
                  {u.code}
                </span>
                <div className="stack" style={{ gap: 4 }}>
                  <strong>{u.title}</strong>
                  <span className="muted">{u.body}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="stack" style={{ gap: 4 }} aria-labelledby="guides-h">
            <h2 id="guides-h" style={{ margin: "0 0 8px", fontSize: 24 }}>
              Hyperliquid guides
            </h2>
            <div className="link-list">
              {guides.map((g) => (
                <div key={g}>
                  {g} <span className="soon">Soon</span>
                </div>
              ))}
            </div>
          </section>

          <section className="stack" aria-labelledby="faq-h">
            <h2 id="faq-h" style={{ margin: "0 0 6px", fontSize: 24 }}>
              Hyperliquid FAQ
            </h2>
            {profile.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p style={{ margin: "10px 0 0", color: "#374151" }}>{f.a}</p>
              </details>
            ))}
          </section>
        </div>

        <aside className="col-side stack" style={{ gap: 20 }}>
          <Converter symbol="hype" priceEur={coin?.price ?? null} />
          <section className="card stack" style={{ gap: 10, background: "#FFF7ED", borderColor: "#FED7AA" }} aria-labelledby="risk-h">
            <h2 id="risk-h" style={{ margin: 0, fontSize: 18 }}>
              Know the risks
            </h2>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)", fontSize: 15 }}>
              <li>Perpetual futures use leverage. Positions can be liquidated and you can lose your whole deposit quickly.</li>
              <li>Hyperliquid is not authorised under MiCA. EU consumer protections for licensed providers don&apos;t apply.</li>
              <li>HYPE is volatile, and new tokens are released to contributors on a schedule.</li>
            </ul>
          </section>
          <Link href="/coins/hyperliquid" className="card stack" style={{ gap: 4 }}>
            <strong>HYPE price page →</strong>
            <span className="small muted">Price, chart, stats and converter.</span>
          </Link>
        </aside>
      </div>

      <p className="notice">
        Prices are indicative and may be delayed. Nothing on this page is investment advice. <Link href="/disclosures">Disclosures</Link> ·{" "}
        <Link href="/disclaimer">Disclaimer</Link>
      </p>
    </main>
  );
}
