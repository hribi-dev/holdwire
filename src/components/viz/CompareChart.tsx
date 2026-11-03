"use client";

import { useState } from "react";

type Series = { label: string; color: string; data: number[] };

/** Two or more price series rebased to 0% at the start, with a hover readout. 7 days of hourly points. */
export function CompareChart({ series, hint }: { series: Series[]; hint: string }) {
  const [i, setI] = useState<number | null>(null);
  const W = 800;
  const H = 240;
  const P = { l: 46, r: 12, t: 14, b: 22 };
  const clean = series.map((s) => ({ ...s, data: s.data.filter((d) => Number.isFinite(d) && d > 0) })).filter((s) => s.data.length > 1);
  if (clean.length === 0) return null;
  const n = Math.min(...clean.map((s) => s.data.length));
  const rebased = clean.map((s) => {
    const d = s.data.slice(-n);
    return { ...s, pct: d.map((v) => (v / d[0] - 1) * 100) };
  });
  const all = rebased.flatMap((s) => s.pct);
  const lo = Math.min(0, ...all);
  const hi = Math.max(0, ...all);
  const pad = Math.max(0.5, (hi - lo) * 0.12);
  const [y0, y1] = [lo - pad, hi + pad];
  const X = (k: number) => P.l + (k / (n - 1)) * (W - P.l - P.r);
  const Y = (v: number) => P.t + (1 - (v - y0) / (y1 - y0)) * (H - P.t - P.b);
  const ticks = [y0 + pad, 0, y1 - pad].filter((v, k, arr) => arr.indexOf(v) === k);
  const fmt = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(1)}%`;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const k = Math.round(((x - P.l) / (W - P.l - P.r)) * (n - 1));
    setI(Math.max(0, Math.min(n - 1, k)));
  };
  const k = i ?? n - 1;

  return (
    <div className="stack" style={{ gap: 10 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "baseline" }}>
        {rebased.map((s) => (
          <span key={s.label} style={{ display: "inline-flex", gap: 8, alignItems: "baseline" }}>
            <span style={{ width: 10, height: 10, borderRadius: 99, background: s.color, alignSelf: "center" }} />
            <span className="small">{s.label}</span>
            <strong className="mono" style={{ color: s.pct[k] >= 0 ? "var(--up)" : "var(--down)" }}>
              {fmt(s.pct[k])}
            </strong>
          </span>
        ))}
        <span className="tiny muted" style={{ marginLeft: "auto" }}>
          {i === null ? hint : `${Math.round(((n - 1 - k) / (n - 1)) * 7 * 24)}h ago`}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={rebased.map((s) => `${s.label} ${fmt(s.pct[n - 1])}`).join(", ")} onPointerMove={onMove} onPointerLeave={() => setI(null)} style={{ touchAction: "pan-y", display: "block" }}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? "var(--line-strong)" : "var(--line)"} strokeDasharray={v === 0 ? "4 4" : undefined} />
            <text x={P.l - 8} y={Y(v) + 4} textAnchor="end" style={{ font: "500 11px var(--font-mono)", fill: "var(--muted)" }}>
              {fmt(v)}
            </text>
          </g>
        ))}
        {rebased.map((s) => (
          <path key={s.label} d={s.pct.map((v, j) => `${j ? "L" : "M"}${X(j).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ")} fill="none" stroke={s.color} strokeWidth={2.4} strokeLinejoin="round" />
        ))}
        {i !== null && (
          <g pointerEvents="none">
            <line x1={X(k)} x2={X(k)} y1={P.t} y2={H - P.b} stroke="var(--ink)" strokeOpacity={0.3} strokeDasharray="3 4" />
            {rebased.map((s) => (
              <circle key={s.label} cx={X(k)} cy={Y(s.pct[k])} r={4.5} fill={s.color} stroke="var(--card)" strokeWidth={2} />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
