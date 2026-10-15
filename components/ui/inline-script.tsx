"use client";

/**
 * Runs during HTML parsing on full page loads. On client renders (e.g. switching locale remounts
 * the layout) it becomes an inert `text/plain` block, which React neither executes nor warns about.
 * Must stay a Client Component: from a Server Component, `typeof window` is always evaluated on the server.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
