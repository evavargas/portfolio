import { redirect } from "next/navigation";

/** Root 404 → home; detailed UI lives in `app/[locale]/not-found.tsx`. */
export default function RootNotFound() {
  redirect("/");
}
