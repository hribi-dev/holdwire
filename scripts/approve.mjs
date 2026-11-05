#!/usr/bin/env node
/**
 * Mark content as reviewed by a named editor (sets `reviewedBy:` in the frontmatter).
 * Reviewed content loses its "Draft" banner and can be indexed in production.
 *
 *   npm run approve -- "Matic Hriberšek" content/blog/my-post-2026-11-04.md
 *   npm run approve -- "Matic Hriberšek" content/glossary          (every file in a folder)
 *   npm run approve -- --list                                       (show what's still a draft)
 *
 * Only approve what you have actually read. Hub pages (gold, movers, fintech…) are approved
 * in src/content/reviews.ts.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DIRS = ["content/blog", "content/news", "content/guides", "content/glossary", "content/school", "content/sponsored", "content/press-releases"];
const args = process.argv.slice(2);

function mdFiles(p) {
  if (statSync(p).isDirectory()) return readdirSync(p).filter((f) => f.endsWith(".md") && f !== "example.md").map((f) => path.join(p, f));
  return [p];
}
const reviewer = (src) => (src.match(/^---\n[\s\S]*?^reviewedBy:[ \t]*(.*)$/m)?.[1] ?? "").trim();

if (args[0] === "--list" || args.length === 0) {
  let n = 0;
  for (const d of DIRS) {
    let files = [];
    try { files = mdFiles(d); } catch { continue; }
    const drafts = files.filter((f) => !reviewer(readFileSync(f, "utf8")));
    if (drafts.length) {
      console.log(`\n${d}: ${drafts.length} draft(s)`);
      drafts.forEach((f) => console.log("  " + f));
    }
    n += drafts.length;
  }
  console.log(`\n${n} item(s) awaiting review.${args.length === 0 ? '\nUsage: npm run approve -- "Your Name" <file-or-folder> [...]' : ""}`);
  process.exit(0);
}

const [name, ...targets] = args;
if (!name || name.includes("/") || targets.length === 0) {
  console.error('Usage: npm run approve -- "Your Name" <file-or-folder> [...]');
  process.exit(1);
}
let changed = 0;
for (const t of targets) {
  for (const f of mdFiles(t)) {
    const src = readFileSync(f, "utf8");
    if (!/^---\n/.test(src)) continue;
    if (reviewer(src)) { console.log(`= ${f} (already reviewed by ${reviewer(src)})`); continue; }
    const out = /^reviewedBy:.*$/m.test(src)
      ? src.replace(/^reviewedBy:.*$/m, `reviewedBy: ${JSON.stringify(name)}`)
      : src.replace(/^---\n/, `---\nreviewedBy: ${JSON.stringify(name)}\n`);
    writeFileSync(f, out);
    console.log(`✓ ${f}`);
    changed++;
  }
}
console.log(`\nApproved ${changed} item(s) as ${name}. Commit and push to publish.`);
