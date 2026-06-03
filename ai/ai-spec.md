# AI_SPEC — Kazzy96 Portfolio

This document is the **main AI specification** for the project. It defines the overall context, scope, structure, and rules. Read this **before** implementing or modifying any feature. Each feature has its own spec in `./ai/features/`.

---

## Project Identity

- **Project Name:** Kazzy96 Portfolio
- **Short Description:** A personal portfolio website showcasing skills, projects, and experience, with a public contact form persisted to Supabase and a private admin back office for managing inbound messages.
- **Project Type:** React + Vite static site (client-side only), deployed to GitHub Pages, with Supabase as Backend-as-a-Service.

---

## Goal and Scope

### Goal

Deliver a public-facing portfolio site that demonstrates job-market readiness, with working Supabase integration for contact form persistence and admin authentication, and automatic CI/CD deployment to GitHub Pages.

### In Scope (Build Now)

- Six routes: `/`, `/portfolio`, `/links`, `/contact`, `/login` (secret), `/backoffice` (protected)
- Shared layout: header (with AI-generated logo + nav), footer (contact info, copyright), main content slot
- Responsive nav: horizontal top nav on desktop (>768px), icon-based bottom nav on mobile (≤768px)
- Home page sections: intro, ≥3 technical skills with icons, ≥3 soft skills with icons, ≥2 AI-generated images
- Portfolio page sections: education, work, projects (reverse-chronological), downloadable PDF resume, ≥2 AI-generated images
- Links page: ≥3 external link cards (image, title, description, target="_blank"), ≥1 AI-generated image
- Contact form: name, email, message → validates client-side → INSERTs to Supabase `messages` table → shows success/failure feedback → resets on success
- Login: Supabase `signInWithPassword`, redirect to `/backoffice` on success, error message on failure, session persists across refresh
- Back Office: auth guard, list messages newest-first, modal view, delete row, logout
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) triggered on push to `main`
- Vite configured with `base: '/'` for username.github.io root repo

### Out of Scope (Do NOT Build)

