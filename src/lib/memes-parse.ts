/**
 * Pure parsing for GeckoTerminal pool lists (no I/O, unit-tested).
 * API: GET https://api.geckoterminal.com/api/v2/networks/{network}/trending_pools
 * Free public API, ~30 req/min; attribution to GeckoTerminal shown on the page.
 */

export type MemePool = {
  id: string;
  name: string;
  symbol: string;
  network: string;
  dex: string;
  priceUsd: number;
  change24h: number | null;
  volume24hUsd: number;
  liquidityUsd: number;
  marketCapUsd: number | null;
  createdAt: string | null;
  ageHours: number | null;
  buys24h: number;
  sells24h: number;
  url: string;
};

type GtPool = {
  id?: string;
  attributes?: Record<string, unknown>;
  relationships?: { dex?: { data?: { id?: string } } };
};

const num = (v: unknown): number | null => {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : null;
};

/** Base symbol from a GeckoTerminal pool name like "WIF / SOL" or "BONK / SOL 0.25%". */
export function baseSymbol(name: string): string {
  return (name.split("/")[0] ?? name).trim();
}

export const PUMP_DEXES = ["pumpswap", "pump-fun", "pumpfun"];
export const isPumpDex = (dex: string) => PUMP_DEXES.includes(dex.toLowerCase());

export type MemeFilters = { minLiquidityUsd: number; now: number };

export function parsePools(json: unknown, network: string, f: MemeFilters): MemePool[] {
  const data = (json as { data?: GtPool[] })?.data;
  if (!Array.isArray(data)) return [];
  const out: MemePool[] = [];
  for (const p of data) {
    const a = p.attributes ?? {};
    const name = typeof a.name === "string" ? a.name : null;
    const address = typeof a.address === "string" ? a.address : null;
    const price = num(a.base_token_price_usd);
    if (!name || !address || price === null) continue;
    const liquidity = num(a.reserve_in_usd) ?? 0;
    if (liquidity < f.minLiquidityUsd) continue;
    const vol = (a.volume_usd as Record<string, unknown> | undefined) ?? {};
    const chg = (a.price_change_percentage as Record<string, unknown> | undefined) ?? {};
    const tx = ((a.transactions as Record<string, Record<string, unknown>> | undefined) ?? {}).h24 ?? {};
    const createdAt = typeof a.pool_created_at === "string" ? a.pool_created_at : null;
    const created = createdAt ? Date.parse(createdAt) : NaN;
    out.push({
      id: p.id ?? `${network}_${address}`,
      name,
      symbol: baseSymbol(name),
      network,
      dex: p.relationships?.dex?.data?.id ?? "unknown",
      priceUsd: price,
      change24h: num(chg.h24),
      volume24hUsd: num(vol.h24) ?? 0,
      liquidityUsd: liquidity,
      marketCapUsd: num(a.market_cap_usd) ?? num(a.fdv_usd),
      createdAt,
      ageHours: Number.isFinite(created) ? Math.max(0, (f.now - created) / 3_600_000) : null,
      buys24h: num(tx.buys) ?? 0,
      sells24h: num(tx.sells) ?? 0,
      url: `https://www.geckoterminal.com/${network}/pools/${address}`,
    });
  }
  return out;
}

export function formatAge(hours: number | null): string {
  if (hours === null) return "–";
  if (hours < 1) return "<1h";
  if (hours < 48) return `${Math.round(hours)}h`;
  if (hours < 24 * 60) return `${Math.round(hours / 24)}d`;
  return `${Math.round(hours / 24 / 30)}mo`;
}
