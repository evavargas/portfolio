import { getLocale, getTranslations } from "next-intl/server";
import { ProjectMediaLink } from "@/components/projects/project-media-link";
import { Reveal } from "@/components/motion/reveal";
import { BadgeListLabeled } from "@/components/ui/badge-list";
import { Button } from "@/components/ui/button";
import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { Container } from "@/components/ui/container";
import { ParagraphList } from "@/components/ui/prose";
import { SectionTitle } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { localizedHref } from "@/i18n/locale-url";
import { asProjectDetail, asProjectItems } from "@/lib/messages";

export async function ProjectDetailPage({ slug }: { slug: string }) {
  const t = await getTranslations("projects");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const project = asProjectItems(t.raw("items")).find((p) => p.id === slug);
  const detail = asProjectDetail(t.raw(`details.${slug}`));
  if (!project) throw new Error(`Unknown project ${slug}`);

  const external = { target: "_blank", rel: "noopener noreferrer", newTabLabel: nav("opensNewTab") };
  const actions: ButtonAction[] = [
    { key: "visit", label: t("visit"), href: project.href, ...external },
    { key: "repo", label: t("repo"), href: project.repo, variant: "secondary", ...external },
  ];

  const linkActions: ButtonAction[] = detail.links.map((l) => ({
    key: l.url,
    label: l.label,
    href: l.url,
    ...external,
  }));

  const sections: { id: string; title: string; paragraphs: string[] }[] = [
    { id: "purpose", title: t("page.purpose"), paragraphs: detail.purpose },
    { id: "access", title: t("page.access"), paragraphs: detail.access.steps },
    { id: "built", title: t("page.built"), paragraphs: detail.built },
    { id: "why", title: t("page.why"), paragraphs: detail.why },
  ];

  return (
    <Container className="py-14 md:py-20">
      <Reveal>
        <Button href={localizedHref("/#projects", locale)} variant="ghost" size="sm" className="mb-8">
          ← {nav("projects")}
        </Button>
        <SectionTitle>{project.eyebrow}</SectionTitle>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">{project.description}</p>
        <ButtonGroup actions={actions} className="mt-8" />
        <BadgeListLabeled label={t("tech")} items={project.tech} className="mt-6" />
      </Reveal>

      <Reveal delayMs={80}>
        <div className="mt-10 max-w-4xl">
          <ProjectMediaLink
            href={project.href}
            image={project.image}
            title={project.title}
            cta={t("visit")}
            opensNewTabLabel={nav("opensNewTab")}
          />
        </div>
      </Reveal>

      {linkActions.length > 0 && (
        <Reveal>
          <ButtonGroup actions={linkActions} className="mt-12" />
        </Reveal>
      )}

      {sections.map(({ id, title, paragraphs }) => (
        <section key={id} className="mt-14" aria-labelledby={`project-${id}`}>
          <Reveal>
            <h2 id={`project-${id}`} className="section-title">
              {title}
            </h2>
            <ParagraphList items={paragraphs} className="mt-5 max-w-3xl" />
            {id === "access" && detail.access.credentials.length > 0 && (
              <dl className="mt-5 grid max-w-md gap-1 rounded-xl border border-line p-4 text-sm">
                <dt className="font-semibold">{t("page.credentials")}</dt>
                {detail.access.credentials.map((c) => (
                  <dd key={c.label} className="text-muted">
                    {c.label}: <code>{c.value}</code>
                  </dd>
                ))}
              </dl>
            )}
          </Reveal>
        </section>
      ))}

      {detail.videos.length > 0 && (
        <section className="mt-14" aria-labelledby="project-videos">
          <Reveal>
            <h2 id="project-videos" className="section-title">
              {t("page.videos")}
            </h2>
            <ul className="mt-5 grid gap-2">
              {detail.videos.map((v) => (
                <li key={v.url}>
                  <TextLink href={v.url} external opensNewTabLabel={nav("opensNewTab")}>
                    {v.title}
                  </TextLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}
    </Container>
  );
}
