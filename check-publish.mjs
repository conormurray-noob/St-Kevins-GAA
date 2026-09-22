import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'node:fs'

const OUT = process.argv[2] ?? '.'
const FILE = new URL('./content/news/2026-06-15-lotto-jackpot-climbs.json', import.meta.url)
const original = readFileSync(FILE, 'utf8')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

try {
  await page.goto('http://localhost:5173/admin/index.html', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  const loginBtn = page.getByRole('button', { name: 'Login' })
  if (await loginBtn.count()) {
    await loginBtn.click()
    await page.waitForTimeout(2000)
  }

  // open the lotto article and change its headline
  await page.getByText('Lotto Jackpot Climbs to €5,800').first().click()
  await page.waitForTimeout(2000)
  const titleInput = page.locator('input').first()
  await titleInput.fill('Lotto Jackpot Climbs to €6,000')
  await page.screenshot({ path: `${OUT}/admin-editing.png` })

  // publish
  await page.getByText('Publish', { exact: true }).first().click()
  await page.waitForTimeout(500)
  await page.getByText('Publish now').first().click()
  await page.waitForTimeout(3000)

  const saved = readFileSync(FILE, 'utf8')
  console.log(`file updated by CMS: ${saved.includes('€6,000')}`)

  // confirm it shows on the site
  await page.goto('http://localhost:5173/#/news', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  const onSite = await page.getByText('Lotto Jackpot Climbs to €6,000').count()
  console.log(`site shows published edit: ${onSite > 0}`)
} finally {
  writeFileSync(FILE, original)
  console.log('original content restored')
  await browser.close()
}
