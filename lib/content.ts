import assetManifest from './asset-manifest.json'

export type EducationDetail = { label: string; text: string }

export type Experience = {
  company: string
  role: string
  dates: string
  location?: string
  logo: string
  logoUrl: string
  initials: string
  tone: string
  summary: string
  bullets: string[]
}

export const profile = {
  name: 'Cecilia Paolini',
  email: 'ceciliapaolini.mi@gmail.com',
  linkedin: 'https://it.linkedin.com/in/cecilia-paolini-039409435',
  github: 'https://github.com/CPaolinz',
  photo: assetManifest.portrait,
  tagline: 'Data science · Optimisation · Mining technology',
  headline: 'Turning data into decisions for a smarter mining future.',
  intro:
    'I work at the intersection of data science, optimisation, and mining technology—building practical tools for complex, real-world problems.',
}

export const experiences: Experience[] = [
  {
    company: 'Precision Portal',
    role: 'Co-Founder',
    dates: 'Mar 2026 — Present',
    location: 'Remote · Full-time',
    logo: assetManifest.logos.precisionPortal,
    logoUrl: 'https://www.linkedin.com/company/146650792/',
    initials: 'PP',
    tone: 'precision',
    summary: 'Building a real-time scheduling product for underground mining operations.',
    bullets: [
      'Strategic Workflow Transformation: Partnered with domain experts to engineer a real-time scheduling dashboard, transforming disjointed field operations into a streamlined, minute-by-minute shift coordinator.',
      'Intuitive Product Design: Architected a centralized command center that distils fragmented field data into a unified, actionable interface, empowering shift supervisors to make rapid, informed decisions.',
      'Intelligent Scheduling Engine: Co-developed a dynamic constraint-based algorithm that orchestrates complex development cycles, intelligently routing heavy machinery for drilling, blasting, and bogging with precision.',
      'Responsive Full-Stack Execution: Built a robust, interactive TypeScript matrix that enables on-the-fly schedule adjustments, instantly recalculating operational timelines to adapt to unpredictable delays and complex tasks such as cable bolting.',
    ],
  },
  {
    company: 'Beforepay Group',
    role: 'Data Scientist',
    dates: 'Oct 2025 — Feb 2026',
    logo: assetManifest.logos.beforepay,
    logoUrl: 'https://www.linkedin.com/company/19220954/',
    initials: 'B',
    tone: 'beforepay',
    summary: 'Worked across risk strategy, customer analytics, and transaction-text categorisation for a personal lending product.',
    bullets: [
      'Risk Strategy: Developed strategies for the personal-loan pipeline, balancing data governance, risk, and compliance requirements with profitability while translating transactional data into assessment logic for future predictive-modelling infrastructure.',
      'Data Analytics: Queried large and complex datasets using SQL and Databricks to identify user segments driving core business growth.',
      'NPL Strategy: Designed an NLP strategy to extract keywords from user transaction text for automated financial categorisation.',
    ],
  },
  {
    company: 'Macquarie University',
    role: 'Visiting Researcher',
    dates: 'Jul 2025 — Aug 2025',
    logo: assetManifest.logos.macquarie,
    logoUrl: 'https://www.linkedin.com/school/7763/',
    initials: 'MQ',
    tone: 'macquarie',
    summary: 'Prepared and analysed the Longitudinal Survey of Australian Youth (LSAY) dataset for follow-on research and predictive modelling.',
    bullets: [
      'Data Analytics (EDA): Analysed and cleaned the LSAY dataset, comprising 15,078 observations and 4,677 variables; used R to address missing data and errors and remove ineligible observations.',
      'Data Preparation: Prepared the dataset by mapping and merging variables with related values and cross-referencing them with another dataset to enable future linking.',
      'Predictive Modelling: Developed and evaluated standard econometric regression and machine-learning models, documenting the methodology and findings for a clear research handoff.',
    ],
  },
  {
    company: 'Oltre Impact',
    role: 'Investment Intern',
    dates: 'Mar 2023 — Sep 2023',
    logo: assetManifest.logos.oltreImpact,
    logoUrl: 'https://www.linkedin.com/company/1795541/',
    initials: 'OI',
    tone: 'oltre',
    summary: 'Researched impact-investment markets and assessed early-stage companies in sustainability-focused sectors.',
    bullets: [
      'Market Research: Performed trend analysis and technical and regulatory research on impact markets such as sustainable plastics and waste management, contributing insights to investment strategy.',
      'Startup Valuation: Analysed startup valuations and industry metrics using PitchBook and Crunchbase to assess strategic fit and business-model feasibility.',
    ],
  },
  {
    company: 'MV Consulting S.r.l.',
    role: 'Associate Management Consultant',
    dates: 'Apr 2021 — Mar 2022',
    logo: assetManifest.logos.mvConsulting,
    logoUrl: 'https://www.linkedin.com/company/11092977/',
    initials: 'MV',
    tone: 'mv',
    summary: 'Supported financial-system transformation, cloud migration, and data management across enterprise projects.',
    bullets: [
      'Cloud Migration: Led the migration of financial data to Oracle PBCS cloud infrastructure for a multinational client.',
      'Data Management: Conducted data-management and transformation work for an ERP project across 100+ entities, managing complex accounting datasets and ensuring data quality and reporting accuracy under tight deadlines.',
      'Team Collaboration: Contributed to team delivery and complex problem-solving with limited initial guidance.',
    ],
  },
  {
    company: 'Haier Europe',
    role: 'Junior Regional Business Manager',
    dates: 'Nov 2020 — Feb 2021',
    location: 'Greater Milan Metropolitan Area · Hybrid',
    logo: assetManifest.logos.haierEurope,
    logoUrl: 'https://www.linkedin.com/company/91413/',
    initials: 'H',
    tone: 'haier',
    summary: 'Supported regional business analysis, product-range management, commercialisation, and coordination with global markets.',
    bullets: [
      'Business Analysis: Supported the Regional Business Manager with business analysis and product-range management.',
      'Commercialisation: Contributed to commercialisation processes and global-market relationships.',
    ],
  },
]

