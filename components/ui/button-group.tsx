import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
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
};

export function ButtonGroup({
  actions,
  className = "",
  size,
  trailing,
}: ButtonGroupProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {actions.map(({ key, label, size: actionSize, ...props }) => (
        <Button key={key} size={actionSize ?? size} {...props}>
          {label}
        </Button>
      ))}
      {trailing}
    </div>
  );
}
