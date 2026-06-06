# Links Page — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Deliver the public-facing Links page at `/links`. It presents a curated collection of at least three external links, each displayed as a card with an image, title, short description, and a URL that opens in a new tab. At least one image on the page is AI-generated. The page is fully responsive and styled with custom CSS only.

---

## Scope

### In Scope
- Route `/links` renders `<Links>` inside `MainLayout`
- ≥3 link cards, each with: image, title, description (1–3 sentences), and clickable URL opening in a new tab
- ≥1 AI-generated image on the page (card thumbnail or decorative element), with descriptive `alt` text; AI tool documented in a comment
- Responsive card grid layout
- Custom CSS only — no third-party UI or CSS frameworks
- All external links use `target="_blank" rel="noopener noreferrer"` (security requirement)

### Out of Scope
- Fetching links dynamically from Supabase or any API (static data only)
- User-submitted links or any form input
- Link preview generation (og:image scraping, etc.)
- Authentication or auth-gated content
- CSS frameworks (Tailwind, Bootstrap, MUI, etc.)
- Animation libraries beyond simple CSS transitions

---

## Requirements Breakdown & User Flow

### Visitor links flow

1. Visitor clicks "Links" in the nav or navigates to `/#/links`
2. `MainLayout` renders — `Header` and `Footer` are present
3. `Links` page content loads in the `<main>` slot
4. Visitor sees a page heading and the card grid
5. Visitor clicks a card or its link button — the external URL opens in a new tab
6. The current page stays open; no navigation away from the site

---

## Interfaces Involved

### Components

| Component | File path | Responsibility |
|---|---|---|
| `Links` | `src/pages/Links.jsx` | Page root — renders heading and link card grid |
| `LinkCard` | Local component in `Links.jsx` | Reusable card: image, title, description, external link |

### Styles

| File | Scope |
|---|---|
| `src/pages/Links.css` | Page-level layout: grid, card styles, hover effects |

### Assets

| Asset | Path | Notes |
|---|---|---|
| AI image (card or banner) | `src/assets/links-banner.png` (or per-card) | ≥1 AI-generated image; alt text required |
| Card thumbnails | `src/assets/link-*.png` (or external URLs) | One image per link card; may be AI-generated or sourced |

> **AI tool used:** Image(s) generated with [ChatGPT / DALL·E 3](https://chatgpt.com) (or substitute the actual tool used). Document the prompt(s) in a comment in `Links.jsx` above each AI-generated `<img>` tag.

---

## Data, Validations & Expected Behavior

### Link cards
- The page renders **at least 3** link cards
- Each card contains:
  - An `<img>` with a non-empty `alt` attribute (thumbnail, preview, or AI-generated illustration)
  - A title or name (e.g. site name or link label)
  - A description of 1–3 sentences explaining what the link is and why it is relevant
  - A clickable element (`<a>`) whose `href` is the external URL, with `target="_blank"` and `rel="noopener noreferrer"`
- The entire card may be wrapped in the `<a>` tag, or the link can be a dedicated button/link at the bottom of the card — either is acceptable
- Cards are displayed in a grid or structured layout (not a plain `<ul>`)

### AI-generated image(s)
- At least **1** image on the page is AI-generated
- It has a non-empty, descriptive `alt` attribute
- The image is `max-width: 100%` and does not overflow its container
- The AI tool and prompt are documented in a comment directly above the `<img>` tag in `Links.jsx`
- The AI image may serve as a card thumbnail, a page banner, or a decorative section element

### External link security
- Every `<a>` pointing to an external URL must include `target="_blank"` and `rel="noopener noreferrer"`
- No link navigates away from the site within the same tab

### Visual layout
- Cards are arranged in a grid (≥2 columns on desktop, 1 column on mobile)
- Cards have a consistent height/structure (image on top, text below)
- Hover state provides a visual affordance (e.g. shadow lift, border highlight, or scale)
- Page has a visible heading (e.g. "Links" or "Useful Links")

### Responsive behavior
- Grid stacks to a single column on mobile (≤768px)
- Card images scale correctly and do not overflow
- Text is readable without horizontal scrolling on any viewport from 320px upward

---

## Acceptance Criteria

### Route
- [ ] Navigating to `/#/links` renders the Links page inside `MainLayout`
- [ ] "Links" nav link in Header is highlighted as active on this page

### Link cards
- [ ] At least 3 link cards are rendered on the page
- [ ] Each card contains an image with a non-empty `alt` attribute
- [ ] Each card contains a title/name
- [ ] Each card contains a description of 1–3 sentences
- [ ] Each card contains a clickable link to an external URL
- [ ] All external links open in a new tab (`target="_blank"`)
- [ ] All external links include `rel="noopener noreferrer"`

### AI-generated image
- [ ] At least 1 image on the page is AI-generated
- [ ] That image has a non-empty `alt` attribute
- [ ] The AI tool used is documented in a comment in `Links.jsx` above the image
- [ ] The image does not overflow its container on desktop or mobile

### Layout & responsiveness
- [ ] Cards are displayed in a grid or structured layout (not a plain list)
- [ ] Cards have at least a basic hover state (shadow, border, or scale change)
- [ ] Grid stacks to a single column on mobile (≤768px)
- [ ] No horizontal scrollbar appears at any viewport width from 320px upward
