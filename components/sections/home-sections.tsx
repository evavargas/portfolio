import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionTitle } from "@/components/ui/section-heading";
import { ProjectMediaLink } from "@/components/sections/project-media-link";
import { asProjectItems, asStringArray } from "@/lib/messages";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const paragraphs = asStringArray(t.raw("paragraphs"));

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-20">
      <div className="max-w-3xl">
        <p className="hero-enter hero-enter-1 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {t("greeting")}
        </p>
        <h1 className="hero-enter hero-enter-2 mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {t("name")}
        </h1>
        <p className="hero-enter hero-enter-3 mt-5 font-display text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-3xl">
          <span className="hero-idea">{t("idea")}</span>
        </p>
        <p className="hero-enter hero-enter-4 mt-4 text-base text-[var(--accent-blue)] md:text-lg">
          {t("role")}
        </p>
        <div className="hero-enter hero-enter-5 mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-[var(--muted)]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="hero-enter hero-enter-6 mt-8 flex flex-wrap gap-3">
          <Button href={`/${locale}#projects`}>{t("ctaProjects")}</Button>
          <Button href={`/${locale}/about`} variant="secondary">
            {t("ctaAbout")}
          </Button>
          <Button href={`/${locale}#resumes`} variant="ghost">
            {t("ctaResume")}
          </Button>
          <Button href={`/${locale}#contact`} variant="ghost">
            {t("ctaContact")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export async function HighlightsSection() {
  const t = await getTranslations("highlights");
  const items = asStringArray(t.raw("items"));

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6 md:pb-12" aria-labelledby="highlights-title">
      <Reveal>
        <SectionTitle>{t("eyebrow")}</SectionTitle>
        <h2 id="highlights-title" className="sr-only">
          {t("title")}
        </h2>
      </Reveal>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <li key={item}>
            <Reveal delayMs={index * 70}>
              <div className="highlight-card rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 text-[var(--muted)]">
                {item}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const items = asProjectItems(t.raw("items"));

  return (
    <section id="projects" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
      <Reveal>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </Reveal>

      <div className="mt-10 grid gap-8">
        {items.map((project, index) => (
          <Reveal key={project.id} delayMs={index * 80} className="min-w-0">
            <article className="project-card">
              <div
                className={`project-card-inner grid min-w-0 items-center gap-5 p-4 sm:gap-6 sm:p-5 md:grid-cols-2 md:p-8 ${
                  index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {project.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{project.title}</h3>
                  <p className="mt-4 text-[var(--muted)]">{project.description}</p>
                  <p className="mt-5 text-sm font-semibold">{t("tech")}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech}>
                        <span className="badge">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0 w-full">
                  <ProjectMediaLink
                    href={project.href}
                    image={project.image}
                    title={project.title}
                    cta={t("visit")}
                  />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export async function BridgeSection() {
  const t = await getTranslations("bridge");
  const locale = await getLocale();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <Reveal>
        <div className="rounded-[2rem] border border-[var(--line)] bg-gradient-to-br from-[var(--accent-blue-soft)] to-[var(--accent-pink-soft)] p-8 md:p-12">
          <h2 className="text-3xl font-semibold md:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-2xl text-lg text-[var(--ink)]/85">{t("body")}</p>
          <div className="mt-6">
            <Button href={`/${locale}/about`}>{t("cta")}</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
