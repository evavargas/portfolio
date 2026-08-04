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
    { href: `${home}#projects`, label: t("projects") },
    { href: `${home}/about`, label: t("about") },
    { href: `${home}#resumes`, label: t("resumes") },
    { href: `${home}#contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--canvas)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href={home} className="font-display text-lg font-semibold tracking-tight">
          <span aria-hidden="true" className="mr-2 inline-block text-[var(--accent-pink)]">
            {"</>"}
          </span>
          {site.name}
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label={t("primary")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]"
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]"
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
            className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t("closeMenu") : t("openMenu")}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--line)] px-4 py-4 md:hidden"
          aria-label={t("primary")}
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-2 py-2 text-base font-medium"
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
