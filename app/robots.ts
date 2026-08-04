import type { MetadataRoute } from "next";

function siteOrigin() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://evavargasportfolio.vercel.app")
  );
}

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin().replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
