import { getTopCoins } from "@/lib/coins";
import { direction, formatChange, formatPrice } from "@/lib/format";

export async function Ticker() {
  const { coins, sample } = await getTopCoins(50);
  // Hyperliquid is our spotlight asset: always first.
  const others = coins.filter((c) => !["tether", "usd-coin", "hyperliquid"].includes(c.id));
  const hype = coins.find((c) => c.id === "hyperliquid");
  const shown = [...(hype ? [hype] : []), ...others].slice(0, 14);
  const items = shown.map((c) => (
    <span key={c.id} style={{ display: "inline-flex", gap: 8, whiteSpace: "nowrap" }}>
      {c.symbol.toUpperCase()} <strong>{formatPrice(c.price)}</strong>
      <span className={direction(c.change24h)}>{formatChange(c.change24h)}</span>
    </span>
  ));
  return (
    <div className="ticker" aria-label="Market prices">
      <div className="marquee">
        {/* Rendered twice so the loop is seamless; the copy is hidden from screen readers. */}
        <div className="marquee-track">
          <div style={{ display: "flex", gap: 36 }}>{items}</div>
          <div style={{ display: "flex", gap: 36 }} aria-hidden="true">
            {items}
          </div>
        </div>
      </div>
      {sample && (
        <div className="wrap" style={{ paddingBottom: 6 }}>
          <span className="note" style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--night-muted)" }}>
            Sample data: live prices unavailable
          </span>
        </div>
      )}
    </div>
  );
}

export function TickerFallback() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="wrap" style={{ padding: "10px 24px" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--night-muted)" }}>Loading prices…</span>
      </div>
    </div>
  );
}
