import { useState } from 'react'
import './Portfolio.css'

const CATEGORIES = ['All Projects', 'Frontend', 'Full-Stack', 'Backend', 'Mobile']

const EDUCATION = [
  {
    school: 'CodeBoxx Academy',
    degree: 'Full-Stack Web Development',
    period: '2023 – 2024',
    description: 'Intensive full-stack bootcamp covering JavaScript, React, Node.js, databases, and agile development practices.',
  },
  {
    school: 'University of Central Florida',
    degree: 'Bachelor of Science in Finance',
    period: 'Class of 2019',
    description: 'Graduated with a B.S. in Finance, building a strong foundation in financial analysis, markets, and business strategy.',
  },
]

const WORK = [
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2026 – Present',
    description: 'Building modern web applications and personal projects using React, Supabase, and Vite.',
  },
  {
    company: '360 Advanced',
    role: 'Cybersecurity Auditor',
    period: 'April 2024 – February 2026',
    description:
      'Conducted rigorous information security audits for clients across multiple industries, specializing in HITRUST CSF and SOC 2 Type I & II examinations. Assessed control environments against established frameworks, identified gaps, and collaborated with client teams to remediate findings. Delivered detailed audit reports and management letters to executive stakeholders, ensuring compliance with regulatory and contractual requirements.',
  },
]

const PROJECTS = [
  {
    name: 'Rocket Elevators Website (Static Front-End)',
    category: 'Frontend',
    description:
      'Rebuilt static website from legacy Smarty template to modern HTML/CSS with brand identity.',
    image: '/rocket-elevators.png',
    link: null,
  },
  {
    name: 'Elevator Quote Form',
    category: 'Frontend',
    description:
      'Dynamic pricing calculator with Bootstrap and JavaScript for elevator installations.',
    image: '/elevator-quote.png',
    link: 'https://github.com/Kazzy96/Module-2',
  },
  {
    name: 'Introduction to Node.js & Express',
    category: 'Backend',
    description:
      'First backend server with Express, learning RESTful APIs and client-server architecture. Used Postman to test and validate API endpoints throughout development.',
    image: '/nodejs-express.png',
    link: null,
  },
  {
    name: 'Blog Platform',
    category: 'Full-Stack',
    description:
      'MERN blog with user authentication, role-based access, post management, and comments.',
    image: '/blog-platform.png',
    link: 'https://github.com/Kazzy96/Module-9',
  },
  {
    name: 'ChoreBoard',
    category: 'Full-Stack',
    description:
      'Household chore distribution and tracking app — assign tasks to members, monitor progress, and keep everyone accountable.',
    image: '/choreboard.png',
    link: 'https://github.com/Kazzy96/Chore-Chart',
  },
]

function ProjectCard({ name, description, image, link }) {
  return (
    <div className="project-card">
      <h3 className="project-name">{name}</h3>
      <div className="project-image-wrap">
        {image ? (
          <img src={image} alt={`Screenshot of ${name}`} className="project-img" />
        ) : (
          <div
            className="img-placeholder"
            role="img"
            aria-label={`${name} — screenshot coming soon`}
          />
        )}
      </div>
      <div className="project-info">
        <p className="project-desc">{description}</p>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
            View Details →
          </a>
        ) : (
          <span className="project-link project-link--disabled">View Details →</span>
        )}
      </div>
    </div>
  )
}

/* ── Page ── */

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All Projects')

  const filtered =
    activeFilter === 'All Projects'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <div className="portfolio">

      {/* ── Page header ── */}
      <div className="portfolio-header">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-subtitle">
          Showcasing web development projects built with modern technologies and AI-assisted development practices.
        </p>
      </div>

      {/* ── Filter bar ── */}
      <div className="portfolio-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${activeFilter === cat ? ' filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Projects banner ── */}
      <img src="/portfolio-banner.png" alt="Portfolio" className="section-banner" />

      {/* ── Projects grid ── */}
      <div className="projects-grid">
        {filtered.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>

      {/* ── Education ── */}
      <section className="cv-section">
        <img src="/education-banner.png" alt="Education" className="section-banner" />
        <h2 className="cv-section-title">Education</h2>
        {EDUCATION.map((e) => (
          <div key={e.school} className="cv-card">
            <div className="cv-card-header">
              <div>
                <h3 className="cv-card-name">{e.school}</h3>
                <p className="cv-card-sub">{e.degree}</p>
              </div>
              <span className="cv-card-period">{e.period}</span>
            </div>
            <p className="cv-card-desc">{e.description}</p>
          </div>
        ))}
      </section>

      {/* ── Work Experience ── */}
      <section className="cv-section">
        <h2 className="cv-section-title">Work Experience</h2>
        {WORK.map((w) => (
          <div key={w.company} className="cv-card">
            <div className="cv-card-header">
              <div>
                <h3 className="cv-card-name">{w.company}</h3>
                <p className="cv-card-sub">{w.role}</p>
              </div>
              <span className="cv-card-period">{w.period}</span>
            </div>
            <p className="cv-card-desc">{w.description}</p>
          </div>
        ))}
      </section>

      {/* ── Download Resume ── */}
      <div className="resume-download">
        <a href="/Resume.pdf" download="KazzyResume.pdf" className="resume-download-btn">
          ⬇ Download Resume (PDF)
        </a>
      </div>

    </div>
  )
}
