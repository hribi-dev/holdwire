import Link from "@/components/Link";
import { Suspense } from "react";
import { getCoin, getTopCoins, type CoinMarket } from "@/lib/coins";
import { listEntries } from "@/lib/content";
import { direction, formatChange, formatPrice } from "@/lib/format";
import { getHyperliquidStats } from "@/lib/hyperliquid";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { CoinBadge } from "@/components/CoinBadge";
import { JsonLd } from "@/components/JsonLd";
import { MarketsTable } from "@/components/MarketsTable";
import { marketsLabels } from "@/i18n/labels";
import { Sparkline } from "@/components/Sparkline";
import { StoryCard } from "@/components/StoryCard";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/dictionaries";
import { MarketHeatmap } from "@/components/viz/MarketHeatmap";
import { MoodGauge } from "@/components/viz/MoodGauge";
import { moodBucket, moodScore } from "@/lib/treemap";
import { HeroRotator, type HeroSlide } from "@/components/HeroRotator";
import { HeroSpotlight } from "@/components/HeroSpotlight";
import { getMemeFeed } from "@/lib/memes";
import { EVENTS, PEOPLE } from "@/content/movers";
import { AdSlot } from "@/components/AdSlot";
import type { Metadata } from "next";
import { contact } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: { canonical: lang === "en" ? "/" : `/${lang}` } };
}

const usdCompact = (v: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "USD", notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 }).format(v);