export const education = [
  {
    institution: 'Università Cattolica del Sacro Cuore',
    qualification: 'MSc in Applied Data Science for Banking and Finance',
    dates: 'Oct 2023 — Sep 2025',
    logo: assetManifest.logos.cattolica,
    logoUrl: 'https://www.linkedin.com/school/166693/',
    initials: 'UC',
    details: [
      { label: 'Thesis', text: 'Modeling systemic risk with ΔCoVaR: a comparison of linear and neural network approaches.' },
      { label: 'Selected project', text: 'Benchmark-neutral portfolio optimisation: implemented a custom factor model in Python with targeted factor tilts.' },
      { label: 'Coursework', text: 'Data Analysis, IT Coding, Finance and Banking, Business Analytics, Game Theory, AI and Machine Learning, Data Analytics for Investment, Quantitative Finance, and Time Series Analysis and Forecasting.' },
    ],
  },
  {
    institution: 'UCLA Extension',
    qualification: 'Certificate in Finance · Awarded with Distinction',
    dates: 'Mar 2022 — Dec 2022',
    logo: assetManifest.logos.uclaExtension,
    logoUrl: 'https://www.linkedin.com/school/166561/',
    initials: 'UCLA',
    details: [
      { label: 'Coursework', text: 'Managerial Finance and Advanced Applications of Managerial Finance, Fundamentals of Investing, Financial Statement Analysis, Principles of Accounting A and B, and Introduction to Data Science.' },
    ],
  },
  {
    institution: 'Politecnico di Milano',
    qualification: 'Bachelor of Science',
    dates: 'Oct 2015 — Jul 2020',
    logo: assetManifest.logos.politecnico,
    logoUrl: 'https://www.linkedin.com/school/165509/',
    initials: 'POLIMI',
    details: [
      { label: 'Final dissertation', text: 'Analysed Google’s PageRank algorithm using Markov-chain theory and network analysis to examine the mathematical foundations of webpage importance.' },
      { label: 'Coursework', text: 'Calculus I, II and III, Probability, Statistical Inference I and II, and Numerical Analysis (MATLAB).' },
    ],
  },
]

