import { chromium } from 'playwright'

const OUT = process.argv[2] ?? '.'
const pages = ['home', 'news', 'fixtures', 'schedule', 'lotto', 'gallery', 'social', 'club']

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[${page.url()}] ${msg.text()}`)
})
page.on('pageerror', (err) => errors.push(`[${page.url()}] PAGEERROR: ${err.message}`))

for (const p of pages) {
  await page.goto(`http://localhost:5173/#/${p}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/${p}.png`, fullPage: p === 'home' })
  console.log(`shot: ${p}`)
}

console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join('\n')}` : 'No console errors.')
await browser.close()
