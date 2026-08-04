import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  titleId?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  titleId,
  className = "max-w-2xl",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="section-title">{eyebrow}</p>
      <h2 id={titleId} className="mt-4 text-3xl font-semibold md:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-[var(--muted)]">{subtitle}</p> : null}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <p className="section-title">{children}</p>;
}
