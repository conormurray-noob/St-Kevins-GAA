// Pulls real club lotto results from the club's ClubZap site (stkevinsgfc.ie)
// and writes them into content/lotto.json.
//
//   npm run sync:lotto
//
// Scrapes: current jackpot, next draw date, play-online link, and the recent
// draw history (date, jackpot, winner status, lucky dips, winning numbers).
// The `entriesClose` line is left as set in /admin.
import { readFileSync, writeFileSync } from 'node:fs'

// ClubZap's own address — keeps working after stkevinsgfc.ie moves to the new site
const DRAWS_URL = 'https://stkevinsgfckildare.clubzap.com/draws'
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

const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 }

// ClubZap has used both "07/07/2026" and "10 Nov 2026" -> "Tuesday 7 July 2026"
function longDate(raw) {
  let d, m, y
  const numeric = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  const named = raw.match(/^(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})$/)
  if (numeric) [d, m, y] = [Number(numeric[1]), Number(numeric[2]) - 1, Number(numeric[3])]
  else if (named && MONTHS[named[2].toLowerCase()] !== undefined)
    [d, m, y] = [Number(named[1]), MONTHS[named[2].toLowerCase()], Number(named[3])]
  else throw new Error(`unrecognised draw date "${raw}" — page layout may have changed; lotto.json left untouched`)
  return new Date(Date.UTC(y, m, d)).toLocaleDateString('en-IE', {
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
  const date = clean(block.match(/Draw -<\/strong>\s*([^<]+)/)?.[1] ?? '')
  if (!date) continue
  const jackpot = clean(block.match(/Jackpot - (€[\d,]+)/)?.[1] ?? '')
  // The first list after the jackpot says who won it: "No Winner" / "No jackpot winner"
  // or the winner's name. Only treat it as won when there's a name.
  const jackpotList = block.slice(block.indexOf('Jackpot -')).match(/<ul[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? ''
  const jackpotEntry = clean(jackpotList.replace(/<[^>]+>/g, ' '))
  const jackpotWon = jackpotEntry !== '' && !/\bno\b.*\bwinner\b/i.test(jackpotEntry)
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
