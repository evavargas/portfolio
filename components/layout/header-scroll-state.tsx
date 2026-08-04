"use client";

import { useEffect } from "react";

export function HeaderScrollState() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.dataset.scrolled = window.scrollY > 12 ? "true" : "false";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
