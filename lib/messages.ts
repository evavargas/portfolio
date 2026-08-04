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

export function asProjectItems(value: unknown): ProjectItem[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected project items");
  }

  return value.map((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      typeof (item as ProjectItem).id !== "string" ||
      typeof (item as ProjectItem).title !== "string" ||
      typeof (item as ProjectItem).href !== "string" ||
      typeof (item as ProjectItem).repo !== "string" ||
      typeof (item as ProjectItem).image !== "string" ||
      !Array.isArray((item as ProjectItem).tech)
    ) {
      throw new Error("Invalid project item");
    }
    return item as ProjectItem;
  });
}

export function asAboutJobs(value: unknown): AboutJob[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected about jobs");
  }

  return value.map((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      typeof (item as AboutJob).role !== "string" ||
      typeof (item as AboutJob).company !== "string" ||
      typeof (item as AboutJob).dates !== "string" ||
      typeof (item as AboutJob).summary !== "string" ||
      !Array.isArray((item as AboutJob).stack)
    ) {
      throw new Error("Invalid about job");
    }

    const companyUrl = (item as AboutJob & { companyUrl?: unknown }).companyUrl;
    if (companyUrl !== undefined && typeof companyUrl !== "string") {
      throw new Error("Invalid about job companyUrl");
    }

    return item as AboutJob;
  });
}

export function asSkillGroups(value: unknown): SkillGroup[] {
  if (!Array.isArray(value)) {
    throw new Error("Expected skill groups");
  }

  return value.map((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      typeof (item as SkillGroup).title !== "string" ||
      !Array.isArray((item as SkillGroup).items) ||
      (item as SkillGroup).items.some((entry) => typeof entry !== "string")
    ) {
      throw new Error("Invalid skill group");
    }
    return item as SkillGroup;
  });
}
