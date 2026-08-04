export const site = {
  name: "Eva Vargas",
  title: "Software Engineer - Senior Frontend Developer",
  note: "Frontend · Product · AI-Assisted Development",
  linkedin: "https://www.linkedin.com/in/eva-estrella-vargas-zevallos/",
  github: "https://github.com/evavargas",
} as const;

export type ResumeId = "en" | "es" | "ats";

export const resumes: Record<
  ResumeId,
  { fileName: string; href: string; available: boolean }
> = {
  en: {
    fileName: "eva-vargas-en.pdf",
    href: "/resume/eva-vargas-en.pdf",
    available: true,
  },
  es: {
    fileName: "eva-vargas-es.pdf",
    href: "/resume/eva-vargas-es.pdf",
    available: true,
  },
  ats: {
    fileName: "eva-vargas-ats.pdf",
    href: "/resume/eva-vargas-ats.pdf",
    available: true,
  },
};

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
