import { getLocale, getTranslations } from "next-intl/server";
import { AboutIntro } from "@/components/about/about-intro";
import { EducationCard } from "@/components/about/education-card";
import { JobCard } from "@/components/about/job-card";
import { SkillGroupCard } from "@/components/about/skill-group-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList } from "@/components/motion/stagger-list";
import { ResumeGallery } from "@/components/resumes/resume-gallery";
import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { Container } from "@/components/ui/container";
import { ParagraphList } from "@/components/ui/prose";
import { SectionTitle } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { asAboutJobs, asSkillGroups, asStringArray } from "@/lib/messages";

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const intro = asStringArray(t.raw("intro"));
  const experienceIntro = asStringArray(t.raw("experienceIntro"));
  const jobs = asAboutJobs(t.raw("jobs"));
  const skillGroups = asSkillGroups(t.raw("skillGroups"));

  const opensNewTab = nav("opensNewTab");

  const actions: ButtonAction[] = [
    { key: "projects", label: t("ctaProjects"), href: `/${locale}#projects` },
    { key: "resume", label: t("ctaResume"), href: "#about-resumes", variant: "secondary" },
  ];

  return (
    <Container className="py-14 md:py-20">
      <Reveal>
        <SectionTitle>{t("eyebrow")}</SectionTitle>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
      </Reveal>

      <Reveal delayMs={80}>
        <ButtonGroup
          actions={actions}
          className="mt-8"
          trailing={<TextLink href={`/${locale}`}>← {nav("home")}</TextLink>}
        />
      </Reveal>

      <AboutIntro paragraphs={intro} imageAlt={t("photoAlt")} />

      <section className="mt-16" aria-labelledby="about-experience">
        <Reveal>
          <h2 id="about-experience" className="section-title">
            {t("experienceTitle")}
          </h2>
          <ParagraphList items={experienceIntro} className="mt-5 max-w-3xl" />
          <p className="mt-4 text-sm text-muted">{t("experienceNote")}</p>
        </Reveal>
        <StaggerList
          items={jobs}
          getKey={(job) => job.role + job.dates}
          as="ol"
          className="mt-8 grid gap-5"
          renderItem={(job, index) => (
            <JobCard job={job} index={index} opensNewTabLabel={opensNewTab} />
          )}
        />
      </section>

      <section className="mt-16" aria-labelledby="about-skills">
        <Reveal>
          <h2 id="about-skills" className="section-title">
            {t("skillsTitle")}
          </h2>
        </Reveal>
        <StaggerList
          items={skillGroups}
          getKey={(group) => group.title}
          as="div"
          itemAs="div"
          className="mt-8 grid gap-6 md:grid-cols-2"
          renderItem={(group) => <SkillGroupCard group={group} />}
        />
      </section>

      <Reveal>
        <div className="mt-16">
          <EducationCard
            eyebrow={t("educationTitle")}
            degree={t("education.degree")}
            school={t("education.school")}
            dates={t("education.dates")}
            note={t("education.note")}
            languages={t("education.languages")}
          />
        </div>
      </Reveal>

      <div id="about-resumes" className="mt-20 scroll-mt-28">
        <ResumeGallery id="about-resumes-gallery" />
      </div>
    </Container>
  );
}
