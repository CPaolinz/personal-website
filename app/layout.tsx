import './globals.css'
import assetManifest from '@/lib/asset-manifest.json'
import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const serif = Cormorant_Garamond({ variable: '--font-serif', subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], display: 'swap' })
const sans = Inter({ variable: '--font-sans', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://ceciliapaolini.com'),
  title: {
    default: 'Cecilia Paolini — Data Science, Quantitative Finance & Mining Technology',
    template: '%s — Cecilia Paolini',
  },
  description: 'Cecilia Paolini is a data scientist and co-founder working across quantitative finance, predictive modelling, and mining technology.',
  openGraph: {
    title: 'Cecilia Paolini',
    description: 'Data science, quantitative finance, and mining technology.',
    type: 'website',
    images: [assetManifest.portrait],
  },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#f7f5f0', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
