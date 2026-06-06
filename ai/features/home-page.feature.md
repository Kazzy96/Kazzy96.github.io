# Home Page — Feature Specification

> Must be read alongside `./ai/ai-spec.md` (Global AI Spec).

---

## Feature Goal

Deliver the public-facing landing page at `/`. It introduces the student by name and role, showcases at least three technical skills and three soft skills (each with an icon and supporting text), and includes at least two AI-generated images relevant to the theme. Sections are visually distinct and the page is fully responsive.

---

## Scope

### In Scope
- Route `/` renders `<Home>` inside `MainLayout`
- Introduction section: name, role/tagline, introductory paragraph
- Technical skills section: ≥3 skills, each with an icon and descriptive text, organized in a card/grid layout
- Soft skills / talents section: ≥3 skills, each with an icon and descriptive text, organized in a card/grid layout
- ≥2 AI-generated images placed in appropriate sections, with `alt` text
- Documentation of the AI tool used to generate images (inline comment or this spec)
- At least 3 visually separated sections on the page
- Responsive layout (inherits global breakpoints from `MainLayout` / `index.css`)
- Custom CSS only — no third-party UI or CSS frameworks
- Icons via `lucide-react` (already installed)

### Out of Scope
- Contact form (belongs to `contact-page.feature.md`)
- Portfolio / work history content (belongs to `portfolio-page.feature.md`)
- Any backend calls or Supabase reads
- Animation libraries beyond simple CSS transitions
- Testimonials, blog posts, or dynamic/fetched content

---

## Requirements Breakdown & User Flow

### Visitor landing flow

1. Visitor navigates to `https://kazzy96.github.io` (or `/#/`)
2. `MainLayout` renders — `Header` and `Footer` are present
3. `Home` page content loads in the `<main>` slot
4. Visitor sees the Introduction section first (name, title, paragraph)
5. Visitor scrolls to Technical Skills — reads skill cards with icons and descriptions
6. Visitor scrolls to Soft Skills — reads talent cards with icons and descriptions
7. AI-generated images appear in contextually relevant sections

---

## Interfaces Involved

### Components

| Component | File path | Responsibility |
|---|---|---|
| `Home` | `src/pages/Home.jsx` | Page root — composes all home sections |
| `SkillCard` | `src/components/home/SkillCard.jsx` | Reusable card: icon + title + description |

### Styles

| File | Scope |
|---|---|
| `src/pages/Home.css` | Page-level layout: section spacing, grid, separators |

### Assets

| Asset | Path | Notes |
|---|---|---|
| AI image 1 | `src/assets/home-hero.png` (or `.webp`) | AI-generated; placed in Introduction or hero area |
| AI image 2 | `src/assets/home-skills.png` (or `.webp`) | AI-generated; placed in skills area or between sections |

> **AI tool used:** Images generated with [ChatGPT / DALL·E 3](https://chatgpt.com) (or substitute the actual tool used). Document the prompt(s) in a comment inside `Home.jsx` above the `<img>` tags.

---

## Data, Validations & Expected Behavior

### Introduction section
- Displays the student's full name in a prominent heading (`<h1>` or visually equivalent)
- Displays a role, title, or tagline (e.g. "Web Developer", "Creative Designer") as a subtitle
- Displays a brief introductory paragraph (2–5 sentences) describing who the student is
- At least one AI-generated image is present in or adjacent to this section
- No form inputs or interactive elements in this section

### Technical Skills section
- Contains **at least 3** skill entries
- Each skill entry includes:
  - A `lucide-react` icon (or equivalent SVG) representing the skill
  - A skill name / title (e.g. "React", "CSS", "Git")
  - A short descriptive text (minimum one full sentence — not just the skill name alone)
- Skills are displayed in a grid or card layout (not a plain unordered list)
- Section has a visible heading (e.g. "Technical Skills")

### Soft Skills / Talents section
- Contains **at least 3** soft skill or talent entries
- Each entry includes:
  - A `lucide-react` icon representing the trait
  - A trait name / title (e.g. "Communication", "Problem Solving")
  - A short descriptive text (minimum one full sentence)
- Skills are displayed in a grid or card layout matching the technical skills layout
- Section has a visible heading (e.g. "Soft Skills" or "Talents")

### AI-generated images
- At least **2** images on the page are AI-generated
- Each image has a non-empty, descriptive `alt` attribute
- Images are `max-width: 100%` and do not overflow their container on any viewport
- The AI tool and prompt(s) are documented in a comment directly above each `<img>` tag in `Home.jsx`

### Visual separation
- The page has at least **3 distinct sections** (Introduction, Technical Skills, Soft Skills counts as 3)
- Sections are separated by one or more of: padding/margin gap, background color change, or a horizontal rule/divider element

### Responsive behavior
- Skill cards stack to a single column on mobile (≤768px)
- Images scale correctly and do not cause horizontal overflow
- Text is readable without zooming or horizontal scrolling
- Section headings and body text scale per global typography rules in `index.css`

---

## Acceptance Criteria

### Route
- [ ] Navigating to `/#/` renders the Home page inside `MainLayout` (Header + Footer visible)
- [ ] Clicking the logo in the Header from any other page navigates back to `/#/`

### Introduction section
- [ ] Student's name is visible in a prominent heading
- [ ] A role, title, or tagline is visible below or near the name
- [ ] An introductory paragraph of at least 2 sentences is present
- [ ] At least one AI-generated image is present in or near this section with a non-empty `alt` attribute

### Technical Skills section
- [ ] Section has a heading containing "Technical" or "Skills" (or equivalent)
- [ ] At least 3 skill cards are rendered
- [ ] Each card contains an icon, a skill name, and at least one sentence of descriptive text
- [ ] Cards are displayed in a grid or card layout (not a plain `<ul>`)

### Soft Skills section
- [ ] Section has a heading containing "Soft" or "Talent" or equivalent
- [ ] At least 3 soft skill cards are rendered
- [ ] Each card contains an icon, a trait name, and at least one sentence of descriptive text
- [ ] Cards use the same grid/card layout pattern as the Technical Skills section

### AI-generated images
- [ ] At least 2 images on the page are AI-generated
- [ ] Each AI image has a non-empty `alt` attribute
- [ ] The AI tool used is documented in a comment in `Home.jsx` above each image
- [ ] Images do not overflow their container on desktop or mobile

### Layout & responsiveness
- [ ] Page has at least 3 visually distinct sections
- [ ] Sections are separated by padding, background differences, or a divider
- [ ] Skill cards stack vertically on mobile (≤768px)
- [ ] No horizontal scrollbar appears at any viewport width from 320px upward
