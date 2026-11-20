import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import { asProjectDetail } from "@/lib/messages";
import { PROJECT_SLUGS } from "@/lib/project-slugs";

describe("project detail pages", () => {
  it.each([["en", en], ["es", es], ["fr", fr]])("%s has valid details for every slug", (_, messages) => {
    const ids = messages.projects.items.map((p) => p.id);
    for (const slug of PROJECT_SLUGS) {
      expect(ids).toContain(slug);
      const details = messages.projects.details as Record<string, unknown>;
      expect(() => asProjectDetail(details[slug])).not.toThrow();
    }
  });
});
