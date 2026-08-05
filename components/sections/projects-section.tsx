import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList } from "@/components/motion/stagger-list";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { asProjectItems } from "@/lib/messages";

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const items = asProjectItems(t.raw("items"));

  return (
    <Container as="section" id="projects" className="scroll-mt-28 py-8 md:py-16">
      <Reveal>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
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
            labels={{
              visit: t("visit"),
              repo: t("repo"),
              tech: t("tech"),
            }}
          />
        )}
      />
    </Container>
  );
}
