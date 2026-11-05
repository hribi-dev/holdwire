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

export type PersonId = "musk" | "trump" | "cz" | "saylor" | "schiff" | "hayes" | "lee" | "alden" | "pal" | "vitalik";

export type Focus = "Bitcoin" | "Gold" | "Macro" | "Ethereum" | "Memecoins";

export type Person = {
  name: string;
  role: string;
  color: string;
  initials: string;
  /** Profile on the platform they post on. */
  profileUrl: string;
  handle: string;
  focus: Focus[];
  /** Their latest notable take, paraphrased, with the source. Keep it factual: what they said, not whether they're right. */
  take?: { date: string; text: string; source: { name: string; url: string } };
};

/**
 * People whose posts move prices or are worth reading for context. Not endorsements: several of them
 * disagree with each other on purpose (bitcoin vs gold), and none of this is investment advice.
 */
export const PEOPLE: Record<PersonId, Person> = {
  musk: {
    name: "Elon Musk",
    role: "CEO of Tesla and SpaceX, owner of X",
    color: "#475569",
    initials: "EM",
    handle: "@elonmusk",
    profileUrl: "https://x.com/elonmusk",
    focus: ["Memecoins", "Bitcoin"],
    take: {
      date: "2026-10-30",
      text: "Warned that superintelligent AI agents could one day exploit crypto systems, while saying there was no evidence AI played a part in the Binance hack.",
      source: { name: "Crypto Briefing", url: "https://cryptobriefing.com/elon-musk-ai-hacks-crypto-binance/" },
    },
  },
  trump: {
    name: "Donald Trump",
    role: "President of the United States",
    color: "#b91c1c",
    initials: "DT",
    handle: "@realDonaldTrump",
    profileUrl: "https://truthsocial.com/@realDonaldTrump",
    focus: ["Bitcoin", "Macro"],
  },
  cz: {
    name: "Changpeng Zhao (CZ)",
    role: "Binance co-founder",
    color: "#ca8a04",
    initials: "CZ",
    handle: "@cz_binance",
    profileUrl: "https://x.com/cz_binance",
    focus: ["Bitcoin", "Memecoins"],
    take: {
      date: "2026-09-01",
      text: "Said growth in his own X follower count has been a consistent early signal of new market cycles, and that the harshest crypto winter is behind us.",
      source: { name: "Coin Alert News", url: "https://coinalertnews.com/news/2026/09/01/cz-crypto-winter-over" },
    },
  },
  saylor: {
    name: "Michael Saylor",
    role: "Executive chairman of Strategy, the largest corporate bitcoin holder",
    color: "#ea580c",
    initials: "MS",
    handle: "@saylor",
    profileUrl: "https://x.com/saylor",
    focus: ["Bitcoin"],
    take: {
      date: "2026-11-04",
      text: "After the midterms, pointed out on X that Florida elected a Republican governor who backed a US bitcoin reserve while Texas elected a Democratic senator who voted for a state one, and said the case for holding bitcoin crosses party lines.",
      source: { name: "Bitcoin.com News", url: "https://news.bitcoin.com/featured/saylor-links-republican-and-democratic-wins-to-bitcoin-reserves/" },
    },
  },
  schiff: {
    name: "Peter Schiff",
    role: "Economist and gold advocate, long-time bitcoin critic",
    color: "#b45309",
    initials: "PS",
    handle: "@PeterSchiff",
    profileUrl: "https://x.com/PeterSchiff",
    focus: ["Gold", "Macro", "Bitcoin"],
    take: {
      date: "2026-11-04",
      text: "Said a Democratic takeover of Congress could be bullish for gold and silver, expecting more spending and bigger deficits that could push the Fed back towards quantitative easing to contain bond yields. Gold rose back above $4,000 the same day.",
      source: { name: "Investing News Network", url: "https://investingnews.com/gold-climbs-after-democratic-win/" },
    },
  },
  hayes: {
    name: "Arthur Hayes",
    role: "BitMEX co-founder, CIO of Maelstrom; writes long macro essays",
    color: "#7c3aed",
    initials: "AH",
    handle: "@CryptoHayes",
    profileUrl: "https://x.com/CryptoHayes",
    focus: ["Macro", "Bitcoin", "Ethereum"],
    take: {
      date: "2026-09-02",
      text: "Said bitcoin should grind higher from here but named Ethereum as his top pick, arguing it could rise three to five times relatively quickly.",
      source: { name: "Cointelegraph Magazine", url: "https://cointelegraph.com/magazine/btc-will-hit-1m-by-2030-but-arthur-hayes-is-buying-eth-instead" },
    },
  },
  lee: {
    name: "Tom Lee",
    role: "Fundstrat co-founder and BitMine chairman; often compares bitcoin with gold",
    color: "#0e7490",
    initials: "TL",
    handle: "@fundstrat",
    profileUrl: "https://x.com/fundstrat",
    focus: ["Bitcoin", "Gold", "Ethereum"],
    take: {
      date: "2026-11-02",
      text: "Called the Binance hack a terrible development but said the muted market reaction was constructive: ether fell about 4% after it was disclosed, against 8% after the 2025 Bybit theft. BitMine added 8,573 ETH that week, bringing its holdings to about 6.06 million ETH.",
      source: { name: "The Block", url: "https://www.theblock.co/news/business/2026-11-02-bitmine-adds-8573-eth-tom-lee-flags-muted-binance-hack-reaction-432307" },
    },
  },
  alden: {
    name: "Lyn Alden",
    role: "Macro analyst, author of Broken Money; writes on the dollar system, gold and bitcoin",
    color: "#0f766e",
    initials: "LA",
    handle: "@LynAldenContact",
    profileUrl: "https://x.com/LynAldenContact",
    focus: ["Macro", "Gold", "Bitcoin"],
  },
  pal: {
    name: "Raoul Pal",
    role: "Founder of Real Vision and Global Macro Investor",
    color: "#be185d",
    initials: "RP",
    handle: "@RaoulGMI",
    profileUrl: "https://x.com/RaoulGMI",
    focus: ["Macro", "Bitcoin"],
  },
  vitalik: {
    name: "Vitalik Buterin",
    role: "Ethereum co-founder",
    color: "#4f46e5",
    initials: "VB",
    handle: "@VitalikButerin",
    profileUrl: "https://x.com/VitalikButerin",
    focus: ["Ethereum"],
  },
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
    slug: "musk-binance-ftx-emoji-2026-10",
    person: "musk",
    platform: "X",
    postedAt: "2026-10-30T04:33:58Z",
    precision: "minute",
    postUrl: "https://x.com/elonmusk/status/2116025797400236362",
    summary: "Hours after the Binance hack, Musk added a grimacing emoji to a post comparing Binance with FTX's 2022 promises. CZ replied: \"bad time to troll. Please stop.\"",
    assets: ["BNB", "BTC"],
    hlCoin: "BNB",
    reported: "Forbes did not attribute a price move to the post itself. Bitcoin had already fallen to about $76,000 after the hack, almost 10% below where it started the month.",
    lesson: "Not every big post moves the price. In a market already reacting to real news, a post can add noise without changing the trend.",
    sources: [{ name: "Forbes", url: "https://www.forbes.com/sites/digital-assets/2026/10/30/please-stop-binance-founder-begs-elon-musk-after-massive-hack-triggers-bitcoin-and-crypto-price-crash-fears/" }],
  },
  {
    slug: "musk-interesting-hype-2026-10",
    person: "musk",
    platform: "X",
    postedAt: "2026-10-29T15:08:10Z",
    precision: "minute",
    postUrl: "https://x.com/elonmusk/status/2115823011399938182",
    summary: "Musk replied \"Interesting\" to an apparent Stanley Druckenmiller post saying he had invested in trade.xyz, which is partnering with ICE on Hyperliquid-style perps for the US.",
    assets: ["HYPE"],
    hlCoin: "HYPE",
    reported: "HYPE rose about 20% within hours, according to Forbes.",
    lesson: "A one-word reply was enough. The underlying news (ICE and trade.xyz) was real; the post put it in front of a much bigger audience.",
    sources: [
      { name: "Forbes", url: "https://www.forbes.com/sites/digital-assets/2026/10/29/interesting-elon-musk-sends-price-of-tiny-bitcoin-rival-soaring-on-big-day-for-crypto/" },
    ],
  },
  {
    slug: "trump-no-iran-strike-midterms-2026-10",
    person: "trump",
    platform: "Truth Social",
    postedAt: "2026-10-08T00:00:00Z",
    precision: "day",
    summary: "Trump posted that the US would not attack Iran before the 3 November midterm elections.",
    assets: ["BTC"],
    hlCoin: "BTC",
    reported: "Bitcoin recovered to around $82,500 from a low near $80,300, though it was still about 4% down on the week. Brent crude slipped about 1% to around $103.",
    sources: [{ name: "CoinDesk", url: "https://www.coindesk.com/markets/2026/10/09/bitcoin-steadies-near-usd82-500-after-trump-rules-out-iran-strike-before-midterms" }],
  },
  {
    slug: "trump-banks-genius-act-2026-03",
    person: "trump",
    platform: "Truth Social",
    postedAt: "2026-03-03T00:00:00Z",
    precision: "day",
    summary: "Trump accused big US banks of trying to undermine the GENIUS Act and warned them not to hold the pending CLARITY Act hostage, calling it part of his crypto agenda.",
    assets: ["BTC", "ETH", "XRP"],
    hlCoin: "BTC",
    reported: "By the next day bitcoin was up 4.4% to $70,896, ether 3.1% to $2,050 and XRP 2.3% to $1.39. Fast Company noted the post was likely not the only factor.",
    sources: [{ name: "Fast Company", url: "https://www.fastcompany.com/91502477/bitcoin-xrp-price-rising-today-trump-boost-crypto-digital-assets" }],
  },
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
