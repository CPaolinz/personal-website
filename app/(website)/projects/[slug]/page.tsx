import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProjectArt } from '@/components/ProjectArt'
import { projects } from '@/lib/content'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  const nextProjects = projects.filter((item) => item.slug !== project.slug)

  return (
    <div className="page-wrap inner-page project-single-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/projects">Projects</Link><span>/</span><span>{project.title}</span>
      </nav>
      <section className="project-single-hero">
        <p className="eyebrow">Project {project.number} / {project.category}</p>
        <h1>{project.title}</h1>
        <p className="project-single-subtitle">{project.subtitle}</p>
        <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      </section>
      <div className="project-single-art"><ProjectArt kind={project.art} /></div>
      <section className="project-single-body">
        <div className="section-side-label"><span>01</span><h2>Overview</h2></div>
        <div className="project-single-description">
          <p>{project.description}</p>
          <a className="button button-dark" href={project.live} target="_blank" rel="noreferrer">{project.liveLabel} <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="project-single-body project-single-highlights">
        <div className="section-side-label"><span>02</span><h2>Focus areas</h2></div>
        <ul className="highlight-list">{project.highlights.map((point) => <li key={point}>{point}</li>)}</ul>
      </section>
      <section className="other-projects">
        <div className="section-heading"><div><p className="eyebrow">Continue exploring</p><h2>Other projects.</h2></div><Link href="/projects" className="text-link">All projects <span aria-hidden="true">↗</span></Link></div>
        <div className="other-project-list">
          {nextProjects.map((item) => <Link href={`/projects/${item.slug}`} className="other-project-link" key={item.slug}><span>{item.number}</span><div><strong>{item.title}</strong><small>{item.category}</small></div><span className="other-arrow">↗</span></Link>)}
        </div>
      </section>
    </div>
  )
}
