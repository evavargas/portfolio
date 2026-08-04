import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resumes, type ResumeId } from "@/lib/site";

const ids = new Set<ResumeId>(["en", "es", "ats"]);

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!ids.has(id as ResumeId)) {
    return NextResponse.json({ error: "Unknown resume" }, { status: 404 });
  }

  const resume = resumes[id as ResumeId];

  if (!resume.available) {
    return NextResponse.json(
      { error: "Resume not available yet", href: resume.href },
      { status: 404 }
    );
  }

  return NextResponse.redirect(new URL(resume.href, _request.url));
}
