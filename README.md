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
- Resend + Cloudflare Turnstile for contact
- Vercel Analytics + Speed Insights
- Vitest for unit tests
- Vercel deployment

## Routes

| Path | Purpose |
|------|---------|
| `/en`, `/es`, `/fr` | Home — hero, how I work, resumes, projects, contact |
| `/[locale]/about` | Profile narrative, experience, tools, education |
| `/api/whatsapp` | Server redirect to WhatsApp (phone from env) |
| `/resume/*.pdf` | Local resume files |
| `/sitemap.xml` | Localized sitemap |
| `/robots.txt` | Crawler rules |

Default locale is English. Language and theme controls live in the header.

## Local development

Requires Node.js 22.12+.

```sh
cp .env.example .env.local
# Prefer aligning secrets with Vercel:
# npx vercel env pull .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

```sh
npm run typecheck
npm run test
npm run lint
npm run build
npm run start
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
| `eva-vargas-en.pdf` | Available |
| `eva-vargas-es.pdf` | Available |
| `eva-vargas-ats.pdf` | Available |

Toggle availability in `lib/site.ts`.

## Design notes

Outfit + Source Sans 3, soft pink/blue accents, gradient project-card rings.
Copy is conversational (portfolio) while resumes stay market-oriented.
Motion stays light: hero entrance, scroll reveal, header scroll state, button/card microinteractions — respects `prefers-reduced-motion`.

## Project structure

```text
app/[locale]/             Localized pages (home, about)
app/opengraph-image.tsx   Generated OG image
app/sitemap.ts            Sitemap
lib/actions/              Server Actions (contact)
components/               Layout, UI, contact, resumes, sections
messages/                 en / es / fr copy
i18n/                     Locale config
lib/                      Site config, theme, vCard, helpers
public/img/               Project and profile images
public/resume/            PDF resumes
```

## Legacy

The previous static HTML site is archived under `_legacy/` for reference.
