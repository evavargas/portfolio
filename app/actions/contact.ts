"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { getContactEmail } from "@/lib/site";
import { verifyTurnstileToken } from "@/lib/turnstile";

const contactSchema = z.object({
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
  email: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.email().max(200).optional()
  ),
  website: z.string().optional(),
  turnstileToken: z.string().min(1),
});

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContactMessage(
  _prev: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    subject: formData.get("subject"),
    message: formData.get("message"),
    email: formData.get("email") || "",
    website: formData.get("website") || "",
    turnstileToken: formData.get("cf-turnstile-response") || formData.get("turnstileToken") || "",
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  // Honeypot: bots fill hidden fields.
  if (parsed.data.website) {
    return { status: "success", message: "ok" };
  }

  const to = getContactEmail();
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!to || !apiKey) {
    return { status: "error", message: "not_configured" };
  }

  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip");

  const captcha = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
  if (!captcha.ok) {
    return { status: "error", message: "captcha" };
  }

  const replyTo = parsed.data.email || undefined;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `[Portfolio] ${parsed.data.subject}`,
    replyTo,
    text: [
      `Subject: ${parsed.data.subject}`,
      replyTo ? `Reply-To: ${replyTo}` : "Reply-To: (not provided)",
      "",
      parsed.data.message,
    ].join("\n"),
  });

  if (error) {
    return { status: "error", message: "send_failed" };
  }

  return { status: "success", message: "ok" };
}
