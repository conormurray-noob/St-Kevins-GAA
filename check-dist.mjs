import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const failures = []
page.on('requestfailed', (req) => {
  if (!req.url().startsWith('https://picsum.photos')) failures.push(req.url())
})
page.on('pageerror', (err) => failures.push(`PAGEERROR: ${err.message}`))

const dist = new URL(process.argv[3] ?? './dist/index.html', import.meta.url).href
for (const p of ['home', 'lotto', 'social', 'gallery']) {
  await page.goto(`${dist}#/${p}`)
  await page.waitForTimeout(500)
}

// crest must render with a real size when opened from file://
await page.goto(`${dist}#/home`)
const crest = await page.evaluate(() => {
  const img = document.querySelector('header img')
  return img ? { complete: img.complete, w: img.naturalWidth } : null
})
console.log('crest:', JSON.stringify(crest))
console.log(failures.length ? `FAILED REQUESTS:\n${failures.join('\n')}` : 'No failed requests or page errors.')
await page.screenshot({ path: process.argv[2] })
await browser.close()
