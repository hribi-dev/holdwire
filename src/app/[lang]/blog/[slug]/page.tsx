import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, listEntries } from "@/lib/content";
import { articleJsonLd, coverOgImages } from "@/lib/jsonld-article";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { EntryView } from "@/components/EntryView";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const entries = await listEntries("blog");
  // At least one param is required with Cache Components; the template keeps the build valid on an empty blog.
  return entries.length ? entries.map((e) => ({ slug: e.slug })) : [{ slug: "example" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntry("blog", slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/blog/${slug}` },
    robots: e.indexable ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: true },
    openGraph: { type: "article", title: e.title, description: e.description, modifiedTime: e.updated ?? undefined, images: coverOgImages(e) },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const e = await getEntry("blog", slug);
  if (!e) notFound();
  const path = `/blog/${slug}`;
  return (
    <>
      <JsonLd data={articleJsonLd(e, path)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: e.title, path }])} />
      <EntryView entry={e} crumbs={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
    </>
  );
}
