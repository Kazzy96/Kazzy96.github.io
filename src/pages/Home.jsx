import { Code2, Palette, GitBranch, Lightbulb, MessageCircle, Zap } from 'lucide-react'
import './Home.css'

const TECH_SKILLS = [
  {
    Icon: Code2,
    title: 'React & JavaScript',
    description:
      'Building dynamic, component-based UIs with React and modern ES6+ JavaScript for fast, maintainable web applications.',
  },
  {
    Icon: Palette,
    title: 'CSS & Responsive Design',
    description:
      'Crafting pixel-perfect, responsive layouts using custom CSS, flexbox, and grid — no frameworks needed.',
  },
  {
    Icon: GitBranch,
    title: 'Git & Version Control',
    description:
      'Managing codebases with Git and GitHub, including branching strategies, pull requests, and CI/CD workflows.',
  },
]

const SOFT_SKILLS = [
  {
    Icon: Lightbulb,
    title: 'Problem Solving',
    description:
      'Breaking down complex challenges into manageable steps and finding creative, efficient solutions under pressure.',
  },
  {
    Icon: MessageCircle,
    title: 'Communication',
    description:
      'Translating technical concepts into clear language for both technical and non-technical audiences.',
  },
  {
    Icon: Zap,
    title: 'Adaptability',
    description:
      'Quickly learning new tools, frameworks, and workflows to stay current in a fast-moving industry.',
  },
]

function SkillCard({ Icon, title, description }) {
  return (
    <div className="skill-card">
      <div className="skill-icon">
        <Icon size={28} />
      </div>
      <h3 className="skill-title">{title}</h3>
      <p className="skill-desc">{description}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="home">

      {/* ── Introduction ── */}
      <section className="home-intro">
        <div className="intro-text">
          <p className="intro-label">Hi, I&apos;m</p>
          <h1 className="intro-name">Kazzy</h1>
          <p className="intro-role">Full-Stack Web Developer</p>
          <p className="intro-bio">
            I&apos;m a passionate web developer with a love for building clean,
            accessible, and responsive applications. I enjoy turning ideas into
            polished digital experiences — from database design all the way to
            pixel-perfect UIs.
          </p>
        </div>
        <div className="intro-image">
          {/* TODO: Replace div below with an <img> once AI image is ready.
              Suggested prompt: "digital portrait of a young web developer at a desk,
              code on screen, purple accent lighting, minimal flat-design style" */}
          <div className="img-placeholder" role="img" aria-label="AI-generated hero image — coming soon">
            AI image coming soon
          </div>
        </div>
      </section>

      {/* ── Technical Skills ── */}
      <section className="home-section">
        <h2 className="section-heading">Technical Skills</h2>
        <div className="skills-grid">
          {TECH_SKILLS.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      {/* ── Soft Skills ── */}
      <section className="home-section home-section--alt">
        <h2 className="section-heading">Soft Skills &amp; Talents</h2>
        {/* TODO: Replace div below with an <img> once AI image is ready.
            Suggested prompt: "abstract illustration of collaboration and creativity,
            pastel purple tones, minimal flat design" */}
        <div className="img-placeholder img-placeholder--wide" role="img" aria-label="AI-generated skills illustration — coming soon">
          AI image coming soon
        </div>
        <div className="skills-grid">
          {SOFT_SKILLS.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

    </div>
  )
}
