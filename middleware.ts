import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n/config";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  // Keep API routes (and static assets) out of locale middleware.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
