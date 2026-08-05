import { Surface } from "@/components/ui/surface";

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
    <Surface as="section" padding="lg" radius="xl" aria-labelledby="about-education">
      <h2 id="about-education" className="section-title">
        {eyebrow}
      </h2>
      <p className="mt-4 text-2xl font-semibold">{degree}</p>
      <p className="mt-2 text-muted">{school}</p>
      <p className="mt-1 text-sm font-semibold text-muted">
        {dates} · {note}
      </p>
      <p className="mt-4 text-muted">{languages}</p>
    </Surface>
  );
}