/* ───────────── Hero: market pulse card ───────────── */
async function MarketPulse() {
  const [{ coins, sample }, hl, { t }] = await Promise.all([getTopCoins(50), getHyperliquidStats(), getDict()]);
  const pick = ["hyperliquid", "bitcoin", "ethereum", "solana"]
    .map((id) => coins.find((c) => c.id === id))
    .filter((c): c is CoinMarket => !!c);
  return (
    <div className="glass stack" style={{ padding: 22, gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
          <span className="live-dot" /> {t.home.pulse}
        </span>
        <span className="tiny" style={{ color: "rgba(255,255,255,0.6)" }}>
          {sample ? t.common.sample : "EUR · 24h"}
        </span>
      </div>
      {pick.map((c) => {
        const d = direction(c.change24h);
        return (
          <Link
            key={c.id}
            href={c.id === "hyperliquid" ? "/hyperliquid" : `/coins/${c.id}`}
            style={{ display: "grid", gridTemplateColumns: "auto 1fr 90px auto", alignItems: "center", gap: 12, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <CoinBadge id={c.id} name={c.name} image={c.image} size={30} />
            <span className="stack">
              <strong style={{ fontSize: 15 }}>{c.name}</strong>
              <span className="mono tiny" style={{ color: "rgba(255,255,255,0.6)" }}>
                {c.symbol.toUpperCase()}
              </span>
            </span>
            <span style={{ color: d === "down" ? "#fb923c" : "#34d399" }}>
              <Sparkline data={c.sparkline} width={90} height={28} />
            </span>
            <span className="stack" style={{ alignItems: "flex-end" }}>
              <span className="mono" style={{ fontWeight: 600 }}>{formatPrice(c.price)}</span>
              <span className="mono tiny" style={{ color: d === "down" ? "#fb923c" : "#34d399" }}>
                {formatChange(c.change24h)}
              </span>
            </span>
          </Link>
        );
      })}
      {hl && (
        <Link href="/hyperliquid" className="tiny" style={{ marginTop: 8, padding: "10px 12px", borderRadius: 12, background: "rgba(20,184,166,0.16)", color: "#99f6e4", display: "flex", justifyContent: "space-between" }}>
          <span>{t.home.hlVolume}</span>
          <strong className="mono">{usdCompact(hl.stats.totalVolume24hUsd)}</strong>
        </Link>
      )}
    </div>
  );
}

/* ───────────── Top movers ───────────── */
async function Movers() {
  const [{ coins }, { t }] = await Promise.all([getTopCoins(50), getDict()]);
  const valid = coins.filter((c) => c.change24h != null && !["tether", "usd-coin"].includes(c.id));
  const sorted = [...valid].sort((a, b) => (b.change24h ?? 0) - (a.change24h ?? 0));
  const gainers = sorted.filter((c) => (c.change24h ?? 0) > 0).slice(0, 4);
  const losers = [...sorted].reverse().filter((c) => (c.change24h ?? 0) < 0).slice(0, 4);
  const col = (title: string, list: CoinMarket[], up: boolean) => (
    <div className="stack" style={{ gap: 10 }}>
      <span className="cat" style={{ color: up ? "var(--up)" : "var(--down)" }}>
        {up ? `▲ ${t.home.gainers}` : `▼ ${t.home.fallers}`}
      </span>
      {list.length === 0 && <span className="small muted">{t.home.nothing}</span>}
      {list.map((c) => (
        <Link key={c.id} href={`/coins/${c.id}`} className="mover">
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CoinBadge id={c.id} name={c.name} image={c.image} />
            <strong>{c.name}</strong>
          </span>
          <span className={`mono ${direction(c.change24h)}`} style={{ fontWeight: 600 }}>
            {formatChange(c.change24h)}
          </span>
        </Link>
      ))}
      <span className="sr-only">{title}</span>
    </div>
  );
  return (
    <div className="movers">
      {col("Gainers", gainers, true)}
      {col("Fallers", losers, false)}
    </div>
  );
}

/* ───────────── Hyperliquid spotlight ───────────── */
async function HypeBand() {
  const [data, hl, { t }] = await Promise.all([getCoin("hyperliquid"), getHyperliquidStats(), getDict()]);
  const coin = data?.coin;
  return (
    <section
      className="reveal"
      style={{ borderRadius: 24, padding: "36px 36px 28px", color: "#fff", background: "radial-gradient(circle at 85% 10%, rgba(94,234,212,0.35), transparent 45%), linear-gradient(135deg, #042f2e, #0f172a 60%, #1e1b4b)" }}
      aria-labelledby="hl-h"
    >
      <div className="row" style={{ gap: 28, alignItems: "flex-end" }}>
        <div className="stack" style={{ flex: "2 1 420px", gap: 12 }}>
          <span className="cat" style={{ color: "#5eead4" }}>{t.home.spotlight}</span>
          <h2 id="hl-h" style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.08 }}>
            {t.home.hlTitle}
          </h2>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: 17, maxWidth: 560 }}>
            {t.home.hlBody}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
            <Link href="/hyperliquid" className="btn" style={{ background: "#5eead4", color: "#042f2e" }}>
              {t.home.openHub}
            </Link>
            <Link href="/learn/hyperliquid-hip-3-explained" className="btn" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}>
              {t.home.hip3}
            </Link>
          </div>
        </div>
        <div className="stack" style={{ flex: "1 1 260px", gap: 4 }}>
          <span className="tiny" style={{ color: "#94a3b8" }}>HYPE / EUR {data?.sample ? "· sample" : ""}</span>
          <span className="mono" style={{ fontSize: 38, fontWeight: 600 }}>{formatPrice(coin?.price)}</span>
          <span className="mono" style={{ color: direction(coin?.change7d) === "down" ? "#fb923c" : "#34d399", fontWeight: 600 }}>
            {formatChange(coin?.change7d)} 7d
          </span>
          {hl && (
            <span className="tiny" style={{ color: "#99f6e4", marginTop: 6 }}>
              {fmt(t.home.exchange, { vol: usdCompact(hl.stats.totalVolume24hUsd), oi: usdCompact(hl.stats.totalOpenInterestUsd) })}
            </span>
          )}
        </div>
      </div>
      <div style={{ color: "#5eead4", marginTop: 18 }}>
        <Sparkline data={coin?.sparkline ?? []} width={1000} height={90} strokeWidth={2.5} />
      </div>
    </section>
  );
}

