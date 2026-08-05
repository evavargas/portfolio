import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { ResumeDownloadPanel } from "@/components/resumes/resume-download-panel";
import { SectionHeading } from "@/components/ui/section-heading";

/** Server shell for resumes: heading stays RSC; downloads are a client island. */
export async function ResumeGallery({ id = "resumes" }: { id?: string }) {
  const t = await getTranslations("resumes");

  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeading
          className="mb-8 max-w-2xl"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          titleId={`${id}-title`}
        />
      </Reveal>

      <ResumeDownloadPanel />
    </section>
  );
}
