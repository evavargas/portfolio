"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { resumes, type ResumeId } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

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
  const [pendingId, setPendingId] = useState<ResumeId | null>(null);

  const handleDownload = useCallback(async (resumeId: ResumeId) => {
    setPendingId(resumeId);
    try {
      const result = await probeResume(resumeId);
      if (!result.ok) {
        setDialog({ open: true, status: "error", id: resumeId });
        return;
      }

      triggerDownload(result.href, result.fileName);
      setDialog({ open: true, status: "success", id: resumeId });
    } finally {
      setPendingId(null);
    }
  }, []);

  const cards: ResumeId[] = ["en", "es", "ats"];

  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-title`}>
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <p className="section-title">{t("title")}</p>
          <h2 id={`${id}-title`} className="mt-4 text-3xl font-semibold md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-[var(--muted)]">{t("subtitle")}</p>
        </div>
      </Reveal>

      <ul className="grid gap-4 md:grid-cols-3">
        {cards.map((resumeId, index) => {
          const available = resumes[resumeId].available;
          const pending = pendingId === resumeId;
          return (
            <li key={resumeId}>
              <Reveal delayMs={index * 70}>
                <button
                  type="button"
                  onClick={() => handleDownload(resumeId)}
                  disabled={pending}
                  aria-busy={pending}
                  className="resume-card group"
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
                  <span className="resume-card-cta">
                    {pending ? t("downloading") : t("download")}
                    <span aria-hidden="true" className="resume-card-arrow">
                      →
                    </span>
                  </span>
                </button>
              </Reveal>
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
