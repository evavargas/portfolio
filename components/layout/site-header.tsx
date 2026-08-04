"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;

  const links = [
    { href: `${home}#resumes`, label: t("resumes"), highlight: true },
    { href: `${home}#contact`, label: t("contact") },
    { href: `${home}/about`, label: t("about") },
    { href: `${home}#projects`, label: t("projects") },
  ];

  const linkClass = (highlight?: boolean) =>
    highlight
      ? "nav-link-highlight"
      : "nav-link text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]";

  const mobileLinkClass = (highlight?: boolean) =>
    highlight
      ? "nav-link-highlight block w-fit"
      : "block rounded-xl px-2 py-2 text-base font-medium";


  return (
    <header className="site-header sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--canvas)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href={home} className="font-display text-lg font-semibold tracking-tight">
          <span aria-hidden="true" className="mr-2 inline-block text-[var(--accent-pink)]">
            {"</>"}
          </span>
          {site.name}
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label={t("primary")}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.highlight)}>
              {link.label}
            </Link>
          ))}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]"
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]"
          >
            GitHub
          </a>
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
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="mobile-nav-panel border-t border-[var(--line)] px-4 py-4 md:hidden"
          aria-label={t("primary")}
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={mobileLinkClass(link.highlight)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="block px-2 py-2">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="block px-2 py-2">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
