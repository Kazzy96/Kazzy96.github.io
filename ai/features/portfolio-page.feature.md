# Portfolio Page — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Deliver the public-facing Portfolio page at `/portfolio`. It presents the student's academic background, work experience, and personal/technical projects in reverse-chronological order. A downloadable PDF résumé is available, and at least two AI-generated images complement the content. All sections are visually distinct and the page is fully responsive.

---

## Scope

### In Scope
- Route `/portfolio` renders `<Portfolio>` inside `MainLayout`
- Education section: ≥1 entry with institution name, degree/program, and dates; reverse-chronological order
- Work Experience section: ≥1 entry with title/role, organization, dates, and a description of responsibilities or achievements; reverse-chronological order
- Projects section: ≥1 entry with project name, technologies used, description of purpose, and an image
- Downloadable PDF résumé link (opens or downloads a local PDF asset)
- ≥2 AI-generated images with descriptive `alt` text; AI tool documented in comments
- At least 3 visually separated sections on the page
- Responsive layout (inherits global breakpoints from `MainLayout` / `index.css`)
- Custom CSS only — no third-party UI or CSS frameworks
- Icons via `lucide-react` (already installed)

### Out of Scope
- Contact form (belongs to `contact-page.feature.md`)
- Editable or dynamic content fetched from Supabase (read-only static data)
- Authentication or auth-gated content on this page
- Animations beyond simple CSS transitions
- CSS frameworks (Tailwind, Bootstrap, MUI, etc.)
- Online résumé builder integrations

---

## Requirements Breakdown & User Flow

### Visitor portfolio flow

1. Visitor clicks "Portfolio" in the nav or navigates to `/#/portfolio`
2. `MainLayout` renders — `Header` and `Footer` are present
3. `Portfolio` page content loads in the `<main>` slot
4. Visitor sees a page heading and optionally an AI-generated banner image
5. Visitor scrolls through Education → Work Experience → Projects
6. Visitor clicks the "Download Résumé" button — PDF opens/downloads in a new tab
7. Project images and AI-generated decorative images are visible throughout

---

## Interfaces Involved

### Components

| Component | File path | Responsibility |
|---|---|---|
| `Portfolio` | `src/pages/Portfolio.jsx` | Page root — composes all portfolio sections |
| `TimelineEntry` | Local component in `Portfolio.jsx` | Reusable entry: dates, title, org/institution, description |
| `ProjectCard` | Local component in `Portfolio.jsx` | Reusable card: image, name, tech tags, description |

### Styles

| File | Scope |
|---|---|
| `src/pages/Portfolio.css` | Page-level layout: section spacing, timeline, project grid |

### Assets

| Asset | Path | Notes |
|---|---|---|
| AI image 1 | `src/assets/portfolio-banner.png` (or `.webp`) | AI-generated; used as page banner or section header |
| AI image 2 | `src/assets/portfolio-avatar.png` (or `.webp`) | AI-generated; avatar or decorative element alongside résumé download |
| Project image(s) | `src/assets/project-*.png` | Screenshots or representative images per project |
| PDF résumé | `public/resume.pdf` | Placed in `public/` so Vite serves it at `/resume.pdf`; opens in new tab |

