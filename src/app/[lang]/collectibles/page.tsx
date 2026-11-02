import type { Metadata } from "next";
import { AssetHub } from "@/components/AssetHub";
import { getDict } from "@/i18n/server";

const REVIEWED_BY: string | null = null;

export const metadata: Metadata = {
  title: "Collectibles and hard assets beyond crypto: cards, wine, art, cars",
  description:
    "Trading cards, fine wine, art and classic cars as assets, explained for European readers: what the indices track, the costs, and the risks.",
  alternates: { canonical: "/collectibles" },
  robots: REVIEWED_BY ? undefined : { index: false, follow: true },
};

export default async function Collectibles() {
  const { t } = await getDict();
  return (
    <AssetHub
      path="/collectibles"
      label="Collectibles"
      color="#6d28d9"
      tint="tint-violet"
      title={t.pages.collectibles.title}
      lede="Cards, wine, art and cars all have price indices, auctions and their own fans. They also share the same problems: thin markets, high fees and condition that makes or breaks the price."
      updated="2026-11-02"
      reviewedBy={REVIEWED_BY}
      drivers={[
        { title: "Scarcity you can verify", body: "Graded population counts for cards, production numbers for cars, vintages for wine." },
        { title: "Condition and provenance", body: "A grade, a cellar record or an ownership history can be worth more than the object's age." },
        { title: "Cultural demand", body: "Prices follow what a generation of buyers grew up with, which shifts over time." },
        { title: "Access", body: "Fractional and tokenised platforms let smaller buyers in, but you usually own a share in a company, not the item." },
      ]}
      risks={[
        "Auction premiums and seller fees can take a large share of the sale price.",
        "Few buyers at any moment, so selling quickly often means selling cheaply.",
        "Storage, insurance and authentication cost money every year.",
        "Indices are built from auction results and can lag or flatter the market.",
      ]}
      trackers={[
        { name: "Liv-ex", url: "https://www.liv-ex.com", what: "Fine-wine exchange and the Fine Wine 100 index." },
        { name: "Hagerty Valuation Tools", url: "https://www.hagerty.com/valuation-tools", what: "Classic-car values by model and condition." },
        { name: "PSA Population Report", url: "https://www.psacard.com/pop", what: "How many graded copies of a trading card exist." },
        { name: "Artprice", url: "https://www.artprice.com", what: "Auction results and art-market indices." },
        { name: "Knight Frank Wealth Report", url: "https://www.knightfrank.com/wealthreport", what: "Luxury Investment Index across ten asset classes." },
      ]}
      upcoming={[
        "Trading cards as an asset: grading, population reports and fees",
        "Fine wine for beginners: bonded storage, Liv-ex and what it costs",
        "Fractional ownership platforms in the EU: what you actually own",
      ]}
    />
  );
}
