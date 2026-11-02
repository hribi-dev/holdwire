"use client";

import { useRef, type ReactNode } from "react";

/** Hero wrapper: a soft light follows the pointer (CSS variables, no re-renders). */
export function HeroSpotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className="spotlight" aria-hidden="true" />
      {children}
    </section>
  );
}
