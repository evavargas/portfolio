import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList } from "@/components/motion/stagger-list";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { localizedHref } from "@/i18n/locale-url";
import { asProjectItems } from "@/lib/messages";
import { isProjectSlug } from "@/lib/project-slugs";

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const items = asProjectItems(t.raw("items"));

  return (
    <Container
      as="section"
      id="projects"
      className="scroll-mt-28 py-8 md:py-16"
      aria-labelledby="projects-title"
    >
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          titleId="projects-title"
        />
      </Reveal>

      <StaggerList
        items={items}
        getKey={(project) => project.id}
        delayMs={80}
        as="div"
        itemAs="div"
        className="mt-8 grid gap-5 md:gap-6"
        itemClassName="min-w-0"
        renderItem={(project, index) => (
          <ProjectCard
            project={project}
            index={index}
            detailsHref={
              isProjectSlug(project.id)
                ? localizedHref(`/projects/${project.id}`, locale)
                : undefined
            }
            labels={{
              details: t("page.details"),
              visit: t("visit"),
              repo: t("repo"),
              tech: t("tech"),
              opensNewTab: nav("opensNewTab"),
            }}
          />
        )}
      />
    </Container>
  );
}
