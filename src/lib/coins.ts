import { cacheLife } from "next/cache";
import { SAMPLE_MARKETS } from "./sample-data";

export type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string | null;
  rank: number | null;
  price: number | null;
  marketCap: number | null;
  volume24h: number | null;
  change24h: number | null;
  change7d: number | null;
  circulatingSupply: number | null;
  maxSupply: number | null;
  ath: number | null;
  sparkline: number[];
};

export type MarketsResult = {
  coins: CoinMarket[];
  /** true when the live API failed and sample figures are shown */
  sample: boolean;
  fetchedAt: string;
};

type CoinGeckoMarket = {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  market_cap_rank?: number | null;
  current_price?: number | null;
  market_cap?: number | null;
  total_volume?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  circulating_supply?: number | null;
  max_supply?: number | null;
  ath?: number | null;
  sparkline_in_7d?: { price?: number[] };
};

function apiConfig() {
  const key = process.env.COINGECKO_API_KEY;
  const pro = process.env.COINGECKO_API_TIER === "pro";
  return {
    base: pro ? "https://pro-api.coingecko.com/api/v3" : "https://api.coingecko.com/api/v3",
    headers: key
      ? ({ [pro ? "x-cg-pro-api-key" : "x-cg-demo-api-key"]: key } as Record<string, string>)
      : ({} as Record<string, string>),
  };
}

function mapMarket(m: CoinGeckoMarket): CoinMarket {
  return {
    id: m.id,
    symbol: m.symbol,
    name: m.name,
    image: m.image ?? null,
    rank: m.market_cap_rank ?? null,
    price: m.current_price ?? null,
    marketCap: m.market_cap ?? null,
    volume24h: m.total_volume ?? null,
    change24h: m.price_change_percentage_24h_in_currency ?? null,
    change7d: m.price_change_percentage_7d_in_currency ?? null,
    circulatingSupply: m.circulating_supply ?? null,
    maxSupply: m.max_supply ?? null,
    ath: m.ath ?? null,
    sparkline: m.sparkline_in_7d?.price ?? [],
  };
}

async function fetchMarkets(params: Record<string, string>): Promise<CoinMarket[] | null> {
  const { base, headers } = apiConfig();
  const qs = new URLSearchParams({
    vs_currency: "eur",
    sparkline: "true",
    price_change_percentage: "24h,7d",
    ...params,
  });
  try {
    const res = await fetch(`${base}/coins/markets?${qs}`, {
      headers: { accept: "application/json", ...headers },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as CoinGeckoMarket[];
    return Array.isArray(data) ? data.map(mapMarket) : null;
  } catch {
    return null;
  }
}

/** Top coins by market cap, in EUR. Cached for about a minute. */
export async function getTopCoins(limit = 50): Promise<MarketsResult> {
  "use cache";
  cacheLife("minutes");
  const live = await fetchMarkets({ order: "market_cap_desc", per_page: String(limit), page: "1" });
  if (live && live.length) {
    return { coins: live, sample: false, fetchedAt: new Date().toISOString() };
  }
  const sorted = [...SAMPLE_MARKETS].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
  return { coins: sorted.slice(0, limit), sample: true, fetchedAt: new Date().toISOString() };
}

/** One coin by CoinGecko id. Returns null if the coin is unknown. */
export async function getCoin(id: string): Promise<{ coin: CoinMarket; sample: boolean } | null> {
  "use cache";
  cacheLife("minutes");
  const live = await fetchMarkets({ ids: id });
  if (live && live.length) return { coin: live[0], sample: false };
  if (live && live.length === 0) return null;
  const fallback = SAMPLE_MARKETS.find((c) => c.id === id);
  return fallback ? { coin: fallback, sample: true } : null;
}
