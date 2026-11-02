/**
 * Crypto-friendly neobanks and card programmes we compare on /fintech.
 *
 * RULES (see docs/plan/06-MONETIZATION.md and the advertising policy):
 * - Order on the page is by the published criteria in `CRITERIA`, never by payout.
 * - `affiliateUrl` is the only place affiliate links live. Paste the URL from your
 *   affiliate dashboard here; the page adds rel="sponsored" and the label itself.
 * - An affiliate link is only rendered when `euAuthorised` is true (we only
 *   send readers via paid links to providers authorised to serve them). For a
 *   provider without confirmed EU authorisation we show a plain, unpaid link.
 * - Every factual line needs a source in `sources` and a `checked` date. Re-check
 *   licences monthly against the ESMA interim MiCA register.
 */

export type Custody = "self-custodial" | "custodial";

export type Neobank = {
  slug: string;
  name: string;
  url: string;
  affiliateUrl: string | null;
  custody: Custody;
  card: string;
  euAuthorised: boolean;
  licence: string;
  bestFor: string;
  pros: string[];
  watchOuts: string[];
  sources: { name: string; url: string }[];
  checked: string;
};

export const NEOBANKS_REVIEWED_BY: string | null = null;
export const NEOBANKS_UPDATED = "2026-11-02";

export const CRITERIA = [
  { title: "Can you legally use it?", body: "Authorisation that covers EU residents comes first. Without it, you get fewer protections if something goes wrong." },
  { title: "Who holds the money?", body: "Custodial apps hold your balance for you. Self-custodial cards spend from a wallet only you control, which moves the security risk onto smart contracts and you." },
  { title: "What it really costs", body: "Card or tier fees, FX mark-up and crypto conversion spreads, not headline cashback." },
  { title: "Track record", body: "Years operating, security incidents and how they were handled." },
];

export const NEOBANKS: Neobank[] = [
  {
    slug: "bitpanda",
    name: "Bitpanda",
    url: "https://www.bitpanda.com",
    affiliateUrl: null,
    custody: "custodial",
    card: "Visa debit",
    euAuthorised: true,
    licence: "MiCA licences in Austria (FMA), Germany (BaFin) and Malta (MFSA).",
    bestFor: "EU investors who want one app for crypto, metals and tokenised stocks, with a card on top.",
    pros: ["Built in Vienna, regulated in three EU countries", "Spend from a wide range of assets"],
    watchOuts: ["Custodial: Bitpanda holds your assets", "Cashback terms and caps change; check the current tier table"],
    sources: [{ name: "Blockspot, best crypto cards 2026", url: "https://blockspot.io/best-crypto-cards/" }],
    checked: "2026-11-02",
  },
  {
    slug: "revolut",
    name: "Revolut",
    url: "https://www.revolut.com",
    affiliateUrl: null,
    custody: "custodial",
    card: "Visa / Mastercard debit",
    euAuthorised: true,
    licence: "EU deposits at Revolut Bank UAB (Bank of Lithuania / ECB). MiCA licence via Cyprus (CySEC) for crypto.",
    bestFor: "Everyday euro banking first, with crypto as an extra.",
    pros: ["A real bank for EU deposits", "Mainstream payments, transfers and savings in one app"],
    watchOuts: ["Custodial crypto; withdrawals to your own wallet depend on the token", "Fees apply when spending non-stablecoin crypto"],
    sources: [{ name: "Blockspot, best crypto cards 2026", url: "https://blockspot.io/best-crypto-cards/" }],
    checked: "2026-11-02",
  },
  {
    slug: "gnosis-pay",
    name: "Gnosis Pay",
    url: "https://gnosispay.com",
    affiliateUrl: null,
    custody: "self-custodial",
    card: "Visa debit",
    euAuthorised: true,
    licence: "Card issued by Monavate Limited, an FCA-authorised e-money institution, under licence from Visa Europe.",
    bestFor: "On-chain users who want to spend from their own Safe smart account.",
    pros: ["Spends straight from a wallet you control", "Every payment is visible on-chain"],
    watchOuts: [
      "Exploit on 1 June 2026 hit the card-wallet modules; Gnosis pledged to cover user losses and is rolling out a new version",
      "You manage a smart account, so mistakes are yours to fix",
    ],
    sources: [
      { name: "Gnosis Pay post-mortem", url: "https://gnosispay.com/blog/post-mortem-gnosis-pay-vulnerability-exploit" },
      { name: "The Block, 1 June 2026", url: "https://www.theblock.co/post/403147/gnosis-will-cover-all-user-losses-amid-exploit-related-to-gnosis-pay-co-founder-koppelmann-says" },
    ],
    checked: "2026-11-02",
  },
  {
    slug: "tria",
    name: "Tria",
    url: "https://tria.so",
    affiliateUrl: null,
    custody: "self-custodial",
    card: "Visa (virtual and physical tiers)",
    euAuthorised: false,
    licence: "No MiCA authorisation found for the card programme as of our last check. Card terms are governed by Puerto Rico law.",
    bestFor: "Multi-chain users who want one self-custodial account and card across many networks.",
    pros: ["Self-custodial (MPC) wallet with no seed phrase to manage", "Spend from many tokens across many chains"],
    watchOuts: [
      "Not authorised under MiCA as far as we can find, so EU protections are limited",
      "Tier fee is paid before identity checks and isn't refunded if you're rejected",
      "Not available to US residents",
    ],
    sources: [
      { name: "Tria (official)", url: "https://tria.so" },
      { name: "Crypto Cards, Tria tiers", url: "https://www.cryptocards.so/de/company/tria" },
      { name: "Tria card terms discussion (mydealz)", url: "https://www.mydealz.de/deals/tria-visa-karte-bis-zu-6-cashback-brutto-mit-debitkarte-2775166" },
    ],
    checked: "2026-11-02",
  },
  {
    slug: "wirex",
    name: "Wirex",
    url: "https://wirexapp.com",
    affiliateUrl: null,
    custody: "custodial",
    card: "Visa / Mastercard debit",
    euAuthorised: false,
    licence: "EEA crypto business based in Italy. MiCA status not yet confirmed on the ESMA register in our last check.",
    bestFor: "Travellers who want low FX costs and a long-running crypto card.",
    pros: ["Issuing crypto cards for over a decade", "No extra FX mark-up on foreign spending"],
    watchOuts: ["Custodial", "Confirm MiCA status on the ESMA register before signing up"],
    sources: [
      { name: "The Fintech Times, Wirex Italy base", url: "https://thefintechtimes.com/wirex-selects-italy-as-strategic-base-for-crypto-business-and-unveils-local-appointments/" },
      { name: "CoinDataFlow, best crypto cards 2026", url: "https://coindataflow.com/clue/best-crypto-card-services" },
    ],
    checked: "2026-11-02",
  },
];

/** Affiliate links only for providers authorised to serve EU readers. */
export function affiliateHref(n: Neobank): string | null {
  return n.euAuthorised && n.affiliateUrl ? n.affiliateUrl : null;
}

/** Ranking by published criteria: EU authorisation first, then name. Never by payout. */
export function ranked(list: Neobank[] = NEOBANKS): Neobank[] {
  return [...list].sort((a, b) => Number(b.euAuthorised) - Number(a.euAuthorised) || a.name.localeCompare(b.name));
}
