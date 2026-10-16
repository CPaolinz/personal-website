import Link from 'next/link'

type Props = { eyebrow: string; title: string; description?: string; action?: { href: string; label: string } }

export function SectionHeading({ eyebrow, title, description, action }: Props) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <Link className="text-link section-action" href={action.href}>{action.label} <span aria-hidden="true">↗</span></Link>}
    </div>
  )
}
