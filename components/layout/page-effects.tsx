"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PageEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / max, 0), 1);

      root.dataset.scrolled = scrollY > 12 ? "true" : "false";
      root.style.setProperty("--scroll-progress", progress.toFixed(4));

      if (!prefersReducedMotion()) {
        const parallax = Math.min(scrollY * 0.08, 72);
        root.style.setProperty("--glow-parallax", `${parallax.toFixed(1)}px`);
      } else {
        root.style.setProperty("--glow-parallax", "0px");
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
