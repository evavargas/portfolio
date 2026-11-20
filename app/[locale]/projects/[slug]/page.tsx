import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectDetailPage } from "@/components/projects/project-detail";
import { locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import { PROJECT_SLUGS, isProjectSlug } from "@/lib/project-slugs";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => PROJECT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  const t = await getTranslations({ locale, namespace: "projects" });
  const item = (t.raw("items") as { id: string; title: string; description: string }[]).find(
    (p) => p.id === slug,
  );

  return buildPageMetadata({
    locale: locale as Locale,
    path: `/projects/${slug}`,
    title: `${item?.title} · Eva Vargas`,
    description: item?.description ?? "",
  });
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  setRequestLocale(locale);
  return <ProjectDetailPage slug={slug} />;
}
