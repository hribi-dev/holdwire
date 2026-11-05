import type { Metadata } from "next";
import { Suspense } from "react";
import { EVENTS, MOVERS_REVIEWED_BY, PEOPLE } from "@/content/movers";
import { measureReaction } from "@/lib/movers";
import type { Reaction } from "@/lib/movers-calc";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getDict } from "@/i18n/server";
import { JsonLd } from "@/components/JsonLd";
import { MoversTimeline } from "@/components/viz/MoversTimeline";
import { VoicesGrid } from "@/components/viz/VoicesGrid";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Market movers: posts that moved crypto prices",
  description:
    "A sourced timeline of posts by Elon Musk, Donald Trump, CZ and others that moved crypto markets, with the reported price reaction and what happened next.",
  alternates: { canonical: "/movers" },
  robots: MOVERS_REVIEWED_BY ? undefined : { index: false, follow: true },
};

async function Timeline() {
  const { t, intl } = await getDict();
  const sorted = [...EVENTS].sort((a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt));
  const measurable = sorted.filter((e) => e.precision === "minute" && e.hlCoin);
  const results = await Promise.all(measurable.map((e) => measureReaction(e.hlCoin as string, e.postedAt)));
  const reactions: Record<string, Reaction | null> = {};
  measurable.forEach((e, i) => (reactions[e.slug] = results[i]));
  const m = t.pages.movers;
  return (
    <MoversTimeline
      events={sorted}
      people={PEOPLE}
      reactions={reactions}
      intl={intl}
      labels={{ all: m.all, reported: m.reported, measured: m.measured, lesson: m.lesson, sources: m.sources, original: m.original, showPost: m.showPost, embedNote: m.embedNote }}
    />
  );
}

export default async function Movers() {
  const { t, intl } = await getDict();
  const m = t.pages.movers;
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Market movers", path: "/movers" }])} />
      <section className="movers-hero">
        <div className="wrap stack" style={{ gap: 14, padding: "56px 24px 48px", position: "relative" }}>
          <span className="cat" style={{ color: "#fca5a5" }}>
            <span className="live-dot" style={{ marginRight: 8 }} />
            {m.tag}
          </span>
          <h1 style={{ margin: 0, fontSize: "clamp(34px, 5.4vw, 60px)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "#fff" }}>{m.title}</h1>
          <p style={{ margin: 0, fontSize: 18, maxWidth: 680, color: "#cbd5e1" }}>{m.lede}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
            {Object.values(PEOPLE).filter((p) => EVENTS.some((e) => PEOPLE[e.person] === p)).map((p) => (
              <span key={p.name} className="glass" style={{ display: "inline-flex", gap: 8, alignItems: "center", padding: "6px 12px 6px 6px", borderRadius: 999, color: "#fff" }}>
                <span className="mover-avatar" style={{ background: p.color, width: 28, height: 28, fontSize: 11 }}>{p.initials}</span>
                <span className="small">{p.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap stack" style={{ gap: 36, paddingTop: 36, paddingBottom: 64 }}>
        <section className="stack" style={{ gap: 16 }} aria-labelledby="events-h">
          <h2 id="events-h" className="section-title">{m.eventsTitle}</h2>
          <Suspense fallback={<p className="muted">{t.common.loading}</p>}>
            <Timeline />
          </Suspense>
        </section>
        <section className="stack" style={{ gap: 12 }} aria-labelledby="voices-h">
          <h2 id="voices-h" className="section-title">{m.voicesTitle}</h2>
          <p className="muted" style={{ margin: 0, maxWidth: 720 }}>{m.voicesLede}</p>
          <VoicesGrid people={PEOPLE} intl={intl} labels={{ all: m.focusAll, latestTake: m.latestTake, follow: m.follow }} />
        </section>
        <AdSlot placement="movers" />
        <section className="card stack" style={{ gap: 8, background: "var(--surface)" }}>
          <strong>{m.howTitle}</strong>
          <p className="small muted" style={{ margin: 0 }}>{m.howBody}</p>
        </section>
      </div>
    </main>
  );
}
