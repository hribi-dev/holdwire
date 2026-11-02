import type { Metadata } from "next";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { getEntry, listEntries } from "@/lib/content";
import { definedTermJsonLd } from "@/lib/jsonld-article";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const terms = await listEntries("glossary");
  return terms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/glossary/[term]">): Promise<Metadata> {
  const { term } = await params;
  const e = await getEntry("glossary", term);
  if (!e) return {};
  return {
    title: `What is ${e.title}? Definition`,
    description: e.short ?? e.description,
    alternates: { canonical: `/glossary/${term}` },
    robots: e.indexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function TermPage({ params }: PageProps<"/[lang]/glossary/[term]">) {
  const { term } = await params;
  const e = await getEntry("glossary", term);
  if (!e) notFound();
  const path = `/glossary/${term}`;
  return (
    <main className="wrap page" style={{ gap: 16, paddingTop: 20 }}>
      <JsonLd data={definedTermJsonLd(e, path)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }, { name: e.title, path }])} />
      <nav aria-label="Breadcrumb" className="small muted" style={{ display: "flex", gap: 8 }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/glossary">Glossary</Link>
      </nav>
      <article className="prose">
        {e.draft && (
          <p className="sample-flag" style={{ display: "inline-flex" }}>
            Draft: awaiting editor review
          </p>
        )}
        <span className="eyebrow">Glossary</span>
        <h1 style={{ marginTop: 8 }}>{e.title}</h1>
        {e.short && <p style={{ fontSize: 20, color: "var(--ink)" }}>{e.short}</p>}
        <div dangerouslySetInnerHTML={{ __html: e.html }} />
        <p>
          <Link href="/glossary">← All terms</Link>
        </p>
      </article>
    </main>
  );
}
