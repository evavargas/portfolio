import { afterEach, describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { asAboutJobs, asProjectItems, asSkillGroups, asStringArray } from "@/lib/messages";
import { checkRateLimit, resetRateLimitStore } from "@/lib/rate-limit";
import { buildVCard } from "@/lib/vcard";

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse({
      subject: "Hello there",
      message: "I would like to talk about a role.",
      email: "recruiter@example.com",
      website: "",
      turnstileToken: "token",
    });

    expect(result.success).toBe(true);
  });

  it("rejects short messages", () => {
    const result = contactSchema.safeParse({
      subject: "Hi",
      message: "Too short",
      email: "",
      website: "",
      turnstileToken: "token",
    });

    expect(result.success).toBe(false);
  });

  it("treats blank email as optional", () => {
    const result = contactSchema.safeParse({
      subject: "Hello there",
      message: "I would like to talk about a role.",
      email: "   ",
      website: "",
      turnstileToken: "token",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBeUndefined();
    }
  });
});

describe("rate limit", () => {
  afterEach(() => {
    resetRateLimitStore();
  });

  it("allows traffic under the limit", () => {
    expect(checkRateLimit("test", 2, 60_000)).toBe(true);
    expect(checkRateLimit("test", 2, 60_000)).toBe(true);
    expect(checkRateLimit("test", 2, 60_000)).toBe(false);
  });
});

describe("message helpers", () => {
  it("parses string arrays", () => {
    expect(asStringArray(["a", "b"])).toEqual(["a", "b"]);
    expect(() => asStringArray([1])).toThrow();
  });

  it("parses project items", () => {
    const items = asProjectItems([
      {
        id: "demo",
        eyebrow: "Demo",
        title: "Demo",
        description: "Desc",
        tech: ["React"],
        href: "https://example.com",
        repo: "https://github.com/example/demo",
        image: "/img/demo.png",
      },
    ]);

    expect(items[0]?.id).toBe("demo");
  });

  it("parses about jobs", () => {
    const jobs = asAboutJobs([
      {
        role: "Engineer",
        company: "Acme",
        companyUrl: "https://acme.example",
        dates: "2024",
        summary: "Built things",
        stack: ["TypeScript"],
      },
      {
        role: "Freelance",
        company: "Independent",
        dates: "2020",
        summary: "Shipped sites",
        stack: ["React"],
      },
    ]);

    expect(jobs[0]?.role).toBe("Engineer");
    expect(jobs[0]?.companyUrl).toBe("https://acme.example");
    expect(jobs[1]?.companyUrl).toBeUndefined();
  });

  it("parses skill groups", () => {
    const groups = asSkillGroups([{ title: "Frontend", items: ["React", "TypeScript"] }]);
    expect(groups[0]?.title).toBe("Frontend");
  });
});

describe("buildVCard", () => {
  it("includes required vCard markers and name", () => {
    const vcard = buildVCard();
    expect(vcard).toContain("BEGIN:VCARD");
    expect(vcard).toContain("FN:Eva Vargas");
    expect(vcard).toContain("END:VCARD");
  });
});
