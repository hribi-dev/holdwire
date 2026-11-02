import { test } from "node:test";
import assert from "node:assert/strict";
import { LOCALES, LOCALE_GROUPS, localize, stripLocale } from "./config";
import { DICTIONARIES } from "./dictionaries";

test("localize prefixes internal paths for non-English only", () => {
  assert.equal(localize("/news", "en"), "/news");
  assert.equal(localize("/news", "sl"), "/sl/news");
  assert.equal(localize("/", "de"), "/de");
  assert.equal(localize("/#newsletter", "fr"), "/fr#newsletter");
  assert.equal(localize("https://x.com", "de"), "https://x.com");
  assert.equal(localize("#top", "de"), "#top");
  assert.equal(localize("/news", "xx"), "/news");
});

test("stripLocale", () => {
  assert.equal(stripLocale("/sl/news/x"), "/news/x");
  assert.equal(stripLocale("/sl"), "/");
  assert.equal(stripLocale("/news"), "/news");
  assert.equal(stripLocale("/"), "/");
});

test("every locale is in exactly one switcher group and has a dictionary", () => {
  const grouped = LOCALE_GROUPS.flatMap((g) => g.locales);
  assert.equal(grouped.length, LOCALES.length);
  assert.deepEqual([...grouped].sort(), [...LOCALES].sort());
  for (const l of LOCALES) assert.ok(DICTIONARIES[l], `missing dictionary ${l}`);
});

test("no dictionary has an empty string", () => {
  for (const [l, d] of Object.entries(DICTIONARIES)) {
    const walk = (o: unknown, path: string) => {
      if (typeof o === "string") assert.ok(o.trim().length > 0, `${l}:${path} empty`);
      else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`);
    };
    walk(d, "");
  }
});
