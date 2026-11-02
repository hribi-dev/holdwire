const COLORS: Record<string, string> = {
  bitcoin: "#F7931A",
  ethereum: "#3C3C3D",
  solana: "#0E1116",
  ripple: "#23292F",
  tether: "#26A17B",
  "usd-coin": "#2775CA",
  cardano: "#0033AD",
  dogecoin: "#BA9F33",
  hyperliquid: "#0A5C46",
};

export function CoinBadge({ id, name, image, size = 28 }: { id: string; name: string; image?: string | null; size?: number }) {
  return (
    <span className="coin-badge" style={{ width: size, height: size, background: COLORS[id] ?? "#3C3C3D", fontSize: size * 0.45 }} aria-hidden="true">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny remote logos, sized explicitly
        <img src={image} alt="" width={size} height={size} loading="lazy" />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </span>
  );
}