async function Markets() {
  const [{ coins, sample }, { t }] = await Promise.all([getTopCoins(50), getDict()]);
  return (
    <>
      <MarketsTable coins={coins.slice(0, 10)} caption={t.pages.markets.lede} labels={marketsLabels(t)} compact />
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }} className="small">
        <span className="muted">{sample ? <span className="sample-flag">{t.common.sample}</span> : t.common.pricesNote}</span>
        <Link href="/coins" style={{ fontWeight: 600, color: "var(--accent)" }}>
          {t.common.allCoins}
        </Link>
      </div>
    </>
  );
}

const EXPLORE = [
  { key: "mica", tint: "tint-cyan", color: "#0e7490", href: "/learn/mica-explained" },
  { key: "memes", tint: "tint-mint", color: "#4d7c0f", href: "/memes" },
  { key: "movers", tint: "tint-pink", color: "#b91c1c", href: "/movers" },
  { key: "fintech", tint: "tint-pink", color: "#be185d", href: "/fintech" },
  { key: "watches", tint: "tint-amber", color: "#b45309", href: "/watches" },
  { key: "collectibles", tint: "tint-violet", color: "#6d28d9", href: "/collectibles" },
] as const;

/* ───────────── Market map + mood ───────────── */
async function MarketMap() {
  const [{ coins }, { t, intl }] = await Promise.all([getTopCoins(50), getDict()]);
  const top = coins.filter((c) => c.marketCap && !["tether", "usd-coin"].includes(c.id)).slice(0, 30);
  const mood = moodScore(top.map((c) => c.change24h));
  return (
    <div className="row" style={{ gap: 24, alignItems: "stretch" }}>
      <div style={{ flex: "3 1 560px", minWidth: 0 }}>
        <MarketHeatmap
          coins={top.map((c) => ({ id: c.id, symbol: c.symbol, name: c.name, marketCap: c.marketCap ?? 0, price: c.price, change24h: c.change24h }))}
          intl={intl}
          labels={{ marketCap: t.viz.marketCap, price: t.viz.price, change24h: t.viz.change24h, hover: t.viz.hover }}
        />
      </div>
      <div style={{ flex: "1 1 260px" }}>
        <MoodGauge
          score={mood.score}
          title={t.viz.mood}
          label={t.viz.moodLabels[moodBucket(mood.score)]}
          note={fmt(t.viz.moodNote, { up: mood.up, total: mood.total })}
          how={t.viz.moodHow}
        />
      </div>
    </div>
  );
}

/* ───────────── Hero slides ───────────── */
type HomeDict = Awaited<ReturnType<typeof getDict>>["t"]["home"];

function brandSlide(h: HomeDict): HeroSlide {
  return { key: "brand", tag: h.badge, title: h.h1a, accent: h.h1b, body: h.lede, cta: h.ctaRead, href: "/news", color: "#a78bfa" };
}

