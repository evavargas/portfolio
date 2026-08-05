import { getTranslations } from "next-intl/server";
import { HighlightCard } from "@/components/highlights/highlight-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList } from "@/components/motion/stagger-list";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-heading";
import { asStringArray } from "@/lib/messages";

export async function HighlightsSection() {
  const t = await getTranslations("highlights");
  const items = asStringArray(t.raw("items"));

  return (
    <Container as="section" className="pb-8 md:pb-12" aria-labelledby="highlights-title">
      <Reveal>
        <SectionTitle>{t("eyebrow")}</SectionTitle>
        <h2 id="highlights-title" className="sr-only">
          {t("title")}
        </h2>
      </Reveal>
      <StaggerList
        items={items}
        getKey={(item) => item}
        className="mt-6 grid items-stretch gap-4 md:grid-cols-3"
        renderItem={(item) => <HighlightCard className="flex-1">{item}</HighlightCard>}
      />
    </Container>
  );
}
