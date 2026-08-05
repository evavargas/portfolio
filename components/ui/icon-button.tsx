import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/** Shared chrome control (header menu, theme, dialog close). */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ children, className = "", type = "button", ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
