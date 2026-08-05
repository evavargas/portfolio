import type { Key, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type StaggerListProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => Key;
  renderItem: (item: T, index: number) => ReactNode;
  delayMs?: number;
  className?: string;
  itemClassName?: string;
  as?: "ul" | "ol" | "div";
  itemAs?: "li" | "div";
};

export function StaggerList<T>({
  items,
  getKey,
  renderItem,
  delayMs = 70,
  className = "",
  itemClassName = "",
  as: ListTag = "ul",
  itemAs: ItemTag = "li",
}: StaggerListProps<T>) {
  return (
    <ListTag className={cn(className)}>
      {items.map((item, index) => (
        <ItemTag key={getKey(item, index)} className={cn("flex", itemClassName)}>
          <Reveal delayMs={index * delayMs} className="flex w-full flex-1 flex-col">
            {renderItem(item, index)}
          </Reveal>
        </ItemTag>
      ))}
    </ListTag>
  );
}
