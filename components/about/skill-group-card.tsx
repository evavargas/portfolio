import { BadgeList } from "@/components/ui/badge-list";
import { Surface } from "@/components/ui/surface";
import type { SkillGroup } from "@/lib/messages";

type SkillGroupCardProps = {
  group: SkillGroup;
};

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <Surface padding="md" radius="lg">
      <h3 className="text-lg font-semibold">{group.title}</h3>
      <BadgeList items={group.items} className="mt-4 gap-2" />
    </Surface>
  );
}
