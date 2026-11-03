import Link from "@/components/Link";
import { ADS } from "@/content/ads";
import { getDict } from "@/i18n/server";

/**
 * A classy ad slot. Shows a booked, labelled ad for this placement when there is one,
 * otherwise our own "your brand here" card linking to /advertise.
 */
export async function AdSlot({ placement = "default" }: { placement?: string }) {
  const { t } = await getDict();
  const a = t.ad;
  const ad = ADS.find((x) => x.placement === placement);

  if (ad) {
    return (
      <aside className="adslot is-booked" aria-label={a.label}>
        <span className="adslot-label">{a.label} · {ad.advertiser}</span>
        <a href={ad.href} rel="sponsored noopener" target="_blank" className="adslot-booked">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {ad.image && <img src={ad.image} alt={ad.imageAlt ?? ""} className="adslot-img" loading="lazy" />}
          <span className="stack" style={{ gap: 6 }}>
            <strong className="adslot-title">{ad.headline}</strong>
            {ad.body && <span className="adslot-body">{ad.body}</span>}
          </span>
        </a>
      </aside>
    );
  }

  return (
    <aside className="adslot" aria-label={a.kicker}>
      <div className="adslot-glow" aria-hidden="true" />
      <div className="adslot-copy">
        <span className="adslot-kicker">
          <span className="adslot-dot" aria-hidden="true" /> {a.kicker}
        </span>
        <strong className="adslot-title">{a.title}</strong>
        <p className="adslot-body">{a.body}</p>
        <Link href="/advertise" className="adslot-cta">
          {a.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <Link href="/advertise" className="adslot-frame" aria-hidden="true" tabIndex={-1}>
        <span className="adslot-frame-inner">
          <span className="adslot-corner tl" />
          <span className="adslot-corner tr" />
          <span className="adslot-corner bl" />
          <span className="adslot-corner br" />
          <span className="adslot-mark">✦</span>
          <span className="adslot-frame-text">{a.size}</span>
        </span>
      </Link>
    </aside>
  );
}
