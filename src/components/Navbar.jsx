import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { company, nav } from '../data/content'
import dhionLogo from '../assets/Dhion_Technologies_Logo.png'

function NavItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  const [forceClose, setForceClose] = useState(false)
  const itemRef = useRef(null)
  const location = useLocation()

  const isChildActive = Boolean(item.children?.some((child) => location.pathname === child.to))

  // Close dropdown whenever route changes
  useEffect(() => {
    setOpen(false)
    setForceClose(true)
  }, [location.pathname, location.search, location.hash])

  // Close dropdown on outside click or escape
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setOpen(false)
        setForceClose(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setForceClose(true)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

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
      ref={itemRef}
      className={`nav-item-dropdown ${open ? 'dropdown-open' : ''} ${forceClose ? 'force-close' : ''}`}
      onMouseEnter={() => setForceClose(false)}
      onMouseLeave={() => {
        setOpen(false)
        setForceClose(false)
      }}
    >
      <button
        type="button"
        className={`nav-link nav-dropdown-toggle ${open || isChildActive ? 'active' : ''}`}
        onClick={() => {
          setForceClose(false)
          setOpen((v) => !v)
        }}
        aria-expanded={open}
      >
        <span>{item.label}</span>
        <svg
          className="nav-chevron"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <ul className="nav-dropdown">
        {item.children.map((child) => (
          <li key={child.to}>
            <NavLink
              to={child.to}
              className="nav-dropdown-item"
              onClick={(e) => {
                e.currentTarget.blur()
                setOpen(false)
                setForceClose(true)
                if (onNavigate) onNavigate()
              }}
            >
              <div className="nav-dropdown-title">{child.label}</div>
              {child.description && (
                <div className="nav-dropdown-desc">{child.description}</div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navState, setNavState] = useState('top') // 'top' | 'scrolling-down' | 'scrolling-up'
  const navRef = useRef(null)
  const location = useLocation()

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileOpen(false)
    setNavState('top')
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
    let lastScrollY = Math.max(0, window.scrollY)

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)

      // When on top of screen: remove border line and blend seamlessly (all in one)
      if (currentScrollY <= 15) {
        setNavState('top')
        lastScrollY = currentScrollY
        return
      }

      const diff = currentScrollY - lastScrollY

      // Scroll down: make it transparent ("transference")
      if (diff > 6) {
        setNavState('scrolling-down')
        lastScrollY = currentScrollY
      }
      // Scroll up micro or slightly: keep AS IT NORMAL (frosted background with border line)
      else if (diff <= -2) {
        setNavState('scrolling-up')
        lastScrollY = currentScrollY
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNavClasses = () => {
    const classes = ['navbar']
    if (mobileOpen) {
      classes.push('scrolled', 'open')
    } else if (navState === 'scrolling-down') {
      classes.push('transparent')
    } else if (navState === 'scrolling-up') {
      classes.push('scrolled')
    }
    return classes.join(' ')
  }

  return (
    <>
      <header ref={navRef} className={getNavClasses()}>
        <div className="navbar-inner">
          <NavLink to="/" className="brand" onClick={() => setMobileOpen(false)} aria-label={company.name}>
            <img src={dhionLogo} alt={company.name} className="brand-logo" />
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
