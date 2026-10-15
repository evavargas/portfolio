"use client";

import { useLocale, useTranslations } from "next-intl";
import { StatusPage } from "@/components/system/status-page";
import type { ButtonAction } from "@/components/ui/button-group";
import { localizedHref } from "@/i18n/locale-url";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("system.error");
  const locale = useLocale();

  const actions: ButtonAction[] = [
    { key: "retry", label: t("retry"), onClick: () => reset() },
    {
      key: "home",
      label: t("home"),
      href: localizedHref("/", locale),
      variant: "secondary",
    },
  ];

  return (
    <StatusPage eyebrow={t("eyebrow")} title={t("title")} body={t("body")} actions={actions} />
  );
}
