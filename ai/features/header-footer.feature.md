# Header, Footer & Layout — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Provide a shared `MainLayout` component that wraps every page's content between a persistent `Header` and `Footer`. The header contains an AI-generated logo and navigation links; the footer contains contact info and a copyright notice. Navigation adapts between desktop (horizontal top bar) and mobile (icon-based bottom bar). No page renders outside this layout.

---

## Scope

### In Scope
- `MainLayout` component that accepts `children` and renders `<Header>`, the page content, and `<Footer>`
- `Header` / `Navbar` component: sticky, AI-generated logo, nav links to all public pages
- `Footer` component: email, social links, copyright notice
- AI-generated logo image asset; clicking it navigates to `/`
- Responsive nav: horizontal at top on desktop (>768px), icon-based at bottom on mobile (≤768px)
- Custom CSS only — no third-party UI or CSS frameworks
- Accessible alt text on the logo image

### Out of Scope
- Links to `/login` or `/backoffice` in any nav (per Global AI Spec)
- CSS frameworks (Tailwind, Bootstrap, MUI, etc.)
- Animation libraries beyond simple CSS transitions
- Server-side rendering or any non-React routing strategy
- Logo design beyond what an AI image-generation tool produces

---

## Requirements Breakdown & User Flow

### Visitor page load flow

1. Visitor navigates to any route (e.g. `/#/portfolio`)
2. `MainLayout` renders — `Header` appears at the top, `Footer` at the bottom, page content fills between
3. Visitor scrolls down — `Header` stays fixed/sticky in the viewport
4. Visitor clicks the logo — navigates to `/#/` (Home)
5. Visitor clicks a nav link — navigates to the corresponding route; active link is visually highlighted
6. On mobile, nav links collapse into icons pinned to the bottom of the viewport

### Responsive breakpoint flow

- **Desktop (>768px):** `Header` is visible at the top; nav links are text labels displayed horizontally
- **Mobile (≤768px):** `Header` nav links are hidden (or condensed); an icon-based bottom nav bar appears fixed at the bottom of the viewport

---

## Interfaces Involved

### Components

| Component | File path | Responsibility |
|---|---|---|
| `MainLayout` | `src/components/layout/MainLayout.jsx` | Wraps children between Header and Footer |
| `Header` | `src/components/layout/Header.jsx` | Logo + desktop nav links; sticky positioning |
| `Footer` | `src/components/layout/Footer.jsx` | Email, social links, copyright |
| `BottomNav` | `src/components/layout/BottomNav.jsx` | Mobile icon-based bottom nav (≤768px only) |

### Styles

| File | Scope |
|---|---|
| `src/components/layout/MainLayout.css` | Layout structure (min-height, flex column) |
| `src/components/layout/Header.css` | Header positioning, logo, nav links |
| `src/components/layout/Footer.css` | Footer structure, links, copyright |
| `src/components/layout/BottomNav.css` | Mobile bottom nav bar, icon sizing |

### Assets

| Asset | Path | Notes |
|---|---|---|
| Logo image | `src/assets/logo.png` (or `.svg`) | AI-generated; used in Header |

### Routes consumed by nav

| Label | Path |
|---|---|
| Home | `/#/` |
| Portfolio | `/#/portfolio` |
| Links | `/#/links` |
| Contact | `/#/contact` |

---

## Data, Validations & Expected Behavior

### MainLayout
- Renders as a flex column occupying at least 100vh so the footer is always at or below the fold
- Accepts `children` prop; renders `<Header />`, `<main>{children}</main>`, `<Footer />`, and `<BottomNav />`
- All page-level route components are wrapped by `MainLayout` inside `App.jsx`

### Header
- `position: sticky; top: 0` (or `fixed`) so it remains visible during scroll
- Contains the logo (left-aligned) and nav links (right-aligned on desktop)
- Consistent background color and box-shadow/border across all pages
- Active route link is visually distinguished (e.g. different color or underline)
- No link to `/login` or `/backoffice`

### Logo
- `<img>` element with `alt="Kazzy96 logo"` (or equivalent descriptive text)
- Wrapped in a `<Link to="/">` (react-router-dom) so clicking navigates to Home
- Image is AI-generated and stored locally in `src/assets/`
- Scales without overflowing at any viewport width

### Footer
- Renders below all page content; never overlaps it
- Contains at minimum:
  - Email address (e.g. `mailto:` link)
  - At least one social link (LinkedIn, GitHub, etc.) opening in `target="_blank" rel="noopener noreferrer"`
  - Copyright notice: `© {currentYear} Kazzy96. All rights reserved.`
- Copyright year is derived dynamically: `new Date().getFullYear()`

### BottomNav (mobile only)
- Fixed at the bottom of the viewport (`position: fixed; bottom: 0`)
- Visible only on screens ≤768px (hidden via CSS media query on desktop)
- Contains icon buttons for Home, Portfolio, Links, Contact (using `lucide-react` icons per Global AI Spec dependencies)
- Each icon is a `<Link>` to the corresponding route
- Active route icon is visually highlighted
- Does NOT contain links to `/login` or `/backoffice`

### Responsive behavior
- Desktop (>768px):
  - Header nav links visible as text, displayed horizontally
  - `BottomNav` hidden (`display: none`)
  - Logo does not overflow the header
- Mobile (≤768px):
  - Header nav text links hidden (`display: none`) or collapsed
  - `BottomNav` visible and fixed at bottom
  - Logo scales proportionally
  - All text readable without horizontal scrolling
  - All sections stack vertically
  - Images are `max-width: 100%` — no overflow

---

## Acceptance Criteria

### Layout structure
- [ ] Every public page (`/`, `/portfolio`, `/links`, `/contact`) renders inside `MainLayout`
- [ ] `Header` is present and visible at the top of every public page
- [ ] `Footer` is present and visible at the bottom of every public page
- [ ] No page content appears outside the `<main>` slot between Header and Footer

### Header & Logo
- [ ] Header remains visible (sticky/fixed) when the user scrolls down a long page
- [ ] Header background and styling are consistent across all pages
- [ ] Logo image is rendered in the header with a non-empty `alt` attribute
- [ ] Clicking the logo navigates to the Home route (`/#/`)
- [ ] Nav links to Home, Portfolio, Links, and Contact are present in the Header
- [ ] No link to `/login` or `/backoffice` exists in the Header

### Footer
- [ ] Footer appears on every public page
- [ ] Footer contains a `mailto:` email link
- [ ] Footer contains at least one social link that opens in a new tab with `rel="noopener noreferrer"`
- [ ] Footer displays a copyright notice with the current year computed via `new Date().getFullYear()`

### Responsive — Desktop (>768px)
- [ ] Nav links in the Header are visible as horizontal text labels
- [ ] `BottomNav` is not visible on screen widths above 768px
- [ ] Logo does not overflow or break the header layout

### Responsive — Mobile (≤768px)
- [ ] Header text nav links are hidden
- [ ] `BottomNav` is visible and fixed at the bottom of the viewport
- [ ] `BottomNav` contains icon links for all four public routes (no `/login` or `/backoffice`)
- [ ] Active route is visually highlighted in `BottomNav`
- [ ] No content overflows the viewport horizontally
- [ ] Text is readable without zooming or horizontal scrolling
- [ ] Images scale correctly (`max-width: 100%`) and do not overflow
- [ ] Page sections stack vertically on narrow viewports
