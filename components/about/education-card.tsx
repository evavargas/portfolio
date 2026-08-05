import { Surface } from "@/components/ui/surface";
import { SectionTitle } from "@/components/ui/section-heading";

type EducationCardProps = {
  eyebrow: string;
  degree: string;
  school: string;
  dates: string;
  note: string;
  languages: string;
};

export function EducationCard({
  eyebrow,
  degree,
  school,
  dates,
  note,
  languages,
}: EducationCardProps) {
  return (
    <Surface padding="lg" radius="xl">
      <SectionTitle>{eyebrow}</SectionTitle>
      <h2 className="mt-4 text-2xl font-semibold">{degree}</h2>
      <p className="mt-2 text-[var(--muted)]">{school}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
        {dates} · {note}
      </p>
      <p className="mt-4 text-[var(--muted)]">{languages}</p>
    </Surface>
  );
}
