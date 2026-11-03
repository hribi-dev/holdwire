import type { Metadata } from "next";
import { Suspense } from "react";
import { listLessons } from "@/lib/school";
import { LEVELS, PASS_PCT } from "@/content/school-levels";
import { getDict } from "@/i18n/server";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { SchoolMap } from "@/components/school/SchoolMap";

export const metadata: Metadata = {
  title: "Tickora School: learn money and crypto from zero, with quizzes",
  description:
    "A free beginner course on money and crypto for Europe: short lessons, a quiz after each one and a final exam per level. From inflation and scams to wallets, Bitcoin and MiCA.",
  alternates: { canonical: "/school" },
};

async function SchoolMapLoader() {
  const [lessons, { t }] = await Promise.all([listLessons(), getDict()]);
  const s = t.pages.school;
  const levels = LEVELS.map((lv) => ({
    ...lv,
    lessons: lessons.filter((l) => l.level === lv.n).map((l) => ({ slug: l.slug, title: l.title, minutes: l.minutes })),
  }));
  return (
    <SchoolMap
      levels={levels}
      passPct={PASS_PCT}
      labels={{
        level: s.level,
        lessons: s.lessons,
        minutes: s.minutes,
        start: s.start,
        continue: s.continue,
        review: s.review,
        exam: s.exam,
        examPassed: s.examPassed,
        comingSoon: s.comingSoon,
        yourProgress: s.yourProgress,
        reset: s.reset,
        done: s.done,
      }}
    />
  );
}

export default async function SchoolPage() {
  const [{ t }, lessons] = await Promise.all([getDict(), listLessons()]);
  const s = t.pages.school;
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "School", path: "/school" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: s.title,
          description: s.lede,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          isAccessibleForFree: true,
          inLanguage: "en",
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${lessons.reduce((a, l) => a + l.minutes, 0)}M` },
        }}
      />
      <section className="school-hero">
        <div className="wrap stack" style={{ gap: 14, padding: "56px 24px 48px" }}>
          <span className="cat" style={{ color: "#a5f3fc" }}>{s.tag}</span>
          <h1 style={{ margin: 0, fontSize: "clamp(36px, 5.6vw, 64px)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "#fff" }}>{s.title}</h1>
          <p style={{ margin: 0, fontSize: 18, maxWidth: 640, color: "#cbd5e1" }}>{s.lede}</p>
        </div>
      </section>
      <div className="wrap stack" style={{ gap: 32, paddingTop: 36, paddingBottom: 64 }}>
        <Suspense fallback={<p className="muted">{t.common.loading}</p>}>
          <SchoolMapLoader />
        </Suspense>
        <p className="notice" style={{ margin: 0 }}>
          General education, not financial advice. Lessons are written by the Tickora team and checked by an editor before they go into search.
        </p>
      </div>
    </main>
  );
}
