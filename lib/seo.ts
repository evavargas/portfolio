import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { localizedHref } from "@/i18n/locale-url";
import { getSiteUrl, site } from "@/lib/site";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

const ogLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

/** `path` is the public route: "/" for home, "/about" for About. */
function localizedAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localizedHref(path, l)]),
  );
  languages["x-default"] = path;

  return { canonical: localizedHref(path, locale), languages };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const image = {
    url: localizedHref("/og", locale),
    ...OG_IMAGE_SIZE,
    alt: `${site.name} — ${site.title}`,
  };

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "website",
      url: localizedHref(path, locale),
      siteName: site.name,
      title,
      description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function personJsonLd(locale: Locale, jobTitle: string) {
  const origin = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: site.name,
    url: `${origin}${localizedHref("/", locale)}`,
    image: `${origin}/img/profile.png`,
    jobTitle,
    sameAs: [site.linkedin, site.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montevideo",
      addressCountry: "UY",
    },
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Frontend Engineering",
      "Product Engineering",
      "React",
      "Next.js",
      "TypeScript",
      "Module Federation",
      "UX/UI Design",
      "AI-Assisted Software Development",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Tecnológica Nacional",
    },
  };
}

export function profilePageJsonLd(locale: Locale, name: string, description: string) {
  const origin = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${origin}${localizedHref("/about", locale)}`,
    name,
    description,
    inLanguage: locale,
    mainEntity: { "@id": `${origin}/#person` },
  };
}
