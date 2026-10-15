import { hasLocale } from "next-intl";
import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  LOCALE_COOKIE,
  LOCALE_PARAM,
  locales,
  type Locale,
} from "./i18n/config";
import { localeFromAcceptLanguage } from "./i18n/locale-url";

function withLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set({ ...LOCALE_COOKIE, value: locale });
  return response;
}

/** Serves `/[locale]/...` internally while public URLs stay locale-free. */
function rewriteToLocale(request: NextRequest, locale: Locale) {
  const { pathname, search } = request.nextUrl;
  const target = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}${search}`,
    request.url,
  );
  return NextResponse.rewrite(target);
}

export default function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const segments = nextUrl.pathname.split("/");
  const pathLocale = segments[1];

  // Legacy locale-prefixed URLs (/es/about) → /about?lang=es
  if (hasLocale(locales, pathLocale)) {
    const url = nextUrl.clone();
    url.pathname = `/${segments.slice(2).join("/")}`;
    if (pathLocale === defaultLocale) {
      url.searchParams.delete(LOCALE_PARAM);
    } else {
      url.searchParams.set(LOCALE_PARAM, pathLocale);
    }
    return NextResponse.redirect(url, 308);
  }

  const param = nextUrl.searchParams.get(LOCALE_PARAM);

  if (param !== null) {
    if (hasLocale(locales, param) && param !== defaultLocale) {
      return withLocaleCookie(rewriteToLocale(request, param), param);
    }

    // `?lang=en` or an unknown value → canonical URL without the param.
    // Temporary: a cached permanent redirect would skip the cookie update.
    const url = nextUrl.clone();
    url.searchParams.delete(LOCALE_PARAM);
    return withLocaleCookie(NextResponse.redirect(url, 307), defaultLocale);
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE.name)?.value;
  const preferred =
    hasLocale(locales, cookieLocale)
      ? cookieLocale
      : localeFromAcceptLanguage(request.headers.get("accept-language"));

  if (preferred !== defaultLocale) {
    const url = nextUrl.clone();
    url.searchParams.set(LOCALE_PARAM, preferred);
    return NextResponse.redirect(url, 307);
  }

  return rewriteToLocale(request, defaultLocale);
}

export const config = {
  // Keep API routes, the OG image route, and static assets out of locale handling.
  matcher: ["/((?!api|_next|_vercel|og$|.*\\..*).*)"],
};
