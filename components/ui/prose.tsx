import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProseProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed md:text-[0.95rem]",
  lg: "text-lg leading-relaxed",
} as const;

export function Prose({ children, className = "", size = "lg" }: ProseProps) {
  return <div className={cn("space-y-4 text-[var(--muted)]", sizeMap[size], className)}>{children}</div>;
}

export function ParagraphList({
  items,
  className = "",
  size = "lg",
}: {
  items: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Prose className={className} size={size}>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </Prose>
  );
}
