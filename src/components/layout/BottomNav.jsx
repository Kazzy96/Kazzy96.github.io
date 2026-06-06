import { Link, useLocation } from 'react-router-dom'
import { Home, Briefcase, Link2, Mail } from 'lucide-react'
import './BottomNav.css'

const NAV_ITEMS = [
  { label: 'Home', to: '/', Icon: Home },
  { label: 'Portfolio', to: '/portfolio', Icon: Briefcase },
  { label: 'Links', to: '/links', Icon: Link2 },
  { label: 'Contact', to: '/contact', Icon: Mail },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {NAV_ITEMS.map(({ label, to, Icon }) => (
        <Link
          key={to}
          to={to}
          className={`bottom-nav-item${pathname === to ? ' active' : ''}`}
          aria-label={label}
        >
          <Icon size={24} />
        </Link>
      ))}
    </nav>
  )
}
