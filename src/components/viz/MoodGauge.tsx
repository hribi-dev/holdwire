"use client";

import { useEffect, useState } from "react";

const COLORS = ["#dc2626", "#f97316", "#eab308", "#84cc16", "#16a34a"];

/** Semicircle gauge 0..100; the needle sweeps in on mount. */
export function MoodGauge({ score, label, note, how, title }: { score: number; label: string; note: string; how: string; title: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(score));
    return () => cancelAnimationFrame(id);
  }, [score]);
  const angle = -90 + (shown / 100) * 180;
  const arc = (from: number, to: number) => {
    const p = (v: number) => {
      const a = Math.PI - (v / 100) * Math.PI;
      return [120 + 96 * Math.cos(a), 120 - 96 * Math.sin(a)];
    };
    const [x1, y1] = p(from);
    const [x2, y2] = p(to);
    return `M ${x1} ${y1} A 96 96 0 0 1 ${x2} ${y2}`;
  };
  return (
    <div className="card gauge-wrap" style={{ padding: 20 }}>
      <strong style={{ alignSelf: "flex-start" }}>{title}</strong>
      <svg viewBox="0 0 240 140" width="100%" style={{ maxWidth: 300 }} role="img" aria-label={`${title}: ${label} (${score}/100)`}>
        {COLORS.map((c, i) => (
          <path key={c} d={arc(i * 20 + 1, (i + 1) * 20 - 1)} stroke={c} strokeWidth={18} fill="none" strokeLinecap="round" />
        ))}
        <g className="gauge-needle" style={{ transform: `rotate(${angle}deg)` }}>
          <line x1={120} y1={120} x2={120} y2={36} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
        </g>
        <circle cx={120} cy={120} r={9} fill="var(--ink)" />
      </svg>
      <strong style={{ fontSize: 20, color: COLORS[Math.min(4, Math.floor(score / 20.0001))] }}>
        {score} · {label}
      </strong>
      <span className="small" style={{ textAlign: "center" }}>{note}</span>
      <span className="tiny muted" style={{ textAlign: "center" }}>{how}</span>
    </div>
  );
}
