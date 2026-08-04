import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { defaultLocale, locales, type Locale } from "./config";
import en from "../messages/en.json";
import es from "../messages/es.json";
import fr from "../messages/fr.json";

const catalogs = {
  en,
  es,
  fr,
} as const satisfies Record<Locale, typeof en>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: catalogs[locale],
  };
});
