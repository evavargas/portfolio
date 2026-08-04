export async function verifyTurnstileToken(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { ok: false as const, reason: "turnstile_not_configured" };
  }

  if (!token) {
    return { ok: false as const, reason: "missing_token" };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip) {
    body.set("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    return { ok: false as const, reason: "verify_failed" };
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success
    ? { ok: true as const }
    : { ok: false as const, reason: "invalid_token" };
}
