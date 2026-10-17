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
          <div className="project-detail-actions">
            <a className="button button-dark" href={project.live} target="_blank" rel="noreferrer">{project.liveLabel} <span aria-hidden="true">↗</span></a>
            {'download' in project && project.download && <a className="button button-outline" href={project.download.href} download>{project.download.label} <span aria-hidden="true">↓</span></a>}
            {'downloads' in project && project.downloads?.map((download) => <a className="button button-outline" href={download.href} download key={download.href}>{download.label} <span aria-hidden="true">↓</span></a>)}
          </div>
        </div>
      </section>
      <section className="project-single-body project-single-highlights">
        <div className="section-side-label"><span>02</span><h2>Focus areas</h2></div>
        <ul className="highlight-list">{project.highlights.map((point) => <li key={point}>{point}</li>)}</ul>
      </section>
      {project.slug === 'benchmark-neutral-allocations' && (
        <>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>03</span><h2>Methodology &amp; framework</h2></div>
            <div className="project-research-copy">
              <p>The strategy minimises tracking error relative to the benchmark while controlling exposure to targeted risk factors through a factor-tilt penalty.</p>
              <div className="formula-stack" aria-label="Optimisation objective and portfolio constraints">
                <div className="formula-card"><span className="formula-label">Objective</span><span className="formula">min<sub>w</sub> &nbsp; Tracking Error + Factor Tilt Penalty</span></div>
                <div className="formula-card"><span className="formula-label">Tracking error</span><span className="formula"><i>TE</i> = (<b>w</b> - <b>w</b><sub>b</sub>)<sup>T</sup>&Sigma;(<b>w</b> - <b>w</b><sub>b</sub>)</span></div>
                <div className="formula-card"><span className="formula-label">Tilt penalty</span><span className="formula">Penalty = &lambda;<sub>tilt</sub> &Sigma;(<b>B</b><sup>T</sup><b>w</b> - tilt target)<sup>2</sup></span></div>
              </div>
              <h3 className="research-subheading">Operational constraints</h3>
              <ul className="research-list">
                <li>Fully invested portfolio: <span className="inline-formula">&Sigma; w<sub>i</sub> = 1</span></li>
                <li>Long-short portfolio flexibility: <span className="inline-formula">-1 &le; w<sub>i</sub> &le; 1</span></li>
              </ul>
            </div>
          </section>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>04</span><h2>Data &amp; factor construction</h2></div>
            <div className="project-research-copy">
              <ul className="research-list">
                <li><strong>Data sourcing.</strong> Stock price and market-capitalisation data are extracted dynamically through a custom <code>market_data</code> module using Yahoo Finance.</li>
                <li><strong>Scope.</strong> The universe covers the 10 largest companies across Technology, Healthcare, Consumer, Finance, and Energy from January 2020 to February 2025.</li>
                <li><strong>Multicollinearity &amp; dimensionality reduction.</strong>
                  <ul>
                    <li>A Tucker Factor Model uses Singular Value Decomposition (SVD) to extract independent principal components while preserving 86.52% of dataset variance.</li>
                    <li>A Variance Inflation Factor (VIF) filter removes factors above 10 to eliminate redundant data.</li>
                    <li>Examples include <code>Tucker_Factor_1</code> in Technology and <code>ind_mom</code> in Consumer.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>05</span><h2>Factor signals</h2></div>
            <div className="project-research-copy">
              <p>The pipeline evaluates cross-sectional asset returns through two signal families.</p>
              <ol className="research-list signal-list">
                <li><strong>Tucker factors.</strong> Macro-level dimensional drivers mapping structural stock behaviour.</li>
                <li><strong>Short-term trading indicators.</strong>
                  <ul>
                    <li><em>Industry Relative Reversal (STR<sub>i</sub>)</em>: 21-day cumulative returns relative to industry averages.</li>
                    <li><em>Industry Momentum (IND_MOM<sub>i</sub>)</em>: trailing trends among industry peers.</li>
                    <li><em>Seasonality (SEA_SAME<sub>i</sub>)</em>: recurring directional calendar-month patterns over a 10-year rolling window.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>06</span><h2>Sector controls</h2></div>
            <div className="project-research-copy">
              <p>Risk budgets and active factor allocations are governed by the tilt intensity parameter <span className="inline-formula">&lambda;</span>. Over-aggressive tuning can increase baseline portfolio volatility.</p>
              <div className="sector-table-wrap">
                <table className="sector-table"><thead><tr><th>Sector</th><th>Core driver</th><th>Optimal &lambda;</th></tr></thead><tbody>
                  <tr><th>Technology</th><td>Momentum trends; sensitive to single-stock anomalies such as NVDA and AVGO.</td><td>&lambda; &lt; 3</td></tr>
                  <tr><th>Healthcare</th><td>Underlying risk and quality measures, including ABBV and GILD.</td><td>2 &lt; &lambda; &lt; 3</td></tr>
                  <tr><th>Consumer</th><td>Structural size and value components.</td><td>2 &lt; &lambda; &lt; 6</td></tr>
                  <tr><th>Finance</th><td>Seasonality effects; exposures rarely exceed &plusmn;1.</td><td>4 &lt; &lambda; &lt; 8</td></tr>
                  <tr><th>Energy</th><td>Mean-reversion characteristics.</td><td>2.5 &lt; &lambda; &lt; 7.5</td></tr>
                </tbody></table>
              </div>
            </div>
          </section>
        </>
      )}
      {project.slug === 'systemic-risk' && (
        <>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>03</span><h2>Research overview</h2></div>
            <div className="project-research-copy">
              <p><strong>Topic.</strong> Measuring systemic risk within the banking sector using <span className="inline-formula">&Delta;CoVaR</span>.</p>
              <h3 className="research-subheading">Primary goals</h3>
              <ul className="research-list">
                <li>Explore a <strong>Neural Network Quantile Regression (NNQR)</strong> approach to calculate the systemic-risk metric <span className="inline-formula">&Delta;CoVaR</span>.</li>
                <li>Build a predictive <strong>Forward &Delta;CoVaR</strong> model using lagged financial variables.</li>
                <li>Provide practical, real-world interpretations for prospective banking and financial applications.</li>
              </ul>
            </div>
          </section>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>04</span><h2>Key concepts</h2></div>
            <div className="project-research-copy">
              <dl className="concept-list">
                <div><dt>Systemic risk</dt><dd>Financial interconnectedness where a single initial shock spreads regionally or globally, often from a too-big-to-fail institution or a group of highly correlated smaller institutions.</dd></div>
                <div><dt>Value at Risk (VaR)</dt><dd>The potential maximum loss for a financial institution within a specified confidence interval over a given timeframe.</dd></div>
                <div><dt>CoVaR &amp; &Delta;CoVaR</dt><dd>Introduced by Adrian and Brunnermeier (2011), CoVaR is the VaR of the entire financial system conditional on an institution being in distress. &Delta;CoVaR measures the difference between the system&rsquo;s CoVaR in distress and in its normal state, isolating an institution&rsquo;s marginal contribution to systemic risk.</dd></div>
              </dl>
            </div>
          </section>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>05</span><h2>Core problem &amp; methodology</h2></div>
            <div className="project-research-copy">
              <p>The traditional approach relies on <strong>Linear Quantile Regression (LQR)</strong>. It assumes linear relationships, requires manual specification of non-linear terms, and can oversimplify complex financial interactions. This research proposes <strong>NNQR</strong> to overcome those limitations.</p>
              <h3 className="research-subheading">The dataset</h3>
              <ul className="research-list">
                <li><strong>Scope.</strong> 1,284 banks: 632 active, 622 inactive since 2006, and 30 rest across the United States and the Euro Area.</li>
                <li><strong>Timeline.</strong> Weekly data from December 26, 2003 to December 29, 2023, covering 1,045 weeks.</li>
                <li><strong>Data sources.</strong> Market and macro indicators such as VIX, S&amp;P 500, and US Treasury yields, plus firm metrics including market capitalisation, leverage risk ratio, maturity mismatch, and Tier 1 ratio, collected via Bloomberg and BankFocus.</li>
              </ul>
            </div>
          </section>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>06</span><h2>Results &amp; comparison</h2></div>
            <div className="project-research-copy">
              <ul className="research-list">
                <li><strong>&Delta;CoVaR calculations.</strong> NNQR shows slightly better performance than LQR when mapping historical &Delta;CoVaR values, especially for commercial banks during the Great Financial Crisis.</li>
                <li><strong>Forward &Delta;CoVaR.</strong> A panel regression on lagged institutional characteristics was used to reduce procyclicality.</li>
                <li><strong>Best lag.</strong> Variables lagged by one year yielded the strongest predictive results.</li>
                <li><strong>Contradictory outcome.</strong> For currently active banks, LQR unexpectedly outperformed NNQR in predictive accuracy. Firm-level variables also did not fully capture &Delta;CoVaR, potentially reflecting a too-small-to-care effect or moral hazard among exceptionally strong balance sheets.</li>
              </ul>
            </div>
          </section>
          <section className="project-single-body project-research-section">
            <div className="section-side-label"><span>07</span><h2>Future improvements</h2></div>
            <div className="project-research-copy">
              <p>Several directions could improve the predictive capacity of the models:</p>
              <ul className="research-list">
                <li>Integrate European market-specific variables, since the current variables are US based.</li>
                <li>Use MICE (Multiple Imputation by Chained Equations) interpolation.</li>
                <li>Split the growth of market-valued total assets <span className="inline-formula">X<sub>t</sub><sup>i</sup></span> into separate positive and negative regimes, as proposed by López-Espinosa et al.</li>
                <li>Replace panel regression with advanced machine-learning models such as XGBoost.</li>
                <li>Incorporate direct data on financial interconnectedness, although it is difficult to obtain.</li>
              </ul>
            </div>
          </section>
        </>
      )}
      <section className="other-projects">
        <div className="section-heading"><div><p className="eyebrow">Continue exploring</p><h2>Other projects.</h2></div><Link href="/projects" className="text-link">All projects <span aria-hidden="true">↗</span></Link></div>
        <div className="other-project-list">
          {nextProjects.map((item) => <Link href={`/projects/${item.slug}`} className="other-project-link" key={item.slug}><span>{item.number}</span><div><strong>{item.title}</strong><small>{item.category}</small></div><span className="other-arrow">↗</span></Link>)}
        </div>
      </section>
    </div>
  )
}
