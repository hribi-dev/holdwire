"use client";

import { useMemo, useState } from "react";
import Link from "@/components/Link";
import type { CoinMarket } from "@/lib/coins";
import { direction, formatChange, formatCompactEur, formatPrice } from "@/lib/format";
import { CoinBadge } from "./CoinBadge";
import { Sparkline } from "./Sparkline";

const strokeFor = (pct: number | null) => {
  const d = direction(pct);
  return d === "up" ? "var(--up)" : d === "down" ? "var(--down)" : "#6B7280";
};

export type MarketsLabels = {
  all: string;
  gainers: string;
  fallers: string;
  gainers7d: string;
  large: string;
  mid: string;
  small: string;
  search: string;
  asset: string;
  price: string;
  change24h: string;
  change7d: string;
  marketCap: string;
  volume: string;
  noResults: string;
};

const EN: MarketsLabels = {
  all: "All",
  gainers: "Top gainers",
  fallers: "Top losers",
  gainers7d: "7d gainers",
  large: "Large caps (> €10B)",
  mid: "Mid caps (€1–10B)",
  small: "Small caps (< €1B)",
  search: "Search coins",
  asset: "Asset",
  price: "Price",
  change24h: "24h",
  change7d: "7d",
  marketCap: "Market cap",
  volume: "Volume 24h",
  noResults: "Nothing matches these filters.",
};

type View = "all" | "gainers" | "losers" | "gainers7d";
type Cap = "all" | "large" | "mid" | "small";
type Key = "rank" | "price" | "change24h" | "change7d" | "marketCap" | "volume24h";

/** Sortable, filterable coin table. `compact` hides the controls (homepage). */
export function MarketsTable({ coins, caption, labels = EN, compact = false }: { coins: CoinMarket[]; caption: string; labels?: MarketsLabels; compact?: boolean }) {
  const [view, setView] = useState<View>("all");
  const [cap, setCap] = useState<Cap>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "rank", dir: 1 });

  const rows = useMemo(() => {
    let r = coins;
    const term = q.trim().toLowerCase();
    if (term) r = r.filter((c) => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term));
    if (cap === "large") r = r.filter((c) => (c.marketCap ?? 0) >= 1e10);
    if (cap === "mid") r = r.filter((c) => (c.marketCap ?? 0) >= 1e9 && (c.marketCap ?? 0) < 1e10);
    if (cap === "small") r = r.filter((c) => (c.marketCap ?? 0) < 1e9);
    let key = sort.key;
    let dir = sort.dir;
    if (view === "gainers") {
      r = r.filter((c) => (c.change24h ?? 0) > 0);
      key = "change24h";
      dir = -1;
    } else if (view === "losers") {
      r = r.filter((c) => (c.change24h ?? 0) < 0);
      key = "change24h";
      dir = 1;
    } else if (view === "gainers7d") {
      r = r.filter((c) => (c.change7d ?? 0) > 0);
      key = "change7d";
      dir = -1;
    }
    const v = (c: CoinMarket) => (c[key] ?? (dir === 1 ? Infinity : -Infinity)) as number;
    return [...r].sort((a, b) => (v(a) - v(b)) * dir);
  }, [coins, view, cap, q, sort]);

  const th = (key: Key, label: string) => (
    <th
      scope="col"
      className="sort-th"
      aria-sort={sort.key === key && view === "all" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
      onClick={() => {
        setView("all");
        setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : key === "rank" ? 1 : -1 }));
      }}
    >
      {label}
      {sort.key === key && view === "all" ? (sort.dir === -1 ? " ↓" : " ↑") : ""}
    </th>
  );

  const views: { k: View; label: string }[] = [
    { k: "all", label: labels.all },
    { k: "gainers", label: `▲ ${labels.gainers}` },
    { k: "losers", label: `▼ ${labels.fallers}` },
    { k: "gainers7d", label: labels.gainers7d },
  ];
  const caps: { k: Cap; label: string }[] = [
    { k: "large", label: labels.large },
    { k: "mid", label: labels.mid },
    { k: "small", label: labels.small },
  ];

  return (
    <div className="stack" style={{ gap: 12 }}>
      {!compact && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {views.map((v) => (
            <button key={v.k} type="button" className="chip-btn" aria-pressed={view === v.k} onClick={() => setView(v.k)}>
              {v.label}
            </button>
          ))}
          <span style={{ width: 1, height: 22, background: "var(--line)", margin: "0 4px" }} aria-hidden="true" />
          {caps.map((c) => (
            <button key={c.k} type="button" className="chip-btn" aria-pressed={cap === c.k} onClick={() => setCap(cap === c.k ? "all" : c.k)}>
              {c.label}
            </button>
          ))}
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={labels.search}
            aria-label={labels.search}
            style={{ marginLeft: "auto", width: 200, minHeight: 36 }}
          />
        </div>
      )}
      <div className="table-box">
        <table className="markets">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {compact ? <th scope="col">#</th> : th("rank", "#")}
              <th scope="col">{labels.asset}</th>
              {compact ? <th scope="col">{labels.price}</th> : th("price", labels.price)}
              {compact ? <th scope="col">{labels.change24h}</th> : th("change24h", labels.change24h)}
              {compact ? <th scope="col">{labels.change7d}</th> : th("change7d", labels.change7d)}
              {compact ? <th scope="col">{labels.marketCap}</th> : th("marketCap", labels.marketCap)}
              {!compact && th("volume24h", labels.volume)}
              <th scope="col">7d</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="muted" style={{ textAlign: "center", fontFamily: "var(--font-sans)" }}>
                  {labels.noResults}
                </td>
              </tr>
            )}
            {rows.map((c, i) => (
              <tr key={c.id}>
                <td className="muted">{c.rank ?? i + 1}</td>
                <td className="asset">
                  <Link href={c.id === "hyperliquid" ? "/hyperliquid" : `/coins/${c.id}`} className="asset-link">
                    <CoinBadge id={c.id} name={c.name} image={c.image} />
                    <strong>{c.name}</strong>
                    <span className="muted">{c.symbol.toUpperCase()}</span>
                  </Link>
                </td>
                <td>{formatPrice(c.price)}</td>
                <td className={direction(c.change24h)}>{formatChange(c.change24h)}</td>
                <td className={direction(c.change7d)}>{formatChange(c.change7d)}</td>
                <td>{formatCompactEur(c.marketCap)}</td>
                {!compact && <td>{formatCompactEur(c.volume24h)}</td>}
                <td style={{ width: 120 }}>
                  <Sparkline data={c.sparkline} stroke={strokeFor(c.change7d)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
