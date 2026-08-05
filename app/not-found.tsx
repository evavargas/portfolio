import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** Root 404 → localized home; detailed UI lives in `app/[locale]/not-found.tsx`. */
export default function RootNotFound() {
  redirect(`/${defaultLocale}`);
}
