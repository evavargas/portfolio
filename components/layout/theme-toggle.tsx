"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { IconButton } from "@/components/ui/icon-button";
import { MoonIcon, SunIcon, SystemIcon } from "@/components/ui/icons";
import { useSyncExternalStore } from "react";
import type { ThemeMode } from "@/lib/theme";

function subscribe() {
  return () => {};
}

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
        className="inline-flex h-9 w-9 rounded-full border border-line"
        aria-hidden="true"
      />
    );
  }

  const current = (theme as ThemeMode) || "system";
  const next = cycle[(cycle.indexOf(current) + 1) % cycle.length] ?? "light";
  const label =
    next === "light" ? lightLabel : next === "dark" ? darkLabel : systemLabel;

  return (
    <IconButton
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      data-mode={current}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <span className="theme-icon theme-icon-sun">
          <SunIcon size={16} />
        </span>
        <span className="theme-icon theme-icon-moon">
          <MoonIcon size={16} />
        </span>
        <span className="theme-icon theme-icon-system">
          <SystemIcon size={16} />
        </span>
      </span>
    </IconButton>
  );
}
