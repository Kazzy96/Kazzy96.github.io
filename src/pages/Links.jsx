import { ExternalLink } from 'lucide-react'
import './Links.css'

const LINKS = [
  {
    title: 'GitHub',
    description:
      'Explore my open-source repositories and personal projects. See the code behind the work, follow along with commits, and track progress in real time.',
    url: 'https://github.com/Kazzy96',
    image: null,
    imageAlt: 'GitHub profile — code repositories and open-source projects',
    // TODO: Replace null with an imported image or AI-generated thumbnail.
    // Suggested AI prompt: "flat-design illustration of a code repository browser, dark background, purple accent, minimal style"
  },
  {
    title: 'LinkedIn',
    description:
      'Connect with me professionally on LinkedIn. View my full work history, education, endorsements, and stay updated on my career journey.',
    url: 'https://linkedin.com/in/kazzy96',
    image: null,
    imageAlt: 'LinkedIn professional profile',
    // TODO: Replace null with an imported image or AI-generated thumbnail.
    // Suggested AI prompt: "minimalist illustration of a professional networking profile card, blue and purple tones, flat design"
  },
  {
    title: 'Kazzy96 Portfolio',
    description:
      'The source code for this very portfolio site — built with React, Vite, and Supabase. A great reference for how to set up CI/CD with GitHub Actions and GitHub Pages.',
    url: 'https://github.com/Kazzy96/Kazzy96.github.io',
    image: null,
    imageAlt: 'Portfolio source code repository on GitHub',
    // TODO: Replace null with an AI-generated screenshot or project mockup.
    // Suggested AI prompt: "clean mockup of a React portfolio website with purple accent colours, card layout, dark header"
  },
]

function LinkCard({ title, description, url, image, imageAlt }) {
  return (
    <div className="link-card">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-card-image-wrap"
        tabIndex={-1}
        aria-hidden="true"
      >
        {image ? (
          <img src={image} alt={imageAlt} className="link-card-img" />
        ) : (
          <div className="links-img-placeholder" role="img" aria-label={imageAlt}>
            AI image coming soon
          </div>
        )}
      </a>
      <div className="link-card-body">
        <h3 className="link-card-title">{title}</h3>
        <p className="link-card-desc">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-card-btn"
          aria-label={`Visit ${title} (opens in new tab)`}
        >
          Visit <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}

export default function Links() {
  return (
    <div className="links-page">

      <div className="links-header">
        {/* TODO: Replace div below with <img> once AI image is ready.
            Suggested prompt: "abstract illustration of interconnected links and nodes,
            purple gradient, flat design, digital network theme" */}
        <div
          className="links-img-placeholder links-img-placeholder--banner"
          role="img"
          aria-label="AI-generated links page banner — coming soon"
        >
          AI image coming soon
        </div>
        <h1 className="links-title">Links</h1>
        <p className="links-subtitle">
          A curated collection of profiles, projects, and resources worth visiting.
        </p>
      </div>

      <div className="links-grid">
        {LINKS.map((link) => (
          <LinkCard key={link.url} {...link} />
        ))}
      </div>

    </div>
  )
}
