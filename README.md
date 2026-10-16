# Cecilia Paolini — Personal Portfolio

A quiet, editorial portfolio for Cecilia Paolini, built with Next.js, TypeScript, and CSS. Prepared for deployment on Vercel. It includes the complete six-role experience timeline, three education entries with thesis/coursework details, project case studies, and direct contact links (no contact form).

## Local development

Requirements: Node.js 20.9+ and npm.

```bash
npm ci
npm run dev
```

The `predev` hook runs `npm run sync-assets`, which downloads Cecilia's supplied portrait and the supplied employer/university logos into `public/assets/` and updates `lib/asset-manifest.json` to use the local files. If an upstream image cannot be reached, the site keeps the source URL as a fallback and logo badges gracefully fall back to initials rather than showing made-up brand marks.

Open [http://localhost:3000](http://localhost:3000).

## Asset sync

```bash
npm run sync-assets
```

Run this once while the supplied signed LinkedIn image URLs are valid. Review the downloaded files in `public/assets/images/` and `public/assets/logos/`, then commit both those files and `lib/asset-manifest.json` to GitHub. This keeps Vercel builds independent of temporary LinkedIn URLs and ensures the assets are genuinely stored with the site.

## Production build

```bash
npm run build
npm run start
```

The `prebuild` hook attempts to refresh missing assets but preserves already-saved local assets if an upstream source becomes unavailable.

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Import that repository into Vercel.
3. Keep the framework preset as **Next.js**; no Sanity project or environment variables are required to render the portfolio.
4. Add `ceciliapaolini.com` in Vercel's Domains settings if deploying to the existing domain.

## Structure

- `app/(website)/page.tsx` — homepage and selected projects
- `app/(website)/projects/` — project list and individual case studies
- `app/(website)/experience/page.tsx` — complete professional experience and full education details
- `app/(website)/about/page.tsx` — approach, skills, languages, and education
- `app/(website)/contact/page.tsx` — direct email, LinkedIn, and GitHub links
- `lib/content.ts` — editable content, dates, descriptions, education details, and project links
- `lib/asset-manifest.json` — active local asset paths / remote fallbacks
- `scripts/fetch-assets.mjs` — saves the provided portrait and official LinkedIn logo images locally
- `public/assets/images/` and `public/assets/logos/` — local visual assets after sync

Please have Cecilia verify titles, dates, project descriptions, contact details, and external links before making the site public.
