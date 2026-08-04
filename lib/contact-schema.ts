import { z } from "zod";

export const contactSchema = z.object({
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
  email: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.email().max(200).optional(),
  ),
  website: z.string().optional(),
  turnstileToken: z.string().min(1),
});

export type ContactInput = z.infer<typeof contactSchema>;
