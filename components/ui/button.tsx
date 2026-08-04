import type { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  download?: string | boolean;
  target?: string;
  rel?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

const variants = {
  primary:
    "bg-[var(--ink)] text-[var(--canvas)] hover:opacity-90 border border-transparent",
  secondary:
    "bg-[var(--accent-pink-soft)] text-[var(--ink)] hover:bg-[var(--accent-blue-soft)] border border-transparent",
  ghost:
    "bg-transparent text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--surface)]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  download,
  target,
  rel,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
