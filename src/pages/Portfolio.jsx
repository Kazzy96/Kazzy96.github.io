import { GraduationCap, Briefcase, FolderGit2, Download, CalendarDays } from 'lucide-react'
import './Portfolio.css'

const EDUCATION = [
  {
    institution: "Cégep de l'Outaouais",
    program: 'Computer Science Technology (DEC)',
    dates: '2023 – 2026',
    description:
      'Specializing in web development, databases, object-oriented programming, and software design principles.',
  },
]

const WORK_EXPERIENCE = [
  {
    role: 'Web Developer — Personal Projects',
    organization: 'Self-Employed',
    dates: '2024 – Present',
    bullets: [
      'Designed and built responsive web applications using React, Vite, and custom CSS.',
      'Integrated Supabase for authentication, real-time data, and row-level security.',
      'Set up CI/CD pipelines with GitHub Actions to deploy automatically to GitHub Pages.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'Kazzy96 Portfolio',
    tech: 'React · Vite · Supabase · CSS · GitHub Actions',
    description:
      'A personal portfolio website built to showcase skills, projects, and professional experience. ' +
      'Features a public contact form that persists messages to a Supabase database and a ' +
      'password-protected back-office dashboard for managing inbound messages, with automatic ' +
      'deployment to GitHub Pages on every push to main.',
    image: null, // TODO: replace null with imported project screenshot
  },
]

/* ── Local components ── */

function TimelineEntry({ icon: Icon, title, subtitle, dates, description, bullets }) {
  return (
    <div className="timeline-entry">
      <div className="timeline-icon">
        <Icon size={20} />
      </div>
      <div className="timeline-body">
        <div className="timeline-header">
          <div>
            <h3 className="timeline-title">{title}</h3>
            <p className="timeline-subtitle">{subtitle}</p>
          </div>
          <span className="timeline-dates">
            <CalendarDays size={14} />
            {dates}
          </span>
        </div>
        {description && <p className="timeline-desc">{description}</p>}
        {bullets && (
          <ul className="timeline-bullets">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ name, tech, description, image }) {
  return (
    <div className="project-card">
      <div className="project-image-wrap">
        {image ? (
          <img src={image} alt={`Screenshot of ${name}`} className="project-img" />
        ) : (
          /* TODO: Replace this div with <img> once project screenshot is ready.
             Suggested prompt: "clean screenshot mockup of a React portfolio website
             with purple accent colours, dark header, card-based layout" */
          <div
            className="img-placeholder"
            role="img"
            aria-label={`${name} — project screenshot coming soon`}
          >
            AI image coming soon
          </div>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-name">{name}</h3>
        <p className="project-tech">{tech}</p>
        <p className="project-desc">{description}</p>
      </div>
    </div>
  )
}

/* ── Page ── */

export default function Portfolio() {
  return (
    <div className="portfolio">

      {/* ── Page header ── */}
      <div className="portfolio-header">
        <div className="portfolio-header-text">
          {/* TODO: Replace div below with <img> once AI image is ready.
              Suggested prompt: "minimalist abstract banner representing a developer's
              career journey, purple gradient, geometric shapes, flat design" */}
          <div
            className="img-placeholder img-placeholder--banner"
            role="img"
            aria-label="AI-generated portfolio banner — coming soon"
          >
            AI image coming soon
          </div>
          <h1 className="portfolio-title">Portfolio</h1>
          <p className="portfolio-subtitle">
            Education, experience, and projects — all in one place.
          </p>
        </div>
        {/* TODO: add resume.pdf to public/ then remove the aria-disabled attribute */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="resume-btn"
          aria-label="Download PDF résumé (coming soon)"
          onClick={(e) => { if (!false) { e.preventDefault() } }}
          aria-disabled="true"
        >
          <Download size={18} />
          Download Résumé <span className="coming-soon">(coming soon)</span>
        </a>
      </div>

      {/* ── Education ── */}
      <section className="portfolio-section">
        <h2 className="section-heading">
          <GraduationCap size={24} />
          Education
        </h2>
        <div className="timeline">
          {EDUCATION.map((e) => (
            <TimelineEntry
              key={e.institution + e.dates}
              icon={GraduationCap}
              title={e.program}
              subtitle={e.institution}
              dates={e.dates}
              description={e.description}
            />
          ))}
        </div>
      </section>

      {/* ── Work Experience ── */}
      <section className="portfolio-section portfolio-section--alt">
        <h2 className="section-heading">
          <Briefcase size={24} />
          Work Experience
        </h2>
        {/* TODO: Replace div below with <img> once AI image is ready.
            Suggested prompt: "abstract illustration of a person coding at a desk,
            purple and dark tones, minimal flat design, professional atmosphere" */}
        <div
          className="img-placeholder img-placeholder--wide"
          role="img"
          aria-label="AI-generated work experience illustration — coming soon"
        >
          AI image coming soon
        </div>
        <div className="timeline">
          {WORK_EXPERIENCE.map((e) => (
            <TimelineEntry
              key={e.role + e.dates}
              icon={Briefcase}
              title={e.role}
              subtitle={e.organization}
              dates={e.dates}
              bullets={e.bullets}
            />
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="portfolio-section">
        <h2 className="section-heading">
          <FolderGit2 size={24} />
          Projects
        </h2>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </section>

    </div>
  )
}
