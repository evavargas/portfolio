import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BridgeSection,
  HeroSection,
  HighlightsSection,
  ProjectsSection,
} from "@/components/sections/home-sections";
import { ContactSection } from "@/components/contact/contact-section";
import { ResumeGallery } from "@/components/resumes/resume-gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: ["/img/project5.png"],
      locale,
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <ResumeGallery />
      </div>
      <ContactSection />
      <ProjectsSection />
      <BridgeSection />
    </>
  );
}
