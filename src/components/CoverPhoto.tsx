"use client";

import { useEffect, useRef, useState } from "react";
import { sizedCover, type Cover } from "@/lib/cover";

/**
 * A hotlinked cover photo laid over the generated cover art. If the photo fails to load
 * (deleted upstream, CDN hiccup), it hides itself and the cover art underneath shows instead.
 */
export function CoverPhoto({ cover, widths, sizes, eager = false }: { cover: Cover; widths: number[]; sizes: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image can fail before React hydrates and attaches onError; catch that case too.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return null;
  const srcSet = widths.map((w) => `${sizedCover(cover.src, w)} ${w}w`).join(", ");
  return (
    // Plain <img>: Unsplash asks for its CDN URLs to be used directly, and the CDN already resizes.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      className="cover-art cover-photo"
      src={sizedCover(cover.src, widths[widths.length - 1])}
      srcSet={srcSet}
      sizes={sizes}
      alt={cover.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer-when-downgrade"
      onError={() => setFailed(true)}
    />
  );
}
