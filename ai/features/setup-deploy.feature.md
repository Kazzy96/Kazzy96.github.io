# Setup & Deploy — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Stand up the React + Vite codebase and ship it to GitHub Pages automatically. Every push to `main` results in a publicly accessible build at `https://kazzy96.github.io`, with environment variables injected from GitHub Secrets at build time. No manual deploy steps.

---

## Scope

### In Scope
- Vite + React scaffold via `npm create vite@latest`
- `vite.config.js` configured with `base: '/'`
- `HashRouter` from `react-router-dom` so the URL bar stays at `https://kazzy96.github.io` regardless of active route
- `.github/workflows/deploy.yml` GitHub Actions workflow
- Workflow triggers on push to `main` only
- Workflow steps: checkout → setup Node → `npm ci` → `npm run build` → upload `dist/` → deploy to GitHub Pages
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` injected via `env:` from repo Secrets
- GitHub Pages configured to serve from "GitHub Actions" source
- `.gitignore` excludes `.env`

### Out of Scope
- Supabase project creation, `messages` table, RLS, and admin user setup (handled separately — see Global AI Spec, "Supabase Setup")
- Custom domain configuration
- PR preview deployments
- Staging or multi-environment setups
- Branch deploys for `dev` or `feature/*`
- TypeScript migration

---

## Requirements Breakdown & User Flow

### Developer scaffold flow (one-time)

1. Run `npm create vite@latest Kazzy96.github.io` — choose **React** → **JavaScript**
2. `cd Kazzy96.github.io && npm install`
3. Install runtime deps: `npm install react-router-dom @supabase/supabase-js lucide-react`
4. Create local `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (never committed)
5. Confirm `.gitignore` excludes `.env`
6. Set `base: '/'` in `vite.config.js`
7. Wrap `<App />` in `<HashRouter>` inside `src/main.jsx`
8. `npm run dev` → verify app loads at `http://localhost:5173`

### GitHub Pages configuration (one-time)

1. Repo **Settings → Pages → Source**: select **GitHub Actions**
2. Repo **Settings → Secrets and variables → Actions** → add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Deploy flow (per release)

1. Work on a `feature/*` branch created from `dev`
2. Merge `feature/* → dev` when complete
3. Merge `dev → main` when ready to release
4. Push to `main` triggers the workflow automatically
5. Workflow builds and deploys to GitHub Pages
6. Live site updates at `https://kazzy96.github.io` within ~2 minutes

---

## Interfaces Involved

### Files created/modified

| File | Purpose |
|---|---|
| `vite.config.js` | Sets `base: '/'` |
| `src/main.jsx` | Wraps `<App />` in `<HashRouter>` |
| `.github/workflows/deploy.yml` | CI/CD workflow |
| `.gitignore` | Must exclude `.env`, `dist/`, `node_modules/` |
| `.env` | Local-only env vars; never committed |
| `package.json` | Default Vite scripts (`dev`, `build`, `preview`) |

### Components
None — this feature is purely infrastructure.

### External services
- GitHub Actions runner (Ubuntu latest)
- GitHub Pages
- Supabase (consumed at build/runtime via env vars)

---

## Data, Validations, Expected Behavior

### Environment variables

| Variable | Source (local) | Source (CI) | Notes |
|---|---|---|---|
| `VITE_SUPABASE_URL` | `.env` | GitHub Actions secret | Must start with `VITE_` to be accessible via `import.meta.env` |
| `VITE_SUPABASE_ANON_KEY` | `.env` | GitHub Actions secret | Anon/public key — safe to expose in client bundle |

The `VITE_` prefix is **required** by Vite. Variables without it are not exposed to client code.

### Workflow trigger
- Triggers only on `push` to `main`
- Does NOT run on pull requests, `dev` pushes, or `feature/*` pushes

### Build behavior
- `npm ci` performs a clean install from `package-lock.json` (deterministic, faster than `npm install`)
- `npm run build` produces a `dist/` folder ready for static hosting
- If env vars are missing in CI, the build still succeeds but Supabase-dependent features will fail at runtime

### Routing behavior with HashRouter
- URLs render as `https://kazzy96.github.io/#/`, `https://kazzy96.github.io/#/portfolio`, etc.
- The path portion of the URL bar stays at `https://kazzy96.github.io` for all routes — only the hash fragment changes
- Refreshing any route works without a 404 because GitHub Pages always serves `index.html` for the root URL
- No `404.html` redirect hack is needed

---

## Acceptance Criteria

### Local development
- [ ] `npm run dev` starts a server and renders the React app at `http://localhost:5173`
- [ ] `vite.config.js` contains `base: '/'`
- [ ] `src/main.jsx` wraps `<App />` in `<HashRouter>` from `react-router-dom`
- [ ] `.env` exists locally with both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] `.gitignore` contains `.env`
- [ ] `.env` is not present in the GitHub repo (verified via `git log --all -- .env` returning nothing)

### CI/CD
- [ ] `.github/workflows/deploy.yml` exists and:
  - Triggers on `push` to `main`
  - Uses `actions/checkout@v4`, `actions/setup-node@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`
  - Runs `npm ci` followed by `npm run build`
  - Passes `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` via `env:` from `${{ secrets.* }}`
  - Uploads `./dist` as the Pages artifact
  - Has `permissions: pages: write, id-token: write`
- [ ] Repo Settings → Pages source is set to **GitHub Actions**
- [ ] Repo Secrets contain `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Deployed site
- [ ] First workflow run completes with a green check on the commit
- [ ] `https://kazzy96.github.io` returns the React app (not a 404 or default GH Pages page)
- [ ] Navigating between routes in-app keeps the URL path at `https://kazzy96.github.io` (only the `#/...` fragment changes)
- [ ] Refreshing any route loads the app without a 404
- [ ] Subsequent pushes to `main` trigger the workflow and update the live site within ~2 minutes
