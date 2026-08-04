import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

function siteOrigin() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://evavargasportfolio.vercel.app")
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin().replace(/\/$/, "");
  const lastModified = new Date();

  return locales.flatMap((locale) => [
    {
      url: `${origin}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${origin}/${locale}/about`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);
}
