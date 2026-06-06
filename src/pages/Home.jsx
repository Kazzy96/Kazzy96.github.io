import { useRef } from 'react'
import { Code2, Palette, GitBranch, Lightbulb, MessageCircle, Zap, Users, Clock, Target, Heart, Brain, FileCode2, Coffee, Leaf, Database, Package, Workflow, Bot, Cpu, Sparkles, ShieldCheck } from 'lucide-react'
import headshot from '../assets/headshot.jpeg'
import skillsBanner from '../assets/skills-banner.png'
import softSkillsBanner from '../assets/softskills-banner.png'
import './Home.css'

const SKILL_CATEGORIES = [
  {
    heading: 'Frontend',
    skills: [
      {
        Icon: FileCode2,
        title: 'HTML5 & Semantic Markup',
        description:
          'Writing clean, accessible HTML5 with a focus on semantic structure, SEO best practices, and WCAG-compliant markup that performs across all browsers.',
      },
      {
        Icon: Palette,
        title: 'CSS & Responsive Design',
        description:
          'Crafting pixel-perfect, responsive layouts using custom CSS, flexbox, and grid — delivering consistent experiences across all screen sizes without relying on frameworks.',
      },
      {
        Icon: Code2,
        title: 'React & JavaScript',
        description:
          'Building dynamic, component-based UIs with React and modern ES6+ JavaScript for fast, maintainable, and scalable web applications.',
      },
    ],
  },
  {
    heading: 'Backend & Data',
    skills: [
      {
        Icon: Coffee,
        title: 'Java',
        description:
          'Solid foundation in Java for building robust, type-safe server-side applications with clean object-oriented design and strong adherence to SOLID principles.',
      },
      {
        Icon: Leaf,
        title: 'Spring Boot',
        description:
          'Developing production-ready REST APIs and microservices with Spring Boot, leveraging dependency injection, Spring Data JPA, and Spring Security.',
      },
      {
        Icon: Database,
        title: 'MongoDB',
        description:
          'Designing flexible NoSQL data models and writing efficient queries with MongoDB, enabling scalable, document-oriented data storage for modern applications.',
      },
    ],
  },
  {
    heading: 'DevOps & Tooling',
    skills: [
      {
        Icon: Package,
        title: 'Docker',
        description:
          'Containerising applications with Docker to ensure consistent, reproducible environments across development, testing, and production deployments.',
      },
      {
        Icon: GitBranch,
        title: 'Git & Version Control',
        description:
          'Managing codebases with Git and GitHub, including feature-branch workflows, pull request reviews, and collaborative development best practices.',
      },
      {
        Icon: Workflow,
        title: 'CI/CD & GitHub Actions',
        description:
          'Automating build, test, and deployment pipelines with GitHub Actions to maintain code quality and enable fast, reliable continuous delivery.',
      },
    ],
  },
  {
    heading: 'AI-Assisted Development',
    skills: [
      {
        Icon: Bot,
        title: 'Claude Code',
        description:
          'Proficient in agentic coding with Claude Code — directing AI to scaffold features, refactor modules, and debug across entire codebases autonomously.',
      },
      {
        Icon: Cpu,
        title: 'OpenAI Codex',
        description:
          'Experienced with Codex-powered workflows for intelligent code generation, test scaffolding, and automated code transformations at scale.',
      },
      {
        Icon: Sparkles,
        title: 'GitHub Copilot',
        description:
          'Daily use of GitHub Copilot within VS Code to accelerate development, reduce boilerplate, and explore unfamiliar APIs with real-time AI suggestions.',
      },
    ],
  },
  {
    heading: 'Security & Compliance',
    skills: [
      {
        Icon: ShieldCheck,
        title: 'Cybersecurity Auditing',
        description:
          'Hands-on experience supporting SOC 2 and HITRUST compliance audits — assessing security controls, documenting evidence, identifying gaps, and working cross-functionally to remediate findings in line with industry frameworks.',
      },
    ],
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
  {
    Icon: Users,
    title: 'Teamwork & Collaboration',
    description:
      'Working effectively in cross-functional teams — contributing ideas, supporting teammates, and delivering shared goals.',
  },
  {
    Icon: Clock,
    title: 'Time Management',
    description:
      'Prioritising tasks, meeting deadlines, and balancing multiple projects without sacrificing quality.',
  },
  {
    Icon: Target,
    title: 'Attention to Detail',
    description:
      'Catching bugs, inconsistencies, and UX friction before they reach users — because the details matter.',
  },
  {
    Icon: Heart,
    title: 'Passion & Work Ethic',
    description:
      'Genuinely loving the craft of building software and bringing that enthusiasm to every project, big or small.',
  },
  {
    Icon: Brain,
    title: 'Critical Thinking',
    description:
      'Evaluating options objectively, questioning assumptions, and choosing the right solution rather than just the fast one.',
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

function SoftSkillCarousel({ skills }) {
  const windowRef = useRef(null)

  const slide = (dir) => {
    const el = windowRef.current
    if (!el) return
    const card = el.querySelector('.carousel-slide')
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <div className="carousel-track">
        <button className="carousel-btn" onClick={() => slide(-1)} aria-label="Previous skill">&#8249;</button>
        <div className="carousel-window" ref={windowRef}>
          <div className="carousel-strip">
            {skills.map((s) => (
              <div key={s.title} className="carousel-slide">
                <SkillCard Icon={s.Icon} title={s.title} description={s.description} />
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn" onClick={() => slide(1)} aria-label="Next skill">&#8250;</button>
      </div>
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
          <img src={headshot} alt="Kazzy — professional headshot" className="headshot-img" />
        </div>
      </section>

      {/* ── Technical Skills ── */}
      <section className="home-section">
        <h2 className="section-heading">Technical Skills</h2>
        <img
          src={skillsBanner}
          alt="Tech stack illustration — HTML, CSS, JavaScript, React, MongoDB"
          className="skills-banner"
        />
        <SoftSkillCarousel skills={SKILL_CATEGORIES.flatMap((cat) => cat.skills)} />
      </section>

      {/* ── Soft Skills ── */}
      <section className="home-section home-section--alt">
        <h2 className="section-heading">Soft Skills &amp; Talents</h2>
        <img
          src={softSkillsBanner}
          alt="Soft skills illustration — collaboration, communication, and adaptability"
          className="skills-banner"
        />
        <SoftSkillCarousel skills={SOFT_SKILLS} />
      </section>

    </div>
  )
}
