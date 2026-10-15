export const locales = ["en", "es", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

/** The locale lives in `?lang=` (never in the path); the default locale has no param. */
export const LOCALE_PARAM = "lang";

export const LOCALE_COOKIE = {
  name: "NEXT_LOCALE",
  maxAge: 60 * 60 * 24 * 365,
  path: "/",
  sameSite: "lax",
} as const;
