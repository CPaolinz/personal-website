import Link from 'next/link'
import { skillGroups, education, profile } from '@/lib/content'
import { LogoBadge } from '@/components/LogoBadge'

export const metadata = {
  title: 'About',
  description: 'About Cecilia Paolini, a data scientist working across quantitative finance and mining technology.',
}

export default function AboutPage() {
  return (
    <div className="page-wrap inner-page">
      <section className="page-intro about-intro">
        <p className="eyebrow">About / Approach</p>
        <h1>Curious by nature.<br /><em>Analytical by training.</em></h1>
        <p>I work where data meets decisions. My background in mathematical engineering and applied data science has taken me from financial risk research and impact investing to building operational tools for underground mining.</p>
      </section>
      <section className="about-statement">
        <span className="statement-mark">“</span>
        <p>I’m interested in turning technical depth into something people can actually use: a model that answers a meaningful question, a clear view of complex data, or a product that helps a team make a better decision.</p>
      </section>
      <section className="skills-section">
        <div className="section-side-label"><span>01</span><h2>Toolbox</h2></div>
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <div className="skill-group" key={group.title}>
              <p className="eyebrow">0{index + 1}</p><h3>{group.title}</h3><div className="skill-pills">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="language-row">
        <div className="section-side-label"><span>02</span><h2>Languages</h2></div>
        <div className="language-items"><div><b>Italian</b><span>Native</span></div><div><b>English</b><span>Fluent</span></div></div>
      </section>
      <section className="about-education">
        <div className="section-side-label"><span>03</span><h2>Education</h2></div>
        <div className="education-list">
          {education.map((item) => <div className="education-item" key={item.institution}><LogoBadge src={item.logo} alt={item.institution} initials={item.initials} href={item.logoUrl} size="large" /><div className="education-item-content"><h3>{item.qualification}</h3><p>{item.institution}</p><span>{item.dates}</span><div className="education-details">{item.details.map((detail) => <p className="education-detail" key={detail.label}><strong>{detail.label}:</strong> {detail.text}</p>)}</div></div></div>)}
        </div>
      </section>
      <section className="closing-cta about-cta">
        <div><p className="eyebrow">In the spirit of collaboration</p><h2>Let’s make something<br /><em>useful.</em></h2></div>
        <div className="closing-cta-right"><p>For research, projects, or an interesting problem, the simplest way to reach me is by email.</p><a href={`mailto:${profile.email}`} className="button button-dark">Email Cecilia <span aria-hidden="true">↗</span></a><Link className="text-link" href="/contact">Other ways to connect <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  )
}
