import type en from "@/messages/en.json";

export type Messages = typeof en;
export type ProjectItem = Messages["projects"]["items"][number];
export type AboutJob = Messages["about"]["jobs"][number];
export type SkillGroup = Messages["about"]["skillGroups"][number];

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
