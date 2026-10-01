import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { company, nav } from '../data/content'
import logoIcon from '../assets/logo-icon.png'

function NavItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  const [forceClose, setForceClose] = useState(false)

  if (!item.children) {
    return (
      <li>
        <NavLink to={item.to} end={item.to === '/'} className="nav-link" onClick={onNavigate}>
          {item.label}
        </NavLink>
      </li>
    )
  }

  return (
    <li 
      className={`${open ? 'dropdown-open' : ''} ${forceClose ? 'force-close' : ''}`}
      onMouseEnter={() => setForceClose(false)}
    >
      <button
        type="button"
        className="nav-link"
        style={{ background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer', padding: '8px 0', color: 'inherit' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.label} ▾
      </button>
      <ul className="nav-dropdown">
        {item.children.map((child) => (
          <li key={child.to}>
            <NavLink to={child.to} onClick={() => {
              setOpen(false);
              setForceClose(true);
              if (onNavigate) onNavigate();
            }}>
              {child.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setMobileOpen(false)}>
          <img src={logoIcon} alt="" className="brand-mark" />
          {company.name}
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
          {nav.map((item) => (
            <NavItem key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
          ))}
        </ul>
      </div>
    </header>
  )
}
