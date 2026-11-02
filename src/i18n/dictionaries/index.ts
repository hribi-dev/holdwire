import type { Locale } from "../config";
import { en, type Dict } from "./en";
import { sl } from "./sl";
import { hr } from "./hr";
import { sr } from "./sr";
import { de } from "./de";
import { it } from "./it";
import { hu } from "./hu";
import { sk } from "./sk";
import { cs } from "./cs";
import { pt } from "./pt";
import { fr } from "./fr";
import { es } from "./es";
import { ru } from "./ru";
import { sv } from "./sv";
import { nb } from "./nb";
import { da } from "./da";

export type { Dict };

export const DICTIONARIES: Record<Locale, Dict> = { en, sl, hr, sr, de, it, hu, sk, cs, pt, fr, es, ru, sv, nb, da };

/** Replace {name} placeholders. */
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
