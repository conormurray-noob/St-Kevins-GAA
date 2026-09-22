// Pulls real club lotto results from the club's ClubZap site (stkevinsgfc.ie)
// and writes them into content/lotto.json.
//
//   npm run sync:lotto
//
// Scrapes: current jackpot, next draw date, play-online link, and the recent
// draw history (date, jackpot, winner status, lucky dips, winning numbers).
// The `entriesClose` line is left as set in /admin.
import { readFileSync, writeFileSync } from 'node:fs'

const DRAWS_URL = 'https://stkevinsgfc.ie/draws'
const MAX_DRAWS = 8

const res = await fetch(DRAWS_URL, { headers: { 'user-agent': 'StKevinsGAA-website-sync' } })
if (!res.ok) throw new Error(`stkevinsgfc.ie responded ${res.status}`)
const html = await res.text()

const clean = (s) =>
  s
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()

// "07/07/2026" -> "Tuesday 7 July 2026"
function longDate(dmy) {
  const [d, m, y] = dmy.split('/').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// "Maureen Malone  Online" -> "Maureen Malone (Online)"; keep "c/o" sellers as-is
function winnerName(raw) {
  const name = clean(raw)
  return name.endsWith(' Online') ? `${name.slice(0, -7)} (Online)` : name
}

const currentJackpot = clean(
  html.match(/sponsor-jackpot-total[^>]*>\s*([^<]+)/)?.[1] ??
    html.match(/Jackpot[\s\S]{0,200}?(€[\d,]+)/)?.[1] ??
    '',
)
const nextDraw = clean(html.match(/Next\s+draw:<\/strong>\s*([^<]+)/)?.[1] ?? '')
const playUrl =
  html.match(/href="([^"]+)"[^>]*>\s*Play Online Now/)?.[1] ??
  html.match(/lotto-play-button[\s\S]{0,200}?href="([^"]+)"/)?.[1] ??
  DRAWS_URL

const draws = []
for (const block of html.split('lotto-draw-block').slice(1)) {
  const date = block.match(/Draw -<\/strong>\s*([\d/]+)/)?.[1]
  if (!date) continue
  const jackpot = clean(block.match(/Jackpot - (€[\d,]+)/)?.[1] ?? '')
  const midSection = block.slice(0, block.indexOf('lotto-draw-bottom-section'))
  const jackpotWon = !/No Winner/i.test(midSection)
  const luckyDip = block.slice(block.indexOf('Lucky dip'))
  const winners = [...luckyDip.matchAll(/<li[^>]*>([^<]+)<\/li>/g)].map((m) => ({
    name: winnerName(m[1]),
    prize: 'Lucky Dip',
  }))
  const balls = block.slice(block.indexOf('lotto-balls'))
  const numbers = [...balls.matchAll(/<p>(\d+)<\/p>/g)].map((m) => Number(m[1]))
  draws.push({ date: longDate(date), numbers, jackpot, jackpotWon, winners })
}

if (!currentJackpot || draws.length === 0) {
  throw new Error('parsed nothing — page layout may have changed; lotto.json left untouched')
}

const out = new URL('../content/lotto.json', import.meta.url)
const existing = JSON.parse(readFileSync(out, 'utf8'))
const data = {
  currentJackpot,
  nextDraw,
  entriesClose: existing.entriesClose,
  playUrl,
  draws: draws.slice(0, MAX_DRAWS),
}
writeFileSync(out, JSON.stringify(data, null, 2) + '\n')

console.log(`synced from ${DRAWS_URL}: jackpot ${currentJackpot}, next draw ${nextDraw}`)
for (const d of data.draws)
  console.log(
    `  ${d.date} — [${d.numbers.join(', ')}] ${d.jackpot} ${d.jackpotWon ? 'WON' : 'no winner'}, ${d.winners.length} lucky dips`,
  )
