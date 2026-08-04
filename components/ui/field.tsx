import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

const controlClassName =
  "w-full rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus)]";

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
            <span className="font-normal text-[var(--muted)]">({optionalLabel})</span>
          </>
        ) : null}
      </label>
      {children}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${controlClassName} ${props.className ?? ""}`} />;
}

export function TextTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`resize-y ${controlClassName} ${props.className ?? ""}`}
    />
  );
}
