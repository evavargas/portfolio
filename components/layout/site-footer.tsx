import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { getFooterLinks } from "@/lib/site-links";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const home = `/${locale}`;

  const links = getFooterLinks(home).map((link) => ({
    ...link,
    label: link.labelKey ? t(link.labelKey) : (link.label ?? ""),
  }));

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{t("tagline")}</p>
        </div>
        <nav aria-label="Footer">
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
      <div className="border-t border-[var(--line)] px-4 py-4 text-center text-sm text-[var(--muted)] md:px-6">
        {t("rights", { year })}
      </div>
    </footer>
  );
}
