"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher({ label }: { label: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const onChange = (next: Locale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }

    const segments = pathname.split("/");
    segments[1] = next;
    const href = segments.join("/") || `/${next}`;

    const navigate = () => {
      startTransition(() => {
        router.replace(href);
      });
      setOpen(false);
    };

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (
      typeof doc.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      doc.startViewTransition(navigate);
    } else {
      navigate();
    }
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative locale-switcher${isPending ? " is-pending" : ""}`}>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] py-1.5 pl-3.5 pr-3 text-sm font-medium text-[var(--ink)] transition-opacity"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{localeLabels[locale]}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="locale-menu absolute right-0 z-50 mt-2 min-w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-1 shadow-lg"
        >
          {locales.map((code) => {
            const selected = code === locale;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-4 px-3.5 py-2 text-left text-sm transition-colors hover:bg-[var(--accent-blue-soft)] ${
                    selected ? "font-semibold text-[var(--ink)]" : "text-[var(--muted)]"
                  }`}
                  onClick={() => onChange(code)}
                >
                  <span>{localeLabels[code]}</span>
                  {selected ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                      <path
                        d="M2.5 7.5 5.5 10.5 11.5 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
