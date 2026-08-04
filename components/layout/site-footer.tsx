import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const home = `/${locale}`;

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr] md:px-6">
        <div>
          <p className="font-display text-2xl font-semibold">{t("tagline")}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-3 text-sm font-medium">
            <li>
              <Link href={`${home}/about`} className="hover:underline">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link href={`${home}#projects`} className="hover:underline">
                {t("projects")}
              </Link>
            </li>
            <li>
              <Link href={`${home}#resumes`} className="hover:underline">
                {t("resumes")}
              </Link>
            </li>
            <li>
              <Link href={`${home}#contact`} className="hover:underline">
                {t("contact")}
              </Link>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-[var(--line)] px-4 py-4 text-center text-sm text-[var(--muted)] md:px-6">
        {t("rights", { year })}
      </div>
    </footer>
  );
}
