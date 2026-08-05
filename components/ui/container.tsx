import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

export function Container({
  children,
  as: Tag = "div",
  className = "",
  id,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto max-w-[var(--container-max)] px-[var(--page-gutter)] md:px-[var(--page-gutter-md)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
