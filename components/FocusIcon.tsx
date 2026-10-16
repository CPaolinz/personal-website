type Props = { kind: 'data' | 'finance' | 'optimisation' | 'product' }

export function FocusIcon({ kind }: Props) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true" {...common}>
      {kind === 'data' && <><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7 15l4-4 3 2 5-7" /><circle cx="7" cy="15" r="1" /><circle cx="11" cy="11" r="1" /><circle cx="14" cy="13" r="1" /><circle cx="19" cy="6" r="1" /></>}
      {kind === 'finance' && <><circle cx="12" cy="12" r="8.5" /><path d="M15.5 8.5c-.7-.6-1.6-.9-2.8-.9-1.7 0-2.7.8-2.7 2s.9 1.7 2.7 2c1.8.3 2.7.9 2.7 2.1s-1.1 2.1-2.9 2.1c-1.2 0-2.3-.4-3.1-1.2" /><path d="M12.5 5.8v12.4" /></>}
      {kind === 'optimisation' && <><path d="M12 3.5l2.4 2.1 3.2-.2.8 3.1 2.6 1.9-1.2 3 1 3-2.8 1.5-1.1 3-3.2-.6L12 22l-2.7-1.7-3.2.6-1.1-3-2.8-1.5 1-3-1.2-3 2.6-1.9.8-3.1 3.2.2z" /><circle cx="12" cy="12.5" r="3.2" /><path d="M12 9.3v6.4M8.8 12.5h6.4" /></>}
      {kind === 'product' && <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8v8H8z" /><path d="M8 12h8M12 8v8" /></>}
    </svg>
  )
}
