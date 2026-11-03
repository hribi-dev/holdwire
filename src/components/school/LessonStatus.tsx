"use client";

import { useProgress } from "./progress";

/** Small "completed · 100%" pill on a lesson page. */
export function LessonStatus({ slug, passPct, label }: { slug: string; passPct: number; label: string }) {
  const p = useProgress();
  const s = p.lessons[slug];
  if (s == null || s < passPct) return null;
  return (
    <span className="tiny" style={{ padding: "4px 10px", borderRadius: 999, background: "#dcfce7", color: "#166534", fontWeight: 700 }}>
      ✓ {label} · {s}%
    </span>
  );
}
