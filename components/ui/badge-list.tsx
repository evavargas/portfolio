import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

type BadgeListProps = {
  items: string[];
  tone?: "gradient" | "pink" | "blue";
  toneForIndex?: (index: number) => "gradient" | "pink" | "blue";
  className?: string;
  itemClassName?: string;
};

export function BadgeList({
  items,
  tone = "gradient",
  toneForIndex,
  className = "",
  itemClassName = "",
}: BadgeListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item, index) => (
        <li key={item} className={itemClassName}>
          <Badge tone={toneForIndex ? toneForIndex(index) : tone}>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function BadgeListLabeled({
  label,
  items,
  tone,
  toneForIndex,
  className = "",
}: BadgeListProps & { label: ReactNode }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-muted">
        {label}
      </p>
      <BadgeList items={items} tone={tone} toneForIndex={toneForIndex} className="mt-2" />
    </div>
  );
}
