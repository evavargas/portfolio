export const site = {
  name: "Eva Vargas",
  title: "Software Engineer · Frontend & Product Engineering",
  note: "Frontend · Product · AI-Assisted Development",
  linkedin: "https://www.linkedin.com/in/eva-estrella-vargas-zevallos/",
  github: "https://github.com/evavargas",
} as const;

export type ResumeId = "en" | "es";

export const resumes: Record<
  ResumeId,
  { fileName: string; href: string; available: boolean }
> = {
  en: {
    fileName: "eva-vargas-product-engineer-en.pdf",
    href: "/resume/eva-vargas-product-engineer-en.pdf",
    available: true,
  },
  es: {
    fileName: "eva-vargas-product-engineer-es.pdf",
    href: "/resume/eva-vargas-product-engineer-es.pdf",
    available: true,
  },
};

/** Absolute origin without trailing slash, used for canonical URLs, sitemap, and structured data. */
export function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://evavargasportfolio.vercel.app");
  return url.replace(/\/$/, "");
}

export function getContactEmail() {
  return process.env.CONTACT_TO_EMAIL?.trim() || "";
}

/** E.164 without plus, e.g. 598097905849 */
export function getContactPhoneE164() {
  return process.env.CONTACT_PHONE_E164?.replace(/\D/g, "") || "";
}

/** Universal link: opens the WhatsApp app when available, otherwise WhatsApp Web. */
export function getWhatsAppUrl() {
  const phone = getContactPhoneE164();
  return phone ? `https://wa.me/${phone}` : "";
}
