import { describe, expect, it } from "vitest";
import { localeFromAcceptLanguage, localizedHref } from "@/i18n/locale-url";

describe("localizedHref", () => {
  it("keeps the default locale URL clean", () => {
    expect(localizedHref("/about", "en")).toBe("/about");
    expect(localizedHref("/#projects", "en")).toBe("/#projects");
  });

  it("adds the lang param before the hash", () => {
    expect(localizedHref("/about", "es")).toBe("/about?lang=es");
    expect(localizedHref("/#projects", "fr")).toBe("/?lang=fr#projects");
  });

  it("appends to an existing query string", () => {
    expect(localizedHref("/about?ref=cv", "es")).toBe("/about?ref=cv&lang=es");
  });
});

describe("localeFromAcceptLanguage", () => {
  it("falls back to English without a header", () => {
    expect(localeFromAcceptLanguage(null)).toBe("en");
  });

  it("picks the highest-ranked supported language", () => {
    expect(localeFromAcceptLanguage("es-UY,es;q=0.9,en;q=0.8")).toBe("es");
    expect(localeFromAcceptLanguage("de-DE,fr;q=0.7,en;q=0.5")).toBe("fr");
    expect(localeFromAcceptLanguage("en;q=0.4,es;q=0.8")).toBe("es");
  });

  it("falls back to English when nothing matches", () => {
    expect(localeFromAcceptLanguage("de-DE,it;q=0.8")).toBe("en");
  });
});
