import { getLocale, getTranslations } from "next-intl/server";
import { ProjectMediaLink } from "@/components/projects/project-media-link";
import { Reveal } from "@/components/motion/reveal";
import { BadgeListLabeled } from "@/components/ui/badge-list";
import { Button } from "@/components/ui/button";
import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { Container } from "@/components/ui/container";
import { ParagraphList } from "@/components/ui/prose";
import { SectionTitle } from "@/components/ui/section-heading";
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
  // An APK download is the main call to action; otherwise Live is. Everything else is outline.
  const isApk = (url: string) => url.endsWith(".apk");
  const toAction = (l: { label: string; url: string }): ButtonAction => ({
    key: l.url,
    label: l.label,
    href: l.url,
    ...external,
  });
  const apkActions = detail.links.filter((l) => isApk(l.url)).map(toAction);
  const actions: ButtonAction[] = [
    ...apkActions,
    {
      key: "visit",
      label: t("visit"),
      href: project.href,
      variant: apkActions.length ? "ghost" : "primary",
      ...external,
    },
    ...detail.links.filter((l) => !isApk(l.url)).map((l) => ({ ...toAction(l), variant: "ghost" as const })),
    { key: "repo", label: t("repo"), href: project.repo, variant: "ghost", ...external },
  ];

  const sections: { id: string; title: string; paragraphs: string[] }[] = [
    { id: "purpose", title: t("page.purpose"), paragraphs: detail.purpose },
    { id: "access", title: t("page.access"), paragraphs: detail.access.steps },
    { id: "built", title: t("page.built"), paragraphs: detail.built },
    { id: "why", title: t("page.why"), paragraphs: detail.why },
  ];

  const hasVideos = detail.videos.length > 0;

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

      {/* Desktop: text column + sticky portrait video on the right. Mobile: image, links, video, text. */}
      <div
        className={
          hasVideos
            ? "mt-10 grid gap-x-12 lg:grid-cols-[minmax(0,1fr)_300px]"
            : "mt-10 grid"
        }
      >
        <Reveal delayMs={80} className="lg:col-start-1 lg:row-start-1">
          <ProjectMediaLink
            href={project.href}
            image={project.image}
            title={project.title}
            cta={t("visit")}
            opensNewTabLabel={nav("opensNewTab")}
          />
        </Reveal>

        {hasVideos && (
          <aside
            aria-label={t("page.videos")}
            className="mt-10 flex flex-col gap-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start lg:sticky lg:top-28"
          >
            {detail.videos.map((v) => (
              <div key={v.url} className="mx-auto w-full max-w-[300px] lg:mx-0">
                {/* Portrait clip: width/height reserve the exact ratio at any viewport. */}
                <video
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  preload="auto"
                  aria-label={v.title}
                  width={v.width}
                  height={v.height}
                  style={{ aspectRatio: `${v.width} / ${v.height}` }}
                  className="h-auto w-full rounded-2xl border border-line bg-black shadow-[0_10px_28px_-14px_rgb(0_0_0/0.3)]"
                  src={v.url}
                />
              </div>
            ))}
          </aside>
        )}

        <div className="lg:col-start-1 lg:row-start-2">
          {sections.map(({ id, title, paragraphs }) => (
            <section key={id} className="mt-14" aria-labelledby={`project-${id}`}>
              <Reveal>
                <h2 id={`project-${id}`} className="section-title">
                  {title}
                </h2>
                <ParagraphList items={paragraphs} className="mt-5 max-w-3xl" />
                {id === "access" && detail.access.credentials.length > 0 && (
                  <dl className="mt-5 grid max-w-xl gap-2 rounded-xl border border-line p-4 text-sm">
                    <dt className="font-semibold">{t("page.credentials")}</dt>
                    {detail.access.credentials.map((c) => (
                      <dd key={c.label} className="text-muted">
                        {c.label}
                        <code className="block break-all text-ink">{c.value}</code>
                      </dd>
                    ))}
                    <dd className="text-xs text-muted">{t("page.credentialsNote")}</dd>
                  </dl>
                )}
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
