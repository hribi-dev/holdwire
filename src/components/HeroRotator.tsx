"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "@/components/Link";

export type HeroSlide = {
  key: string;
  tag: string;
  title: string;
  accent?: string;
  body: string;
  cta: string;
  href: string;
  color: string;
};

const DURATION = 6500;

/**
 * Rotating hero. The first slide is the page's <h1> and is what search engines and
 * no-JS readers see; the rest rotate in on the client. Pauses on hover/focus and
 * never autoplays for readers who prefer reduced motion.
 */
export function HeroRotator({ slides, labels }: { slides: HeroSlide[]; labels: { prev: string; next: string } }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tick, setTick] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const n = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const go = useCallback((k: number) => {
    setI(((k % n) + n) % n);
    setTick((t) => t + 1);
  }, [n]);

  useEffect(() => {
    if (paused || reduced || n < 2) return;
    const id = window.setTimeout(() => go(i + 1), DURATION);
    return () => window.clearTimeout(id);
  }, [i, paused, reduced, n, go, tick]);

  return (
    <div
      ref={box}
      className="rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      aria-roledescription="carousel"
    >
      <div className="rotator-stage">
        {slides.map((s, k) => {
          const active = k === i;
          const Title = k === 0 ? "h1" : "p";
          return (
            <div
              key={s.key}
              className={`rotator-slide${active ? " is-active" : ""}`}
              aria-hidden={!active}
              aria-roledescription="slide"
              aria-label={`${k + 1} / ${n}`}
              style={{ ["--slide" as string]: s.color }}
            >
              <span className="rotator-tag">
                <span className="live-dot" /> {s.tag}
              </span>
              <Title className="rotator-title">
                {s.title}
                {s.accent && (
                  <>
                    <br />
                    <span className="grad-text">{s.accent}</span>
                  </>
                )}
              </Title>
              <p className="rotator-body">{s.body}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={s.href} className="btn rotator-cta" tabIndex={active ? 0 : -1}>
                  {s.cta} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {n > 1 && (
        <div className="rotator-controls">
          <button type="button" className="rotator-arrow" onClick={() => go(i - 1)} aria-label={labels.prev}>
            ←
          </button>
          <div className="rotator-dots" role="tablist">
            {slides.map((s, k) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={s.tag}
                className={`rotator-dot${k === i ? " is-active" : ""}`}
                onClick={() => go(k)}
              >
                {k === i && !paused && !reduced && <span key={tick} className="rotator-progress" style={{ animationDuration: `${DURATION}ms` }} />}
              </button>
            ))}
          </div>
          <button type="button" className="rotator-arrow" onClick={() => go(i + 1)} aria-label={labels.next}>
            →
          </button>
        </div>
      )}
    </div>
  );
}
