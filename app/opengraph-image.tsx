import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Eva Vargas — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(145deg, #f6f1f4 0%, #e8f0f8 48%, #f3d5db 100%)",
          color: "#2a2433",
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
            color: "#6a6275",
          }}
        >
          <span style={{ color: "#c97884" }}>{"</>"}</span>
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Eva Vargas
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", maxWidth: 900 }}>
            I enjoy turning ideas into products.
          </div>
          <div style={{ fontSize: 24, color: "#5f87a8", maxWidth: 880 }}>
            Software Engineer · Frontend · Product · AI-Assisted Development
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
