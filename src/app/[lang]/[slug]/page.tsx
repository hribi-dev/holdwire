import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TRUST_PAGES, getTrustPage } from "@/lib/pages";

export async function generateStaticParams() {
  return TRUST_PAGES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getTrustPage(slug);
  if (!page) return {};
  return { title: page.title, alternates: { canonical: `/${slug}` } };
}

export default async function TrustPageRoute({ params }: PageProps<"/[lang]/[slug]">) {
  const { slug } = await params;
  const page = await getTrustPage(slug);
  if (!page) notFound();
  return (
    <main className="wrap page" style={{ gap: 16 }}>
      {page.draft && (
        <p className="sample-flag" style={{ alignSelf: "flex-start", margin: 0 }}>
          Draft: pending legal review
        </p>
      )}
      <article className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
    </main>
  );
}
