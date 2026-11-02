"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { localize } from "@/i18n/config";

/** Drop-in replacement for next/link that keeps the reader in their language. */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const params = useParams<{ lang?: string }>();
  const h = typeof href === "string" ? localize(href, params?.lang) : href;
  return <NextLink href={h} {...rest} />;
}
