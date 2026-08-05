import Link from "next/link";
import type { ReactNode } from "react";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  opensNewTabLabel?: string;
};

const baseClass =
  "inline-flex items-center text-sm font-semibold text-link underline-offset-4 hover:underline";

export function TextLink({
  href,
  children,
  external = false,
  className = "",
  onClick,
  opensNewTabLabel,
}: TextLinkProps) {
  const classes = cn(baseClass, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
        {opensNewTabLabel ? <NewTabHint label={opensNewTabLabel} /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
