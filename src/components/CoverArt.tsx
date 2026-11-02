/**
 * Generated cover art for articles: no stock photos needed, every cover is unique
 * (seeded by the slug) and coloured by category. Abstract on purpose, not coin logos.
 */
const PALETTES: Record<string, [string, string, string]> = {
  Hyperliquid: ["#042f2e", "#14b8a6", "#5eead4"],
  Regulation: ["#2e1065", "#7c3aed", "#c4b5fd"],
  Markets: ["#431407", "#f97316", "#fcd34d"],
  "Crypto basics": ["#172554", "#3b82f6", "#93c5fd"],
  Fintech: ["#500724", "#ec4899", "#f9a8d4"],
};
const FALLBACK: [string, string, string] = ["#0c0a09", "#06b6d4", "#a78bfa"];

export const categoryColor = (category: string | null) => (PALETTES[category ?? ""] ?? FALLBACK)[1];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function CoverArt({ seed, category, label }: { seed: string; category: string | null; label?: string }) {
  const [deep, mid, light] = PALETTES[category ?? ""] ?? FALLBACK;
  const r = hash(seed);
  const x1 = Math.round(r() * 80 + 10);
  const y1 = Math.round(r() * 60 + 10);
  const x2 = Math.round(r() * 80 + 10);
  const y2 = Math.round(r() * 60 + 30);
  const waves = Array.from({ length: 5 }, (_, i) => {
    const base = 40 + i * 22;
    const a = Math.round(r() * 40 + 10);
    const b = Math.round(r() * 40 + 10);
    return `M0 ${base} C 120 ${base - a}, 240 ${base + b}, 400 ${base - a / 2}`;
  });
  return (
    <div className="cover" aria-hidden="true">
      <div
        className="cover-art"
        style={{
          background: `radial-gradient(circle at ${x1}% ${y1}%, ${light} 0%, transparent 45%), radial-gradient(circle at ${x2}% ${y2}%, ${mid} 0%, transparent 55%), linear-gradient(135deg, ${deep}, ${mid})`,
        }}
      >
        <svg viewBox="0 0 400 225" preserveAspectRatio="none" width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
          {waves.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#fff" strokeOpacity={0.18 + i * 0.08} strokeWidth={1.4} />
          ))}
        </svg>
      </div>
      {label && <span className="cover-label">{label}</span>}
    </div>
  );
}
