import Link from "next/link";
import type { CoinMarket } from "@/lib/coins";
import { direction, formatChange, formatCompactEur, formatPrice } from "@/lib/format";
import { CoinBadge } from "./CoinBadge";
import { Sparkline } from "./Sparkline";

const strokeFor = (pct: number | null) => {
  const d = direction(pct);
  return d === "up" ? "var(--up)" : d === "down" ? "var(--down)" : "#6B7280";
};

export function MarketsTable({ coins, caption }: { coins: CoinMarket[]; caption: string }) {
  return (
    <div className="table-box">
      <table className="markets">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Asset</th>
            <th scope="col">Price</th>
            <th scope="col">24h</th>
            <th scope="col">7d</th>
            <th scope="col">Market cap</th>
            <th scope="col">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((c, i) => (
            <tr key={c.id}>
              <td className="muted">{c.rank ?? i + 1}</td>
              <td className="asset">
                <Link href={`/coins/${c.id}`} className="asset-link">
                  <CoinBadge id={c.id} name={c.name} image={c.image} />
                  <strong>{c.name}</strong>
                  <span className="muted">{c.symbol.toUpperCase()}</span>
                </Link>
              </td>
              <td>{formatPrice(c.price)}</td>
              <td className={direction(c.change24h)}>{formatChange(c.change24h)}</td>
              <td className={direction(c.change7d)}>{formatChange(c.change7d)}</td>
              <td>{formatCompactEur(c.marketCap)}</td>
              <td style={{ width: 120 }}>
                <Sparkline data={c.sparkline} stroke={strokeFor(c.change7d)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
