import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return <p className="section-title">{children}</p>;
}

export function Badge({
  children,
  tone = "gradient",
}: {
  children: ReactNode;
  tone?: "gradient" | "pink" | "blue";
}) {
  const toneClass =
    tone === "pink" ? "badge-pink" : tone === "blue" ? "badge-blue" : "";
  return <span className={`badge ${toneClass}`}>{children}</span>;
}
