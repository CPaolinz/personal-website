'use client'

import { useState } from 'react'

type Props = {
  src: string
  alt: string
  initials?: string
  href?: string
  tone?: string
  size?: 'small' | 'large'
}

export function LogoBadge({ src, alt, initials, href, tone = 'neutral', size = 'small' }: Props) {
  const [failed, setFailed] = useState(false)
  const mark = initials || alt.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  const badge = (
    <span className={`logo-badge logo-${tone} logo-${size}${failed ? ' logo-fallback-only' : ''}`} role="img" aria-label={alt}>
      {!failed && src ? <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} /> : null}
      {failed || !src ? <span className="logo-fallback" aria-hidden="true">{mark}</span> : null}
    </span>
  )

  if (href) {
    return <a className="logo-badge-link" href={href} target="_blank" rel="noreferrer" aria-label={`Visit ${alt} website`}>{badge}</a>
  }
  return badge
}
