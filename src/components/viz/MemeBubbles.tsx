"use client";

import { useId, useMemo, useState } from "react";
import type { MemePool } from "@/lib/memes-parse";

export const NET: Record<string, string> = { solana: "Solana", base: "Base", bsc: "BNB Chain" };
export const NET_COLOR: Record<string, string> = { solana: "#8b5cf6", base: "#3b82f6", bsc: "#eab308" };

const W = 880;
const H = 400;
const PAD = { l: 58, r: 24, t: 22, b: 40 };

/**
 * 24h change on a "doubling" scale: log2 of the price ratio. +100% and −50% sit the same
 * distance from zero, a +3,000% outlier no longer squashes everything else onto the 0% line,
 * and the axis can never show impossible values below −100%.
 */
const yT = (pct: number) => Math.log2(Math.max(0.05, 1 + pct / 100));
const Y_TICKS = [-90, -75, -50, 0, 100, 300, 1000, 3000];
const X_DECADES = [1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
const X_FINE = [1e3, 3e3, 1e4, 3e4, 1e5, 3e5, 1e6, 3e6, 1e7, 3e7, 1e8, 3e8, 1e9];
const tickPct = (t: number) => (t === 0 ? "0%" : `${t > 0 ? "+" : "−"}${Math.abs(t).toLocaleString("en-US")}%`);

const money = (n: number) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(n >= 1e10 ? 0 : 1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}k` : `$${Math.round(n)}`;
const pctLabel = (p: number) => `${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p) >= 1000 ? Math.round(Math.abs(p)).toLocaleString("en-US") : Math.abs(p).toFixed(Math.abs(p) >= 100 ? 0 : 1)}%`;

type Labels = { bubbles: string; bubblesNote: string; change24h: string; volume: string; liquidity: string };

export function MemeBubbles({
  pools,
  labels,
  hover,
  onHover,
}: {
  pools: MemePool[];
  labels: Labels;
  hover: MemePool | null;
  onHover: (p: MemePool | null) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const nets = useMemo(() => Object.keys(NET).filter((n) => pools.some((p) => p.network === n)), [pools]);
  const shown = pools.filter((p) => !hidden.has(p.network) && p.change24h !== null && p.volume24hUsd > 0);

  // Scales fitted to what is on screen, padded to whole decades on the volume axis.
  const lv = shown.map((p) => Math.log10(p.volume24hUsd));
  const xMin = shown.length ? Math.floor(Math.min(...lv) * 2) / 2 : 4;
  const xMax = shown.length ? Math.ceil(Math.max(...lv) * 2) / 2 : 7;
  const ys = shown.map((p) => yT(p.change24h ?? 0));
  const yMin = Math.min(-1.2, ...ys) - 0.25;
  const yMax = Math.max(1.2, ...ys) + 0.25;
  const liqMax = Math.max(1, ...shown.map((p) => p.liquidityUsd));

  const sx = (v: number) => PAD.l + ((Math.log10(Math.max(1, v)) - xMin) / (xMax - xMin || 1)) * (W - PAD.l - PAD.r);
  const sy = (pct: number) => PAD.t + ((yMax - yT(pct)) / (yMax - yMin)) * (H - PAD.t - PAD.b);
  const sr = (liq: number) => 5 + Math.sqrt(liq / liqMax) * 19;
  const y0 = sy(0);
  const inX = (t: number) => Math.log10(t) >= xMin && Math.log10(t) <= xMax;
  const xTicks = X_DECADES.filter(inX).length >= 3 ? X_DECADES.filter(inX) : X_FINE.filter(inX);

  // Labels for the biggest pools by volume, skipping any that would collide with one already placed.
  const labelled = (() => {
    const placed: { x: number; y: number }[] = [];
    const out = new Set<string>();
    for (const p of [...shown].sort((a, b) => b.volume24hUsd - a.volume24hUsd)) {
      if (out.size >= 9) break;
      const x = sx(p.volume24hUsd) + sr(p.liquidityUsd) + 6;
      const y = sy(p.change24h ?? 0);
      if (x > W - 60) continue;
      if (placed.some((q) => Math.abs(q.x - x) < 64 && Math.abs(q.y - y) < 16)) continue;
      placed.push({ x, y });
      out.add(p.id);
    }
    return out;
  })();

  const toggle = (n: string) =>
    setHidden((h) => {
      const next = new Set(h);
      if (next.has(n)) next.delete(n);
      else if (nets.length - next.size > 1) next.add(n);
      return next;
    });

  const hx = hover ? sx(hover.volume24hUsd) : 0;
  const hy = hover ? sy(hover.change24h ?? 0) : 0;
  const hShown = hover && shown.some((p) => p.id === hover.id);

  return (
    <section className="card bubbles stack" style={{ gap: 10 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div className="stack" style={{ gap: 4 }}>
          <strong>{labels.bubbles}</strong>
          <span className="tiny muted">{labels.bubblesNote}</span>
        </div>
        <div className="bubbles-legend" role="group" aria-label="Networks">
          {nets.map((n) => (
            <button key={n} type="button" aria-pressed={!hidden.has(n)} onClick={() => toggle(n)} style={{ "--c": NET_COLOR[n] } as React.CSSProperties}>
              <span className="sw" aria-hidden="true" />
              {NET[n]}
              <span className="ct">{pools.filter((p) => p.network === n).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={labels.bubbles} onMouseLeave={() => onHover(null)} className="bubbles-svg">
          <defs>
            {Object.entries(NET_COLOR).map(([n, c]) => (
              <radialGradient key={n} id={`b${uid}${n}`} cx="35%" cy="30%" r="75%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
                <stop offset="0.4" stopColor={c} stopOpacity="0.85" />
                <stop offset="1" stopColor={c} stopOpacity="0.55" />
              </radialGradient>
            ))}
            <linearGradient id={`up${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--up)" stopOpacity="0.09" />
              <stop offset="1" stopColor="var(--up)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`dn${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--down)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--down)" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Up / down zones */}
          <rect x={PAD.l} y={PAD.t} width={W - PAD.l - PAD.r} height={Math.max(0, y0 - PAD.t)} fill={`url(#up${uid})`} rx="10" />
          <rect x={PAD.l} y={y0} width={W - PAD.l - PAD.r} height={Math.max(0, H - PAD.b - y0)} fill={`url(#dn${uid})`} rx="10" />

          {/* Grid + axes */}
          {Y_TICKS.filter((t) => yT(t) > yMin && yT(t) < yMax).map((t) => (
            <g key={`y${t}`}>
              <line x1={PAD.l} x2={W - PAD.r} y1={sy(t)} y2={sy(t)} className={t === 0 ? "bx-zero" : "bx-grid"} />
              <text x={PAD.l - 10} y={sy(t) + 4} textAnchor="end" className="bx-tick" fill={t > 0 ? "var(--up)" : t < 0 ? "var(--down)" : "var(--muted)"}>
                {tickPct(t)}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line x1={sx(t)} x2={sx(t)} y1={PAD.t} y2={H - PAD.b} className="bx-grid" />
              <text x={sx(t)} y={H - PAD.b + 20} textAnchor="middle" className="bx-tick">
                {money(t)}
              </text>
            </g>
          ))}
          <text x={W - PAD.r} y={H - 6} textAnchor="end" className="bx-axis">
            {labels.volume} →
          </text>

          {/* Crosshair */}
          {hover && hShown && (
            <g className="bx-cross" pointerEvents="none">
              <line x1={PAD.l} x2={hx} y1={hy} y2={hy} />
              <line x1={hx} x2={hx} y1={hy} y2={H - PAD.b} />
              <rect x={2} y={hy - 10} width={PAD.l - 6} height={20} rx="6" className="bx-pill" />
              <text x={PAD.l - 7} y={hy + 4} textAnchor="end" className="bx-pill-t">
                {pctLabel(hover.change24h ?? 0)}
              </text>
              <rect x={hx - 30} y={H - PAD.b + 6} width={60} height={20} rx="6" className="bx-pill" />
              <text x={hx} y={H - PAD.b + 20} textAnchor="middle" className="bx-pill-t">
                {money(hover.volume24hUsd)}
              </text>
            </g>
          )}

          {/* Bubbles, biggest first so small ones stay on top and hoverable */}
          {[...shown]
            .sort((a, b) => b.liquidityUsd - a.liquidityUsd)
            .map((p, i) => {
              const active = hover?.id === p.id;
              const dim = hover && !active;
              return (
                <g
                  key={p.id}
                  className="bx-node"
                  data-bubble
                  style={{ transform: `translate(${sx(p.volume24hUsd)}px, ${sy(p.change24h ?? 0)}px)`, opacity: dim ? 0.28 : 1, animationDelay: `${i * 25}ms` }}
                  onMouseEnter={() => onHover(p)}
                  onClick={() => onHover(p)}
                >
                  <circle r={sr(p.liquidityUsd) + (active ? 3 : 0)} fill={`url(#b${uid}${p.network})`} stroke={NET_COLOR[p.network]} strokeWidth={active ? 2.5 : 1} className="bx-dot" />
                  {active && <circle r={sr(p.liquidityUsd) + 8} fill="none" stroke={NET_COLOR[p.network]} strokeOpacity="0.35" strokeWidth="2" />}
                  <title>{`${p.symbol}: ${pctLabel(p.change24h ?? 0)}, ${money(p.volume24hUsd)} volume`}</title>
                </g>
              );
            })}

          {/* Labels beside bubbles */}
          {shown
            .filter((p) => labelled.has(p.id) || hover?.id === p.id)
            .map((p) => (
              <text
                key={`l${p.id}`}
                x={sx(p.volume24hUsd) + sr(p.liquidityUsd) + 6}
                y={sy(p.change24h ?? 0) + 4}
                className={`bx-label${hover && hover.id !== p.id ? " is-dim" : ""}`}
                pointerEvents="none"
              >
                {p.symbol.slice(0, 9)}
              </text>
            ))}
        </svg>

        {hover && hShown && (
          <div className="viz-tip" style={{ left: `${(hx / W) * 100}%`, top: `${((hy - sr(hover.liquidityUsd) - 6) / H) * 100}%` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 99, background: NET_COLOR[hover.network] }} />
              <strong>{hover.symbol}</strong>
              <span style={{ opacity: 0.65 }}>
                {NET[hover.network]} · {hover.dex}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "2px 14px", marginTop: 6 }}>
              <span style={{ opacity: 0.65 }}>{labels.change24h}</span>
              <span className="mono" style={{ color: (hover.change24h ?? 0) >= 0 ? "#4ade80" : "#fb7185" }}>
                {pctLabel(hover.change24h ?? 0)}
              </span>
              <span style={{ opacity: 0.65 }}>{labels.volume}</span>
              <span className="mono">{money(hover.volume24hUsd)}</span>
              <span style={{ opacity: 0.65 }}>{labels.liquidity}</span>
              <span className="mono">{money(hover.liquidityUsd)}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
