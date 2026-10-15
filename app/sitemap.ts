import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizedHref } from "@/i18n/locale-url";
import { getSiteUrl } from "@/lib/site";

/** Bump when page content changes. */
const CONTENT_UPDATED_AT = new Date("2026-10-15");

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();

  return ROUTES.flatMap(({ path, priority }) => {
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((locale) => [locale, `${origin}${localizedHref(path, locale)}`]),
    );
    languages["x-default"] = `${origin}${path}`;

    return locales.map((locale) => ({
      url: `${origin}${localizedHref(path, locale)}`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
