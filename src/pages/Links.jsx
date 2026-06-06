import { ExternalLink } from 'lucide-react'
import w3schoolsImg from '../assets/w3schools.png'
import codeboxxImg from '../assets/codeboxx.png'
import codeacademyImg from '../assets/codeacademy.png'
import './Links.css'

const RESOURCE_LINKS = [
  {
    title: 'W3Schools JavaScript',
    description:
      'Comprehensive JavaScript reference and tutorials covering syntax, DOM manipulation, events, and modern ES6+ features — great for quick lookups and hands-on examples.',
    url: 'https://www.w3schools.com/js/',
    image: w3schoolsImg,
    imageAlt: 'W3Schools JavaScript tutorials and reference',
  },
  {
    title: 'Codeboxx Academy',
    description:
      'The coding bootcamp where it all started. Intensive full-stack training covering web development fundamentals through advanced MERN stack applications.',
    url: 'https://academy.codeboxx.com/',
    image: codeboxxImg,
    imageAlt: 'Codeboxx Academy coding bootcamp',
  },
  {
    title: 'Codecademy — Introduction to JavaScript',
    description:
      'Interactive JavaScript course covering variables, functions, loops, arrays, and objects. A beginner-friendly way to build a solid programming foundation.',
    url: 'https://www.codecademy.com/learn/introduction-to-javascript',
    image: codeacademyImg,
    imageAlt: 'Codecademy Introduction to JavaScript course',
  },
]

const PROFILE_LINKS = [
  { title: 'GitHub', url: 'https://github.com/Kazzy96' },
  { title: 'LinkedIn', url: 'https://linkedin.com/in/kazzy96' },
  { title: 'Portfolio Source', url: 'https://github.com/Kazzy96/Kazzy96.github.io' },
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
        <h1 className="links-title">Links</h1>
        <p className="links-subtitle">
          A curated collection of profiles, projects, and resources worth visiting.
        </p>
      </div>

      <div className="links-grid">
        {RESOURCE_LINKS.map((link) => (
          <LinkCard key={link.url} {...link} />
        ))}
      </div>

      <div className="profile-links">
        {PROFILE_LINKS.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link-btn"
          >
            {link.title} <ExternalLink size={12} />
          </a>
        ))}
      </div>

    </div>
  )
}
