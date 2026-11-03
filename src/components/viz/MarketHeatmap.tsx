"use client";

import { useState } from "react";
import Link from "@/components/Link";
import { changeColor, squarify } from "@/lib/treemap";

export type HeatCoin = { id: string; symbol: string; name: string; marketCap: number; price: number | null; change24h: number | null };

const H = 43.75; // 16:7 box in % units (100 × 43.75)

export function MarketHeatmap({
  coins,
  intl,
  labels,
}: {
  coins: HeatCoin[];
  intl: string;
  labels: { marketCap: string; price: string; change24h: string; hover: string };
}) {
  const [tip, setTip] = useState<{ c: HeatCoin; x: number; y: number } | null>(null);
  const rects = squarify(coins, (c) => c.marketCap, 100, H);
  const eur = new Intl.NumberFormat(intl, { style: "currency", currency: "EUR", maximumSignificantDigits: 6 });
  const eurC = new Intl.NumberFormat(intl, { style: "currency", currency: "EUR", notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 });

  return (
    <div className="stack" style={{ gap: 8 }}>
      <div className="heatmap" onMouseLeave={() => setTip(null)}>
        {rects.map((r) => {
          const area = r.w * r.h;
          const big = area > 180;
          const mid = area > 40;
          const chg = r.change24h;
          return (
            <Link
              key={r.id}
              href={r.id === "hyperliquid" ? "/hyperliquid" : `/coins/${r.id}`}
              className="tile"
              aria-label={`${r.name} ${chg == null ? "" : `${chg.toFixed(1)}%`}`}
              style={{ left: `${r.x}%`, top: `${(r.y / H) * 100}%`, width: `${r.w}%`, height: `${(r.h / H) * 100}%`, background: changeColor(chg) }}
              onMouseMove={(e) => {
                const box = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                setTip({ c: r, x: e.clientX - box.left, y: e.clientY - box.top });
              }}
              onFocus={(e) => {
                const box = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                const me = e.currentTarget.getBoundingClientRect();
                setTip({ c: r, x: me.left - box.left + me.width / 2, y: me.top - box.top + 8 });
              }}
              onBlur={() => setTip(null)}
            >
              {mid && <span className="sym" style={{ fontSize: big ? "clamp(14px, 2.2vw, 26px)" : 12 }}>{r.symbol.toUpperCase()}</span>}
              {mid && chg != null && (
                <span className="chg" style={{ fontSize: big ? "clamp(11px, 1.3vw, 15px)" : 10 }}>
                  {chg >= 0 ? "+" : ""}
                  {chg.toFixed(1)}%
                </span>
              )}
            </Link>
          );
        })}
        {tip && (
          <div className="viz-tip" style={{ left: tip.x, top: tip.y }} role="status">
            <strong>{tip.c.name}</strong>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "2px 12px", marginTop: 4 }}>
              <span style={{ opacity: 0.7 }}>{labels.price}</span>
              <span className="mono">{tip.c.price == null ? "–" : eur.format(tip.c.price)}</span>
              <span style={{ opacity: 0.7 }}>{labels.change24h}</span>
              <span className="mono" style={{ color: (tip.c.change24h ?? 0) >= 0 ? "#4ade80" : "#fb923c" }}>
                {tip.c.change24h == null ? "–" : `${tip.c.change24h >= 0 ? "+" : ""}${tip.c.change24h.toFixed(2)}%`}
              </span>
              <span style={{ opacity: 0.7 }}>{labels.marketCap}</span>
              <span className="mono">{eurC.format(tip.c.marketCap)}</span>
            </div>
          </div>
        )}
      </div>
      <span className="tiny muted">{labels.hover}</span>
    </div>
  );
}
