"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { MenuIcon } from "@/components/ui/icons";
import { getHomeNavLinks, getSocialLinks, type SiteLink } from "@/lib/site-links";
import { site } from "@/lib/site";

type SectionId = "resumes" | "contact" | "projects";

/** Home scroll order: resumes → projects → contact. About is a separate page (last). */
const HOME_SECTIONS: SectionId[] = ["resumes", "projects", "contact"];

function readActiveSection(): SectionId | null {
  const marker = window.scrollY + Math.min(window.innerHeight * 0.28, 220);
  let current: SectionId | null = null;

  for (const id of HOME_SECTIONS) {
    const node = document.getElementById(id);
    if (!node) continue;
    if (node.offsetTop <= marker) {
      current = id;
    }
  }

  return current;
}

function navLinkClass(active: boolean) {
  return `nav-link text-sm font-medium ${
    active ? "nav-link-active text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
  }`;
}

function mobileLinkClass(active: boolean) {
  return `block rounded-xl px-2 py-2 text-base font-medium${active ? " text-[var(--ink)]" : ""}`;
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const home = `/${locale}`;
  const onAbout = pathname === `${home}/about` || pathname.startsWith(`${home}/about/`);
  const onHome = pathname === home || pathname === `${home}/`;

  const pageLinks = getHomeNavLinks(home).map((link) => ({
    ...link,
    label: link.labelKey ? t(link.labelKey) : (link.label ?? ""),
  }));
  const socialLinks = getSocialLinks();

  useEffect(() => {
    if (!onHome) return;

    let ticking = false;
    const update = () => {
      setActiveSection(readActiveSection());
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome, pathname]);

  const effectiveSection = onHome ? activeSection : null;

  const isActive = (link: SiteLink) =>
    link.about ? onAbout : link.section !== undefined && link.section === effectiveSection;

  return (
    <header className="site-header sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--canvas)_86%,transparent)] backdrop-blur-md">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link href={home} className="font-display text-lg font-semibold tracking-tight">
          <span aria-hidden="true" className="mr-2 inline-block text-[var(--accent-pink)]">
            {"</>"}
          </span>
          {site.name}
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label={t("primary")}>
          {pageLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={navLinkClass(active)}
                aria-current={active ? "true" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
          <LocaleSwitcher label={t("language")} />
          <ThemeToggle
            lightLabel={t("themeLight")}
            darkLabel={t("themeDark")}
            systemLabel={t("themeSystem")}
          />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher label={t("language")} />
          <ThemeToggle
            lightLabel={t("themeLight")}
            darkLabel={t("themeDark")}
            systemLabel={t("themeSystem")}
          />
          <IconButton
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </IconButton>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          className="mobile-nav-panel border-t border-[var(--line)] px-4 py-4 md:hidden"
          aria-label={t("primary")}
        >
          <ul className="flex flex-col gap-3">
            {[...pageLinks, ...socialLinks].map((link) => {
              const active = isActive(link);
              if (link.external) {
                return (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-2 py-2"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={mobileLinkClass(active)}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
