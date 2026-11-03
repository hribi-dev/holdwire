"use client";

import { useMemo, useState } from "react";
import { formatAge, isPumpDex, type MemePool } from "@/lib/memes-parse";
import { MemeBubbles, NET, NET_COLOR } from "./MemeBubbles";

type Labels = {
  token: string;
  price: string;
  change24h: string;
  volume: string;
  liquidity: string;
  marketCap: string;
  age: string;
  buysSells: string;
  all: string;
  network: string;
  sortBy: string;
  newBadge: string;
  onlyNew: string;
  noResults: string;
  bubbles: string;
  bubblesNote: string;
};

type Filter = "all" | "solana" | "pump" | "base" | "bsc";
type SortKey = "volume24hUsd" | "change24h" | "liquidityUsd" | "marketCapUsd" | "ageHours";


const usd = (n: number | null) => {
  if (n === null) return "–";
  if (n >= 1) return n.toLocaleString("en-US", { style: "currency", currency: "USD", notation: n >= 1e5 ? "compact" : "standard", minimumFractionDigits: n >= 1e5 ? 0 : 2, maximumFractionDigits: 2 });
  return "$" + n.toPrecision(3);
};

export function MemeExplorer({ pools, labels }: { pools: MemePool[]; labels: Labels }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [onlyNew, setOnlyNew] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "volume24hUsd", dir: -1 });
  const [hover, setHover] = useState<MemePool | null>(null);

  const rows = useMemo(() => {
    let r = pools;
    if (filter === "pump") r = r.filter((p) => isPumpDex(p.dex));
    else if (filter !== "all") r = r.filter((p) => p.network === filter);
    if (onlyNew) r = r.filter((p) => p.ageHours !== null && p.ageHours < 24);
    const v = (p: MemePool) => (p[sort.key] ?? -Infinity) as number;
    return [...r].sort((a, b) => (v(a) - v(b)) * sort.dir).slice(0, 25);
  }, [pools, filter, onlyNew, sort]);

  const filters: { k: Filter; label: string }[] = [
    { k: "all", label: labels.all },
    { k: "solana", label: "Solana" },
    { k: "pump", label: "pump.fun" },
    { k: "base", label: "Base" },
    { k: "bsc", label: "BNB Chain" },
  ];

  const th = (key: SortKey, label: string) => (
    <th
      className="sort-th"
      style={{ padding: "8px 6px" }}
      aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
      onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : -1 }))}
    >
      {label} {sort.key === key ? (sort.dir === -1 ? "↓" : "↑") : ""}
    </th>
  );

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }} role="group" aria-label={labels.network}>
        {filters.map((f) => (
          <button key={f.k} type="button" className="chip-btn" aria-pressed={filter === f.k} onClick={() => setFilter(f.k)}>
            {f.label}
          </button>
        ))}
        <label className="small" style={{ display: "inline-flex", gap: 6, alignItems: "center", marginLeft: 8 }}>
          <input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} style={{ width: "auto", minHeight: 0 }} />
          {labels.onlyNew}
        </label>
      </div>

      <MemeBubbles pools={rows} labels={labels} hover={hover} onHover={setHover} />

      {rows.length === 0 ? (
        <p className="small muted">{labels.noResults}</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr className="tiny muted" style={{ textAlign: "right" }}>
                <th style={{ textAlign: "left", padding: "8px 6px" }}>{labels.token}</th>
                <th style={{ padding: "8px 6px" }}>{labels.price}</th>
                {th("change24h", labels.change24h)}
                {th("volume24hUsd", labels.volume)}
                {th("liquidityUsd", labels.liquidity)}
                {th("marketCapUsd", labels.marketCap)}
                {th("ageHours", labels.age)}
                <th style={{ padding: "8px 6px" }}>{labels.buysSells}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const young = p.ageHours !== null && p.ageHours < 24;
                const buyShare = p.buys24h + p.sells24h ? p.buys24h / (p.buys24h + p.sells24h) : 0.5;
                return (
                  <tr
                    key={p.id}
                    style={{ borderTop: "1px solid var(--line)", textAlign: "right", background: hover?.id === p.id ? "var(--surface)" : undefined }}
                    onMouseEnter={() => setHover(p)}
                  >
                    <td style={{ textAlign: "left", padding: "10px 6px" }}>
                      <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 99, background: NET_COLOR[p.network], marginRight: 6 }} />
                      <a href={p.url} rel="nofollow noopener" target="_blank" style={{ fontWeight: 700 }}>{p.symbol}</a>{" "}
                      <span className="tiny muted">{NET[p.network] ?? p.network} · {p.dex}</span>
                      {young && (
                        <span className="tiny" style={{ marginLeft: 6, padding: "2px 6px", borderRadius: 6, background: "var(--new-bg)", color: "var(--new-ink)", fontWeight: 700 }}>
                          {labels.newBadge}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "10px 6px", fontFamily: "var(--font-mono)" }}>{usd(p.priceUsd)}</td>
                    <td style={{ padding: "10px 6px", color: p.change24h === null ? undefined : p.change24h >= 0 ? "var(--up)" : "var(--down)" }}>
                      {p.change24h === null ? "–" : `${p.change24h >= 0 ? "▲" : "▼"} ${Math.abs(p.change24h).toFixed(1)}%`}
                    </td>
                    <td style={{ padding: "10px 6px" }}>{usd(p.volume24hUsd)}</td>
                    <td style={{ padding: "10px 6px" }}>{usd(p.liquidityUsd)}</td>
                    <td style={{ padding: "10px 6px" }}>{usd(p.marketCapUsd)}</td>
                    <td style={{ padding: "10px 6px" }}>{formatAge(p.ageHours)}</td>
                    <td style={{ padding: "10px 6px", minWidth: 110 }}>
                      <div title={`${p.buys24h} / ${p.sells24h}`} style={{ display: "flex", height: 6, borderRadius: 99, overflow: "hidden", background: "color-mix(in srgb, var(--down) 28%, transparent)" }}>
                        <span style={{ width: `${buyShare * 100}%`, background: "color-mix(in srgb, var(--up) 80%, transparent)", borderRadius: 99 }} />
                      </div>
                      <span className="tiny muted">{p.buys24h.toLocaleString("en-US")} / {p.sells24h.toLocaleString("en-US")}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