async function HeroSlides() {
  const [{ t }, blog, hl, { coins }, memes] = await Promise.all([getDict(), listEntries("blog"), getHyperliquidStats(), getTopCoins(50), getMemeFeed()]);
  const h = t.home;
  const sl = h.slides;
  const slides: HeroSlide[] = [brandSlide(h)];
  const post = blog[0];
  if (post) slides.push({ key: "blog", tag: sl.blogTag, title: post.title, body: post.description, cta: sl.blogCta, href: `/blog/${post.slug}`, color: "#f472b6" });
  if (hl) slides.push({ key: "hl", tag: "Hyperliquid", title: fmt(sl.hlTitle, { vol: usdCompact(hl.stats.totalVolume24hUsd) }), body: sl.hlBody, cta: h.openHub, href: "/hyperliquid", color: "#5eead4" });
  const top = coins.filter((c) => !["tether", "usd-coin"].includes(c.id)).slice(0, 30);
  const mood = moodScore(top.map((c) => c.change24h));
  if (mood.total > 0)
    slides.push({
      key: "mood",
      tag: t.viz.mood,
      title: `${fmt(sl.moodTitle, { label: t.viz.moodLabels[moodBucket(mood.score)] })} (${mood.score}/100)`,
      body: fmt(t.viz.moodNote, { up: mood.up, total: mood.total }),
      cta: sl.mapCta,
      href: "/coins",
      color: "#fbbf24",
    });
  const latestMover = [...EVENTS].sort((a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt))[0];
  if (latestMover)
    slides.push({
      key: "movers",
      tag: t.pages.movers.tag,
      title: fmt(sl.moverTitle, { name: PEOPLE[latestMover.person].name, asset: latestMover.assets[0] }),
      body: latestMover.reported,
      cta: sl.moversCta,
      href: "/movers",
      color: "#f87171",
    });
  if (!memes.sample) {
    const lead = [...memes.pools].sort((a, b) => b.volume24hUsd - a.volume24hUsd)[0];
    if (lead)
      slides.push({
        key: "memes",
        tag: t.pages.memes.tag,
        title: fmt(sl.memeTitle, { sym: lead.symbol }),
        body: fmt(sl.memeBody, { vol: usdCompact(lead.volume24hUsd), chg: lead.change24h == null ? "–" : `${lead.change24h >= 0 ? "+" : ""}${lead.change24h.toFixed(1)}%` }),
        cta: sl.memesCta,
        href: "/memes",
        color: "#a3e635",
      });
  }
  return <HeroRotator slides={slides} labels={{ prev: sl.prev, next: sl.next }} />;
}

