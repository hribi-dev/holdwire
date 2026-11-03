import type { Metadata } from "next";
import { Suspense } from "react";
import { getTopCoins } from "@/lib/coins";
import { MarketsTable } from "@/components/MarketsTable";
import { marketsLabels } from "@/i18n/labels";
import { getDict } from "@/i18n/server";
import { MarketHeatmap } from "@/components/viz/MarketHeatmap";
import { RelatedNews } from "@/components/RelatedNews";

export const metadata: Metadata = {
  title: "Cryptocurrency prices today in euros: top 50 by market cap",
  description: "Live prices in EUR for the 50 largest cryptocurrencies, with 24h and 7-day changes, market caps and charts.",
  alternates: { canonical: "/coins" },
};

async function Table() {
  const [{ coins, sample }, { t, intl }] = await Promise.all([getTopCoins(50), getDict()]);
  return (
    <>
      {sample && <span className="sample-flag" style={{ alignSelf: "flex-start" }}>{t.common.sample}</span>}
      <MarketHeatmap
        coins={coins.filter((c) => c.marketCap).slice(0, 40).map((c) => ({ id: c.id, symbol: c.symbol, name: c.name, marketCap: c.marketCap ?? 0, price: c.price, change24h: c.change24h }))}
        intl={intl}
        labels={{ marketCap: t.viz.marketCap, price: t.viz.price, change24h: t.viz.change24h, hover: t.viz.hover }}
      />
      <MarketsTable coins={coins} caption={t.pages.markets.lede} labels={marketsLabels(t)} />
    </>
  );
}

export default async function CoinsPage() {
  const { t } = await getDict();
  return (
    <main className="wrap page" style={{ gap: 20 }}>
      <div className="stack" style={{ gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>{t.pages.markets.title}</h1>
        <p className="muted" style={{ margin: 0 }}>{t.pages.markets.lede}</p>
      </div>
      <Suspense fallback={<p className="muted">{t.common.loading}</p>}>
        <Table />
      </Suspense>
      <RelatedNews categories={["Markets", "Security", "Regulation"]} />
      <p className="notice">Prices are indicative and may be delayed. Nothing on this page is investment advice.</p>
    </main>
  );
}
