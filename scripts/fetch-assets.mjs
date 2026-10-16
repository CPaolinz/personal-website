import { mkdir, readFile, writeFile, readdir, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const manifestPath = path.join(root, 'lib', 'asset-manifest.json')
const timeoutMs = 12000

const sources = {
  portrait: {
    url: 'https://cdn.sanity.io/images/8v3y95ri/production/e575f80ddb569fc09d27b6fef42c2989988e0ae7-1056x992.png?rect=8%2C0%2C1040%2C594&w=3500&h=2000&fit=crop&auto=format',
    folder: 'assets/images',
    base: 'cecilia-portrait',
  },
  logos: {
    precisionPortal: { url: 'https://media.licdn.com/dms/image/v2/D4E0BAQGQbuyOLpXiKw/company-logo_100_100/B4EaDyTOlgG0AI-/0/1790771522327?e=1793836800&v=beta&t=7UD3-rSx5HvUkQc-Nlg-dlbwN8MVLcveh2_TpzVpCSU', folder: 'assets/logos', base: 'precision-portal' },
    beforepay: { url: 'https://media.licdn.com/dms/image/v2/D560BAQE97MBC4Y2gEA/company-logo_100_100/B56ZyR0xTGIAAQ-/0/1771973056067/beforepay_logo?e=1793836800&v=beta&t=djTyIAOx4k8gGCebjd9ZuL3bK-c2QEwKn7wCHY4Juh8', folder: 'assets/logos', base: 'beforepay' },
    macquarie: { url: 'https://media.licdn.com/dms/image/v2/D560BAQHgM3o1lpuRVA/company-logo_100_100/company-logo_100_100/0/1719459629099/macquarie_university_logo?e=1793836800&v=beta&t=h4KXQB23LnF9epd02WhNmele2U1kO4p29o_43NjnY7c', folder: 'assets/logos', base: 'macquarie' },
    cattolica: { url: 'https://media.licdn.com/dms/image/v2/C4E0BAQGGHmU2O4tYlg/company-logo_100_100/company-logo_100_100/0/1656068231872/unicatt_logo?e=1793836800&v=beta&t=Laz0pWGVwsv2UTCoJz1moCyESrD_6_YogDEnfkyI0UE', folder: 'assets/logos', base: 'cattolica' },
    uclaExtension: { url: 'https://media.licdn.com/dms/image/v2/D560BAQGuQEDDKPUGfQ/company-logo_100_100/B56aBfMqUrGUAM-/0/1788303550008/uclaextension_logo?e=1793836800&v=beta&t=923LVuDg5yByMTemqEV88vxjhMS8jomyFZ4j4bMPN50', folder: 'assets/logos', base: 'ucla-extension' },
  },
}

function extensionFor(contentType, bytes) {
  const type = (contentType || '').split(';')[0].trim().toLowerCase()
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png'
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpg'
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') return 'webp'
  if (/^\s*<svg[\s>]/i.test(bytes.toString('utf8', 0, Math.min(bytes.length, 512)))) return 'svg'
  if (type === 'image/gif') return 'gif'
  if (type === 'image/png') return 'png'
  if (type === 'image/jpeg') return 'jpg'
  if (type === 'image/webp') return 'webp'
  if (type === 'image/svg+xml') return 'svg'
  return null
}

async function fetchOne(item, key, currentValue) {
  const targetDir = path.join(publicDir, item.folder)
  await mkdir(targetDir, { recursive: true })
  try {
    const response = await fetch(item.url, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; CeciliaPortfolioAssetSync/1.0)', accept: 'image/png,image/jpeg,image/webp,image/*;q=0.8,*/*;q=0.5' },
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const bytes = Buffer.from(await response.arrayBuffer())
    const ext = extensionFor(response.headers.get('content-type'), bytes)
    if (!ext || bytes.length < 100) throw new Error('Response was not a usable image')
    for (const name of await readdir(targetDir)) {
      if (name.startsWith(`${item.base}.`)) await unlink(path.join(targetDir, name)).catch(() => {})
    }
    const relativeFile = `${item.folder}/${item.base}.${ext}`
    await writeFile(path.join(publicDir, relativeFile), bytes)
    console.log(`✓ ${key} -> public/${relativeFile}`)
    return `/${relativeFile}`
  } catch (error) {
    console.warn(`! Keeping current ${key} source (asset download unavailable: ${error.message})`)
    return currentValue ?? item.url
  }
}

let manifest
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
} catch {
  manifest = { portrait: sources.portrait.url, logos: {} }
}

const portraitPromise = fetchOne(sources.portrait, 'portrait', manifest.portrait)
manifest.logos ??= {}
const logoEntries = Object.entries(sources.logos)
const logoPaths = await Promise.all(logoEntries.map(([key, item]) => fetchOne(item, `logo: ${key}`, manifest.logos[key])))
manifest.portrait = await portraitPromise
logoEntries.forEach(([key], index) => { manifest.logos[key] = logoPaths[index] })
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log('Asset sync complete. If any source could not be fetched, the website retains its original URL as a fallback.')