export const projects = [
  {
    slug: 'mining-dashboard',
    number: '01',
    title: 'Underground Mining Scheduler',
    subtitle: 'From operational complexity to a coordinated shift.',
    description:
      'A real-time scheduling dashboard and constraint-based engine for underground mine development. It coordinates work stages, equipment availability, blasting windows, delays, and dependencies across headings.',
    category: 'Mining technology',
    tags: ['Constraint optimisation', 'TypeScript', 'Scheduling', 'Product design'],
    art: 'mining',
    live: 'https://www.dashboardmining.com',
    liveLabel: 'Explore live prototype',
    highlights: [
      'Minute-by-minute stage progression and shift coordination',
      'Equipment assignment with specialty and travel-time constraints',
      'Schedule recalculation when operational delays or work requirements change',
    ],
  },
  {
    slug: 'systemic-risk',
    number: '02',
    title: 'Modelling Systemic Risk with ΔCoVaR',
    subtitle: 'Comparing linear and neural-network quantile regression.',
    description:
      'A quantitative-finance research project comparing linear quantile regression and neural-network quantile regression for estimating ΔCoVaR, a measure of an institution’s contribution to systemic financial risk.',
    category: 'Quantitative finance',
    tags: ['Python', 'Neural networks', 'Quantile regression', 'Risk modelling'],
    art: 'risk',
    live: 'https://colab.research.google.com/drive/1cbx21PE3ABJEfyZFe25KbCy3k6xnF0tS?usp=sharing',
    liveLabel: 'Open research notebook',
    highlights: [
      'Compared linear and neural-network approaches to ΔCoVaR estimation',
      'Worked with weekly data spanning 2003–2023 across US and euro-area banks',
      'Examined trade-offs between historical fit and forward-looking prediction',
    ],
    downloads: [
      { href: '/downloads/systemic-risk-presentation.pdf', label: 'Download presentation' },
      { href: '/downloads/systemic-risk-thesis.pdf', label: 'Download full thesis' },
    ],
  },
  {
    slug: 'benchmark-neutral-allocations',
    number: '03',
    title: 'Benchmark-Neutral Allocations with Factor Tilts',
    subtitle: 'Balancing investor preferences and benchmark tracking.',
    description:
      'A portfolio-optimisation project that introduces targeted factor or sector tilts while keeping allocations close to a market-capitalisation-weighted benchmark and controlling active risk.',
    category: 'Portfolio optimisation',
    tags: ['Python', 'Portfolio optimisation', 'Factor models', 'Market data'],
    art: 'allocation',
    live: 'https://github.com/CPaolinz/LabInvesting_proj',
    liveLabel: 'View project on GitHub',
    highlights: [
      'Optimised the balance between tracking error and targeted factor exposures',
      'Applied factor extraction and multicollinearity checks to market data',
      'Explored signals across technology, healthcare, consumer, finance, and energy',
    ],
    researchSections: [
      {
        title: 'Objective',
        paragraphs: [
          'This strategy tracks a market-capitalisation-weighted benchmark while introducing targeted factor and sector tilts. The goal is to express investor preferences without materially drifting from the benchmark.',
        ],
      },
      {
        title: 'Methodology & framework',
        paragraphs: [
          'The optimisation minimises tracking error and a factor-tilt penalty. Tracking error measures active risk relative to the benchmark, while the penalty controls the distance between realised and target factor exposures.',
          'The portfolio is fully invested, with long-short flexibility represented by individual weights between -1 and 1.',
        ],
        bullets: [
          'Tracking error: (w - wb)^T Sigma (w - wb)',
          'Factor penalty: lambda_tilt times the squared distance from target exposures',
        ],
      },
      {
        title: 'Data & factor construction',
        paragraphs: [
          'Price and market-capitalisation data are collected dynamically through a custom market_data module using Yahoo Finance. The universe contains the ten largest companies across technology, healthcare, consumer, finance, and energy, covering January 2020 to February 2025.',
          'A Tucker factor model uses singular value decomposition to reduce dimensionality while preserving 86.52% of the dataset variance. A variance inflation factor filter removes redundant signals above a threshold of 10.',
        ],
        bullets: [
          'Tucker factors capture structural, macro-level drivers of stock behaviour',
          'Industry-relative reversal measures 21-day returns against industry averages',
          'Industry momentum captures trailing peer trends',
          'Seasonality measures recurring calendar-month patterns over a rolling history',
        ],
      },
      {
        title: 'Sector insights',
        paragraphs: [
          'The tilt intensity parameter lambda controls the balance between benchmark tracking and active factor exposure. The useful range varies by sector: technology is most sensitive to momentum anomalies, healthcare to risk and quality, consumer to size and value, finance to seasonality, and energy to mean reversion.',
        ],
        bullets: [
          'Technology: lambda below 3',
          'Healthcare: lambda between 2 and 3',
          'Consumer: lambda between 2 and 6',
          'Finance: lambda between 4 and 8',
          'Energy: lambda between 2.5 and 7.5',
        ],
      },
    ],
    download: {
      href: '/downloads/laboratory-of-data-analytics-for-investing.pdf',
      label: 'Download group project presentation',
    },
  },
]

export const skillGroups = [
  {
    title: 'Data science & modelling',
    skills: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Clustering', 'Classification', 'Time series', 'Machine learning'],
  },
  {
    title: 'Engineering & data',
    skills: ['TypeScript', 'SQL', 'R', 'C', 'Databricks / PySpark', 'MySQL', 'Git', 'MATLAB'],
  },
  {
    title: 'Finance & analytics',
    skills: ['Quantitative finance', 'Risk modelling', 'Portfolio optimisation', 'NLP', 'Predictive modelling', 'Advanced Excel'],
  },
]
