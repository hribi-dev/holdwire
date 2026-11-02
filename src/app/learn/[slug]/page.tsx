import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, listEntries } from "@/lib/content";
import { articleJsonLd } from "@/lib/jsonld-article";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { EntryView } from "@/components/EntryView";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const entries = await listEntries("guides");
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntry("guides", slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/learn/${slug}` },
    robots: e.indexable ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: true },
    openGraph: { type: "article", title: e.title, description: e.description, modifiedTime: e.updated ?? undefined },
  };
}

export default async function GuidePage({ params }: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const e = await getEntry("guides", slug);
  if (!e) notFound();
  const path = `/learn/${slug}`;
  return (
    <>
      <JsonLd data={articleJsonLd(e, path)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Learn", path: "/learn" }, { name: e.title, path }])} />
      <EntryView entry={e} crumbs={[{ name: "Home", href: "/" }, { name: "Learn", href: "/learn" }]} />
    </>
  );
}
