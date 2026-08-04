import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContactQrDataUrl } from "@/lib/contact-qr";
import { getWhatsAppUrl, site } from "@/lib/site";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const qrDataUrl = await getContactQrDataUrl();
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="contact" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-16 md:px-6">
      <Reveal>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("body")} />
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <aside className="flex h-full flex-col gap-6 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
            <div>
              <h3 className="text-xl font-semibold">{t("channelsTitle")}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{t("channelsBody")}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {whatsappUrl ? (
                <Button
                  href="/api/whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="contact-channel"
                >
                  {t("whatsapp")}
                </Button>
              ) : null}
              <Button
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="contact-channel"
              >
                LinkedIn
              </Button>
            </div>

            <div className="rounded-3xl border border-dashed border-[var(--line)] bg-[var(--canvas)] p-5 text-center">
              {qrDataUrl ? (
                <>
                  <Image
                    src={qrDataUrl}
                    alt={t("qrAlt")}
                    width={180}
                    height={180}
                    unoptimized
                    className="mx-auto rounded-2xl bg-[var(--surface)] p-3"
                  />
                  <p className="mt-4 text-sm font-semibold">{t("qrTitle")}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{t("qrBody")}</p>
                </>
              ) : (
                <p className="text-sm text-[var(--muted)]">{t("qrUnavailable")}</p>
              )}
            </div>
          </aside>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="relative rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
            <h3 className="text-xl font-semibold">{t("formTitle")}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{t("formIntro")}</p>
            <div className="relative mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
