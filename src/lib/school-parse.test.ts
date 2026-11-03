import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { scorePct, seededShuffle, validateQuiz } from "./school-parse";
import { LEVELS } from "../content/school-levels";

test("validateQuiz accepts good questions and rejects bad ones", () => {
  const ok = validateQuiz([{ q: "Q?", options: ["a", "b"], answer: 1, why: "because" }], "x");
  assert.equal(ok[0].answer, 1);
  assert.throws(() => validateQuiz([{ q: "Q?", options: ["a", "b"], answer: 2, why: "w" }], "x"));
  assert.throws(() => validateQuiz([{ q: "Q?", options: ["a", "a"], answer: 0, why: "w" }], "x"));
  assert.throws(() => validateQuiz("nope", "x"));
});

test("score and shuffle", () => {
  assert.equal(scorePct(2, 3), 67);
  assert.equal(scorePct(0, 0), 0);
  const a = seededShuffle([1, 2, 3, 4, 5], "seed");
  assert.deepEqual([...a].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(seededShuffle([1, 2, 3, 4, 5], "seed"), a);
});

test("every lesson file has valid frontmatter and a quiz of at least 3 questions", () => {
  const dir = path.join(process.cwd(), "content", "school");
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  assert.ok(files.length >= 8);
  const levels = new Set(LEVELS.map((l) => l.n));
  const keys = new Set<string>();
  for (const f of files) {
    const { data } = matter(readFileSync(path.join(dir, f), "utf8"));
    assert.ok(levels.has(Number(data.level)), `${f}: unknown level`);
    assert.ok(data.title && data.description, `${f}: title/description`);
    const key = `${data.level}-${data.order}`;
    assert.ok(!keys.has(key), `${f}: duplicate level/order ${key}`);
    keys.add(key);
    const quiz = validateQuiz(data.quiz, f);
    assert.ok(quiz.length >= 3, `${f}: needs 3+ questions`);
    assert.ok(Array.isArray(data.takeaways) && data.takeaways.length >= 2, `${f}: takeaways`);
  }
});
