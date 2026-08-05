import type { ReactNode } from "react";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";

type HighlightCardProps = {
  children: ReactNode;
  className?: string;
};

export function HighlightCard({ children, className = "" }: HighlightCardProps) {
  return (
    <Surface padding="sm" radius="xl" className={cn("highlight-card text-[var(--muted)]", className)}>
      {children}
    </Surface>
  );
}
