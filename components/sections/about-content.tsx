import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResumeGallery } from "@/components/resumes/resume-gallery";

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const achievements = t.raw("achievements") as string[];
  const skills = t.raw("skills") as string[];
  const jobs = t.raw("jobs") as Array<{
    role: string;
    company: string;
    dates: string;
    summary: string;
    stack: string[];
  }>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="section-title">{t("eyebrow")}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
        {t("title")}
      </h1>

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

      <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
          <p className="section-title">{t("profileTitle")}</p>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{t("profile")}</p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/profile.png"
            alt="Eva Vargas"
            width={800}
            height={800}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      <section className="mt-16">
        <p className="section-title">{t("achievementsTitle")}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {achievements.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <p className="section-title">{t("experienceTitle")}</p>
        <p className="mt-3 text-sm text-[var(--muted)]">{t("experienceNote")}</p>
        <ol className="mt-8 grid gap-5">
          {jobs.map((job, index) => (
            <li
              key={job.role + job.dates}
              className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5 md:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-semibold md:text-2xl">{job.role}</h2>
                <p className="text-sm font-semibold text-[var(--muted)]">{job.dates}</p>
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--accent-blue)]">{job.company}</p>
              <p className="mt-4 text-[var(--muted)]">{job.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <li key={tech}>
                    <Badge tone={index % 2 === 0 ? "pink" : "blue"}>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <p className="section-title">{t("skillsTitle")}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill}>
              <Badge>{skill}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
        <p className="section-title">{t("educationTitle")}</p>
        <h2 className="mt-4 text-2xl font-semibold">{t("education.degree")}</h2>
        <p className="mt-2 text-[var(--muted)]">{t("education.school")}</p>
        <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
          {t("education.dates")} · {t("education.note")}
        </p>
        <p className="mt-4 text-[var(--muted)]">{t("education.languages")}</p>
      </section>

      <div id="about-resumes" className="mt-20 scroll-mt-28">
        <ResumeGallery id="about-resumes-gallery" />
      </div>
    </div>
  );
}
