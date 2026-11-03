"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/school-parse";
import { scorePct } from "@/lib/school-parse";
import Link from "@/components/Link";
import { saveExam, saveLesson } from "./progress";

export type QuizLabels = {
  quiz: string;
  question: string;
  check: string;
  next: string;
  finish: string;
  correct: string;
  wrong: string;
  score: string;
  passed: string;
  failed: string;
  retry: string;
};

/**
 * One question at a time: pick → check → explanation → next. Saves the best score on finish.
 * mode "lesson" saves under the lesson slug, "exam" under the level slug.
 */
export function Quiz({
  questions,
  id,
  mode,
  passPct,
  labels,
  onDoneHref,
  onDoneLabel,
}: {
  questions: QuizQuestion[];
  id: string;
  mode: "lesson" | "exam";
  passPct: number;
  labels: QuizLabels;
  onDoneHref?: string;
  onDoneLabel?: string;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[i];
  const total = questions.length;

  const finish = (finalCorrect: number) => {
    const pct = scorePct(finalCorrect, total);
    if (mode === "lesson") saveLesson(id, pct);
    else saveExam(id, pct);
    setDone(true);
  };

  if (done) {
    const pct = scorePct(correct, total);
    const pass = pct >= passPct;
    return (
      <section className="quiz card stack" style={{ gap: 14, alignItems: "flex-start" }} aria-live="polite">
        <span className="cat" style={{ color: pass ? "var(--up)" : "var(--down)" }}>{labels.quiz}</span>
        <div className={`quiz-score ${pass ? "is-pass" : "is-fail"}`}>
          <strong>{pct}%</strong>
          <span>
            {correct} / {total}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 17 }}>{pass ? labels.passed : labels.failed}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setI(0);
              setPicked(null);
              setChecked(false);
              setCorrect(0);
              setDone(false);
            }}
          >
            {labels.retry}
          </button>
          {pass && onDoneHref && (
            <Link href={onDoneHref} className="btn btn-primary">
              {onDoneLabel} →
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="quiz card stack" style={{ gap: 14 }} aria-labelledby={`q-${id}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span className="cat" style={{ color: "var(--accent)" }}>{labels.quiz}</span>
        <span className="tiny muted">
          {labels.question} {i + 1} / {total}
        </span>
      </div>
      <div className="quiz-bar" aria-hidden="true">
        <span style={{ width: `${((i + (checked ? 1 : 0)) / total) * 100}%` }} />
      </div>
      <h3 id={`q-${id}`} style={{ margin: 0, fontSize: 20, lineHeight: 1.35 }}>{q.q}</h3>
      <div className="stack" style={{ gap: 8 }} role="radiogroup" aria-labelledby={`q-${id}`}>
        {q.options.map((opt, k) => {
          const state = !checked ? (picked === k ? "picked" : "") : k === q.answer ? "right" : picked === k ? "wrong" : "dim";
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={picked === k}
              disabled={checked}
              className={`quiz-option ${state}`}
              onClick={() => setPicked(k)}
            >
              <span className="quiz-letter">{String.fromCharCode(65 + k)}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {checked && (
        <div className={`quiz-why ${picked === q.answer ? "is-right" : "is-wrong"}`} aria-live="polite">
          <strong>{picked === q.answer ? labels.correct : labels.wrong}</strong> {q.why}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {!checked ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={picked === null}
            onClick={() => {
              setChecked(true);
              if (picked === q.answer) setCorrect((c) => c + 1);
            }}
          >
            {labels.check}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (i + 1 < total) {
                setI(i + 1);
                setPicked(null);
                setChecked(false);
              } else {
                finish(correct);
              }
            }}
          >
            {i + 1 < total ? labels.next : labels.finish}
          </button>
        )}
      </div>
    </section>
  );
}
