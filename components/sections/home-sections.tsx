import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { HeroIdea } from "@/components/ui/hero-idea";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionTitle } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
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
          <HeroIdea text={t("idea")} />
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
            <SpotlightCard>
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
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue)] underline-offset-4 hover:underline"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                      </svg>
                      {t("repo")}
                    </a>
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
            </SpotlightCard>
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
