import { BadgeList } from "@/components/ui/badge-list";
import { Surface } from "@/components/ui/surface";
import { TextLink } from "@/components/ui/text-link";
import type { AboutJob } from "@/lib/messages";

type JobCardProps = {
  job: AboutJob;
  index: number;
};

export function JobCard({ job, index }: JobCardProps) {
  return (
    <Surface padding="md" radius="lg">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold md:text-2xl">{job.role}</h3>
        <p className="text-sm font-semibold text-[var(--muted)]">{job.dates}</p>
      </div>
      {job.companyUrl ? (
        <TextLink href={job.companyUrl} external className="mt-1">
          {job.company}
        </TextLink>
      ) : (
        <p className="mt-1 text-sm font-medium text-[var(--accent-blue)]">{job.company}</p>
      )}
      <p className="mt-4 text-[var(--muted)]">{job.summary}</p>
      <BadgeList
        items={job.stack}
        tone={index % 2 === 0 ? "pink" : "blue"}
        className="mt-4 gap-2"
      />
    </Surface>
  );
}
