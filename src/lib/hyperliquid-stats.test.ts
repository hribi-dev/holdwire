import { test } from "node:test";
import assert from "node:assert/strict";
import { annualisedFundingPct, summarise, type HLMetaAndCtxs } from "./hyperliquid-stats";

const sample: HLMetaAndCtxs = [
  { universe: [{ name: "BTC" }, { name: "ETH" }, { name: "OLD", isDelisted: true }, { name: "HYPE" }] },
  [
    { dayNtlVlm: "1000000", openInterest: "10", markPx: "60000", funding: "0.0000125", prevDayPx: "50000" },
    { dayNtlVlm: "500000", openInterest: "100", markPx: "2000", funding: "-0.00001", prevDayPx: "2000" },
    { dayNtlVlm: "999999999", openInterest: "1", markPx: "1", funding: "0" },
    { dayNtlVlm: "2000000", openInterest: "1000", markPx: "80", funding: "0.00002" },
  ],
];

test("aggregates volume and open interest in USD, skipping delisted markets", () => {
  const s = summarise(sample)!;
  assert.equal(s.marketCount, 3);
  assert.equal(s.totalVolume24hUsd, 3_500_000);
  assert.equal(s.totalOpenInterestUsd, 10 * 60000 + 100 * 2000 + 1000 * 80);
});

test("ranks markets by volume and open interest", () => {
  const s = summarise(sample)!;
  assert.deepEqual(s.topByVolume.map((m) => m.name), ["HYPE", "BTC", "ETH"]);
  assert.deepEqual(s.topByOpenInterest.map((m) => m.name), ["BTC", "ETH", "HYPE"]);
});

test("computes 24h change from prevDayPx", () => {
  const btc = summarise(sample)!.topByOpenInterest[0];
  assert.equal(Math.round(btc.change24h!), 20);
});

test("returns null on malformed input", () => {
  assert.equal(summarise([] as unknown as HLMetaAndCtxs), null);
  assert.equal(summarise([{ universe: [] }, []]), null);
});

test("annualises hourly funding", () => {
  assert.equal(Math.round(annualisedFundingPct(0.0000125) * 100) / 100, 10.95);
});
