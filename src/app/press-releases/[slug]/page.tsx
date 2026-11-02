import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, listEntries } from "@/lib/content";
import { articleJsonLd } from "@/lib/jsonld-article";
import { EntryView } from "@/components/EntryView";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const entries = await listEntries("press-releases");
  return [{ slug: "example" }, ...entries.map((e) => ({ slug: e.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/press-releases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEntry("press-releases", slug);
  if (!e) return {};
  // Press releases are always noindex (see robotsFor / 04-SEO-PLAYBOOK §7).
  return { title: `${e.title} (Press release)`, description: e.description, robots: { index: false, follow: true } };
}

export default async function PressReleasePage({ params }: PageProps<"/press-releases/[slug]">) {
  const { slug } = await params;
  const e = await getEntry("press-releases", slug);
  if (!e) notFound();
  return (
    <>
      <JsonLd data={articleJsonLd(e, `/press-releases/${slug}`)} />
      <EntryView entry={e} crumbs={[{ name: "Home", href: "/" }, { name: "Press releases", href: "/press-releases" }]} />
    </>
  );
}
