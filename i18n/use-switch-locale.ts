"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "./config";
import { localizedHref, persistLocale } from "./locale-url";

export function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: Locale) => {
    persistLocale(next);
    startTransition(() => {
      router.replace(localizedHref(pathname, next), { scroll: false });
    });
  };

  return { switchLocale, isPending };
}
