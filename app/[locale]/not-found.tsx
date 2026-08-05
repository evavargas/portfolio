import { getLocale, getTranslations } from "next-intl/server";
import { StatusPage } from "@/components/system/status-page";
import type { ButtonAction } from "@/components/ui/button-group";

export default async function NotFoundPage() {
  const t = await getTranslations("system.notFound");
  const locale = await getLocale();

  const actions: ButtonAction[] = [
    { key: "home", label: t("home"), href: `/${locale}` },
    {
      key: "projects",
      label: t("projects"),
      href: `/${locale}#projects`,
      variant: "secondary",
    },
  ];

  return (
    <StatusPage eyebrow={t("eyebrow")} title={t("title")} body={t("body")} actions={actions} />
  );
}
