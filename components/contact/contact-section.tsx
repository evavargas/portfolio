import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { getContactQrDataUrl } from "@/lib/contact-qr";
import { getWhatsAppUrl, site } from "@/lib/site";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");
  const qrDataUrl = await getContactQrDataUrl();
  const whatsappUrl = getWhatsAppUrl();
  const opensNewTab = nav("opensNewTab");

  const channelActions: ButtonAction[] = [
    ...(whatsappUrl
      ? [
          {
            key: "whatsapp",
            label: t("whatsapp"),
            href: "/api/whatsapp",
            target: "_blank",
            rel: "noopener noreferrer",
            variant: "secondary" as const,
            className: "contact-channel",
            newTabLabel: opensNewTab,
          },
        ]
      : []),
    {
      key: "linkedin",
      label: "LinkedIn",
      href: site.linkedin,
      target: "_blank",
      rel: "noopener noreferrer",
      variant: "ghost",
      className: "contact-channel",
      newTabLabel: opensNewTab,
    },
  ];

  return (
    <Container
      as="section"
      id="contact"
      className="scroll-mt-28 py-16"
      aria-labelledby="contact-title"
    >
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("body")}
          titleId="contact-title"
        />
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <Surface
            as="aside"
            padding="lg"
            radius="xl"
            className="flex h-full flex-col gap-6"
          >
            <div>
              <h3 className="text-xl font-semibold">{t("channelsTitle")}</h3>
              <p className="mt-2 text-sm text-muted">{t("channelsBody")}</p>
            </div>

            <ButtonGroup actions={channelActions} />

            <Surface padding="sm" radius="xl" tone="dashed" className="text-center">
              {qrDataUrl ? (
                <>
                  <Image
                    src={qrDataUrl}
                    alt={t("qrAlt")}
                    width={180}
                    height={180}
                    unoptimized
                    className="mx-auto rounded-2xl bg-surface p-3"
                  />
                  <p className="mt-4 text-sm font-semibold">{t("qrTitle")}</p>
                  <p className="mt-1 text-sm text-muted">{t("qrBody")}</p>
                </>
              ) : (
                <p className="text-sm text-muted">{t("qrUnavailable")}</p>
              )}
            </Surface>
          </Surface>
        </Reveal>

        <Reveal delayMs={80}>
          <Surface padding="lg" radius="xl" className="relative">
            <h3 className="text-xl font-semibold">{t("formTitle")}</h3>
            <p className="mt-2 text-sm text-muted">{t("formIntro")}</p>
            <div className="relative mt-6">
              <ContactForm />
            </div>
          </Surface>
        </Reveal>
      </div>
    </Container>
  );
}
