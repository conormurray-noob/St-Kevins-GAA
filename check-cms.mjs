import { chromium } from 'playwright'
import { writeFileSync, unlinkSync } from 'node:fs'

const OUT = process.argv[2] ?? '.'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (err) => errors.push(`PAGEERROR: ${err.message}`))

// 1. Site still renders from JSON content
await page.goto('http://localhost:5173/#/news', { waitUntil: 'networkidle' })
const cards = await page.locator('article').count()
console.log(`news cards: ${cards}`)

// 2. Article overlay shows CMS body text
await page.locator('article').first().click()
await page.waitForTimeout(400)
const bodyShown = await page.getByText('the county final date will be confirmed by the CCC').count()
console.log(`article body visible: ${bodyShown > 0}`)
await page.screenshot({ path: `${OUT}/news-article.png` })
await page.keyboard.press('Escape')

// 3. Admin panel loads with collections
await page.goto('http://localhost:5173/admin/index.html', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
const loginBtn = page.getByRole('button', { name: 'Login' })
if (await loginBtn.count()) {
  await loginBtn.click()
  await page.waitForTimeout(2500)
}
const adminText = await page.evaluate(() => document.body.innerText)
console.log(`admin shows News Articles: ${adminText.includes('News Articles')}`)
console.log(`admin shows Site Sections: ${adminText.includes('Site Sections')}`)
await page.screenshot({ path: `${OUT}/admin-collections.png` })

// open the News collection list
if (adminText.includes('News Articles')) {
  await page.getByText('News Articles').first().click()
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${OUT}/admin-news-list.png` })
  const list = await page.evaluate(() => document.body.innerText)
  console.log(`admin lists seeded article: ${list.includes('Reserves Reach County Final')}`)
}

// 4. Simulate a CMS publish: new file appears on the site
const testFile = new URL('./content/news/2026-07-10-test-publish.json', import.meta.url)
writeFileSync(testFile, JSON.stringify({
  title: 'CMS Publish Test Article',
  date: '2026-07-10T12:00:00.000Z',
  category: 'Club',
  image: 'https://picsum.photos/seed/test/900/600',
  excerpt: 'If you can read this, publishing works.',
  featured: false,
  body: 'Test body.',
}))
try {
  await page.goto('http://localhost:5173/#/news', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  const found = await page.getByText('CMS Publish Test Article').count()
  console.log(`published article appears on site: ${found > 0}`)
} finally {
  unlinkSync(testFile)
}

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'No page errors.')
await browser.close()
