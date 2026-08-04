import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getContactQrDataUrl } from "@/lib/contact-qr";
import { getContactPhoneE164, site } from "@/lib/site";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const qrDataUrl = await getContactQrDataUrl();
  const phone = getContactPhoneE164();

  return (
    <section id="contact" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="max-w-2xl">
        <p className="section-title">{t("title")}</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-[var(--muted)]">{t("body")}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
          <h3 className="text-xl font-semibold">{t("formTitle")}</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">{t("formIntro")}</p>
          <div className="relative mt-6">
            <ContactForm />
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
          <div>
            <h3 className="text-xl font-semibold">{t("channelsTitle")}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{t("channelsBody")}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {phone ? <WhatsAppButton phone={phone} label={t("whatsapp")} /> : null}
            <Button href={site.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost">
              LinkedIn
            </Button>
          </div>

          <div className="rounded-3xl border border-dashed border-[var(--line)] bg-[var(--canvas)] p-5 text-center">
            {qrDataUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt={t("qrAlt")}
                  width={180}
                  height={180}
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
      </div>
    </section>
  );
}
