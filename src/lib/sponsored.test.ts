import { test } from "node:test";
import assert from "node:assert/strict";
import { enforceSponsoredLinks, isExternal, robotsFor } from "./sponsored";

test("adds rel=sponsored noopener to external links", () => {
  const out = enforceSponsoredLinks('<p><a href="https://partner.example/x">Partner</a></p>', "tickora.com");
  assert.equal(out, '<p><a href="https://partner.example/x" rel="sponsored noopener">Partner</a></p>');
});

test("strips dofollow/follow and keeps other rel tokens", () => {
  const out = enforceSponsoredLinks('<a rel="dofollow nofollow" href="https://x.example">x</a>', "tickora.com");
  assert.match(out, /rel="nofollow sponsored noopener"/);
  assert.doesNotMatch(out, /dofollow/);
});

test("leaves internal and relative links alone", () => {
  const html = '<a href="/coins/bitcoin">BTC</a><a href="#faq">FAQ</a><a href="https://tickora.com/about">About</a>';
  assert.equal(enforceSponsoredLinks(html, "tickora.com"), html);
});

test("handles single quotes and protocol-relative links", () => {
  const out = enforceSponsoredLinks("<a href='//cdn.partner.example/a'>a</a>", "tickora.com");
  assert.match(out, /rel="sponsored noopener"/);
});

test("isExternal", () => {
  assert.equal(isExternal("https://a.example", "tickora.com"), true);
  assert.equal(isExternal("/x"), false);
  assert.equal(isExternal("mailto:a@b.c"), false);
});

test("press releases are noindex, sponsored articles are indexable", () => {
  assert.deepEqual(robotsFor("press-release"), { index: false, follow: true });
  assert.deepEqual(robotsFor("sponsored"), { index: true, follow: true });
});
