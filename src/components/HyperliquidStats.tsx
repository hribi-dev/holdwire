import { getHyperliquidStats } from "@/lib/hyperliquid";
import { annualisedFundingPct } from "@/lib/hyperliquid-stats";

const usd = (v: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 }).format(v);
const px = (v: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "USD", maximumFractionDigits: v >= 100 ? 2 : v >= 1 ? 3 : 6 }).format(v);

export async function HyperliquidStats() {
  const data = await getHyperliquidStats();
  if (!data) {
    return (
      <p className="notice">
        Live exchange data from Hyperliquid&apos;s public API isn&apos;t available right now. It refreshes about every minute.
      </p>
    );
  }
  const { stats } = data;
  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="stats">
        <div className="stat">
          <div className="label">24h trading volume</div>
          <div className="value">{usd(stats.totalVolume24hUsd)}</div>
        </div>
        <div className="stat">
          <div className="label">Open interest</div>
          <div className="value">{usd(stats.totalOpenInterestUsd)}</div>
        </div>
        <div className="stat">
          <div className="label">Live perp markets</div>
          <div className="value">{stats.marketCount}</div>
        </div>
        <div className="stat">
          <div className="label">Data refresh</div>
          <div className="value">~1 min</div>
        </div>
      </div>
      <div className="table-box">
        <table className="markets" style={{ minWidth: 560 }}>
          <caption className="sr-only">Top Hyperliquid perpetual markets by 24-hour volume</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Market</th>
              <th scope="col">Mark price</th>
              <th scope="col">24h volume</th>
              <th scope="col">Open interest</th>
              <th scope="col">Funding (annualised)</th>
            </tr>
          </thead>
          <tbody>
            {stats.topByVolume.map((m, i) => {
              const f = annualisedFundingPct(m.fundingHourly);
              return (
                <tr key={m.name}>
                  <td className="muted">{i + 1}</td>
                  <td className="asset">
                    <strong>{m.name}-PERP</strong>
                  </td>
                  <td>{px(m.markPx)}</td>
                  <td>{usd(m.volume24hUsd)}</td>
                  <td>{usd(m.openInterestUsd)}</td>
                  <td className={f > 0 ? "up" : f < 0 ? "down" : "flat"}>
                    {f > 0 ? "▲ " : f < 0 ? "▼ " : ""}
                    {Math.abs(f).toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="tiny muted" style={{ margin: 0 }}>
        Source: Hyperliquid public API, core perpetual markets in US dollars (HIP-3 builder markets not included). Positive funding means
        longs pay shorts. Funding is paid hourly and shown here annualised.
      </p>
    </div>
  );
}
