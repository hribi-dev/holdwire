import { test } from "node:test";
import assert from "node:assert/strict";
import { NEOBANKS, affiliateHref, ranked, type Neobank } from "./neobanks";

test("every provider has sources, a check date and https URLs", () => {
  for (const n of NEOBANKS) {
    assert.ok(n.sources.length > 0, `${n.slug} needs a source`);
    assert.match(n.checked, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(n.url.startsWith("https://"));
    if (n.affiliateUrl) assert.ok(n.affiliateUrl.startsWith("https://"), `${n.slug} affiliate URL must be https`);
  }
});

test("Tria is listed", () => {
  assert.ok(NEOBANKS.some((n) => n.slug === "tria"));
});

test("no affiliate link for providers without EU authorisation", () => {
  const base = NEOBANKS[0];
  const unlicensed: Neobank = { ...base, euAuthorised: false, affiliateUrl: "https://example.com/ref" };
  const licensed: Neobank = { ...base, euAuthorised: true, affiliateUrl: "https://example.com/ref" };
  assert.equal(affiliateHref(unlicensed), null);
  assert.equal(affiliateHref(licensed), "https://example.com/ref");
});

test("ranking ignores affiliate status", () => {
  const withLink = NEOBANKS.map((n) => ({ ...n, affiliateUrl: n.slug === "wirex" ? "https://x.test" : null }));
  assert.deepEqual(
    ranked(withLink).map((n) => n.slug),
    ranked(NEOBANKS).map((n) => n.slug),
  );
});
