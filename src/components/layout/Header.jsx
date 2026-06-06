import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Links', to: '/links' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Kazzy96 logo" className="logo" />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link${pathname === to ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
