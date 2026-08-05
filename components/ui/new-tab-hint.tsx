import type { ReactNode } from "react";

/** Visually hidden cue for screen readers on links that open a new tab. */
export function NewTabHint({ label }: { label: string }): ReactNode {
  return <span className="sr-only"> {label}</span>;
}
