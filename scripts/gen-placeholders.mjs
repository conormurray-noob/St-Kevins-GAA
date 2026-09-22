// Generates self-hosted placeholder images (club-branded SVGs) and points all
// content at them, replacing picsum.photos URLs — so the site never depends on
// an external placeholder service.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'

const COUNT = 12
const dir = new URL('../public/placeholders/', import.meta.url)
mkdirSync(dir, { recursive: true })

for (let i = 1; i <= COUNT; i++) {
  const shade = 16 + (i % 4) * 6 // vary the background slightly
  const angle = i % 2 ? -18 : 18
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="rgb(${shade},${shade + 1},${shade + 4})"/>
  <g transform="rotate(${angle} 400 300)" opacity="0.35">
    <rect x="${520 + (i % 3) * 60}" y="-200" width="26" height="1000" fill="#c8102e"/>
    <rect x="${580 + (i % 3) * 60}" y="-200" width="26" height="1000" fill="#c8102e"/>
    <rect x="${640 + (i % 3) * 60}" y="-200" width="26" height="1000" fill="#c8102e"/>
  </g>
  <circle cx="400" cy="268" r="54" fill="none" stroke="#c8102e" stroke-width="5"/>
  <text x="400" y="282" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="40" fill="#c8102e">SK</text>
  <text x="400" y="372" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="26" fill="#ffffff" letter-spacing="4">ST. KEVIN'S GAA</text>
  <text x="400" y="404" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#7c7e85" letter-spacing="2">PHOTO COMING SOON</text>
</svg>\n`
  writeFileSync(new URL(`ph-${i}.svg`, dir), svg)
}
console.log(`wrote ${COUNT} placeholder SVGs to public/placeholders/`)

// Rewrite picsum URLs in content files to local placeholders (stable per unique URL)
const contentDir = new URL('../content/', import.meta.url)
const mapping = new Map()
let next = 0
const assign = (url) => {
  if (!mapping.has(url)) mapping.set(url, `/placeholders/ph-${(next++ % COUNT) + 1}.svg`)
  return mapping.get(url)
}

function rewrite(path) {
  const text = readFileSync(path, 'utf8')
  const updated = text.replace(/https:\/\/picsum\.photos\/[^"]+/g, (m) => assign(m))
  if (updated !== text) {
    writeFileSync(path, updated)
    return true
  }
  return false
}

const walk = (dirUrl) => {
  for (const entry of readdirSync(dirUrl, { withFileTypes: true })) {
    const p = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dirUrl)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.json') && rewrite(p)) console.log('rewrote', entry.name)
  }
}
walk(contentDir)
console.log(`replaced ${mapping.size} unique picsum URLs`)
