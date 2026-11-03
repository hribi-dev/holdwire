"use client";

import { useSyncExternalStore } from "react";

/** Per-browser school progress. No account needed; can be cleared by the reader. */
export type Progress = { lessons: Record<string, number>; exams: Record<string, number> };

const KEY = "tickora-school-v1";
const EMPTY: Progress = { lessons: {}, exams: {} };
const listeners = new Set<() => void>();
let cache: { raw: string | null; value: Progress } = { raw: null, value: EMPTY };

function read(): Progress {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cache.raw) return cache.value;
  let value = EMPTY;
  try {
    const p = raw ? JSON.parse(raw) : null;
    if (p && typeof p === "object") value = { lessons: p.lessons ?? {}, exams: p.exams ?? {} };
  } catch {
    value = EMPTY;
  }
  cache = { raw, value };
  return value;
}

function write(next: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: progress lives only for this page view */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

/** Keep the best score. */
export function saveLesson(slug: string, pct: number) {
  const p = read();
  write({ ...p, lessons: { ...p.lessons, [slug]: Math.max(pct, p.lessons[slug] ?? 0) } });
}

export function saveExam(level: string, pct: number) {
  const p = read();
  write({ ...p, exams: { ...p.exams, [level]: Math.max(pct, p.exams[level] ?? 0) } });
}

export function resetProgress() {
  write(EMPTY);
}
