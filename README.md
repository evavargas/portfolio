# Eva Vargas · Portfolio

Personal portfolio for Eva Vargas — software engineer specializing in
frontend, product development, and AI-assisted delivery. Conversational
profile, selected work, contact flow, and downloadable resumes.

Live: [evavargasportfolio.vercel.app](https://evavargasportfolio.vercel.app)

## Stack

- Next.js 16 (App Router) + Server Actions
- React 19 + TypeScript
- Tailwind CSS 4
- next-intl (English, Spanish, French)
- Custom theme provider (light / dark / system)
- Iconsax (`iconsax-reactjs`) for UI icons
- Resend + Cloudflare Turnstile for contact
- Vercel Analytics + Speed Insights
- Vitest for unit tests
- Vercel deployment

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home — hero, how I work, resumes, projects, contact |
| `/about` | Profile narrative, experience, tools, education |
| `/og` | Generated Open Graph image (`?lang=` for other languages) |
| `/api/whatsapp` | Server redirect to WhatsApp (phone from env) |
| `/resume/*.pdf` | Local resume files |
| `/sitemap.xml` | Localized sitemap |
| `/robots.txt` | Crawler rules |

The language never goes in the path. English (default) uses clean URLs; Spanish and French use
`?lang=es` / `?lang=fr`. Without the param, `proxy.ts` uses the `NEXT_LOCALE` cookie (set by the
header switcher) or the browser's `Accept-Language`, then rewrites internally to `app/[locale]/`.
Legacy `/en`, `/es`, `/fr` URLs redirect permanently. Language and theme controls live in the header.
Switching language in the header is a client-side navigation (no full page reload).

### Adding a language

1. Add it to `locales` and `localeLabels` in `i18n/config.ts`.
2. Create `messages/<code>.json` (TypeScript flags missing keys against `en.json`).
3. Register the catalog in `i18n/request.ts`.
4. Add its Open Graph locale to `ogLocales` in `lib/seo.ts`.

## SEO

- Each page sets a canonical URL plus `hreflang` alternates (`en`, `es`, `fr`, `x-default`) via `lib/seo.ts`.
- Open Graph / Twitter images are generated per language by `/og?lang=`.
- JSON-LD: `Person` (all pages) and `ProfilePage` (`/about`).
- The sitemap lists every page in every language. Bump `CONTENT_UPDATED_AT` in `app/sitemap.ts` when copy changes.

## Local development

Requires Node.js 22.12+.

```sh
cp .env.example .env.local
# Prefer aligning secrets with Vercel:
# npx vercel env pull .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (English by default; your browser language may redirect to `?lang=es` or `?lang=fr`).

**Habit:** use `npm run dev` while iterating. It hot-reloads and avoids stale `_next/static` hashes.

Use a production-like run only when you need to verify the built output:

```sh
npm run build
npm run start
```

If `npm start` shows unstyled HTML / 500s on CSS or JS chunks, the build is out of sync — clean and rebuild:

```sh
rm -rf .next && npm run build && npm start
```

Quality checks:

```sh
npm run typecheck
npm run test
npm run lint
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for OG / sitemap (production: `https://evavargasportfolio.vercel.app`) |
| `CONTACT_TO_EMAIL` | Inbox that receives portfolio messages (also used in vCard) |
| `CONTACT_PHONE_E164` | Phone digits for WhatsApp + vCard, e.g. `598097905849` |
| `CONTACT_FROM_EMAIL` | Resend from address |
| `RESEND_API_KEY` | Resend API key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret |

Without contact secrets, the site still builds; the form returns a configuration error and QR/WhatsApp stay hidden until phone/email are set.

## Contact

- Short form: subject + message, optional reply email
- Cloudflare Turnstile + honeypot + IP rate limit
- Server Action delivery via Resend
- WhatsApp (`/api/whatsapp`), LinkedIn, vCard QR

## Resumes

Files in `public/resume/`:

| File | Status |
|------|--------|
| `eva-vargas-product-engineer-en.pdf` | Available |
| `eva-vargas-product-engineer-es.pdf` | Available |

Toggle availability in `lib/site.ts`.

## Design notes

Outfit + Source Sans 3, soft pink/blue accents, gradient project-card rings.
Copy is conversational (portfolio) while resumes stay market-oriented.
Motion stays light: hero entrance, scroll reveal, header scroll state, button/card microinteractions — respects `prefers-reduced-motion`.
Tokens live in `styles/tokens.css`; map in `styles/DESIGN.md`.

## Project structure

```text
app/[locale]/             Localized pages (home, about, error, not-found)
app/global-error.tsx      Root error boundary
app/og/route.tsx          Generated OG image
app/sitemap.ts            Sitemap
proxy.ts                  Locale resolution (?lang, cookie, Accept-Language) + internal rewrite
lib/actions/              Server Actions (contact)
components/               Layout, UI, about, contact, resumes, sections, seo, system
messages/                 en / es / fr copy
i18n/                     Locale config, URL helpers, language-switch hook
lib/                      Site config, SEO, theme, vCard, helpers
public/img/               Project and profile images
public/resume/            PDF resumes
styles/                   Design tokens + map
```
