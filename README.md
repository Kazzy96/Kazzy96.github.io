# Kazzy96 Portfolio

A personal portfolio website showcasing skills, projects, and experience. It includes a public contact form that saves messages to a Supabase database, and a private admin back office for viewing and managing those messages. The site is deployed automatically to GitHub Pages on every push to `main`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| Backend-as-a-Service | Supabase (PostgreSQL + Auth) |
| Icons | Lucide React |
| Styling | Custom CSS (no frameworks) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Project Structure

```
Kazzy96.github.io/
├── public/                  # Static assets served as-is
├── src/
│   ├── assets/              # Images and other bundled assets
│   ├── components/
│   │   └── layout/
│   │       ├── Header.jsx   # Top nav (desktop) / icon nav (mobile)
│   │       ├── Footer.jsx   # Contact info and copyright
│   │       ├── BottomNav.jsx# Mobile bottom navigation bar
│   │       └── MainLayout.jsx # Shared page wrapper
│   ├── lib/
│   │   └── supabaseClient.js # Supabase client initialisation
│   ├── pages/
│   │   ├── Home.jsx         # Intro, skills, AI-generated images
│   │   ├── Portfolio.jsx    # Education, work, projects, resume PDF
│   │   ├── Links.jsx        # Curated external link cards
│   │   ├── Contact.jsx      # Public contact form → Supabase
│   │   ├── Login.jsx        # Admin login (hidden from nav)
│   │   └── BackOffice.jsx   # Protected admin message dashboard
│   ├── App.jsx              # Route definitions
│   └── main.jsx             # App entry point (HashRouter)
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD workflow
├── .env                     # Local env vars — never committed
├── vite.config.js
└── package.json
```

---

## Installation / Setup Instructions

### Prerequisites

- Node.js 18+ and npm installed
- A [Supabase](https://supabase.com) project with:
  - A `messages` table (`id`, `name`, `email`, `message`, `created_at`)
  - Row-Level Security configured appropriately
  - An admin user created via the Supabase Auth dashboard

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kazzy96/Kazzy96.github.io.git
   cd Kazzy96.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a local environment file**
   ```bash
   cp .env.example .env   # or create .env manually (see Environment Variables below)
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

### Deployment

Deployment is fully automated. Any push to the `main` branch triggers a GitHub Actions workflow that builds the project and publishes the `dist/` folder to GitHub Pages.

To configure this in a fork:
1. Go to **Settings → Pages → Source** and select **GitHub Actions**.
2. Go to **Settings → Secrets and variables → Actions** and add the two secrets listed below.

---

## Environment Variables

The following variables must be set before running or deploying the app. Locally, place them in a `.env` file at the project root (this file is excluded from version control via `.gitignore`). In production, add them as GitHub Actions repository secrets.

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | The URL of your Supabase project (e.g. `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | The public anon key from your Supabase project settings |

> Without these variables the contact form and login page are disabled, and a warning is logged to the console. The rest of the site remains fully functional.

Example `.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## API Documentation

This project has no custom backend or REST/GraphQL API. All data operations go through the **Supabase client SDK** (`@supabase/supabase-js`) directly from the browser.

### Supabase operations used

| Operation | Location | Description |
|---|---|---|
| `supabase.from('messages').insert(...)` | `src/pages/Contact.jsx` | Inserts a new contact form submission |
| `supabase.from('messages').select(...)` | `src/pages/BackOffice.jsx` | Fetches all messages, ordered newest-first |
| `supabase.from('messages').delete(...)` | `src/pages/BackOffice.jsx` | Deletes a message by `id` |
| `supabase.auth.signInWithPassword(...)` | `src/pages/Login.jsx` | Authenticates the admin user |
| `supabase.auth.getSession()` | `src/pages/BackOffice.jsx` | Checks for an active session (auth guard) |
| `supabase.auth.signOut()` | `src/pages/BackOffice.jsx` | Logs the admin out |

All Supabase credentials are public-facing (anon key) and access is controlled by Supabase Row-Level Security policies on the `messages` table.

---

## Author

**Kazzy96**
- GitHub: [@Kazzy96](https://github.com/Kazzy96)
- Live site: [https://kazzy96.github.io](https://kazzy96.github.io)
