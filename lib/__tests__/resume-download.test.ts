import { afterEach, describe, expect, it, vi } from "vitest";
import { probeResumeFile } from "@/lib/resume-download";

describe("probeResumeFile", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false when marked unavailable", async () => {
    expect(await probeResumeFile("/resume/x.pdf", false)).toBe(false);
  });

  it("returns true on successful HEAD", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 200 })),
    );

    expect(await probeResumeFile("/resume/x.pdf", true)).toBe(true);
  });

  it("falls back to ranged GET when HEAD is not allowed", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 405 }))
      .mockResolvedValueOnce(new Response(null, { status: 206 }));

    vi.stubGlobal("fetch", fetchMock);

    expect(await probeResumeFile("/resume/x.pdf", true)).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
