/** Pure helpers for the school (unit-tested, no I/O). */

export type QuizQuestion = { q: string; options: string[]; answer: number; why: string };

export function validateQuiz(raw: unknown, where: string): QuizQuestion[] {
  if (!Array.isArray(raw)) throw new Error(`${where}: quiz must be a list`);
  return raw.map((item, i) => {
    const x = item as Record<string, unknown>;
    const q = typeof x.q === "string" ? x.q : null;
    const options = Array.isArray(x.options) ? x.options.map(String) : null;
    const answer = typeof x.answer === "number" ? x.answer : NaN;
    const why = typeof x.why === "string" ? x.why : null;
    if (!q || !options || options.length < 2 || !why) throw new Error(`${where}: question ${i + 1} is incomplete`);
    if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) throw new Error(`${where}: question ${i + 1} has a bad answer index`);
    if (new Set(options).size !== options.length) throw new Error(`${where}: question ${i + 1} has duplicate options`);
    return { q, options, answer, why };
  });
}

export function scorePct(correct: number, total: number): number {
  return total ? Math.round((correct / total) * 100) : 0;
}

/** Deterministic shuffle (so server and client render the same order). */
export function seededShuffle<T>(list: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1_000_000) / 1_000_000;
  };
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
