"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { resumes, type ResumeId } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type DialogState =
  | { open: false }
  | { open: true; status: "success" | "error"; id: ResumeId };

async function probeResume(id: ResumeId) {
  const resume = resumes[id];
  if (!resume.available) {
    return { ok: false as const, href: resume.href };
  }

  try {
    const response = await fetch(resume.href, { method: "HEAD", cache: "no-store" });
    if (!response.ok) {
      return { ok: false as const, href: resume.href };
    }
    return { ok: true as const, href: resume.href, fileName: resume.fileName };
  } catch {
    return { ok: false as const, href: resume.href };
  }
}

function triggerDownload(href: string, fileName: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function ResumeGallery({ id = "resumes" }: { id?: string }) {
  const t = useTranslations("resumes");
  const [dialog, setDialog] = useState<DialogState>({ open: false });

  const handleDownload = useCallback(async (resumeId: ResumeId) => {
    const result = await probeResume(resumeId);
    if (!result.ok) {
      setDialog({ open: true, status: "error", id: resumeId });
      return;
    }

    triggerDownload(result.href, result.fileName);
    setDialog({ open: true, status: "success", id: resumeId });
  }, []);

  const cards: ResumeId[] = ["en", "es", "ats"];

  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-title`}>
      <div className="mb-8 max-w-2xl">
        <p className="section-title">{t("title")}</p>
        <h2 id={`${id}-title`} className="mt-4 text-3xl font-semibold md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-[var(--muted)]">{t("subtitle")}</p>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {cards.map((resumeId) => {
          const available = resumes[resumeId].available;
          return (
            <li key={resumeId}>
              <button
                type="button"
                onClick={() => handleDownload(resumeId)}
                className="group flex h-full w-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-display text-xl font-semibold">
                    {t(`items.${resumeId}.title`)}
                  </span>
                  <Badge tone={available ? "blue" : "pink"}>
                    {available ? t("available") : t("comingSoon")}
                  </Badge>
                </div>
                <p className="mb-6 flex-1 text-sm text-[var(--muted)]">
                  {t(`items.${resumeId}.description`)}
                </p>
                <span className="text-sm font-semibold text-[var(--accent-blue)] group-hover:underline">
                  {t("download")} →
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Dialog
        open={dialog.open}
        title={
          dialog.open
            ? dialog.status === "success"
              ? t("dialog.successTitle")
              : t("dialog.errorTitle")
            : ""
        }
        onClose={() => setDialog({ open: false })}
        closeLabel={t("dialog.close")}
      >
        {dialog.open ? (
          <>
            <p className="text-[var(--muted)]">
              {dialog.status === "success"
                ? t("dialog.successBody")
                : t("dialog.errorBody")}
            </p>
            <div className="flex flex-wrap gap-3">
              {resumes[dialog.id].available ? (
                <Button href={resumes[dialog.id].href} download={resumes[dialog.id].fileName}>
                  {t("dialog.backupLink")}
                </Button>
              ) : null}
              {dialog.status === "error" && resumes[dialog.id].available ? (
                <Button variant="secondary" onClick={() => handleDownload(dialog.id)}>
                  {t("dialog.retry")}
                </Button>
              ) : null}
              <Button variant="ghost" onClick={() => setDialog({ open: false })}>
                {t("dialog.close")}
              </Button>
            </div>
          </>
        ) : null}
      </Dialog>
    </section>
  );
}
