import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCandles, pickInterval, reactionFromCandles } from "./movers-calc";
import { EVENTS, PEOPLE } from "../content/movers";

const H = 3_600_000;

test("parses and sorts Hyperliquid candles, dropping bad rows", () => {
  const c = parseCandles([
    { t: 2 * H, o: "2", h: "3", l: "1", c: "2.5" },
    { t: 1 * H, o: "1", h: "1.2", l: "0.9", c: "1.1" },
    { t: "x", o: "1" },
  ]);
  assert.deepEqual(c.map((k) => k.t), [H, 2 * H]);
});

test("reaction measures change from the post candle open", () => {
  const candles = Array.from({ length: 30 }, (_, i) => ({ t: i * H, o: 100 + i, h: 101 + i, l: 99 + i, c: 100.5 + i }));
  const r = reactionFromCandles(candles, 5 * H + 10 * 60_000, H, [
    { label: "1h", ms: H },
    { label: "24h", ms: 24 * H },
  ]);
  assert.ok(r);
  assert.equal(r.base, 105);
  assert.equal(r.after[0].label, "1h");
  assert.ok(Math.abs(r.after[0].pct - ((106.5 - 105) / 105) * 100) < 1e-9);
  assert.ok(r.maxUpPct > 0);
});

test("no candle for the post time → null", () => {
  assert.equal(reactionFromCandles([{ t: 0, o: 1, h: 1, l: 1, c: 1 }], 10 * H, H, [{ label: "1h", ms: H }]), null);
});

test("interval choice respects the 5000-candle history", () => {
  assert.equal(pickInterval(3 * 24 * H)?.interval, "5m");
  assert.equal(pickInterval(100 * 24 * H)?.interval, "1h");
  assert.equal(pickInterval(400 * 24 * H), null);
});

test("every mover event has a known person, a source and an ISO date", () => {
  for (const e of EVENTS) {
    assert.ok(PEOPLE[e.person], e.slug);
    assert.ok(e.sources.length > 0, e.slug);
    assert.ok(!Number.isNaN(Date.parse(e.postedAt)), e.slug);
    assert.ok(e.summary.length < 220, `${e.slug} summary too long`);
  }
  assert.equal(new Set(EVENTS.map((e) => e.slug)).size, EVENTS.length);
});
