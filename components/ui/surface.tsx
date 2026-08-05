import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const paddingMap = {
  none: "",
  sm: "p-4 md:p-5",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
  xl: "p-8 md:p-12",
} as const;

/** Radii map to styles/tokens.css --radius-* via @theme */
const radiusMap = {
  md: "rounded-ds-md",
  lg: "rounded-ds-lg",
  xl: "rounded-ds-xl",
} as const;

const toneMap = {
  solid: "border border-line bg-surface",
  soft: "border border-line bg-canvas",
  dashed: "border border-dashed border-line bg-canvas",
  accent: "border border-line bg-gradient-to-br from-accent-blue-soft to-accent-pink-soft",
} as const;

type SurfaceProps = {
  children: ReactNode;
  as?: ElementType;
  padding?: keyof typeof paddingMap;
  radius?: keyof typeof radiusMap;
  tone?: keyof typeof toneMap;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

export function Surface({
  children,
  as: Tag = "div",
  padding = "md",
  radius = "lg",
  tone = "solid",
  className = "",
  ...rest
}: SurfaceProps) {
  return (
    <Tag
      className={cn(toneMap[tone], radiusMap[radius], paddingMap[padding], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
