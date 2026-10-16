import Image from 'next/image'
import Link from 'next/link'
import { LogoBadge } from '@/components/LogoBadge'
import { FocusIcon } from '@/components/FocusIcon'
import { ProjectArt } from '@/components/ProjectArt'
import { SectionHeading } from '@/components/SectionHeading'
import { education, experiences, profile, projects } from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <section className="hero page-wrap">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{profile.tagline}</p>
          <h1>Turning data into decisions for a <em>smarter mining future.</em></h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <Link href="/projects" className="button button-dark">View projects <span aria-hidden="true">↗</span></Link>
            <Link href="/contact" className="button button-outline">Get in touch</Link>
          </div>
          <div className="hero-note"><span className="note-rule" /> <span>Curiosity-led. Evidence-driven. Built for real-world impact.</span></div>
        </div>
        <div className="hero-visual-wrap">
          <div className="hero-visual">
            <Image src={profile.photo} alt="Cecilia Paolini" fill priority unoptimized sizes="(max-width: 850px) 100vw, 45vw" className="hero-image" />
            <div className="image-index"><span>CECILIA PAOLINI</span><span>DATA · RESEARCH · PRODUCT</span></div>
          </div>
          <div className="hero-image-caption"><span>Curiosity, translated into useful work</span><span className="caption-line" /></div>
        </div>
      </section>

      <section className="capabilities-strip" aria-label="Areas of focus">
        <div className="capability"><span className="capability-icon"><FocusIcon kind="data" /></span><span>Data science<br />&amp; modelling</span></div>
        <div className="capability"><span className="capability-icon"><FocusIcon kind="finance" /></span><span>Quantitative<br />finance</span></div>
        <div className="capability"><span className="capability-icon"><FocusIcon kind="optimisation" /></span><span>Optimisation<br />&amp; scheduling</span></div>
        <div className="capability"><span className="capability-icon"><FocusIcon kind="product" /></span><span>Product &amp;<br />analytics</span></div>
      </section>

      <section className="home-section page-wrap" id="selected-work">
        <SectionHeading
          eyebrow="Selected work · 01—03"
          title="Projects with a purpose."
          description="A selection of work spanning operational technology, quantitative research, and portfolio optimisation."
          action={{ href: '/projects', label: 'All projects' }}
        />
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="project-art-link" aria-label={`View ${project.title}`}>
                <ProjectArt kind={project.art} />
              </Link>
              <div className="project-card-body">
                <div className="project-card-meta"><span>{project.number}</span><span>{project.category}</span></div>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <div className="tag-row">{project.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <Link className="text-link project-card-link" href={`/projects/${project.slug}`}>Explore project <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-preview">
        <div className="page-wrap">
          <SectionHeading
            eyebrow="Experience"
            title="A path across disciplines."
            description="From consulting and impact investing to financial risk analytics and mining technology."
            action={{ href: '/experience', label: 'Full experience' }}
          />
          <div className="preview-timeline">
            {experiences.map((item, index) => (
              <div className="preview-role" key={item.company}>
                <div className="preview-date">{item.dates}</div>
                <div className="timeline-marker"><span /></div>
                <div className="preview-role-main">
                  <LogoBadge src={item.logo} alt={item.company} initials={item.initials} href={item.logoUrl} tone={item.tone} />
                  <div><h3>{item.role}</h3><p className="role-company">{item.company}{item.location ? ` · ${item.location}` : ''}</p><p className="preview-summary">{item.summary}</p></div>
                </div>
                {index < experiences.length - 1 && <div className="preview-line" />}
              </div>
            ))}
          </div>
          <div className="preview-bottom-link"><Link href="/experience" className="text-link">Read all responsibilities <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="education-strip page-wrap">
        <div className="education-intro">
          <p className="eyebrow">Education</p>
          <h2>Grounded in<br /><em>mathematics.</em></h2>
          <Link href="/experience#education" className="text-link">Education &amp; research <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="education-list compact-education">
          {education.map((item) => (
            <div className="education-item" key={item.institution}>
              <LogoBadge src={item.logo} alt={item.institution} initials={item.initials} href={item.logoUrl} size="large" />
              <div className="education-item-content"><h3>{item.qualification}</h3><p>{item.institution}</p><span>{item.dates}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="closing-cta page-wrap" id="contact">
        <div><p className="eyebrow">Start a conversation</p><h2>Have a thoughtful problem<br />to solve?</h2></div>
        <div className="closing-cta-right"><p>I’m always glad to connect about data, research, and building useful things.</p><Link href="/contact" className="button button-dark">Get in touch <span aria-hidden="true">↗</span></Link></div>
      </section>
    </>
  )
}
