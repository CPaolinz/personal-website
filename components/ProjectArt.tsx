type Props = { kind: string }

export function ProjectArt({ kind }: Props) {
  if (kind === 'mining') {
    return (
      <div className="project-art art-mining" aria-hidden="true">
        <div className="mini-topbar"><span /><span /><span /><i>SHIFT PLAN</i></div>
        <div className="mini-dashboard">
          <div className="mini-sidebar"><b /><b /><b /><b /><b /></div>
          <div className="mini-content">
            <div className="mini-summary"><span /><span /><span /></div>
            <div className="gantt">
              <div className="gantt-row"><i style={{ width: '35%' }} /><em style={{ width: '24%' }} /></div>
              <div className="gantt-row"><i style={{ width: '20%' }} /><em style={{ width: '39%' }} /></div>
              <div className="gantt-row"><i style={{ width: '28%' }} /><em style={{ width: '22%' }} /></div>
              <div className="gantt-row"><i style={{ width: '42%' }} /><em style={{ width: '25%' }} /></div>
              <div className="gantt-row"><i style={{ width: '15%' }} /><em style={{ width: '47%' }} /></div>
            </div>
          </div>
        </div>
        <span className="art-caption">Operations scheduler / preview</span>
      </div>
    )
  }
  if (kind === 'risk') {
    return (
      <div className="project-art art-risk" aria-hidden="true">
        <div className="risk-label"><span>ΔCoVaR</span><span>ILLUSTRATIVE MODEL VIEW</span></div>
        <svg viewBox="0 0 520 225" role="presentation">
          <defs><linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b77c68" stopOpacity=".25"/><stop offset="1" stopColor="#b77c68" stopOpacity="0"/></linearGradient></defs>
          {[35, 80, 125, 170, 215].map((y) => <line key={y} x1="22" y1={y} x2="500" y2={y} stroke="#d7d0c6" strokeWidth="1" />)}
          <path d="M22 50 L54 65 L84 57 L116 91 L148 74 L178 98 L210 86 L241 126 L275 114 L306 143 L338 116 L370 163 L403 150 L438 177 L472 165 L500 185 L500 215 L22 215Z" fill="url(#riskFill)" />
          <path d="M22 50 L54 65 L84 57 L116 91 L148 74 L178 98 L210 86 L241 126 L275 114 L306 143 L338 116 L370 163 L403 150 L438 177 L472 165 L500 185" fill="none" stroke="#9b5c49" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 90 L54 82 L84 99 L116 107 L148 95 L178 122 L210 110 L241 117 L275 136 L306 127 L338 147 L370 142 L403 164 L438 159 L472 177 L500 169" fill="none" stroke="#233b36" strokeWidth="3" strokeLinejoin="round" strokeDasharray="7 5" />
        </svg>
        <div className="chart-legend"><span><i className="legend-linear" /> Linear quantile regression</span><span><i className="legend-neural" /> Neural network</span></div>
      </div>
    )
  }
  return (
    <div className="project-art art-allocation" aria-hidden="true">
      <div className="allocation-heading"><span>PORTFOLIO CONSTRUCTION</span><b>Benchmark + targeted tilts</b></div>
      <div className="allocation-bars">
        {[
          ['Technology', 78, 'tile-sage'], ['Healthcare', 62, 'tile-clay'], ['Consumer', 52, 'tile-ink'],
          ['Finance', 68, 'tile-gold'], ['Energy', 43, 'tile-blue'],
        ].map(([label, width, tone]) => (
          <div className="allocation-row" key={String(label)}>
            <span>{label}</span><div className="allocation-track"><i className={String(tone)} style={{ width: `${width}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="allocation-note"><span>FACTOR EXPOSURES</span><b>Illustrative view</b><span className="allocation-dot" /></div>
    </div>
  )
}
