import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const controlClassName =
  "w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus";

type FieldProps = {
  id: string;
  label: string;
  optionalLabel?: string;
  children: ReactNode;
};

export function Field({ id, label, optionalLabel, children }: FieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optionalLabel ? (
          <>
            {" "}
            <span className="font-normal text-muted">({optionalLabel})</span>
          </>
        ) : null}
      </label>
      {children}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClassName, className)} />;
}

export function TextTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("resize-y", controlClassName, className)} />;
}
