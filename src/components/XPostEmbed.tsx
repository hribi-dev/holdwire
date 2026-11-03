"use client";

import { useEffect, useRef, useState } from "react";

type Twttr = { widgets?: { load: (el?: HTMLElement) => Promise<unknown> } };
declare global {
  interface Window {
    twttr?: Twttr;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadWidgets(): Promise<void> {
  if (window.twttr?.widgets) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("X widgets failed to load"));
      };
      document.body.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * Click-to-load embed of a post on X. Nothing is requested from X until the reader clicks,
 * so no third-party cookies or tracking on page load (GDPR). If X can't be reached, the
 * plain link to the post stays visible.
 */
export function XPostEmbed({ url, labels }: { url: string; labels: { show: string; note: string; open: string } }) {
  const [state, setState] = useState<"idle" | "loading" | "shown" | "failed">("idle");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state !== "loading" || !box.current) return;
    const el = box.current;
    const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    el.innerHTML = "";
    const q = document.createElement("blockquote");
    q.className = "twitter-tweet";
    q.setAttribute("data-dnt", "true");
    q.setAttribute("data-theme", theme);
    q.setAttribute("data-conversation", "none");
    const a = document.createElement("a");
    a.href = url;
    a.textContent = url;
    q.appendChild(a);
    el.appendChild(q);
    let cancelled = false;
    loadWidgets()
      .then(() => window.twttr?.widgets?.load(el))
      .then(() => !cancelled && setState("shown"))
      .catch(() => !cancelled && setState("failed"));
    return () => {
      cancelled = true;
    };
  }, [state, url]);

  if (state === "idle" || state === "failed") {
    return (
      <div className="xembed-gate">
        <button type="button" className="xembed-btn" onClick={() => setState("loading")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.9-9L1.3 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20Z" />
          </svg>
          {labels.show}
        </button>
        <span className="tiny muted">{labels.note}</span>
        <a href={url} rel="nofollow noopener" target="_blank" className="tiny">
          {labels.open} ↗
        </a>
      </div>
    );
  }
  return <div ref={box} className="xembed-box" aria-busy={state === "loading"} />;
}
