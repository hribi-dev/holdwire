import { cacheLife } from "next/cache";
import { parseCandles, pickInterval, reactionFromCandles, type Reaction } from "./movers-calc";

const API = process.env.HYPERLIQUID_API_URL || "https://api.hyperliquid.xyz/info";

/**
 * Measure the price reaction to a post from Hyperliquid perp candles.
 * Only for posts with an exact time (minute precision) inside Hyperliquid's candle history.
 * Results are cached for hours: past candles don't change.
 */
export async function measureReaction(hlCoin: string, postedAtIso: string): Promise<Reaction | null> {
  "use cache";
  cacheLife("hours");
  const nowMs = Date.now();
  const t0 = Date.parse(postedAtIso);
  const pick = pickInterval(nowMs - t0);
  if (!pick) return null;
  const marks = [
    ...(pick.interval === "5m" ? [{ label: "15m", ms: 15 * 60_000 }] : []),
    { label: "1h", ms: 3_600_000 },
    { label: "24h", ms: 24 * 3_600_000 },
  ];
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "candleSnapshot",
        req: { coin: hlCoin, interval: pick.interval, startTime: t0 - 8 * pick.ms, endTime: Math.min(nowMs, t0 + 25 * 3_600_000) },
      }),
    });
    if (!res.ok) return null;
    return reactionFromCandles(parseCandles(await res.json()), t0, pick.ms, marks);
  } catch {
    return null;
  }
}
