import { test } from "node:test";
import assert from "node:assert/strict";
import { baseSymbol, formatAge, isPumpDex, parsePools } from "./memes-parse";

const now = Date.parse("2026-11-02T12:00:00Z");

const sample = {
  data: [
    {
      id: "solana_AAA",
      attributes: {
        name: "WIF / SOL",
        address: "AAA",
        base_token_price_usd: "1.23",
        reserve_in_usd: "5000000",
        volume_usd: { h24: "12000000" },
        price_change_percentage: { h24: "-4.5" },
        transactions: { h24: { buys: 1000, sells: 900 } },
        market_cap_usd: null,
        fdv_usd: "1230000000",
        pool_created_at: "2026-11-01T12:00:00Z",
      },
      relationships: { dex: { data: { id: "raydium" } } },
    },
    {
      id: "solana_BBB",
      attributes: { name: "TINY / SOL", address: "BBB", base_token_price_usd: "0.0001", reserve_in_usd: "900" },
      relationships: { dex: { data: { id: "pumpswap" } } },
    },
    { id: "bad", attributes: { name: "NOPRICE / SOL", address: "CCC" } },
  ],
};

test("parses pools and applies the liquidity floor", () => {
  const pools = parsePools(sample, "solana", { minLiquidityUsd: 20_000, now });
  assert.equal(pools.length, 1);
  const [p] = pools;
  assert.equal(p.symbol, "WIF");
  assert.equal(p.dex, "raydium");
  assert.equal(p.change24h, -4.5);
  assert.equal(p.marketCapUsd, 1_230_000_000); // falls back to FDV
  assert.equal(p.ageHours, 24);
  assert.equal(p.url, "https://www.geckoterminal.com/solana/pools/AAA");
});

test("garbage input returns an empty list", () => {
  assert.deepEqual(parsePools(null, "solana", { minLiquidityUsd: 0, now }), []);
  assert.deepEqual(parsePools({ data: "x" }, "solana", { minLiquidityUsd: 0, now }), []);
});

test("helpers", () => {
  assert.equal(baseSymbol("BONK / SOL 0.25%"), "BONK");
  assert.ok(isPumpDex("PumpSwap"));
  assert.ok(!isPumpDex("raydium"));
  assert.equal(formatAge(0.5), "<1h");
  assert.equal(formatAge(30), "30h");
  assert.equal(formatAge(24 * 10), "10d");
});
