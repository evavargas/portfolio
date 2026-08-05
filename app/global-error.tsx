"use client";

import Link from "next/link";
import { brandColors } from "@/lib/brand-colors";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Last-resort UI when the root layout fails (owns its own <html>/<body>). */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: brandColors.canvas,
          color: brandColors.ink,
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            width: "100%",
            borderRadius: "2rem",
            border: `1px solid ${brandColors.line}`,
            padding: "2rem",
            background: `linear-gradient(135deg, ${brandColors.accentBlueSoft}, ${brandColors.accentPinkSoft})`,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Glitch
          </p>
          <h1 style={{ margin: "1rem 0 0", fontSize: "2rem", lineHeight: 1.15 }}>
            That didn&apos;t go as planned.
          </h1>
          <p style={{ margin: "1rem 0 0", color: brandColors.muted, lineHeight: 1.6 }}>
            Something broke on my side. Try again, or reload the home page.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.75rem" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                border: 0,
                borderRadius: 999,
                padding: "0.65rem 1.15rem",
                background: brandColors.ink,
                color: brandColors.canvas,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <Link
              href="/en"
              style={{
                borderRadius: 999,
                padding: "0.65rem 1.15rem",
                background: brandColors.accentPinkSoft,
                color: brandColors.ink,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
