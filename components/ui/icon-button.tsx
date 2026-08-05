import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/** Shared chrome control (header menu, theme, dialog close). */
export function IconButton({ children, className = "", type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
