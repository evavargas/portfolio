import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-heading";
import { ResumeGallery } from "@/components/resumes/resume-gallery";
import { asAboutJobs, asSkillGroups, asStringArray } from "@/lib/messages";

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const intro = asStringArray(t.raw("intro"));
  const experienceIntro = asStringArray(t.raw("experienceIntro"));
  const jobs = asAboutJobs(t.raw("jobs"));
  const skillGroups = asSkillGroups(t.raw("skillGroups"));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <Reveal>
        <SectionTitle>{t("eyebrow")}</SectionTitle>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
      </Reveal>

      <Reveal delayMs={80}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/${locale}#projects`}>{t("ctaProjects")}</Button>
          <Button href="#about-resumes" variant="secondary">
            {t("ctaResume")}
          </Button>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-sm font-semibold text-[var(--accent-blue)] underline-offset-4 hover:underline"
          >
            ← {nav("home")}
          </Link>
        </div>
      </Reveal>

      <section className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="h-full">
          <div className="h-full rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
            <div className="space-y-5 text-lg leading-relaxed text-[var(--muted)]">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delayMs={90} className="h-full min-h-[20rem]">
          <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)]">
            <Image
              src="/img/profile.png"
              alt="Eva Vargas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
      </section>

      <section className="mt-16" aria-labelledby="about-experience">
        <Reveal>
          <SectionTitle>{t("experienceTitle")}</SectionTitle>
          <h2 id="about-experience" className="sr-only">
            {t("experienceTitle")}
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-[var(--muted)]">
            {experienceIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]">{t("experienceNote")}</p>
        </Reveal>
        <ol className="mt-8 grid gap-5">
          {jobs.map((job, index) => (
            <li key={job.role + job.dates}>
              <Reveal delayMs={index * 70}>
                <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold md:text-2xl">{job.role}</h3>
                    <p className="text-sm font-semibold text-[var(--muted)]">{job.dates}</p>
                  </div>
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex text-sm font-medium text-[var(--accent-blue)] underline-offset-4 hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-[var(--accent-blue)]">{job.company}</p>
                  )}
                  <p className="mt-4 text-[var(--muted)]">{job.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Badge tone={index % 2 === 0 ? "pink" : "blue"}>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="about-skills">
        <Reveal>
          <SectionTitle>{t("skillsTitle")}</SectionTitle>
          <h2 id="about-skills" className="sr-only">
            {t("skillsTitle")}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delayMs={index * 70}>
              <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5 md:p-6">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li key={skill}>
                      <Badge>{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mt-16 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
          <SectionTitle>{t("educationTitle")}</SectionTitle>
          <h2 className="mt-4 text-2xl font-semibold">{t("education.degree")}</h2>
          <p className="mt-2 text-[var(--muted)]">{t("education.school")}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
            {t("education.dates")} · {t("education.note")}
          </p>
          <p className="mt-4 text-[var(--muted)]">{t("education.languages")}</p>
        </section>
      </Reveal>

      <div id="about-resumes" className="mt-20 scroll-mt-28">
        <ResumeGallery id="about-resumes-gallery" />
      </div>
    </div>
  );
}
