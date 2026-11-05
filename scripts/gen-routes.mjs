#!/usr/bin/env node
/**
 * Writes src/generated/routes.json: the slugs that exist for each content section.
 * The proxy uses it to answer unknown article URLs with a real 404 status
 * (pages stream, so notFound() inside a page can only send a soft 404).
 * Runs automatically before `npm test` and `npm run build`.
 */
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";

const md = (dir) => {
  try {
    return readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)).sort();
  } catch {
    return [];
  }
};

const routes = {
  news: md("content/news"),
  blog: md("content/blog"),
  learn: md("content/guides"),
  glossary: md("content/glossary"),
  school: [...md("content/school"), "exam"].sort(),
  sponsored: md("content/sponsored"),
  "press-releases": md("content/press-releases"),
};
mkdirSync("src/generated", { recursive: true });
writeFileSync("src/generated/routes.json", JSON.stringify(routes, null, 1) + "\n");
console.log("routes.json:", Object.entries(routes).map(([k, v]) => `${k} ${v.length}`).join(", "));
