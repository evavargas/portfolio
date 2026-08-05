"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
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
  magnetic?: boolean;
  "aria-label"?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[var(--ink)] text-[var(--canvas)] hover:opacity-90 border border-transparent",
  secondary:
    "bg-[var(--accent-pink-soft)] text-[var(--ink)] hover:bg-[var(--accent-blue-soft)] border border-transparent",
  ghost: "bg-transparent text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--surface)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
};

function canMagnetize() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  download,
  target,
  rel,
  disabled,
  magnetic = true,
  ...rest
}: ButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const classes = cn(
    "ui-button inline-flex items-center justify-center gap-2 rounded-full font-semibold disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
  const style = { "--mx": "0px", "--my": "0px" } as CSSProperties;

  useEffect(() => {
    const node = href ? anchorRef.current : buttonRef.current;
    if (!node || !magnetic) return;

    const reset = () => {
      node.style.setProperty("--mx", "0px");
      node.style.setProperty("--my", "0px");
    };

    const onMove = (event: Event) => {
      if (!(event instanceof MouseEvent)) return;
      if (!canMagnetize() || node.matches(":disabled")) {
        reset();
        return;
      }
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.setProperty("--mx", `${x * 0.22}px`);
      node.style.setProperty("--my", `${y * 0.28}px`);
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", reset);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", reset);
    };
  }, [href, magnetic]);

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        className={classes}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        style={style}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
