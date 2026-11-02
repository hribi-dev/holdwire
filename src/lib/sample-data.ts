import type { CoinMarket } from "./coins";

/**
 * Fallback figures used ONLY when the live price API is unreachable
 * (local development without an API key, or an API outage).
 * Every page that renders these shows a "Sample data" notice.
 */
function spark(start: number, end: number, wobble: number): number[] {
  const points = 42;
  return Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    const base = start + (end - start) * t;
    return base + (Math.sin(i * 0.45) + 0.5 * Math.sin(i * 1.3)) * wobble * base;
  });
}

export const SAMPLE_MARKETS: CoinMarket[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", image: null, rank: 1, price: 57120.4, marketCap: 1.134e12, volume24h: 3.1e10, change24h: 2.14, change7d: 5.02, circulatingSupply: 19.9e6, maxSupply: 21e6, ath: null, sparkline: spark(54400, 57120, 0.01) },
  { id: "ethereum", symbol: "eth", name: "Ethereum", image: null, rank: 2, price: 1720.35, marketCap: 2.076e11, volume24h: 1.9e10, change24h: 1.08, change7d: -1.4, circulatingSupply: 120.6e6, maxSupply: null, ath: null, sparkline: spark(1745, 1720, 0.012) },
  { id: "tether", symbol: "usdt", name: "Tether", image: null, rank: 3, price: 0.9225, marketCap: 1.31e11, volume24h: 4.1e10, change24h: 0.01, change7d: 0.0, circulatingSupply: 142e9, maxSupply: null, ath: null, sparkline: spark(0.9224, 0.9225, 0.0003) },
  { id: "hyperliquid", symbol: "hype", name: "Hyperliquid", image: null, rank: 9, price: 78.4, marketCap: 2.6e10, volume24h: 1.4e9, change24h: 3.62, change7d: 11.8, circulatingSupply: 334e6, maxSupply: 1e9, ath: null, sparkline: spark(70.1, 78.4, 0.02) },
  { id: "ripple", symbol: "xrp", name: "XRP", image: null, rank: 4, price: 2.04, marketCap: 1.178e11, volume24h: 3.2e9, change24h: 0.47, change7d: -2.1, circulatingSupply: 57.7e9, maxSupply: 100e9, ath: null, sparkline: spark(2.08, 2.04, 0.015) },
  { id: "solana", symbol: "sol", name: "Solana", image: null, rank: 5, price: 162.4, marketCap: 7.74e10, volume24h: 3.6e9, change24h: -0.92, change7d: 8.31, circulatingSupply: 476e6, maxSupply: null, ath: null, sparkline: spark(150, 162.4, 0.02) },
  { id: "usd-coin", symbol: "usdc", name: "USDC", image: null, rank: 6, price: 0.9223, marketCap: 5.89e10, volume24h: 7.1e9, change24h: 0.0, change7d: 0.01, circulatingSupply: 63.8e9, maxSupply: null, ath: null, sparkline: spark(0.9222, 0.9223, 0.0003) },
  { id: "cardano", symbol: "ada", name: "Cardano", image: null, rank: 7, price: 0.62, marketCap: 2.2e10, volume24h: 6.1e8, change24h: 1.92, change7d: 3.4, circulatingSupply: 35.4e9, maxSupply: 45e9, ath: null, sparkline: spark(0.6, 0.62, 0.02) },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", image: null, rank: 8, price: 0.15, marketCap: 2.2e10, volume24h: 1.1e9, change24h: -1.35, change7d: -4.2, circulatingSupply: 148e9, maxSupply: null, ath: null, sparkline: spark(0.157, 0.15, 0.02) },
];
