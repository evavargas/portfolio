import { localizedHref } from "@/i18n/locale-url";
import { site } from "@/lib/site";

export type SiteLink = {
  key: string;
  href: string;
  labelKey?: "resumes" | "projects" | "contact" | "about";
  label?: string;
  external?: boolean;
  section?: "resumes" | "projects" | "contact";
  about?: boolean;
};

export function getHomeNavLinks(locale: string): SiteLink[] {
  return [
    {
      key: "resumes",
      href: localizedHref("/#resumes", locale),
      labelKey: "resumes",
      section: "resumes",
    },
    {
      key: "projects",
      href: localizedHref("/#projects", locale),
      labelKey: "projects",
      section: "projects",
    },
    {
      key: "contact",
      href: localizedHref("/#contact", locale),
      labelKey: "contact",
      section: "contact",
    },
    { key: "about", href: localizedHref("/about", locale), labelKey: "about", about: true },
  ];
}

export function getSocialLinks(): SiteLink[] {
  return [
    { key: "linkedin", href: site.linkedin, label: "LinkedIn", external: true },
    { key: "github", href: site.github, label: "GitHub", external: true },
  ];
}

export function getFooterLinks(locale: string): SiteLink[] {
  return [...getHomeNavLinks(locale), ...getSocialLinks()];
}
