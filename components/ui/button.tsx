import {
  buttonClassName,
  ButtonContent,
  type ButtonProps,
} from "@/components/ui/button-shared";

export type { ButtonProps, ButtonSize, ButtonVariant } from "@/components/ui/button-shared";

/** Server-safe button / link control (no magnetic hover). */
export function Button({
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
  const classes = buttonClassName({ variant, size, className });
  const content = (
    <ButtonContent target={target} newTabLabel={newTabLabel}>
      {children}
    </ButtonContent>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
