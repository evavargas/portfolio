import { getLocale, getTranslations } from "next-intl/server";
import { HeroIdea } from "@/components/motion/hero-idea";
import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { Container } from "@/components/ui/container";
import { ParagraphList } from "@/components/ui/prose";
import { asStringArray } from "@/lib/messages";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const paragraphs = asStringArray(t.raw("paragraphs"));

  const actions: ButtonAction[] = [
    { key: "projects", label: t("ctaProjects"), href: `/${locale}#projects` },
    {
      key: "contact",
      label: t("ctaContact"),
      href: `/${locale}#contact`,
      variant: "secondary",
    },
  ];

  return (
    <Container as="section" className="grid gap-10 pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="max-w-3xl">
        <p className="hero-enter hero-enter-1 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          {t("greeting")}
        </p>
        <h1 className="hero-enter hero-enter-2 mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {t("name")}
        </h1>
        <p className="hero-enter hero-enter-3 mt-5 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          <HeroIdea text={t("idea")} />
        </p>
        <p className="hero-enter hero-enter-4 mt-4 text-base text-link md:text-lg">
          {t("role")}
        </p>
        <ParagraphList
          items={paragraphs}
          className="hero-enter hero-enter-5 mt-6 max-w-2xl"
        />
        <ButtonGroup actions={actions} className="hero-enter hero-enter-6 mt-8" />
      </div>
    </Container>
  );
}
