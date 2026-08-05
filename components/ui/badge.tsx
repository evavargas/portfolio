import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "gradient",
  className = "",
}: {
  children: ReactNode;
  tone?: "gradient" | "pink" | "blue";
  className?: string;
}) {
  const toneClass = tone === "pink" ? "badge-pink" : tone === "blue" ? "badge-blue" : "";
  return <span className={cn("badge", toneClass, className)}>{children}</span>;
}
