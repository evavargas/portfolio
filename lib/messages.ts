import type en from "@/messages/en.json";

type Messages = typeof en;
export type ProjectItem = Messages["projects"]["items"][number];
export type AboutJob = Messages["about"]["jobs"][number];
export type SkillGroup = Messages["about"]["skillGroups"][number];
export type EducationItem = Messages["about"]["education"][number];

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error("Expected a string array");
  }
  return value;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function asProjectItems(value: unknown): ProjectItem[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected project items");
  }

  return value.map((item) => {
    if (!item || typeof item !== "object") {
      throw new Error("Invalid project item");
    }

    const project = item as Record<string, unknown>;
    if (
      typeof project.id !== "string" ||
      typeof project.eyebrow !== "string" ||
      typeof project.title !== "string" ||
      typeof project.description !== "string" ||
      typeof project.href !== "string" ||
      typeof project.repo !== "string" ||
      typeof project.image !== "string" ||
      !isStringArray(project.tech)
    ) {
      throw new Error("Invalid project item");
    }

    return project as ProjectItem;
  });
}

export type ProjectDetail = {
  purpose: string[];
  access: { steps: string[]; credentials: { label: string; value: string }[] };
  built: string[];
  why: string[];
  links: { label: string; url: string }[];
  videos: { title: string; url: string; width: number; height: number }[];
};

function isPairs<K extends string, K2 extends string>(value: unknown, a: K, b: K2) {
  return (
    Array.isArray(value) &&
    value.every((v) => v && typeof v[a] === "string" && typeof v[b] === "string")
  );
}

export function asProjectDetail(value: unknown): ProjectDetail {
  const d = value as Record<string, any> | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (
    !d ||
    !isStringArray(d.purpose) ||
    !isStringArray(d.access?.steps) ||
    !isPairs(d.access?.credentials, "label", "value") ||
    !isStringArray(d.built) ||
    !isStringArray(d.why) ||
    !isPairs(d.links, "label", "url") ||
    !isPairs(d.videos, "title", "url") ||
    !d.videos.every((v: { width: unknown; height: unknown }) => typeof v.width === "number" && typeof v.height === "number")
  ) {
    throw new Error("Invalid project detail");
  }
  return d as ProjectDetail;
}

export function asAboutJobs(value: unknown): AboutJob[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected about jobs");
  }

  return value.map((item) => {
    if (!item || typeof item !== "object") {
      throw new Error("Invalid about job");
    }

    const job = item as Record<string, unknown>;
    if (
      typeof job.role !== "string" ||
      typeof job.company !== "string" ||
      typeof job.dates !== "string" ||
      typeof job.summary !== "string" ||
      !isStringArray(job.stack)
    ) {
      throw new Error("Invalid about job");
    }

    if (job.companyUrl !== undefined && typeof job.companyUrl !== "string") {
      throw new Error("Invalid about job companyUrl");
    }

    return job as AboutJob;
  });
}

export function asSkillGroups(value: unknown): SkillGroup[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected skill groups");
  }

  return value.map((item) => {
    if (!item || typeof item !== "object") {
      throw new Error("Invalid skill group");
    }

    const group = item as Record<string, unknown>;
    if (typeof group.title !== "string" || !isStringArray(group.items)) {
      throw new Error("Invalid skill group");
    }

    return group as SkillGroup;
  });
}

export function asEducationItems(value: unknown): EducationItem[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected education items");
  }

  return value.map((item) => {
    if (!item || typeof item !== "object") {
      throw new Error("Invalid education item");
    }

    const entry = item as Record<string, unknown>;
    if (
      typeof entry.title !== "string" ||
      typeof entry.school !== "string" ||
      typeof entry.dates !== "string" ||
      typeof entry.note !== "string"
    ) {
      throw new Error("Invalid education item");
    }

    return entry as EducationItem;
  });
}
