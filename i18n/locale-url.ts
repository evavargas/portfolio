import { hasLocale } from "next-intl";
import { defaultLocale, LOCALE_COOKIE, LOCALE_PARAM, locales, type Locale } from "./config";

/** `localizedHref("/#projects", "es")` → `/?lang=es#projects`. */
export function localizedHref(href: string, locale: string) {
  if (locale === defaultLocale || !hasLocale(locales, locale)) return href;

  const hashIndex = href.indexOf("#");
  const base = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const separator = base.includes("?") ? "&" : "?";

  return `${base}${separator}${LOCALE_PARAM}=${locale}${hash}`;
}

/** Browser-side write of the cookie the proxy reads, so clean URLs resolve to `locale`. */
export function persistLocale(locale: Locale) {
  const { name, maxAge, path, sameSite } = LOCALE_COOKIE;
  document.cookie = `${name}=${locale}; path=${path}; max-age=${maxAge}; samesite=${sameSite}`;
}

export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const quality = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return {
        language: tag.trim().toLowerCase().split("-")[0] ?? "",
        q: quality ? Number(quality.slice(2)) : 1,
      };
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.language);

  return ranked.find((language) => hasLocale(locales, language)) ?? defaultLocale;
}
