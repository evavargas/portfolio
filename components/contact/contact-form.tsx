"use client";

import { useActionState, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { sendContactMessage, type ContactActionState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { TurnstileField } from "@/components/contact/turnstile-field";

const initialState: ContactActionState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [token, setToken] = useState("");

  const onToken = useCallback((value: string) => setToken(value), []);
  const onExpire = useCallback(() => setToken(""), []);

  const statusMessage =
    state.status === "success"
      ? t("form.success")
      : state.status === "error"
        ? t(`form.errors.${state.message ?? "send_failed"}`)
        : null;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <label htmlFor="contact-subject" className="text-sm font-semibold">
          {t("form.subject")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          required
          minLength={3}
          maxLength={120}
          className="rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-sm font-semibold">
          {t("form.email")}{" "}
          <span className="font-normal text-[var(--muted)]">({t("form.optional")})</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          maxLength={200}
          className="rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-semibold">
          {t("form.message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className="resize-y rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="turnstileToken" value={token} />
      <TurnstileField onToken={onToken} onExpire={onExpire} />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending || !token}>
          {pending ? t("form.sending") : t("form.submit")}
        </Button>
        {statusMessage ? (
          <p
            role="status"
            className={`text-sm ${state.status === "success" ? "text-[var(--accent-blue)]" : "text-[var(--accent-pink)]"}`}
          >
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
