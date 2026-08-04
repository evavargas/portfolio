"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";

type WhatsAppButtonProps = {
  phone: string;
  label: string;
};

function getUrls(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return {
    app: `whatsapp://send?phone=${digits}`,
    web: `https://wa.me/${digits}`,
  };
}

export function WhatsAppButton({ phone, label }: WhatsAppButtonProps) {
  const { app, web } = getUrls(phone);

  const openWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();

    let cancelled = false;
    const cancelFallback = () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("blur", cancelFallback);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    const onVisibility = () => {
      if (document.hidden) cancelFallback();
    };

    const timer = window.setTimeout(() => {
      if (!cancelled) {
        window.open(web, "_blank", "noopener,noreferrer");
      }
    }, 900);

    window.addEventListener("blur", cancelFallback);
    document.addEventListener("visibilitychange", onVisibility);

    window.location.href = app;
  };

  return (
    <Button href={web} variant="secondary" target="_blank" rel="noopener noreferrer" onClick={openWhatsApp}>
      {label}
    </Button>
  );
}