- Custom backend server (Express, Node API, serverless functions, etc.)
- Server-side rendering or static-site frameworks (Next.js, Remix, Astro, etc.)
- Public sign-up, password reset, or any auth flow beyond the single pre-created admin
- Any link to `/login` or `/backoffice` in Header, Footer, or mobile nav
- CSS frameworks (Tailwind, MUI, Bootstrap, Chakra, etc.) — custom CSS only
- State management libraries (Redux, Zustand, Jotai, etc.) — React state + context only
- Animation libraries beyond simple CSS transitions
- Analytics, tracking, or third-party scripts
- Any fictional company branding (this is Kazzy's personal site)
- Features not explicitly listed in the rubric checklist

---

## Users and Use Cases

- **Public visitor (unauthenticated):** browses Home, Portfolio, Links, Contact pages; submits messages via the contact form; downloads the resume PDF.
- **Admin — Kazzy (authenticated):** navigates to `/login` via direct URL, signs in, lands on `/backoffice`; views, opens, and deletes inbound messages; logs out.

---

## Feature Index (Links Only)

- `./ai/features/setup-deploy.feature.md` — Vite scaffold, GitHub Actions, GitHub Pages, Supabase wiring
- `./ai/features/header-footer.feature.md` — MainLayout, Header, Footer, logo, responsive nav
- `./ai/features/home-page.feature.md` — Intro, technical skills, soft skills
- `./ai/features/portfolio-page.feature.md` — Education, work, projects, downloadable resume
- `./ai/features/link-page.feature.md` — External link cards
- `./ai/features/contact-page.feature.md` — Contact form + Supabase INSERT
- `./ai/features/login-page.feature.md` — Secret login route, Supabase Auth
- `./ai/features/back-office.feature.md` — Protected admin dashboard

---

## Pages / Screens / Routes

| Path | Page | Public? | In Nav? |
|---|---|---|---|
| `/` | Home | yes | yes |
| `/portfolio` | Portfolio | yes | yes |
| `/links` | Links | yes | yes |
| `/contact` | Contact | yes | yes |
| `/login` | Login | yes (URL only) | **NO** |
| `/backoffice` | Back Office | auth-only | **NO** |

All routes are client-side via `react-router-dom`. URL paths must stay clean (e.g. `https://kazzy96.github.io/portfolio`, not hash-routed).

---

## Data and Models

### Supabase: `messages` table

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, default `gen_random_uuid()` |
| `name` | text | NOT NULL |
| `email` | text | NOT NULL |
| `message` | text | NOT NULL |
| `created_at` | timestamptz | Default `now()` |

### Row-Level Security policies

- **Anonymous role:** `INSERT` only (public contact form)
- **Authenticated role:** `SELECT`, `DELETE` (admin back office)

### Supabase Auth

Single pre-created admin user (created in the Supabase dashboard, **not** via the app):

- Email: `admin@codeboxx.com`
- Password: `C0deB0xx4dm!n`

---

## Tech Stack and Tools

### Frontend
- React (Vite scaffold)
- JavaScript (not TypeScript)
- `react-router-dom` for client-side routing
- Custom CSS (component-scoped files under `src/styles/`)

### Backend
- None — Supabase is the only backend

### Database / Auth
- Supabase (Postgres + Auth)

### Libraries
- `@supabase/supabase-js` — Supabase client
- `react-router-dom` — routing
- `lucide-react` — icons for skills and mobile nav

### Deployment
- GitHub Actions → GitHub Pages
- Environment variables injected via GitHub Repository Secrets at build time

---

## Repository Structure

```
/
├── .github/workflows/
│   └── deploy.yml                     # CI/CD to GitHub Pages
├── ai/
│   ├── ai-spec.md                     # This file
│   └── features/                      # 8 per-feature specs
├── docs/
│   ├── script-1.md                    # Elevator pitch script #1
│   ├── script-2.md                    # Elevator pitch script #2
│   └── pitch-feedback.md
├── LeetCode-Challenges/               # Solution screenshots (.png)
├── public/
│   └── resume.pdf                     # Downloadable from Portfolio page
├── src/
│   ├── assets/                        # AI-generated images, logo
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── MainLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Links.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── BackOffice.jsx
│   ├── lib/
│   │   └── supabaseClient.js          # Single Supabase client instance
│   ├── styles/                        # Component-scoped CSS
│   ├── App.jsx                        # Router + layout wiring
│   └── main.jsx
├── .env                               # LOCAL ONLY — never committed
├── .gitignore                         # Must include .env
├── vite.config.js                     # base: '/'
├── README.md
└── CONCEPTS.md                        # 3 challenging concepts
```

---

## Rules for the AI

1. **Junior-friendly code.** Functional components, hooks, plain React state — no Redux, no advanced patterns, no premature abstraction.
2. **No custom backend.** Supabase is the only data layer. Never suggest Express, API routes, or serverless functions.
3. **Environment variables** accessed from client code MUST use the `VITE_` prefix (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), read via `import.meta.env`.
4. **Never commit `.env`.** Verify `.gitignore` excludes it before any commit.
5. **`/login` and `/backoffice` are secret routes.** Never reference them in `Header.jsx`, `Footer.jsx`, or any nav component. Accessed by URL only.
6. **Branching model:** all work on `feature/*` branches off `dev`. Merge `feature/* → dev`, then `dev → main`. **No direct commits to `main`.** Only `main` is graded.
7. **Always read the relevant feature spec** in `./ai/features/` before implementing or modifying that feature.
8. **Supabase client is centralized.** Import from `src/lib/supabaseClient.js`. Never instantiate `createClient()` anywhere else.
9. **Admin credentials are fixed and pre-created in Supabase.** Never write code that signs up users, seeds the admin, or modifies auth from the app.
10. **Static site only.** No SSR, no server logic, no dynamic build-time data fetching beyond what Vite supports natively.
11. **Custom CSS only.** No Tailwind, MUI, Bootstrap, etc. Component-scoped `.css` files imported per component.
12. **Reuse components.** If a card, button, or section pattern repeats, extract to `src/components/`.
13. **Responsive contract is non-negotiable:** desktop = horizontal top nav with text labels; mobile (≤768px) = icon-only bottom nav.
14. **AI-generated images must be documented** — note the AI tool used (e.g., in a code comment or in `CONCEPTS.md`).

---

## How to Run / Test the Project

### Local development

```bash
npm install
npm run dev              # http://localhost:5173
```

### Required `.env` file (local only — never committed)

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

### Production build (local preview)

```bash
npm run build            # outputs to /dist
npm run preview          # serves /dist on localhost
```

### Deployment

- Push to `main` triggers `.github/workflows/deploy.yml`
- Workflow runs `npm ci` → `npm run build` → deploys `dist/` to GitHub Pages
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are injected from GitHub Repository Secrets (Settings → Secrets and variables → Actions) into the build step via `env:`
- Live site: `https://kazzy96.github.io`

---

## Definition of Done

- [ ] Repo named `Kazzy96.github.io`, PUBLIC, all coaches added as collaborators
- [ ] `.env` never committed; secrets configured in GitHub Actions
- [ ] Branching history clearly shows `feature/* → dev → main`
- [ ] Site live at `https://kazzy96.github.io` via Actions deployment
- [ ] Header + Footer render on every public page; logo links to Home
- [ ] Responsive nav: horizontal on desktop, icon-only bottom nav on mobile
- [ ] Home: name, role/title, intro paragraph, ≥3 technical skills with icons, ≥3 soft skills with icons, ≥2 AI-generated images
- [ ] Portfolio: education + work + projects sections reverse-chronological, downloadable PDF resume, ≥2 AI-generated images
- [ ] Links: ≥3 external link cards (image, title, description, opens in new tab), ≥1 AI-generated image
- [ ] Contact: validates name/email/message, INSERTs to Supabase, success + failure feedback, resets on success
- [ ] Login: not in any nav; Supabase `signInWithPassword`; error on bad creds; redirect to `/backoffice` on success; session persists across refresh
- [ ] Back Office: not in any nav; redirects to `/login` if unauthenticated; lists messages newest-first; modal view with full content; delete works instantly; logout clears session
- [ ] `README.md`: title, description, tech stack, project structure, setup, env vars, API/Supabase docs, author section with LinkedIn link
- [ ] `ai/ai-spec.md` + 8 feature specs in `ai/features/`
- [ ] `CONCEPTS.md` with 3 challenging concepts
- [ ] `LeetCode-Challenges/<name>.png` screenshots committed
