"use client";

import Link from "@/components/Link";
import { resetProgress, useProgress } from "./progress";

export type MapLevel = {
  n: number;
  slug: string;
  title: string;
  tagline: string;
  color: string;
  tint: string;
  planned: string[];
  lessons: { slug: string; title: string; minutes: number }[];
};

export type MapLabels = {
  level: string;
  lessons: string;
  minutes: string;
  start: string;
  continue: string;
  review: string;
  exam: string;
  examPassed: string;
  comingSoon: string;
  yourProgress: string;
  reset: string;
  done: string;
};

export function SchoolMap({ levels, passPct, labels }: { levels: MapLevel[]; passPct: number; labels: MapLabels }) {
  const p = useProgress();
  const all = levels.flatMap((l) => l.lessons);
  const doneCount = all.filter((l) => (p.lessons[l.slug] ?? 0) >= passPct).length;
  const pct = all.length ? Math.round((doneCount / all.length) * 100) : 0;

  return (
    <div className="stack" style={{ gap: 28 }}>
      <div className="card stack" style={{ gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <strong>{labels.yourProgress}</strong>
          <span className="small muted">
            {doneCount} / {all.length} · {pct}%
          </span>
        </div>
        <div className="quiz-bar" style={{ height: 10 }}>
          <span style={{ width: `${pct}%` }} />
        </div>
        {doneCount > 0 && (
          <button type="button" className="tiny" onClick={resetProgress} style={{ alignSelf: "flex-start", background: "none", border: 0, padding: 0, color: "var(--muted)", textDecoration: "underline", cursor: "pointer" }}>
            {labels.reset}
          </button>
        )}
      </div>

      <ol className="school-path">
        {levels.map((lv) => {
          const done = lv.lessons.filter((l) => (p.lessons[l.slug] ?? 0) >= passPct).length;
          const next = lv.lessons.find((l) => (p.lessons[l.slug] ?? 0) < passPct);
          const examScore = p.exams[lv.slug];
          const examPassed = (examScore ?? 0) >= passPct;
          const soon = lv.lessons.length === 0;
          return (
            <li key={lv.slug} className={`school-level ${soon ? "is-soon" : ""}`}>
              <span className="school-node" style={{ background: soon ? "var(--line-strong)" : lv.color }} aria-hidden="true">
                {examPassed ? "★" : lv.n}
              </span>
              <section className={`tint ${lv.tint} stack`} style={{ gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
                  <div className="stack" style={{ gap: 4 }}>
                    <span className="cat" style={{ color: lv.color }}>
                      {labels.level} {lv.n}
                    </span>
                    <h2 style={{ margin: 0, fontSize: 26 }}>{lv.title}</h2>
                    <span className="small" style={{ color: "var(--ink-2)" }}>{lv.tagline}</span>
                  </div>
                  {!soon && (
                    <span className="small" style={{ fontWeight: 600, color: lv.color }}>
                      {done}/{lv.lessons.length} {labels.done}
                    </span>
                  )}
                </div>

                {soon ? (
                  <div className="stack" style={{ gap: 6 }}>
                    <span className="tiny" style={{ fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>{labels.comingSoon}</span>
                    <ul className="small" style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)" }}>
                      {lv.planned.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                ) : (
                  <>
                    <ol className="school-lessons">
                      {lv.lessons.map((l, k) => {
                        const s = p.lessons[l.slug];
                        const ok = (s ?? 0) >= passPct;
                        return (
                          <li key={l.slug}>
                            <Link href={`/school/${l.slug}`} className={`school-lesson ${ok ? "is-done" : ""}`}>
                              <span className="school-check" aria-hidden="true">{ok ? "✓" : k + 1}</span>
                              <span style={{ flex: 1 }}>{l.title}</span>
                              <span className="tiny muted">
                                {s != null ? `${s}%` : `${l.minutes} ${labels.minutes}`}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                      <Link href={`/school/${next?.slug ?? lv.lessons[0].slug}`} className="btn btn-primary">
                        {done === 0 ? labels.start : next ? labels.continue : labels.review} →
                      </Link>
                      <Link href={`/school/exam/${lv.slug}`} className="btn btn-ghost">
                        {examPassed ? `★ ${labels.examPassed} · ${examScore}%` : labels.exam}
                      </Link>
                    </div>
                  </>
                )}
              </section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
