import type { Metadata } from "next";
import { Suspense } from "react";
import { getTopCoins } from "@/lib/coins";
import { MarketsTable } from "@/components/MarketsTable";

export const metadata: Metadata = {
  title: "Cryptocurrency prices today in euros: top 50 by market cap",
  description: "Live prices in EUR for the 50 largest cryptocurrencies, with 24h and 7-day changes, market caps and charts.",
  alternates: { canonical: "/coins" },
};

async function Table() {
  const { coins, sample } = await getTopCoins(50);
  return (
    <>
      {sample && <span className="sample-flag" style={{ alignSelf: "flex-start" }}>Sample data: live prices unavailable</span>}
      <MarketsTable coins={coins} caption="Top 50 cryptocurrencies by market cap, prices in euros" />
    </>
  );
}

export default function CoinsPage() {
  return (
    <main className="wrap page" style={{ gap: 20 }}>
      <div className="stack" style={{ gap: 8 }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>Cryptocurrency prices today</h1>
        <p className="muted" style={{ margin: 0 }}>The 50 largest cryptocurrencies by market capitalisation, priced in euros.</p>
      </div>
      <Suspense fallback={<p className="muted">Loading prices…</p>}>
        <Table />
      </Suspense>
      <p className="notice">Prices are indicative and may be delayed. Nothing on this page is investment advice.</p>
    </main>
  );
}
