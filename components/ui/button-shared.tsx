import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

export type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit";
  download?: string | boolean;
  target?: string;
  rel?: string;
  disabled?: boolean;
  /** Prefer MagneticButton for hover magnetism; kept for ButtonGroup routing. */
  magnetic?: boolean;
  newTabLabel?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-canvas hover:opacity-90 border border-transparent",
  secondary: "bg-accent-pink-soft text-ink hover:bg-accent-blue-soft border border-transparent",
  ghost: "bg-transparent text-ink border border-line hover:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className = "",
}: Pick<ButtonProps, "variant" | "size" | "className">) {
  return cn(
    "ui-button inline-flex items-center justify-center gap-2 rounded-full font-semibold disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export function ButtonContent({
  children,
  target,
  newTabLabel,
}: Pick<ButtonProps, "children" | "target" | "newTabLabel">) {
  return (
    <>
      {children}
      {target === "_blank" && newTabLabel ? <NewTabHint label={newTabLabel} /> : null}
    </>
  );
}
