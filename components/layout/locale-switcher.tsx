"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { CheckIcon, ChevronIcon } from "@/components/ui/icons";

export function LocaleSwitcher({ label }: { label: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const currentLabel = localeLabels[locale];

  const onChange = (next: Locale) => {
    if (next === locale) {
      setOpen(false);
      buttonRef.current?.focus();
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
        buttonRef.current?.focus();
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
        ref={buttonRef}
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-3.5 pr-3 text-sm font-medium text-ink transition-opacity"
        aria-label={`${label}: ${currentLabel}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{currentLabel}</span>
        <ChevronIcon
          size={12}
          className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          id={menuId}
          role="menu"
          aria-label={label}
          className="locale-menu absolute right-0 z-50 mt-2 min-w-full overflow-hidden rounded-2xl border border-line bg-surface py-1 shadow-lg"
        >
          {locales.map((code) => {
            const selected = code === locale;
            return (
              <li key={code} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  className={`flex w-full items-center justify-between gap-4 px-3.5 py-2 text-left text-sm transition-colors hover:bg-accent-blue-soft ${
                    selected ? "font-semibold text-ink" : "text-muted"
                  }`}
                  onClick={() => onChange(code)}
                >
                  <span>{localeLabels[code]}</span>
                  {selected ? <CheckIcon size={14} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
