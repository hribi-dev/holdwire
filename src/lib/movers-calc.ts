/** Pure helpers for measuring a price reaction around a post (unit-tested). */

export type Candle = { t: number; o: number; h: number; l: number; c: number };

export type Reaction = {
  base: number;
  after: { label: string; pct: number }[];
  maxUpPct: number;
  maxDownPct: number;
  series: { t: number; c: number }[];
};

/** Parse Hyperliquid candleSnapshot rows ({t,o,h,l,c} as strings). */
export function parseCandles(json: unknown): Candle[] {
  if (!Array.isArray(json)) return [];
  return json
    .map((r) => {
      const x = r as Record<string, unknown>;
      return { t: Number(x.t), o: Number(x.o), h: Number(x.h), l: Number(x.l), c: Number(x.c) };
    })
    .filter((c) => [c.t, c.o, c.h, c.l, c.c].every(Number.isFinite))
    .sort((a, b) => a.t - b.t);
}

/**
 * Reaction after time t0 (ms). Base = open of the candle containing t0.
 * `marks` are offsets in ms, e.g. 15 min, 1 h, 24 h.
 */
export function reactionFromCandles(candles: Candle[], t0: number, intervalMs: number, marks: { label: string; ms: number }[]): Reaction | null {
  const startIdx = candles.findIndex((c) => c.t <= t0 && t0 < c.t + intervalMs);
  if (startIdx < 0) return null;
  const base = candles[startIdx].o;
  if (!(base > 0)) return null;
  const pct = (v: number) => ((v - base) / base) * 100;
  const after: { label: string; pct: number }[] = [];
  for (const m of marks) {
    const target = t0 + m.ms;
    const c = candles.find((k) => k.t <= target && target < k.t + intervalMs);
    if (c) after.push({ label: m.label, pct: pct(c.c) });
  }
  const horizon = t0 + Math.max(...marks.map((m) => m.ms));
  const window = candles.filter((c) => c.t >= candles[startIdx].t && c.t <= horizon);
  return {
    base,
    after,
    maxUpPct: Math.max(0, ...window.map((c) => pct(c.h))),
    maxDownPct: Math.min(0, ...window.map((c) => pct(c.l))),
    series: candles.filter((c) => c.t >= t0 - 6 * intervalMs && c.t <= horizon).map((c) => ({ t: c.t, c: c.c })),
  };
}

/** Pick a candle interval that Hyperliquid still has history for (5000-candle window). */
export function pickInterval(ageMs: number): { interval: "5m" | "1h"; ms: number } | null {
  const fiveMin = 5 * 60_000;
  const hour = 3_600_000;
  if (ageMs < 4800 * fiveMin) return { interval: "5m", ms: fiveMin };
  if (ageMs < 4800 * hour) return { interval: "1h", ms: hour };
  return null;
}
