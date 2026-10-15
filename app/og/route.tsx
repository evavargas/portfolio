import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { defaultLocale, LOCALE_PARAM, locales } from "@/i18n/config";
import { brandColors } from "@/lib/brand-colors";
import { OG_IMAGE_SIZE } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get(LOCALE_PARAM);
  const locale = hasLocale(locales, param) ? param : defaultLocale;
  const hero = await getTranslations({ locale, namespace: "hero" });
  const meta = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(145deg, ${brandColors.canvas} 0%, ${brandColors.heroGlow} 48%, ${brandColors.accentPinkSoft} 100%)`,
          color: brandColors.ink,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            fontWeight: 600,
            color: brandColors.muted,
          }}
        >
          <span style={{ color: brandColors.accentPink }}>{"</>"}</span>
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Eva Vargas
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", maxWidth: 900 }}>
            {hero("idea")}
          </div>
          <div style={{ fontSize: 24, color: brandColors.accentBlue, maxWidth: 880 }}>
            {meta("jobTitle")}
          </div>
        </div>
      </div>
    ),
    OG_IMAGE_SIZE,
  );
}
