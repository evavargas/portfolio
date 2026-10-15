import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutPageContent } from "@/components/sections/about-content";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, profilePageJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <>
      <JsonLd
        data={profilePageJsonLd(
          locale as Locale,
          t("aboutTitle"),
          t("aboutDescription"),
        )}
      />
      <AboutPageContent />
    </>
  );
}
