"use client";

import { useEffect, type RefObject } from "react";

/** Keeps --site-header-offset in sync with the visible header bar height. */
export function useHeaderOffset(
  headerRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const header = headerRef.current;
    const bar = barRef.current;
    if (!header || !bar) return;

    const sync = () => {
      header.style.setProperty("--site-header-offset", `${bar.offsetHeight}px`);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(bar);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [barRef, headerRef]);
}

/** Basic focus trap within a container while active. */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const focusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => !node.hasAttribute("disabled") && node.tabIndex !== -1);

    const nodes = focusable();
    nodes[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape?.();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, containerRef, onEscape]);
}
