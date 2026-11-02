/** Pure helpers for Hyperliquid's public info API (no Next.js imports, so they're unit-testable). */

export type HLUniverseAsset = { name: string; maxLeverage?: number; isDelisted?: boolean };
export type HLAssetCtx = {
  dayNtlVlm?: string;
  openInterest?: string;
  markPx?: string;
  funding?: string;
  prevDayPx?: string;
};
export type HLMetaAndCtxs = [{ universe: HLUniverseAsset[] }, HLAssetCtx[]];

export type HLMarket = {
  name: string;
  volume24hUsd: number;
  openInterestUsd: number;
  markPx: number;
  /** Hourly funding rate as a decimal (Hyperliquid pays funding every hour). */
  fundingHourly: number;
  change24h: number | null;
};

export type HLStats = {
  totalVolume24hUsd: number;
  totalOpenInterestUsd: number;
  marketCount: number;
  topByVolume: HLMarket[];
  topByOpenInterest: HLMarket[];
};

const num = (v: string | undefined) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export function summarise(data: HLMetaAndCtxs, top = 8): HLStats | null {
  if (!Array.isArray(data) || data.length < 2) return null;
  const [meta, ctxs] = data;
  if (!meta?.universe || !Array.isArray(ctxs)) return null;

  const markets: HLMarket[] = meta.universe
    .map((u, i): HLMarket | null => {
      const c = ctxs[i];
      if (!c || u.isDelisted) return null;
      const mark = num(c.markPx);
      const prev = num(c.prevDayPx);
      return {
        name: u.name,
        volume24hUsd: num(c.dayNtlVlm),
        openInterestUsd: num(c.openInterest) * mark,
        markPx: mark,
        fundingHourly: num(c.funding),
        change24h: prev > 0 ? ((mark - prev) / prev) * 100 : null,
      };
    })
    .filter((m): m is HLMarket => !!m && m.markPx > 0);

  if (markets.length === 0) return null;

  return {
    totalVolume24hUsd: markets.reduce((s, m) => s + m.volume24hUsd, 0),
    totalOpenInterestUsd: markets.reduce((s, m) => s + m.openInterestUsd, 0),
    marketCount: markets.length,
    topByVolume: [...markets].sort((a, b) => b.volume24hUsd - a.volume24hUsd).slice(0, top),
    topByOpenInterest: [...markets].sort((a, b) => b.openInterestUsd - a.openInterestUsd).slice(0, top),
  };
}

/** Hourly funding → annualised percentage, for readability. */
export function annualisedFundingPct(hourly: number): number {
  return hourly * 24 * 365 * 100;
}
