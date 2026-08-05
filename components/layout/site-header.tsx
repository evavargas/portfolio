"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useFocusTrap, useHeaderOffset } from "@/components/layout/use-header-a11y";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { MenuIcon } from "@/components/ui/icons";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { getHomeNavLinks, getSocialLinks, type SiteLink } from "@/lib/site-links";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

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
  return cn(
    "nav-link text-sm font-medium",
    active ? "nav-link-active text-ink" : "text-muted hover:text-ink",
  );
}

function mobileLinkClass(active: boolean) {
  return cn(
    "block rounded-xl px-2 py-3 text-lg font-medium",
    active ? "text-ink" : "text-muted",
  );
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileNavId = useId();
  const home = `/${locale}`;
  const onAbout = pathname === `${home}/about` || pathname.startsWith(`${home}/about/`);
  const onHome = pathname === home || pathname === `${home}/`;
  const opensNewTab = t("opensNewTab");

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const pageLinks = getHomeNavLinks(home).map((link) => ({
    ...link,
    label: link.labelKey ? t(link.labelKey) : (link.label ?? ""),
  }));
  const socialLinks = getSocialLinks();

  useHeaderOffset(headerRef, barRef);
  useFocusTrap(mobileNavRef, open, closeMenu);

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

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const effectiveSection = onHome ? activeSection : null;

  const isActive = (link: SiteLink) =>
    link.about ? onAbout : link.section !== undefined && link.section === effectiveSection;

  const currentAttr = (link: SiteLink, active: boolean) => {
    if (!active) return undefined;
    return link.about ? "page" : "true";
  };

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--canvas)_86%,transparent)] backdrop-blur-md"
    >
      <div ref={barRef}>
        <Container className="relative z-50 flex items-center justify-between gap-4 py-3">
          <Link href={home} className="font-display text-lg font-semibold tracking-tight">
            <span aria-hidden="true" className="mr-2 inline-block text-accent-pink">
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
                  aria-current={currentAttr(link, active)}
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
                className="nav-link text-sm font-medium text-muted hover:text-ink"
              >
                {link.label}
                <NewTabHint label={opensNewTab} />
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
              ref={menuButtonRef}
              aria-expanded={open}
              aria-controls={mobileNavId}
              aria-haspopup="dialog"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              onClick={() => setOpen((value) => !value)}
            >
              <MenuIcon open={open} />
            </IconButton>
          </div>
        </Container>
      </div>

      {open ? (
        <nav
          ref={mobileNavRef}
          id={mobileNavId}
          className="mobile-nav-panel fixed inset-x-0 bottom-0 z-40 flex flex-col bg-canvas md:hidden"
          style={{
            top: "var(--site-header-offset)",
            height: "calc(100dvh - var(--site-header-offset))",
          }}
          aria-label={t("primary")}
          aria-modal="true"
          role="dialog"
        >
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-10 pt-4">
            {[...pageLinks, ...socialLinks].map((link) => {
              const active = isActive(link);

              if (link.external) {
                return (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={mobileLinkClass(false)}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                      <NewTabHint label={opensNewTab} />
                    </a>
                  </li>
                );
              }

              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={mobileLinkClass(active)}
                    aria-current={currentAttr(link, active)}
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
