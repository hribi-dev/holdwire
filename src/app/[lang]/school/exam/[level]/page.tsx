import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { listLessons } from "@/lib/school";
import { seededShuffle } from "@/lib/school-parse";
import { LEVELS, PASS_PCT } from "@/content/school-levels";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/dictionaries";
import { Quiz } from "@/components/school/Quiz";
import { quizLabels } from "@/components/school/labels";

export async function generateStaticParams() {
  const lessons = await listLessons();
  const withLessons = LEVELS.filter((lv) => lessons.some((l) => l.level === lv.n));
  return withLessons.map((lv) => ({ level: lv.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/school/exam/[level]">): Promise<Metadata> {
  const { level } = await params;
  const lv = LEVELS.find((l) => l.slug === level);
  return {
    title: lv ? `Level ${lv.n} exam: ${lv.title} | Tickora School` : "Exam",
    alternates: { canonical: `/school/exam/${level}` },
    robots: { index: false, follow: true },
  };
}

export default async function ExamPage({ params }: PageProps<"/[lang]/school/exam/[level]">) {
  const { level } = await params;
  const lv = LEVELS.find((l) => l.slug === level);
  if (!lv) notFound();
  const [lessons, { t }] = await Promise.all([listLessons(), getDict()]);
  const questions = seededShuffle(
    lessons.filter((l) => l.level === lv.n).flatMap((l) => l.quiz),
    `exam-${lv.slug}`,
  );
  if (questions.length === 0) notFound();
  const s = t.pages.school;
  const nextLevel = LEVELS.find((x) => x.n === lv.n + 1);
  const nextFirst = nextLevel ? lessons.find((l) => l.level === nextLevel.n) : undefined;

  return (
    <main className="wrap stack" style={{ gap: 22, paddingTop: 28, paddingBottom: 64, maxWidth: 820 }}>
      <Link href="/school" className="small" style={{ color: "var(--accent)", fontWeight: 600 }}>
        ← {s.backToSchool}
      </Link>
      <div className={`tint ${lv.tint} stack`} style={{ gap: 8 }}>
        <span className="cat" style={{ color: lv.color }}>
          {s.level} {lv.n}
        </span>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 40px)" }}>{fmt(s.examTitle, { level: lv.title })}</h1>
        <p style={{ margin: 0, color: "var(--ink-2)" }}>
          {fmt(s.examLede, { pass: PASS_PCT })} {questions.length} × {s.question.toLowerCase()}.
        </p>
      </div>
      <Quiz
        questions={questions}
        id={lv.slug}
        mode="exam"
        passPct={PASS_PCT}
        labels={quizLabels(s)}
        onDoneHref={nextFirst ? `/school/${nextFirst.slug}` : "/school"}
        onDoneLabel={nextFirst ? `${s.level} ${lv.n + 1}` : s.backToSchool}
      />
    </main>
  );
}
