import type { NextConfig } from 'next'

const config: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/projects-list', destination: '/projects', permanent: true },
      { source: '/projects/thesis', destination: '/projects/systemic-risk', permanent: true },
      { source: '/projects/lab-investing', destination: '/projects/benchmark-neutral-allocations', permanent: true },
    ]
  },
}

export default config
