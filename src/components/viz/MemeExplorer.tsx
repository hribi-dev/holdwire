"use client";

import { useMemo, useState } from "react";
import { formatAge, isPumpDex, type MemePool } from "@/lib/memes-parse";

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

const NET: Record<string, string> = { solana: "Solana", base: "Base", bsc: "BNB Chain" };
const NET_COLOR: Record<string, string> = { solana: "#9945ff", base: "#0052ff", bsc: "#f0b90b" };

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

  // Bubble chart scales
  const W = 800;
  const H = 320;
  const P = 36;
  const vols = rows.map((r) => Math.log10(Math.max(1, r.volume24hUsd)));
  const vMin = Math.min(...vols, 4);
  const vMax = Math.max(...vols, 5);
  const chgs = rows.map((r) => r.change24h ?? 0);
  const cAbs = Math.max(10, ...chgs.map((c) => Math.abs(c)));
  const liqMax = Math.max(1, ...rows.map((r) => r.liquidityUsd));
  const bx = (r: MemePool) => P + ((Math.log10(Math.max(1, r.volume24hUsd)) - vMin) / (vMax - vMin || 1)) * (W - 2 * P);
  const by = (r: MemePool) => H / 2 - ((r.change24h ?? 0) / cAbs) * (H / 2 - P);
  const br = (r: MemePool) => 6 + Math.sqrt(r.liquidityUsd / liqMax) * 26;

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

      <section className="card stack" style={{ gap: 8 }}>
        <strong>{labels.bubbles}</strong>
        <span className="tiny muted">{labels.bubblesNote}</span>
        <div style={{ position: "relative" }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={labels.bubbles} onMouseLeave={() => setHover(null)}>
            <line x1={P} x2={W - P} y1={H / 2} y2={H / 2} stroke="var(--line-strong)" strokeDasharray="4 4" />
            <text x={P} y={H / 2 - 6} fontSize={11} fill="var(--muted)">0%</text>
            <text x={P} y={P - 12} fontSize={11} fill="var(--up)">+{cAbs.toFixed(0)}%</text>
            <text x={P} y={H - P + 22} fontSize={11} fill="var(--down)">−{cAbs.toFixed(0)}%</text>
            <text x={W - P} y={H - 8} fontSize={11} fill="var(--muted)" textAnchor="end">{labels.volume} →</text>
            {rows.map((r) => (
              <circle
                key={r.id}
                cx={bx(r)}
                cy={by(r)}
                r={br(r)}
                fill={NET_COLOR[r.network] ?? "#64748b"}
                fillOpacity={hover && hover.id !== r.id ? 0.25 : 0.7}
                stroke="#fff"
                strokeWidth={1.5}
                style={{ transition: "fill-opacity .15s" }}
                onMouseEnter={() => setHover(r)}
                onClick={() => setHover(r)}
              >
                <title>{r.symbol}</title>
              </circle>
            ))}
            {rows.slice(0, 8).map((r) => (
              <text key={`t${r.id}`} x={bx(r)} y={by(r) + 4} fontSize={11} fontWeight={700} textAnchor="middle" fill="#fff" pointerEvents="none">
                {r.symbol.slice(0, 7)}
              </text>
            ))}
          </svg>
          {hover && (
            <div className="viz-tip" style={{ left: `${(bx(hover) / W) * 100}%`, top: `${((by(hover) - br(hover)) / H) * 100}%` }}>
              <strong>{hover.symbol}</strong> <span style={{ opacity: 0.7 }}>{NET[hover.network]} · {hover.dex}</span>
              <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "2px 12px", marginTop: 4 }}>
                <span style={{ opacity: 0.7 }}>{labels.change24h}</span>
                <span className="mono">{hover.change24h == null ? "–" : `${hover.change24h.toFixed(1)}%`}</span>
                <span style={{ opacity: 0.7 }}>{labels.volume}</span>
                <span className="mono">{usd(hover.volume24hUsd)}</span>
                <span style={{ opacity: 0.7 }}>{labels.liquidity}</span>
                <span className="mono">{usd(hover.liquidityUsd)}</span>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }} className="tiny">
          {Object.entries(NET).map(([k, v]) => (
            <span key={k} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: NET_COLOR[k] }} /> {v}
            </span>
          ))}
        </div>
      </section>

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
                        <span className="tiny" style={{ marginLeft: 6, padding: "2px 6px", borderRadius: 6, background: "#fef3c7", color: "#92400e", fontWeight: 700 }}>
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
                      <div title={`${p.buys24h} / ${p.sells24h}`} style={{ display: "flex", height: 8, borderRadius: 99, overflow: "hidden", background: "#fecaca" }}>
                        <span style={{ width: `${buyShare * 100}%`, background: "#4ade80" }} />
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
