/** Projects that have a detail page at /projects/[slug]; each needs `projects.details.<slug>` in every catalog. */
export const PROJECT_SLUGS = ["patio", "provecheck", "coffeemaster"] as const;

export function isProjectSlug(value: string): value is (typeof PROJECT_SLUGS)[number] {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}
