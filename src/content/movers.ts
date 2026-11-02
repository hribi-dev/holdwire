/**
 * Market movers: posts by influential people that moved prices.
 *
 * HOW TO ADD ONE (editor):
 * 1. Copy an entry. `postedAt` in UTC. If you know the exact minute, set precision "minute"
 *    and `hlCoin` (Hyperliquid perp symbol, e.g. "DOGE", "BTC", "kPEPE"): the site then measures
 *    the price reaction itself from Hyperliquid candles (works for posts in the last ~200 days).
 * 2. Paraphrase the post in `summary`. Quote at most a few words. Link the original post in
 *    `postUrl` when you have it, and at least one news source in `sources`.
 * 3. `reported` is what credible outlets reported; always attribute it.
 * Rules: no "buy" language, no predictions. This is a record of what happened.
 */

export type PersonId = "musk" | "trump" | "cz";

export const PEOPLE: Record<PersonId, { name: string; role: string; color: string; initials: string }> = {
  musk: { name: "Elon Musk", role: "CEO of Tesla and SpaceX, owner of X", color: "#0f172a", initials: "EM" },
  trump: { name: "Donald Trump", role: "President of the United States", color: "#b91c1c", initials: "DT" },
  cz: { name: "Changpeng Zhao (CZ)", role: "Binance co-founder", color: "#ca8a04", initials: "CZ" },
};

export type MoverEvent = {
  slug: string;
  person: PersonId;
  platform: "X" | "Truth Social";
  postedAt: string;
  precision: "minute" | "day" | "month";
  postUrl?: string;
  summary: string;
  assets: string[];
  hlCoin?: string;
  reported: string;
  lesson?: string;
  sources: { name: string; url: string }[];
};

export const MOVERS_REVIEWED_BY: string | null = null;

export const EVENTS: MoverEvent[] = [
  {
    slug: "cz-riddle-final-form-bull-2026-07",
    person: "cz",
    platform: "X",
    postedAt: "2026-07-05T00:00:00Z",
    precision: "day",
    summary: "CZ replied to a riddle meme on X. Within seconds, traders piled into a brand-new BNB Chain memecoin named after him.",
    assets: ["CZ (The Final Form Bull)"],
    reported: "Up more than 380x intraday to a peak market cap of about $80 million, according to on-chain data cited by BlockBeats.",
    lesson: "The top 100 wallets reportedly held about 84% of the supply. A post-driven spike in a new token is usually where late buyers lose most.",
    sources: [{ name: "KuCoin News, citing BlockBeats", url: "https://www.kucoin.com/blog/th-cz-memecoin-surges-380x-how-changpeng-zhao-s-tweet-triggered-a-80m-bsc-crypto-frenzy" }],
  },
  {
    slug: "trump-iran-strikes-cancelled-2026-06",
    person: "trump",
    platform: "Truth Social",
    postedAt: "2026-06-11T00:00:00Z",
    precision: "day",
    summary: "Trump said on Truth Social that he was calling off planned US strikes on Iran and that a multi-nation agreement was close.",
    assets: ["BTC"],
    hlCoin: "BTC",
    reported: "Bitcoin rose roughly 3% to above $63,000 the same day.",
    sources: [{ name: "The Defiant", url: "https://thedefiant.io/news/markets/bitcoin-rises-above-63000-trump-cancels-iran-strikes-peace-deal" }],
  },
  {
    slug: "musk-x-money-2026-03",
    person: "musk",
    platform: "X",
    postedAt: "2026-03-10T00:00:00Z",
    precision: "month",
    summary: "Musk announced early public access to X Money, the payments product inside X.",
    assets: ["DOGE"],
    hlCoin: "DOGE",
    reported: "Dogecoin spiked more than 10%, then gave most of it back, trading near $0.092 on 11 March.",
    lesson: "DOGE is not part of X Money. The move was speculation, and it faded fast.",
    sources: [{ name: "Finbold", url: "https://finbold.com/dogecoin-price-spikes-10-after-elon-musk-announces-x-money/" }],
  },
  {
    slug: "musk-doge-moon-2026-02",
    person: "musk",
    platform: "X",
    postedAt: "2026-02-03T00:00:00Z",
    precision: "day",
    summary: "Asked about his 2021 promise to put a Dogecoin on the Moon, Musk replied \"Maybe next year\".",
    assets: ["DOGE"],
    hlCoin: "DOGE",
    reported: "Reports put the jump at about 5% to 11% within hours, depending on the data source and time window.",
    sources: [
      { name: "CoinCentral (via MEXC News)", url: "https://www.mexc.com/news/631719" },
      { name: "Coinpedia (via MEXC News)", url: "https://www.mexc.com/news/624935" },
    ],
  },
  {
    slug: "trump-greenland-tariffs-2026-01",
    person: "trump",
    platform: "Truth Social",
    postedAt: "2026-01-21T00:00:00Z",
    precision: "day",
    summary: "After his Davos remarks, Trump posted a preliminary framework for a Greenland and Arctic deal and delayed planned tariffs.",
    assets: ["BTC"],
    hlCoin: "BTC",
    reported: "Bitcoin rebounded to around $90,000 after a volatile session.",
    sources: [{ name: "Bitcoin Magazine (via MEXC News)", url: "https://www.mexc.com/news/528416" }],
  },
  {
    slug: "cz-aster-stake-2025-11",
    person: "cz",
    platform: "X",
    postedAt: "2025-11-02T00:00:00Z",
    precision: "day",
    summary: "CZ shared a screenshot showing he holds more than 2 million ASTER, bought with his own money.",
    assets: ["ASTER"],
    reported: "ASTER jumped about 30%, from $0.91 to a peak of $1.26, per CoinGecko data cited by Cointelegraph.",
    sources: [{ name: "Cointelegraph", url: "https://cointelegraph.com/news/aster-token-surges-after-cz-buys-two-million-tokens" }],
  },
  {
    slug: "trump-love-trump-2025-03",
    person: "trump",
    platform: "Truth Social",
    postedAt: "2025-03-23T15:33:00Z",
    precision: "minute",
    summary: "Trump posted that he loves the $TRUMP memecoin, calling it the greatest of them all.",
    assets: ["TRUMP"],
    reported: "TRUMP rose more than 10% to about $12.25 and trading volume jumped, before the price retreated within hours.",
    sources: [
      { name: "The Block", url: "https://www.theblock.co/post/347641/trump-boosts-trump-memecoin-by-400-million-with-truth-social-post-sending-price-careening" },
      { name: "crypto.news", url: "https://crypto.news/trump-soars-above-12-after-trumps-truth-social-post/" },
    ],
  },
  {
    slug: "cz-tst-2025-02",
    person: "cz",
    platform: "X",
    postedAt: "2025-02-09T00:00:00Z",
    precision: "month",
    summary: "CZ posted about a BNB Chain tutorial video that showed a test token called TST, ending with \"happy trading!\".",
    assets: ["TST"],
    reported: "TST went from about $494,000 to over $52 million in market cap within about 30 minutes, then fell back sharply.",
    lesson: "TST was a test token, not a real project. CZ said no one at Binance held it.",
    sources: [{ name: "The Block", url: "https://www.theblock.co/amp/post/339228/bnb-chain-test-memecoin-tst-surged-cz" }],
  },
];
