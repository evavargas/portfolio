import { Surface } from "@/components/ui/surface";
import type { EducationItem } from "@/lib/messages";

type EducationCardProps = {
  eyebrow: string;
  items: EducationItem[];
  languagesTitle: string;
  languages: string;
};

export function EducationCard({ eyebrow, items, languagesTitle, languages }: EducationCardProps) {
  return (
    <Surface as="section" padding="lg" radius="xl" aria-labelledby="about-education">
      <h2 id="about-education" className="section-title">
        {eyebrow}
      </h2>
      <ol className="mt-6 grid gap-6">
        {items.map((item) => (
          <li key={item.title + item.dates}>
            <p className="text-xl font-semibold md:text-2xl">{item.title}</p>
            <p className="mt-1 text-muted">{item.school}</p>
            <p className="mt-1 text-sm font-semibold text-muted">
              {item.dates} · {item.note}
            </p>
          </li>
        ))}
      </ol>
      <h3 className="mt-8 text-lg font-semibold">{languagesTitle}</h3>
      <p className="mt-2 text-muted">{languages}</p>
    </Surface>
  );
}
