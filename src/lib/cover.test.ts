import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { coverCreditText, parseCover, sizedCover } from "./cover";

const good = {
  src: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
  alt: "Gold-coloured coins on a dark table",
  credit: "Jane Doe",
  sourceUrl: "https://unsplash.com/photos/abc123",
  license: "unsplash",
};

test("parseCover accepts a valid Unsplash cover and returns null when missing", () => {
  assert.equal(parseCover(undefined, "x"), null);
  const c = parseCover(good, "x");
  assert.equal(c?.credit, "Jane Doe");
  assert.equal(coverCreditText(c!), "Photo: Jane Doe / Unsplash");
});

test("parseCover rejects unknown hosts, missing credit, bad licences and CC BY without licence link", () => {
  assert.throws(() => parseCover({ ...good, src: "https://example.com/a.jpg" }, "x"), /cover.src/);
  assert.throws(() => parseCover({ ...good, src: "http://images.unsplash.com/a" }, "x"), /cover.src/);
  assert.throws(() => parseCover({ ...good, credit: "" }, "x"), /credit/);
  assert.throws(() => parseCover({ ...good, alt: "coin" }, "x"), /alt/);
  assert.throws(() => parseCover({ ...good, license: "getty" }, "x"), /license/);
  assert.throws(() => parseCover({ ...good, sourceUrl: "https://pexels.com/photo/1" }, "x"), /sourceUrl/);
  const commons = {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Example.jpg",
    alt: "The European Central Bank tower in Frankfurt",
    credit: "John Smith",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
    license: "cc-by-sa",
  };
  assert.throws(() => parseCover(commons, "x"), /licenseUrl/);
  const ok = parseCover({ ...commons, licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" }, "x");
  assert.equal(coverCreditText(ok!), "Photo: John Smith / Wikimedia Commons, CC BY-SA");
});

test("sizedCover asks Unsplash and Pexels for resized copies", () => {
  assert.match(sizedCover(good.src, 640), /w=640/);
  assert.match(sizedCover("https://images.pexels.com/photos/1/pexels-photo-1.jpeg", 800), /w=800/);
  assert.equal(sizedCover("/images/x.jpg", 640), "/images/x.jpg");
});

test("every cover in content/ is valid", async () => {
  for (const dir of ["blog", "news", "guides"]) {
    const base = path.join(process.cwd(), "content", dir);
    for (const f of (await readdir(base)).filter((f) => f.endsWith(".md"))) {
      const { data } = matter(await readFile(path.join(base, f), "utf8"));
      parseCover(data.cover, `content/${dir}/${f}`);
    }
  }
});
