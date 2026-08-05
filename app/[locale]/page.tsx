import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BridgeSection,
  HeroSection,
  HighlightsSection,
  ProjectsSection,
} from "@/components/sections";
import { ContactSection } from "@/components/contact/contact-section";
import { Container } from "@/components/ui/container";
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
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
      <Container className="py-10">
        <ResumeGallery />
      </Container>
      <ProjectsSection />
      <ContactSection />
      <BridgeSection />
    </>
  );
}
