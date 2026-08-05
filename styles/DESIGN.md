/**
 * Design system map
 * -----------------
 * Source of truth: styles/tokens.css (color, radius, motion, shadow, layout)
 * Tailwind bridge: @theme → prefer bg-surface, text-ink, text-muted, border-line,
 *                  text-link, rounded-ds-md/lg/xl (not raw var() in components)
 * JS mirror:       lib/brand-colors.ts (OG / non-CSS; keep in sync with :root light)
 *
 * Layers
 * 1. tokens     → visual constants
 * 2. globals    → component skins (.badge, .project-card, .reveal, …) that consume tokens
 * 3. ui/*       → React primitives
 * 4. motion/*   → behavior wrappers (Reveal, SpotlightCard, StaggerList)
 * 5. domain/*   → about | projects | highlights | contact | resumes | layout | sections
 *
 * Button contracts
 * - Button         → server-safe control (forms, dialogs, non-magnetic)
 * - MagneticButton → client CTA with magnetic hover
 * - ButtonGroup    → maps actions; defaults to MagneticButton (magnetic=false → Button)
 * - IconButton     → chrome (menu, theme)
 *
 * Surface contracts
 * - Surface  = default bordered panel (about, contact, highlights, bridge)
 * - Project  = special case (gradient ring + SpotlightCard); shares --radius-md
 * - Resume   = interactive card skin; shares --radius-lg
 * - Container = page width + gutters from tokens
 */
