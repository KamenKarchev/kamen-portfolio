import { NAV_LINKS } from '../data/content'
import LightSwitch from './LightSwitch'

export default function Nav({ theme, toggleTheme }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <div className="brand-wrap">
          <div className="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18V6"/><path d="M6 12h4"/>
              <path d="M14 6v12"/><path d="M14 12l4-6"/><path d="M14 12l4 6"/>
            </svg>
          </div>
          <div>
            <strong>Kamen Karchev</strong>
            <span>Portfolio — editorial</span>
          </div>
        </div>
        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <LightSwitch theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  )
}
