import type { Metadata } from "next";
import { AssetHub } from "@/components/AssetHub";
import { getDict } from "@/i18n/server";
import { PAGE_REVIEWS } from "@/content/reviews";

const REVIEWED_BY = PAGE_REVIEWS.watches;

export const metadata: Metadata = {
  title: "Watches as assets: what holds value",
  description:
    "A plain-English guide to watches as an asset for European readers: what drives value, the real costs, where secondary-market prices come from and the risks.",
  alternates: { canonical: "/watches" },
  robots: REVIEWED_BY ? undefined : { index: false, follow: true },
};

export default async function Watches() {
  const { t } = await getDict();
  return (
    <AssetHub
      path="/watches"
      label="Watches"
      color="#b45309"
      tint="tint-amber"
      title={t.pages.watches.title}
      lede="A few references from a few brands hold or grow their value. Most watches don't. The secondary market decides, and it moves in cycles like any other."
      updated="2026-11-02"
      reviewedBy={REVIEWED_BY}
      drivers={[
        { title: "Brand and reference", body: "Demand concentrates in a small set of models. The same brand can have references that rise and others that sink." },
        { title: "Supply from the maker", body: "Waiting lists and discontinuations push secondary prices up; production increases pull them down." },
        { title: "Condition and papers", body: "Original box, papers, service history and unpolished cases make a large difference to resale value." },
        { title: "Market cycle", body: "Pre-owned prices rose sharply into 2022 and then corrected. Liquidity follows wider risk appetite, including crypto." },
      ]}
      risks={[
        "Dealer and platform fees mean you usually need a meaningful price rise just to break even.",
        "Fakes and 'Frankenwatches' with swapped parts are common; buy with authentication.",
        "Insurance, servicing and safe storage are ongoing costs.",
        "Selling can take weeks, and price indices show asking prices, not always what sells.",
      ]}
      trackers={[
        { name: "WatchCharts", url: "https://watchcharts.com", what: "Secondary-market price indices by brand and reference." },
        { name: "Chrono24", url: "https://www.chrono24.com", what: "Large marketplace; useful for listing prices and supply." },
        { name: "Knight Frank Wealth Report", url: "https://www.knightfrank.com/wealthreport", what: "Luxury Investment Index comparing watches with wine, art, cars and more." },
      ]}
      upcoming={[
        "How to buy a pre-owned watch safely in the EU",
        "Watch price indices explained: what they measure and what they miss",
        "Tokenised watches and collectibles: what you actually own",
      ]}
    />
  );
}
