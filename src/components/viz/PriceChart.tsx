"use client";

import { useId, useMemo, useState } from "react";

/** Interactive 7-day area chart for hourly sparkline data, with a hover crosshair. */
export function PriceChart({ data, intl, hint, color = "#1f4fd8" }: { data: number[]; intl: string; hint: string; color?: string }) {
  const id = useId().replace(/:/g, "");
  const [i, setI] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const W = 800;
  const H = 260;
  const P = 8;
  const { pts, min, max } = useMemo(() => {
    const clean = data.filter((d) => Number.isFinite(d));
    const mn = Math.min(...clean);
    const mx = Math.max(...clean);
    const span = mx - mn || 1;
    return {
      min: mn,
      max: mx,
      pts: clean.map((v, k) => [P + (k / Math.max(1, clean.length - 1)) * (W - 2 * P), P + (1 - (v - mn) / span) * (H - 2 * P)] as const),
    };
  }, [data]);
  if (pts.length < 2) return null;

  const line = pts.map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]} ${H} L${pts[0][0]} ${H} Z`;
  const eur = new Intl.NumberFormat(intl, { style: "currency", currency: "EUR", maximumSignificantDigits: 6 });
  const when = (k: number) => {
    const hoursAgo = pts.length - 1 - k;
    const d = new Date(now - hoursAgo * 3_600_000);
    return d.toLocaleString(intl, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };
  const values = data.filter((d) => Number.isFinite(d));
  const sel = i ?? pts.length - 1;
  const first = values[0];
  const chg = ((values[sel] - first) / first) * 100;

  return (
    <div className="card stack" style={{ gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "baseline" }}>
        <span className="mono" style={{ fontSize: 26, fontWeight: 700 }}>{eur.format(values[sel])}</span>
        <span className="mono small" style={{ color: chg >= 0 ? "var(--up)" : "var(--down)", fontWeight: 600 }}>
          {chg >= 0 ? "▲" : "▼"} {Math.abs(chg).toFixed(2)}% · {i === null || !now ? "7d" : when(sel)}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ touchAction: "pan-y", cursor: "crosshair", display: "block" }}
        onPointerMove={(e) => {
          if (!now) setNow(Date.now());
          const r = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * W;
          const k = Math.round(((x - P) / (W - 2 * P)) * (pts.length - 1));
          setI(Math.max(0, Math.min(pts.length - 1, k)));
        }}
        onPointerLeave={() => setI(null)}
        role="img"
        aria-label={`7d: ${eur.format(min)} – ${eur.format(max)}`}
      >
        <defs>
          <linearGradient id={`g${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#g${id})`} />
        <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
        {i !== null && (
          <>
            <line x1={pts[i][0]} x2={pts[i][0]} y1={0} y2={H} stroke="var(--line-strong)" strokeDasharray="4 4" />
            <circle cx={pts[i][0]} cy={pts[i][1]} r={6} fill="#fff" stroke={color} strokeWidth={3} />
          </>
        )}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between" }} className="tiny muted">
        <span>{eur.format(min)} – {eur.format(max)}</span>
        <span>{hint}</span>
      </div>
    </div>
  );
}
