import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { getLesson, listLessons } from "@/lib/school";
import { LEVELS, PASS_PCT } from "@/content/school-levels";
import { getDict } from "@/i18n/server";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Quiz } from "@/components/school/Quiz";
import { LessonStatus } from "@/components/school/LessonStatus";
import { quizLabels } from "@/components/school/labels";

export async function generateStaticParams() {
  const lessons = await listLessons();
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/school/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = await getLesson(slug);
  if (!l) return {};
  return {
    title: `${l.title} | Tickora School`,
    description: l.description,
    alternates: { canonical: `/school/${slug}` },
    robots: l.indexable ? undefined : { index: false, follow: true },
  };
}

export default async function LessonPage({ params }: PageProps<"/[lang]/school/[slug]">) {
  const { slug } = await params;
  const [lesson, all, { t }] = await Promise.all([getLesson(slug), listLessons(), getDict()]);
  if (!lesson) notFound();
  const s = t.pages.school;
  const level = LEVELS.find((lv) => lv.n === lesson.level)!;
  const inLevel = all.filter((l) => l.level === lesson.level);
  const idx = all.findIndex((l) => l.slug === slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];
  const posInLevel = inLevel.findIndex((l) => l.slug === slug) + 1;
  const lastInLevel = posInLevel === inLevel.length;

  return (
    <main className="wrap" style={{ paddingTop: 28, paddingBottom: 64 }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "School", path: "/school" },
          { name: lesson.title, path: `/school/${slug}` },
        ])}
      />
      <div className="row" style={{ gap: 40, alignItems: "flex-start" }}>
        <aside className="school-side" aria-label={`${s.level} ${level.n}`}>
          <Link href="/school" className="small" style={{ color: "var(--accent)", fontWeight: 600 }}>
            ← {s.backToSchool}
          </Link>
          <span className="cat" style={{ color: level.color, marginTop: 14 }}>
            {s.level} {level.n} · {level.title}
          </span>
          <ol className="school-side-list">
            {inLevel.map((l, k) => (
              <li key={l.slug}>
                <Link href={`/school/${l.slug}`} aria-current={l.slug === slug ? "page" : undefined} className={l.slug === slug ? "is-current" : ""}>
                  <span className="school-check">{k + 1}</span> {l.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/school/exam/${level.slug}`}>
                <span className="school-check">★</span> {s.exam}
              </Link>
            </li>
          </ol>
        </aside>

        <article className="stack" style={{ flex: "1 1 560px", minWidth: 0, gap: 22, maxWidth: 760 }}>
          {lesson.draft && <p className="draft-banner" style={{ margin: 0 }}>Draft: awaiting editor review. Not yet indexed by search engines.</p>}
          <div className="stack" style={{ gap: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span className="tiny" style={{ fontWeight: 700, color: level.color }}>
                {s.level} {level.n} · {posInLevel}/{inLevel.length}
              </span>
              <span className="tiny muted">
                {lesson.minutes} {s.minutes}
              </span>
              <LessonStatus slug={slug} passPct={PASS_PCT} label={s.completed} />
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.4vw, 44px)", lineHeight: 1.1 }}>{lesson.title}</h1>
            <p className="muted" style={{ margin: 0, fontSize: 18 }}>{lesson.description}</p>
          </div>

          <div className="prose" dangerouslySetInnerHTML={{ __html: lesson.html }} />

          <section className={`tint ${level.tint} stack`} style={{ gap: 8 }}>
            <strong>{s.takeaways}</strong>
            <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
              {lesson.takeaways.map((k) => <li key={k}>{k}</li>)}
            </ul>
          </section>

          <Quiz
            questions={lesson.quiz}
            id={slug}
            mode="lesson"
            passPct={PASS_PCT}
            labels={quizLabels(s)}
            onDoneHref={lastInLevel ? `/school/exam/${level.slug}` : next ? `/school/${next.slug}` : "/school"}
            onDoneLabel={lastInLevel ? s.exam : next ? s.nextLesson : s.backToSchool}
          />

          <nav style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }} aria-label="Lessons">
            {prev ? <Link href={`/school/${prev.slug}`} className="btn btn-ghost">← {s.prevLesson}</Link> : <span />}
            {next && <Link href={`/school/${next.slug}`} className="btn btn-ghost">{s.nextLesson} →</Link>}
          </nav>
          <p className="notice" style={{ margin: 0 }}>General education, not financial advice.</p>
        </article>
      </div>
    </main>
  );
}
