import Link from 'next/link'
import { ProjectArt } from '@/components/ProjectArt'
import { projects } from '@/lib/content'

export const metadata = {
  title: 'Projects',
  description: 'Selected projects in mining technology, quantitative finance, systemic risk, and portfolio optimisation by Cecilia Paolini.',
}

export default function ProjectsPage() {
  return (
    <div className="page-wrap inner-page">
      <section className="page-intro projects-intro">
        <p className="eyebrow">Selected work / 2020—2026</p>
        <h1>Projects</h1>
        <p>A selection of projects at the intersection of data science, quantitative research, and real-world operations.</p>
      </section>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-detail" id={project.slug} key={project.slug}>
            <div className="project-detail-art"><ProjectArt kind={project.art} /></div>
            <div className="project-detail-copy">
              <div className="project-card-meta"><span>{project.number}</span><span>{project.category}</span></div>
              <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <ul className="highlight-list">{project.highlights.map((point) => <li key={point}>{point}</li>)}</ul>
              <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="project-detail-actions"><Link className="button button-dark" href={`/projects/${project.slug}`}>View case study <span aria-hidden="true">↗</span></Link><a className="text-link" href={project.live} target="_blank" rel="noreferrer">{project.liveLabel} <span aria-hidden="true">↗</span></a></div>
            </div>
          </article>
        ))}
      </div>
      <div className="inner-page-footer-note"><span>Have a question about a project?</span><Link href="/contact" className="text-link">Get in touch <span aria-hidden="true">↗</span></Link></div>
    </div>
  )
}
