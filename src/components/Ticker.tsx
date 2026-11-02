import { getTopCoins } from "@/lib/coins";
import { direction, formatChange, formatPrice } from "@/lib/format";

export async function Ticker() {
  const { coins, sample } = await getTopCoins(50);
  // Hyperliquid is our spotlight asset: always pinned first.
  const others = coins.filter((c) => !["tether", "usd-coin", "hyperliquid"].includes(c.id));
  const hype = coins.find((c) => c.id === "hyperliquid");
  const shown = [...(hype ? [hype] : []), ...others].slice(0, 6);
  return (
    <div className="ticker" aria-label="Market prices">
      <div className="wrap">
        {shown.map((c) => (
          <span key={c.id} style={{ display: "flex", gap: 8 }}>
            {c.symbol.toUpperCase()} <strong>{formatPrice(c.price)}</strong>
            <span className={direction(c.change24h)}>{formatChange(c.change24h)}</span>
          </span>
        ))}
        <span className="note">{sample ? "Sample data — live prices unavailable" : "Prices in EUR · 24h change"}</span>
      </div>
    </div>
  );
}

export function TickerFallback() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="wrap">
        <span className="note">Loading prices…</span>
      </div>
    </div>
  );
}
