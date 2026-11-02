import { cacheLife } from "next/cache";
import { parsePools, type MemePool } from "./memes-parse";

const BASE = process.env.GECKOTERMINAL_API_URL || "https://api.geckoterminal.com/api/v2";

/** Pools below this liquidity are dropped: too easy to manipulate and too likely to be rugs. */
export const MIN_LIQUIDITY_USD = 25_000;

export type MemeFeed = { pools: MemePool[]; sample: boolean; fetchedAt: string };

async function fetchTrending(network: string, now: number): Promise<MemePool[] | null> {
  try {
    const res = await fetch(`${BASE}/networks/${network}/trending_pools?page=1`, {
      headers: { Accept: "application/json;version=20230302" },
    });
    if (!res.ok) return null;
    return parsePools(await res.json(), network, { minLiquidityUsd: MIN_LIQUIDITY_USD, now });
  } catch {
    return null;
  }
}

export async function getMemeFeed(): Promise<MemeFeed> {
  "use cache";
  cacheLife("minutes");
  const now = Date.now();
  const results = await Promise.all(["solana", "base", "bsc"].map((n) => fetchTrending(n, now)));
  const pools = results.flatMap((r) => r ?? []);
  if (pools.length === 0) return { pools: samplePools(now), sample: true, fetchedAt: new Date(now).toISOString() };
  return { pools, sample: false, fetchedAt: new Date(now).toISOString() };
}

function samplePools(now: number): MemePool[] {
  const mk = (
    symbol: string,
    network: string,
    dex: string,
    priceUsd: number,
    change24h: number,
    volume24hUsd: number,
    liquidityUsd: number,
    marketCapUsd: number,
    ageHours: number,
  ): MemePool => ({
    id: `${network}_${symbol}`,
    name: `${symbol} / ${network === "solana" ? "SOL" : network === "base" ? "WETH" : "WBNB"}`,
    symbol,
    network,
    dex,
    priceUsd,
    change24h,
    volume24hUsd,
    liquidityUsd,
    marketCapUsd,
    createdAt: new Date(now - ageHours * 3_600_000).toISOString(),
    ageHours,
    buys24h: Math.round(volume24hUsd / 900),
    sells24h: Math.round(volume24hUsd / 1100),
    url: "https://www.geckoterminal.com",
  });
  return [
    mk("WIF", "solana", "raydium", 0.92, -3.1, 41_000_000, 8_200_000, 920_000_000, 24 * 600),
    mk("BONK", "solana", "raydium", 0.000018, 2.4, 22_000_000, 6_100_000, 1_400_000_000, 24 * 900),
    mk("POPCAT", "solana", "raydium", 0.31, 7.9, 9_800_000, 2_900_000, 300_000_000, 24 * 520),
    mk("SAMPLE1", "solana", "pumpswap", 0.0042, 48.2, 6_300_000, 410_000, 4_200_000, 19),
    mk("SAMPLE2", "solana", "pumpswap", 0.0011, -22.5, 2_100_000, 180_000, 1_100_000, 7),
    mk("BRETT", "base", "uniswap-v3-base", 0.041, -1.2, 5_400_000, 3_300_000, 410_000_000, 24 * 560),
    mk("SAMPLE3", "bsc", "pancakeswap-v3-bsc", 0.017, 12.4, 3_900_000, 620_000, 17_000_000, 52),
  ];
}
