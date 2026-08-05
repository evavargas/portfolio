import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { getFooterLinks } from "@/lib/site-links";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const home = `/${locale}`;
  const opensNewTab = nav("opensNewTab");

  const links = getFooterLinks(home).map((link) => ({
    ...link,
    label: link.labelKey ? t(link.labelKey) : (link.label ?? ""),
  }));

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{t("tagline")}</p>
        </div>
        <nav aria-label={t("navLabel")}>
          <ul className="grid grid-cols-2 gap-3 text-sm font-medium">
            {links.map((link) => (
              <li key={link.key}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.label}
                    <NewTabHint label={opensNewTab} />
                  </a>
                ) : (
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-line px-4 py-4 text-center text-sm text-muted md:px-6">
        {t("rights", { year })}
      </div>
    </footer>
  );
}
