import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.search, location.hash])

  // Close mobile nav on click outside, scroll, resize, or escape key
  useEffect(() => {
    if (!mobileOpen) return

    const initialScrollY = window.scrollY

    const handleScroll = () => {
      if (Math.abs(window.scrollY - initialScrollY) > 8) {
        setMobileOpen(false)
      }
    }

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 960) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header ref={navRef} className={`navbar${scrolled || mobileOpen ? ' scrolled' : ''}`}>
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

      {mobileOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
