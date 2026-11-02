import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, listEntries } from "@/lib/content";
import { articleJsonLd } from "@/lib/jsonld-article";
import { EntryView } from "@/components/EntryView";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const entries = await listEntries("sponsored");
  // Cache Components needs at least one param at build time; the template entry is always present.
  return [{ slug: "example" }, ...entries.map((e) => ({ slug: e.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/sponsored/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntry("sponsored", slug);
  if (!e) return {};
  return {
    title: `${e.title} (Sponsored)`,
    description: e.description,
    alternates: { canonical: `/sponsored/${slug}` },
    robots: e.indexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function SponsoredPage({ params }: PageProps<"/[lang]/sponsored/[slug]">) {
  const { slug } = await params;
  const e = await getEntry("sponsored", slug);
  if (!e) notFound();
  return (
    <>
      <JsonLd data={articleJsonLd(e, `/sponsored/${slug}`)} />
      <EntryView entry={e} crumbs={[{ name: "Home", href: "/" }, { name: "Sponsored", href: "/sponsored" }]} />
    </>
  );
}
