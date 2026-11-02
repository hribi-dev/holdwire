import { lang } from "next/root-params";
import { DEFAULT_LOCALE, hasLocale, LOCALE_INFO, type Locale } from "./config";
import { DICTIONARIES, type Dict } from "./dictionaries";

/** Current locale from the [lang] root segment (server only). */
export async function getLocale(): Promise<Locale> {
  const l = await lang();
  return hasLocale(l) ? l : DEFAULT_LOCALE;
}

export async function getDict(): Promise<{ locale: Locale; t: Dict; intl: string }> {
  const locale = await getLocale();
  return { locale, t: DICTIONARIES[locale], intl: LOCALE_INFO[locale].intl };
}
