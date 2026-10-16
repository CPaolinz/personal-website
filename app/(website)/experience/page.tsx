import Link from 'next/link'
import { LogoBadge } from '@/components/LogoBadge'
import { experiences, education } from '@/lib/content'

export const metadata = {
  title: 'Experience',
  description: 'Professional experience and education for Cecilia Paolini.',
}

export default function ExperiencePage() {
  return (
    <div className="page-wrap inner-page">
      <section className="page-intro">
        <p className="eyebrow">Experience / 2020—present</p>
        <h1>Work shaped by<br /><em>different perspectives.</em></h1>
        <p>Across data science, research, investment analysis, consulting, and product building, the thread is the same: make complex information useful.</p>
      </section>
      <section className="experience-page-section">
        <div className="section-side-label"><span>01</span><h2>Experience</h2></div>
        <div className="experience-full-list">
          {experiences.map((item, index) => (
            <article className="experience-entry" key={item.company}>
              <div className="experience-entry-top">
                <LogoBadge src={item.logo} alt={item.company} initials={item.initials} href={item.logoUrl} tone={item.tone} size="large" />
                <div className="experience-entry-title"><h3>{item.role}</h3><p>{item.company}</p></div>
                <div className="experience-entry-meta"><span>{item.dates}</span>{item.location && <span>{item.location}</span>}</div>
              </div>
              <p className="experience-summary">{item.summary}</p>
              <ul className="experience-bullets">{item.bullets.map((bullet) => { const splitAt = bullet.indexOf(':'); return <li key={bullet}>{splitAt > 0 ? <><strong>{bullet.slice(0, splitAt)}:</strong>{bullet.slice(splitAt + 1)}</> : bullet}</li> })}</ul>
              {index !== experiences.length - 1 && <div className="entry-divider" />}
            </article>
          ))}
        </div>
      </section>
      <section className="experience-page-section education-page-section" id="education">
        <div className="section-side-label"><span>02</span><h2>Education</h2></div>
        <div className="education-list education-full-list">
          {education.map((item) => (
            <article className="education-item" key={item.institution}>
              <LogoBadge src={item.logo} alt={item.institution} initials={item.initials} href={item.logoUrl} size="large" />
              <div className="education-item-content"><div className="education-title-row"><h3>{item.qualification}</h3><span>{item.dates}</span></div><p>{item.institution}</p><div className="education-details">{item.details.map((detail) => <p className="education-detail" key={detail.label}><strong>{detail.label}:</strong> {detail.text}</p>)}</div></div>
            </article>
          ))}
        </div>
      </section>
      <div className="inner-page-footer-note"><span>More about how I work</span><Link href="/about" className="text-link">About &amp; skills <span aria-hidden="true">↗</span></Link></div>
    </div>
  )
}
