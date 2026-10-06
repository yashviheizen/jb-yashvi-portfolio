import { Link, NavLink, useLocation } from 'react-router-dom'
import { contact } from '../data/projects'
import Clock from './Clock'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  // On the home page the section links scroll in place; elsewhere they return home first.
  const to = (id: string) => (onHome ? `#${id}` : `/#${id}`)
  return (
    <header className="nav">
      <div className="nav__inner wrap">
        <Link to="/" className="nav__name" aria-label="Jb Yashvi, home">
          Jb Yashvi
        </Link>
        <div className="nav__mid">
          <span className="nav__role">Product Designer</span>
          <Clock />
        </div>
        <nav aria-label="Primary">
          <ul className="nav__links">
            <li><NavLink to={to('work')}>Work</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to={to('about')}>About</NavLink></li>
            <li><NavLink to={to('contact')}>Contact</NavLink></li>
            <li>
              <a href={contact.resume} target="_blank" rel="noreferrer">
                Résumé <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
