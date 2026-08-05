import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/cn";

export type ButtonAction = Omit<ButtonProps, "children"> & {
  key: string;
  label: ReactNode;
};

type ButtonGroupProps = {
  actions: ButtonAction[];
  className?: string;
  size?: ButtonProps["size"];
  trailing?: ReactNode;
  /** Default true — marketing CTAs use MagneticButton. */
  magnetic?: boolean;
};

export function ButtonGroup({
  actions,
  className = "",
  size,
  trailing,
  magnetic = true,
}: ButtonGroupProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {actions.map(({ key, label, size: actionSize, magnetic: actionMagnetic, ...props }) => {
        const useMagnetic = actionMagnetic ?? magnetic;
        const Comp = useMagnetic ? MagneticButton : Button;
        return (
          <Comp key={key} size={actionSize ?? size} {...props}>
            {label}
          </Comp>
        );
      })}
      {trailing}
    </div>
  );
}