> **AI tool used:** Images generated with [ChatGPT / DALL·E 3](https://chatgpt.com) (or substitute the actual tool used). Document the prompt(s) in a comment inside `Portfolio.jsx` above each `<img>` tag.

---

## Data, Validations & Expected Behavior

### Education section
- Section heading is visible (e.g. "Education")
- Contains **at least 1** entry; entries ordered most-recent first
- Each entry displays:
  - Institution name (e.g. "Université du Québec")
  - Degree or program name (e.g. "DEC — Computer Science Technology")
  - Start and end dates (e.g. "2023 – 2026" or "Jan 2023 – May 2026")
- No interactive elements required; purely presentational

### Work Experience section
- Section heading is visible (e.g. "Work Experience")
- Contains **at least 1** entry; entries ordered most-recent first
- Each entry displays:
  - Job title / role (e.g. "Front-End Developer Intern")
  - Organization name (e.g. "Acme Corp")
  - Start and end dates
  - Description of responsibilities or achievements (minimum 1 sentence; bullet points or paragraph)
- No form inputs or Supabase calls

### Projects section
- Section heading is visible (e.g. "Projects" or "Portfolio")
- Contains **at least 1** project card
- Each card displays:
  - Project name
  - List of technologies used (e.g. "React, Supabase, CSS")
  - Description explaining what the project does and its purpose (minimum 2 sentences)
  - An image (`<img>`) with a non-empty `alt` attribute — may be a screenshot, mockup, or AI-generated illustration
- Cards are displayed in a grid or column layout (not a plain `<ul>`)

### Downloadable PDF résumé
- A clearly labelled button or link exists on the page (e.g. "Download Résumé" or "Download CV")
- The link targets `public/resume.pdf` (served at `/resume.pdf` by Vite/GitHub Pages)
- The link uses `target="_blank" rel="noopener noreferrer"` and the `download` attribute so it opens/saves in a new tab
- If the PDF is not yet ready, a placeholder link with `href="#"` and a visible "(coming soon)" label is acceptable

### AI-generated images
- At least **2** images on the page are AI-generated
- Each has a non-empty, descriptive `alt` attribute
- Images are `max-width: 100%` and do not overflow their container on any viewport
- The AI tool and prompt are documented in a comment above each `<img>` tag in `Portfolio.jsx`

### Visual separation
- The page has at least **3 distinct sections** (Education, Work Experience, Projects counts as 3)
- Sections are separated by one or more of: padding/margin gap, background color change, or a horizontal divider

### Responsive behavior
- Project cards stack to a single column on mobile (≤768px)
- Timeline entries remain readable and do not overflow on narrow viewports
- Images scale correctly (`max-width: 100%`) on all screen sizes
- Text is readable without zooming or horizontal scrolling

---

## Acceptance Criteria

### Route
- [ ] Navigating to `/#/portfolio` renders the Portfolio page inside `MainLayout`
- [ ] "Portfolio" nav link in Header is highlighted as active on this page

### Education section
- [ ] Section has a visible heading containing "Education" or equivalent
- [ ] At least 1 entry is rendered
- [ ] Each entry shows institution name, degree/program, and dates
- [ ] Entries are in reverse-chronological order (most recent at the top)

### Work Experience section
- [ ] Section has a visible heading containing "Experience" or "Work" or equivalent
- [ ] At least 1 entry is rendered
- [ ] Each entry shows role/title, organization, dates, and a description
- [ ] Description contains at least one sentence about responsibilities or achievements
- [ ] Entries are in reverse-chronological order

### Projects section
- [ ] Section has a visible heading containing "Projects" or "Portfolio" or equivalent
- [ ] At least 1 project card is rendered
- [ ] Each card shows project name, technologies used, a description of at least 2 sentences, and an image with alt text
- [ ] Cards are displayed in a grid or card layout (not a plain `<ul>`)

### Downloadable PDF
- [ ] A "Download Résumé" (or equivalent) button or link is visible on the page
- [ ] Clicking it opens `resume.pdf` in a new tab or triggers a download
- [ ] The link has `target="_blank"` and `rel="noopener noreferrer"`

### AI-generated images
- [ ] At least 2 images on the page are AI-generated
- [ ] Each AI image has a non-empty `alt` attribute
- [ ] The AI tool used is documented in a comment in `Portfolio.jsx` above each image
- [ ] Images do not overflow their container on desktop or mobile

### Layout & responsiveness
- [ ] Page has at least 3 visually distinct sections
- [ ] Sections are separated by padding, background differences, or a divider
- [ ] Project cards stack vertically on mobile (≤768px)
- [ ] No horizontal scrollbar appears at any viewport width from 320px upward
- [ ] Timeline entries are readable on mobile without truncation or overflow
