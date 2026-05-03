import { Link } from 'react-router-dom'
import LightSwitch from './LightSwitch'
import LanguageSwitch from './LanguageSwitch'

export default function Nav({ theme, toggleTheme, language, onLanguageChange, copy, languageCopy }) {
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
            <strong>{copy.brandName}</strong>
            <span>{copy.brandTagline}</span>
          </div>
        </div>
        <nav className="nav-links" aria-label="Primary">
          {copy.links.map(l =>
            l.to != null ? (
              <Link key={l.to + l.label} to={l.to}>{l.label}</Link>
            ) : (
              <a key={l.href} href={l.href}>{l.label}</a>
            ),
          )}
        </nav>
        <div className="nav-controls">
          <LanguageSwitch
            language={language}
            onLanguageChange={onLanguageChange}
            copy={languageCopy}
          />
          <LightSwitch theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  )
}
