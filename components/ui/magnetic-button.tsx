"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import {
  buttonClassName,
  ButtonContent,
  type ButtonProps,
} from "@/components/ui/button-shared";

function canMagnetize() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Client button with magnetic hover. Use for primary marketing CTAs. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  download,
  target,
  rel,
  disabled,
  newTabLabel,
  magnetic,
  ...rest
}: ButtonProps) {
  void magnetic;
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const classes = buttonClassName({ variant, size, className });
  const style = { "--mx": "0px", "--my": "0px" } as CSSProperties;
  const content = (
    <ButtonContent target={target} newTabLabel={newTabLabel}>
      {children}
    </ButtonContent>
  );

  useEffect(() => {
    const node = href ? anchorRef.current : buttonRef.current;
    if (!node) return;

    const reset = () => {
      node.style.setProperty("--mx", "0px");
      node.style.setProperty("--my", "0px");
    };

    const onMove = (event: Event) => {
      if (!(event instanceof MouseEvent)) return;
      if (!canMagnetize() || node.matches(":disabled")) {
        reset();
        return;
      }
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.setProperty("--mx", `${x * 0.22}px`);
      node.style.setProperty("--my", `${y * 0.28}px`);
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", reset);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", reset);
    };
  }, [href]);

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        className={classes}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        style={style}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {content}
    </button>
  );
}
