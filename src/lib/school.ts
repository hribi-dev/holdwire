import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { cacheLife } from "next/cache";
import { site } from "./site";
import { validateQuiz, type QuizQuestion } from "./school-parse";

export type Lesson = {
  slug: string;
  level: number;
  order: number;
  title: string;
  description: string;
  minutes: number;
  takeaways: string[];
  quiz: QuizQuestion[];
  html: string;
  reviewedBy: string | null;
  draft: boolean;
  indexable: boolean;
  updated: string | null;
};

const DIR = path.join(process.cwd(), "content", "school");

async function parse(file: string): Promise<Lesson> {
  const raw = await readFile(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const reviewedBy = data.reviewedBy ? String(data.reviewedBy) : null;
  const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : data.updated ? String(data.updated) : null;
  return {
    slug,
    level: Number(data.level),
    order: Number(data.order),
    title: String(data.title),
    description: String(data.description ?? ""),
    minutes: Number(data.minutes ?? 4),
    takeaways: Array.isArray(data.takeaways) ? data.takeaways.map(String) : [],
    quiz: validateQuiz(data.quiz, slug),
    html: await marked.parse(content),
    reviewedBy,
    draft: !reviewedBy,
    indexable: site.indexable && !!reviewedBy,
    updated,
  };
}

export async function listLessons(): Promise<Lesson[]> {
  "use cache";
  cacheLife("hours");
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".md"));
  const lessons = await Promise.all(files.map(parse));
  return lessons.sort((a, b) => a.level - b.level || a.order - b.order);
}

export async function getLesson(slug: string): Promise<Lesson | null> {
  const all = await listLessons();
  return all.find((l) => l.slug === slug) ?? null;
}
