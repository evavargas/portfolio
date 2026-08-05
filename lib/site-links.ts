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

export function getHomeNavLinks(home: string): SiteLink[] {
  return [
    { key: "resumes", href: `${home}#resumes`, labelKey: "resumes", section: "resumes" },
    { key: "projects", href: `${home}#projects`, labelKey: "projects", section: "projects" },
    { key: "contact", href: `${home}#contact`, labelKey: "contact", section: "contact" },
    { key: "about", href: `${home}/about`, labelKey: "about", about: true },
  ];
}

export function getSocialLinks(): SiteLink[] {
  return [
    { key: "linkedin", href: site.linkedin, label: "LinkedIn", external: true },
    { key: "github", href: site.github, label: "GitHub", external: true },
  ];
}

export function getFooterLinks(home: string): SiteLink[] {
  return [...getHomeNavLinks(home), ...getSocialLinks()];
}
