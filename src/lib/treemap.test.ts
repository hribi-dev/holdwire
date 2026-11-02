import { test } from "node:test";
import assert from "node:assert/strict";
import { changeColor, moodBucket, moodScore, squarify } from "./treemap";

test("squarify fills the box and keeps areas proportional", () => {
  const items = [{ v: 6 }, { v: 6 }, { v: 4 }, { v: 3 }, { v: 2 }, { v: 2 }, { v: 1 }];
  const rects = squarify(items, (d) => d.v, 100, 50);
  assert.equal(rects.length, items.length);
  const area = rects.reduce((a, r) => a + r.w * r.h, 0);
  assert.ok(Math.abs(area - 5000) < 1e-6);
  const r0 = rects[0];
  assert.ok(Math.abs((r0.w * r0.h) / 5000 - 6 / 24) < 1e-9);
  for (const r of rects) {
    assert.ok(r.x >= -1e-9 && r.y >= -1e-9 && r.x + r.w <= 100 + 1e-6 && r.y + r.h <= 50 + 1e-6);
  }
});

test("squarify ignores zero and negative values", () => {
  assert.equal(squarify([{ v: 0 }, { v: -1 }], (d) => d.v).length, 0);
});

test("mood score and buckets", () => {
  assert.deepEqual(moodScore([1, 2, -1, null, 3]), { score: 75, up: 3, total: 4 });
  assert.equal(moodScore([]).score, 50);
  assert.equal(moodBucket(10), 0);
  assert.equal(moodBucket(50), 2);
  assert.equal(moodBucket(95), 4);
});

test("changeColor is green up, red down, grey unknown", () => {
  assert.match(changeColor(5), /^hsl\(152/);
  assert.match(changeColor(-5), /^hsl\(2 /);
  assert.equal(changeColor(null), "#334155");
});
