"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "@/components/Link";

type Labels = {
  tab: string;
  title: string;
  brandsTitle: string;
  brandsBody: string;
  brandsCta: string;
  readersTitle: string;
  readersBody: string;
  copy: string;
  copied: string;
  close: string;
  hide: string;
};

const KEY = "tickora-sponsor-hidden-until";
const WEEK = 7 * 24 * 3_600_000;

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const readHidden = () => {
  try {
    return Number(localStorage.getItem(KEY) || 0) > Date.now();
  } catch {
    return false;
  }
};

/** Small floating "Sponsor" sticker in the bottom corner. Opens a panel for brands and readers; can be hidden for a week. */
export function SponsorSticker({ labels, tips }: { labels: Labels; tips: { label: string; address: string }[] }) {
  // Hidden until we know on the client, so the server never renders a sticker the visitor dismissed.
  const hidden = useSyncExternalStore(subscribe, readHidden, () => true);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (hidden) return null;

  const hideForWeek = () => {
    try {
      localStorage.setItem(KEY, String(Date.now() + WEEK));
    } catch {
      // Storage unavailable: hide for this page view only.
    }
    setOpen(false);
    listeners.forEach((l) => l());
  };

  const copy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      // Clipboard blocked: the address is selectable text anyway.
    }
  };

  return (
    <div className="sponsor-sticker" ref={panelRef}>
      {open && (
        <div className="sponsor-panel" role="dialog" aria-label={labels.title}>
          <div className="sponsor-head">
            <strong>{labels.title}</strong>
            <button type="button" className="sponsor-x" aria-label={labels.close} onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="sponsor-card is-brands">
            <span className="sponsor-kicker">{labels.brandsTitle}</span>
            <p>{labels.brandsBody}</p>
            <Link href="/advertise" className="btn btn-primary sponsor-cta" onClick={() => setOpen(false)}>
              {labels.brandsCta} →
            </Link>
          </div>
          {tips.length > 0 && (
            <div className="sponsor-card is-readers">
              <span className="sponsor-kicker">{labels.readersTitle}</span>
              <p>{labels.readersBody}</p>
              {tips.map((t) => (
                <div key={t.address} className="sponsor-tip">
                  <span className="tiny muted">{t.label}</span>
                  <div className="sponsor-addr">
                    <code>{t.address}</code>
                    <button type="button" onClick={() => copy(t.address)}>
                      {copied === t.address ? labels.copied : labels.copy}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button type="button" className="sponsor-hide" onClick={hideForWeek}>
            {labels.hide}
          </button>
        </div>
      )}
      <button type="button" className={`sponsor-tab${open ? " is-open" : ""}`} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="sponsor-star" aria-hidden="true">
          ✦
        </span>
        {labels.tab}
      </button>
    </div>
  );
}
