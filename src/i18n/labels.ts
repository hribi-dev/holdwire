import type { Dict } from "./dictionaries";
import type { MarketsLabels } from "@/components/MarketsTable";

export function marketsLabels(t: Dict): MarketsLabels {
  const v = t.viz;
  return {
    all: v.all,
    gainers: t.home.gainers,
    fallers: t.home.fallers,
    gainers7d: v.gainers7d,
    large: v.large,
    mid: v.mid,
    small: v.small,
    search: v.search,
    asset: v.asset,
    price: v.price,
    change24h: v.change24h,
    change7d: v.change7d,
    marketCap: v.marketCap,
    volume: v.volume,
    noResults: v.noResults,
  };
}
