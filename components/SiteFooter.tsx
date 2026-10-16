import Link from 'next/link'
import { profile } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-rule" />
      <div className="footer-inner">
        <Link href="/" className="footer-name">Cecilia Paolini<span>.</span></Link>
        <p>Data, models, and real-world decisions.</p>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        <small>© {new Date().getFullYear()} Cecilia Paolini</small>
      </div>
    </footer>
  )
}
