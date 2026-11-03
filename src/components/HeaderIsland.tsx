"use client";

import { useEffect, useState } from "react";

/** The floating header bar. Tightens and gains a stronger shadow once the page scrolls. */
export function HeaderIsland({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className={`island${scrolled ? " is-scrolled" : ""}`}>{children}</div>;
}
