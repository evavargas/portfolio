# Eva Vargas · Portfolio

Personal portfolio for Eva Vargas — senior frontend engineer focused on
product development and AI-assisted delivery. The site presents selected
projects, a concise professional profile, a modern contact flow, and
downloadable resumes.

## Stack

- Next.js 16 (App Router) + Server Actions
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl (English, Spanish, French)
- next-themes (light / dark / system)
- Resend + Cloudflare Turnstile for contact
- Vercel deployment

## Routes

| Path | Purpose |
|------|---------|
| `/en`, `/es`, `/fr` | Home — hero, highlights, projects, resume gallery, contact |
| `/[locale]/about` | Profile, achievements, experience summaries, skills, education |
| `/api/whatsapp` | Server redirect to WhatsApp (phone from env) |
| `/resume/*.pdf` | Local resume files |

Default locale is English. Language and theme controls live in the header.

## Local development

Requires Node.js 22.12+.

```sh
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

```sh
npm run lint
npm run build
npm run start
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `CONTACT_TO_EMAIL` | Inbox that receives portfolio messages (also used in vCard) |
| `CONTACT_PHONE_E164` | Phone digits for WhatsApp + vCard, e.g. `598097905849` |
| `CONTACT_FROM_EMAIL` | Resend from address |
| `RESEND_API_KEY` | Resend API key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret |
| `NEXT_PUBLIC_SITE_URL` | Optional absolute site URL for OG metadata |

Without these, the site still builds; the contact form returns a configuration error and the QR/WhatsApp channel stay hidden until phone/email are set.

## Contact

- Short form: subject + message, optional reply email
- Cloudflare Turnstile captcha
- Honeypot field
- Server Action delivery via Resend (email never rendered in the page)
- WhatsApp button via `/api/whatsapp`
- LinkedIn button
- QR code with a vCard payload (“save contact” on mobile)

## Resumes

Files live in `public/resume/`:

| File | Status |
|------|--------|
| `eva-vargas-en.pdf` | Available |
| `eva-vargas-es.pdf` | Available |
| `eva-vargas-ats.pdf` | Add when ready (placeholder present) |

After adding a PDF, set `available: true` for that entry in `lib/site.ts`.

## Design notes

Visual language is adapted from the CV Figma file (soft pink/blue accents,
badge chips, gradient project-card rings, Outfit + Source Sans 3). Home stays
light on first impression; About and Contact stay one click away from header,
hero CTAs, and footer.

## Project structure

```text
app/[locale]/          Localized pages (home, about)
app/actions/           Server Actions (contact)
components/            Layout, UI, contact, resumes, sections
messages/              en / es / fr copy
i18n/                  Locale config and request helpers
lib/                   Site config, vCard, Turnstile helpers
public/img/            Project and profile images
public/resume/         PDF resumes
```

## Legacy

The previous static HTML site is archived under `_legacy/` for reference.
