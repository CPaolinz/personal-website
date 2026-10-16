'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Cecilia Paolini home" onClick={() => setMenuOpen(false)}>
          Cecilia Paolini<span className="wordmark-period">.</span>
        </Link>
        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={`main-nav${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`)) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-contact" href="/contact" onClick={() => setMenuOpen(false)}>
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
