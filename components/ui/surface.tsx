import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const paddingMap = {
  none: "",
  sm: "p-4 md:p-5",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
  xl: "p-8 md:p-12",
} as const;

/** Radii map to styles/tokens.css --radius-* */
const radiusMap = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
} as const;

type SurfaceProps = {
  children: ReactNode;
  as?: ElementType;
  padding?: keyof typeof paddingMap;
  radius?: keyof typeof radiusMap;
  tone?: "solid" | "soft" | "dashed" | "accent";
  className?: string;
};

const toneMap = {
  solid: "border border-[var(--line)] bg-[var(--surface)]",
  soft: "border border-[var(--line)] bg-[var(--canvas)]",
  dashed: "border border-dashed border-[var(--line)] bg-[var(--canvas)]",
  accent:
    "border border-[var(--line)] bg-gradient-to-br from-[var(--accent-blue-soft)] to-[var(--accent-pink-soft)]",
} as const;

export function Surface({
  children,
  as: Tag = "div",
  padding = "md",
  radius = "lg",
  tone = "solid",
  className = "",
}: SurfaceProps) {
  return (
    <Tag className={cn(toneMap[tone], radiusMap[radius], paddingMap[padding], className)}>
      {children}
    </Tag>
  );
}
