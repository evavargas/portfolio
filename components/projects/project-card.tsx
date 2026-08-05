import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ProjectMediaLink } from "@/components/projects/project-media-link";
import { BadgeListLabeled } from "@/components/ui/badge-list";
import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { GitHubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { ProjectItem } from "@/lib/messages";

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  labels: {
    visit: string;
    repo: string;
    tech: string;
    opensNewTab: string;
  };
};

export function ProjectCard({ project, index, labels }: ProjectCardProps) {
  const actions: ButtonAction[] = [
    {
      key: "visit",
      label: labels.visit,
      href: project.href,
      target: "_blank",
      rel: "noopener noreferrer",
      size: "sm",
      newTabLabel: labels.opensNewTab,
    },
    {
      key: "repo",
      label: (
        <>
          <GitHubIcon />
          {labels.repo}
        </>
      ),
      href: project.repo,
      variant: "ghost",
      target: "_blank",
      rel: "noopener noreferrer",
      size: "sm",
      newTabLabel: labels.opensNewTab,
    },
  ];

  return (
    <SpotlightCard>
      <article className="project-card">
        <div
          className={cn(
            "project-card-inner grid min-w-0 items-center gap-4 p-3.5 sm:gap-5 sm:p-4 md:grid-cols-2 md:p-5",
            index % 2 === 1 && "md:[&>div:first-child]:order-2",
          )}
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow-lg)] text-muted">
              {project.eyebrow}
            </p>
            <h3 className="mt-1.5 text-xl font-semibold md:text-2xl">{project.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted md:text-[0.95rem]">
              {project.description}
            </p>
            <ButtonGroup actions={actions} className="mt-3.5" />
            <BadgeListLabeled label={labels.tech} items={project.tech} className="mt-3.5" />
          </div>
          <div className="min-w-0 w-full">
            <ProjectMediaLink
              href={project.href}
              image={project.image}
              title={project.title}
              cta={labels.visit}
              opensNewTabLabel={labels.opensNewTab}
            />
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
