import { cacheLife } from "next/cache";
import { summarise, type HLMetaAndCtxs, type HLStats } from "./hyperliquid-stats";

/**
 * Live exchange stats from Hyperliquid's public info API (no key needed).
 * Covers Hyperliquid's core perpetual markets; HIP-3 builder markets are separate DEXs.
 * Returns null if the API can't be reached, and the UI hides the block.
 */
export async function getHyperliquidStats(): Promise<{ stats: HLStats; fetchedAt: string } | null> {
  "use cache";
  cacheLife("minutes");
  try {
    const res = await fetch(process.env.HYPERLIQUID_API_URL ?? "https://api.hyperliquid.xyz/info", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "metaAndAssetCtxs" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const stats = summarise((await res.json()) as HLMetaAndCtxs);
    return stats ? { stats, fetchedAt: new Date().toISOString() } : null;
  } catch {
    return null;
  }
}
