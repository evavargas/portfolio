"use client";

import { useActionState, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { sendContactMessage, type ContactActionState } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, TextInput, TextTextarea } from "@/components/ui/field";
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
      <Field id="contact-subject" label={t("form.subject")}>
        <TextInput
          id="contact-subject"
          name="subject"
          required
          minLength={3}
          maxLength={120}
          autoComplete="off"
        />
      </Field>

      <Field id="contact-email" label={t("form.email")} optionalLabel={t("form.optional")}>
        <TextInput
          id="contact-email"
          name="email"
          type="email"
          maxLength={200}
          autoComplete="email"
        />
      </Field>

      <Field id="contact-message" label={t("form.message")}>
        <TextTextarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
        />
      </Field>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="turnstileToken" value={token} />
      <TurnstileField onToken={onToken} onExpire={onExpire} />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending || !token} magnetic={false}>
          {pending ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              {t("form.sending")}
            </>
          ) : (
            t("form.submit")
          )}
        </Button>
        {statusMessage ? (
          <p
            key={`${state.status}-${statusMessage}`}
            role="status"
            className={`form-status text-sm ${
              state.status === "success" ? "form-status-success" : "form-status-error"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