export default async function Home() {
  const [news, guides, { t }] = await Promise.all([listEntries("news"), listEntries("guides"), getDict()]);
  const h = t.home;
  const [lead, ...moreNews] = news;

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* ── Hero ── */}
      <HeroSpotlight className="hero">
        <div className="aurora" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="grid-lines" aria-hidden="true" />
        <div className="wrap row" style={{ padding: "64px 24px 72px", alignItems: "center", gap: 48 }}>
          <div className="stack" style={{ flex: "3 1 480px", gap: 20, minWidth: 0 }}>
            <Suspense fallback={<HeroRotator slides={[brandSlide(h)]} labels={{ prev: h.slides.prev, next: h.slides.next }} heading={false} />}>
              <HeroSlides />
            </Suspense>
          </div>
          <div style={{ flex: "2 1 340px", minWidth: 0 }}>
            <Suspense fallback={<div className="glass" style={{ height: 320 }} />}>
              <MarketPulse />
            </Suspense>
          </div>
        </div>
      </HeroSpotlight>

      <main className="wrap page" style={{ paddingTop: 56 }}>
        {/* ── Latest ── */}
        {lead && (
          <section className="stack" style={{ gap: 24 }} aria-labelledby="latest-h">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
              <h2 id="latest-h" className="section-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="live-dot" /> {h.latest}
              </h2>
              <Link href="/news" style={{ fontWeight: 600, color: "var(--accent)" }}>
                {t.common.allNews}
              </Link>
            </div>
            <div className="row" style={{ gap: 36, alignItems: "flex-start" }}>
              <div style={{ flex: "3 1 520px", minWidth: 0 }}>
                <StoryCard entry={lead} size="lg" />
              </div>
              <div className="stack" style={{ flex: "2 1 320px", gap: 28, minWidth: 0 }}>
                {moreNews.slice(0, 3).map((e) => (
                  <StoryCard key={e.slug} entry={e} size="sm" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Market map ── */}
        <section className="stack" style={{ gap: 14 }} aria-labelledby="map-h">
          <div className="stack" style={{ gap: 4 }}>
            <h2 id="map-h" className="section-title">{h.heatmap}</h2>
            <span className="small muted">{h.heatmapNote}</span>
          </div>
          <Suspense fallback={<div className="heatmap" />}>
            <MarketMap />
          </Suspense>
        </section>

        {/* ── Movers ── */}
        <section className="stack reveal" style={{ gap: 18 }} aria-labelledby="movers-h">
          <h2 id="movers-h" className="section-title">
            {h.movers}
          </h2>
          <Suspense fallback={<p className="muted">{t.common.loading}</p>}>
            <Movers />
          </Suspense>
        </section>

        {/* ── Hyperliquid ── */}
        <Suspense fallback={<div style={{ height: 320, borderRadius: 24, background: "#0f172a" }} />}>
          <HypeBand />
        </Suspense>

        {/* ── Learn ── */}
        <section id="start-here" className="stack" style={{ gap: 24 }} aria-labelledby="learn-h">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
            <h2 id="learn-h" className="section-title">
              {h.startHere}
            </h2>
            <Link href="/learn" style={{ fontWeight: 600, color: "var(--accent)" }}>
              {t.common.allGuides}
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
            {guides.slice(0, 3).map((g) => (
              <StoryCard key={g.slug} entry={g} />
            ))}
            <Link href="/glossary" className="tint tint-violet stack reveal" style={{ gap: 10, justifyContent: "flex-end", minHeight: 220 }}>
              <span className="cat" style={{ color: "#6d28d9" }}>{h.glossaryTag}</span>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.15 }}>{h.glossaryTitle}</strong>
              <span className="small tint-ink" style={{ color: "#5b21b6" }}>{h.glossaryCta}</span>
            </Link>
          </div>
        </section>

        {/* ── Markets ── */}
        <section className="stack reveal" style={{ gap: 16 }} aria-labelledby="markets-h">
          <h2 id="markets-h" className="section-title">
            {h.markets}
          </h2>
          <Suspense fallback={<p className="muted">{t.common.loading}</p>}>
            <Markets />
          </Suspense>
        </section>

        {/* ── Explore ── */}
        <section className="stack" style={{ gap: 20 }} aria-labelledby="explore-h">
          <h2 id="explore-h" className="section-title">
            {h.beyond}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {EXPLORE.map((x) => {
              const e = h.explore[x.key];
              return (
                <Link key={x.key} href={x.href} className={`tint ${x.tint} stack reveal`} style={{ gap: 10 }}>
                  <span className="cat" style={{ color: x.color }}>
                    {e.label}
                  </span>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: 21, lineHeight: 1.2 }}>{e.title}</strong>
                  <span className="small" style={{ color: "var(--ink-2)" }}>
                    {e.body}
                  </span>
                  <span className="tiny" style={{ color: x.color, fontWeight: 600 }}>
                    {t.common.read}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Newsletter ── */}
        <AdSlot placement="home" />

        <section id="newsletter" className="gborder reveal" style={{ padding: 32 }}>
          <form className="row" style={{ gap: 24, alignItems: "center" }}>
            <div className="stack" style={{ flex: "1 1 360px", gap: 8 }}>
              <span className="cat grad-text">{h.newsletterTag}</span>
              <h2 style={{ margin: 0, fontSize: 28 }}>{h.newsletterTitle}</h2>
              <p className="muted" style={{ margin: 0 }}>
                {h.newsletterBody}
              </p>
            </div>
            {contact.newsletterUrl ? (
              <div className="stack" style={{ flex: "1 1 360px", gap: 8, alignItems: "flex-start" }}>
                <a href={contact.newsletterUrl} target="_blank" rel="noopener" className="btn btn-primary btn-glow">
                  {t.header.subscribe} →
                </a>
              </div>
            ) : (
            <div className="stack" style={{ flex: "1 1 360px", gap: 8 }}>
              <label htmlFor="nl-email">{h.email}</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <input id="nl-email" type="email" placeholder="you@example.com" style={{ flex: "1 1 220px", width: "auto" }} disabled />
                <button type="submit" className="btn btn-primary" disabled>
                  {t.header.subscribe}
                </button>
              </div>
              <span className="tiny muted">{h.signupsOpen}</span>
            </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
