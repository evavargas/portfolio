"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

type ThemeMode = "light" | "dark" | "system";

const cycle: ThemeMode[] = ["light", "dark", "system"];

export function ThemeToggle({
  lightLabel,
  darkLabel,
  systemLabel,
}: {
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 rounded-full border border-[var(--line)]"
        aria-hidden="true"
      />
    );
  }

  const current = (theme as ThemeMode) || "system";
  const next = cycle[(cycle.indexOf(current) + 1) % cycle.length] ?? "light";
  const label =
    next === "light" ? lightLabel : next === "dark" ? darkLabel : systemLabel;

  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
    >
      {current === "light" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : current === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5Z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 20h8M12 18v2" />
        </svg>
      )}
    </button>
  );
}
