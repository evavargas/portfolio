/**
 * Design system map
 * -----------------
 * Source of truth: styles/tokens.css (color, radius, motion, shadow, layout)
 * Tailwind bridge: @theme in tokens.css → bg-surface, text-ink, rounded-ds-md, …
 * JS mirror:       lib/brand-colors.ts (OG / non-CSS contexts; keep in sync with :root light)
 *
 * Layers
 * 1. tokens     → visual constants
 * 2. globals    → component skins (.badge, .project-card, .reveal, …) that consume tokens
 * 3. ui/*       → React primitives (Surface, Container, Button, Badge, Field, IconButton, …)
 * 4. motion/*   → behavior wrappers (Reveal, SpotlightCard, StaggerList)
 * 5. domain/*   → about | projects | highlights | contact | resumes | layout | sections
 *
 * Contracts
 * - Surface  = default bordered panel (about, contact, highlights, bridge)
 * - Project  = intentional special case (gradient ring + SpotlightCard); shares --radius-md
 * - Resume   = interactive Surface-like card; shares --radius-lg
 * - Button   = primary actions; IconButton = chrome controls
 * - Container = page width + gutters from tokens
 */
