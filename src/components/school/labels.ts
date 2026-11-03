import type { Dict } from "@/i18n/dictionaries";
import type { QuizLabels } from "./Quiz";

export function quizLabels(s: Dict["pages"]["school"]): QuizLabels {
  return {
    quiz: s.quiz,
    question: s.question,
    check: s.check,
    next: s.next,
    finish: s.finish,
    correct: s.correct,
    wrong: s.wrong,
    score: s.completed,
    passed: s.passed,
    failed: s.failed,
    retry: s.retry,
  };
}
