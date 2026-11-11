import { PAGE_REVIEWS } from "./reviews";
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
      date: "2026-11-09",
      text: "Urged the crypto industry to drop its infighting, arguing that most crypto prices move together so damage to one project spreads to all, and summed it up as \"decentralized but united\".",
      source: { name: "TokenPost", url: "https://www.tokenpost.com/news/insights/52247" },
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
      date: "2026-11-09",
      text: "Posted Strategy's purchase-tracker chart on X with the caption \"Connecting the dots\" the day before the company reported buying 1,036 bitcoin for about $82 million at an average of $79,012. Strategy now holds 850,364 BTC at an average cost of about $75,456, close to where bitcoin trades.",
      source: { name: "The Block", url: "https://www.theblock.co/news/business/2026-11-09-connecting-the-dots-michael-saylor-strategy-bitcoin-436094" },
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
      date: "2026-11-10",
      text: "As bitcoin fell after the hot US inflation data, pointed out that it is down about 16.5% in 2026 after a 6.34% loss in 2025, and said that if the year ends lower it would be bitcoin's first back-to-back annual losses in its history.",
      source: { name: "TokenPost", url: "https://www.tokenpost.com/news/investing/53217" },
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
      date: "2026-11-05",
      text: "In his essay \"D is for Dilution\", argued that share unlocks after huge AI listings such as SpaceX, Anthropic and OpenAI could soak up investor money and tighten bank lending, a near-term headwind for bitcoin, and said his fund Maelstrom will stay on the sidelines until dollar liquidity improves. He expects central banks to ease eventually if an AI financing crunch develops.",
      source: { name: "crypto.news", url: "https://crypto.news/arthur-hayes-ai-ipo-dilution-bitcoin-liquidity/" },
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
      date: "2026-11-09",
      text: "Said Vitalik Buterin's Devcon remark that ETH is a store of value and money marks a major shift, and argued ETH's value will come from serving as trusted collateral for tokenization and AI rather than from cash flows. BitMine added 9,587 ETH that week, taking its holdings to 6,070,092 ETH, about 4.97% of supply.",
      source: { name: "The Block", url: "https://www.theblock.co/news/business/2026-11-09-tom-lee-bitmine-nears-ethereum-supply-target-20-million-eth-tokenization-ai-supercycle-436219" },
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
    take: {
      date: "2026-11-08",
      text: "In an X thread, argued that ETH should be valued mainly as a store of value rather than on the fees it burns, saying the burn is fine to keep but holders should not depend on it, and that survival and stability, such as post-quantum security, matter most.",
      source: { name: "The Block", url: "https://theblock.co/news/ecosystems/2026-11-08-vitalik-buterin-says-eth-should-be-valued-as-a-store-of-value-not-a-fee-burning-token-436022" },
    },
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

export const MOVERS_REVIEWED_BY: string | null = PAGE_REVIEWS.movers;

export const EVENTS: MoverEvent[] = [
  {
    slug: "musk-cz-meme-green-morning-2026-11",
    person: "musk",
    platform: "X",
    postedAt: "2026-11-06T00:00:00Z",
    precision: "day",
    summary: "During the crypto sell-off, Musk replied to a \"good morning from Japan, let's check the market\" post by Dogecoin co-creator Billy Markus with a meme image of CZ. CZ answered with a video-game meme of his own.",
    assets: ["GM (Green Morning)", "BTC"],
    reported: "A tiny BNB Chain memecoin linked to an earlier CZ selfie, Green Morning (GM), jumped more than 259% to a market cap above $3 million, according to Bloomingbit citing GMGN data; The Coin Republic reported gains of over 900% at the peak after Binance co-CEO He Yi also reposted, citing CoinGecko. None of the outlets tied bitcoin's move to the post: it was already down about 6%, near $75,600, after the AI-led stock rout.",
    lesson: "A joke image can send a microcap worth a few million dollars up several times over in a short time. The big coins ignored it; the moves happened where there was almost no liquidity.",
    sources: [
      { name: "Bloomingbit", url: "https://en.bloomingbit.io/feed/news/123804" },
      { name: "The Coin Republic", url: "https://www.thecoinrepublic.com/2026/11/06/elon-musk-shares-cz-meme-as-crypto-market-selloff-hits-bitcoin/" },
    ],
  },
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
