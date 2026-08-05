import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";

export async function BridgeSection() {
  const t = await getTranslations("bridge");
  const locale = await getLocale();

  const actions: ButtonAction[] = [
    { key: "about", label: t("cta"), href: `/${locale}/about` },
  ];

  return (
    <Container as="section" className="py-10">
      <Reveal>
        <Surface padding="xl" radius="xl" tone="accent">
          <h2 className="text-3xl font-semibold md:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/85">{t("body")}</p>
          <ButtonGroup actions={actions} className="mt-6" />
        </Surface>
      </Reveal>
    </Container>
  );
}
