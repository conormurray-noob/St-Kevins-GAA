// Pulls St. Kevin's fixtures & results from the official Kildare GAA website
// and writes them into content/fixtures.json (the file the site and /admin use).
//
//   npm run sync:fixtures
//
// Source: the club's team page on kildaregaa.ie, which server-renders every
// fixture and result grouped under date headers.
import { writeFileSync } from 'node:fs'

const TEAM_URL =
  'https://kildaregaa.ie/fixtures-results/team/st-kevins/798cebcc-b326-17ad-9412-3450fd131979/'
const OUR_NAME = "St Kevin's"
const MAX_FIXTURES = 12
const MAX_RESULTS = 8

const res = await fetch(TEAM_URL, { headers: { 'user-agent': 'StKevinsGAA-website-sync' } })
if (!res.ok) throw new Error(`kildaregaa.ie responded ${res.status}`)
const html = await res.text()

function section(id) {
  const start = html.indexOf(`id="${id}"`)
  if (start === -1) throw new Error(`section ${id} not found — page layout may have changed`)
  const end = html.indexOf('tab-pane', start + 1)
  return html.slice(start, end === -1 ? undefined : end)
}

const decode = (s) =>
  s
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// "Wednesday 5th Aug 2026" -> "Wed 5 Aug"
function shortDate(long) {
  const m = long.match(/(\w{3})\w* (\d+)\w{2} (\w{3})/)
  return m ? `${m[1]} ${m[2]} ${m[3]}` : long
}

const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 }

// "Wednesday 5th Aug 2026" -> "2026-08-05" (for the club calendar)
function isoDate(long) {
  const m = long.match(/(\d+)\w{2} (\w{3})\w* (\d{4})/)
  if (!m) return ''
  const [, d, mon, y] = m
  return `${y}-${String(MONTHS[mon]).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// Guess which of our teams is playing from the competition name
function teamLabel(competition) {
  const c = competition.toLowerCase()
  const grade = c.match(/\bu-?(\d+)\b/)
  if (grade) return `U${grade[1]}`
  if (c.includes('minor')) return 'Minor'
  if (c.includes('reserve')) return 'Reserves'
  if (c.includes('ladies') || c.includes('lgfa')) return 'Ladies'
  if (c.includes('junior')) return 'Junior'
  if (c.includes('senior')) return 'Senior Men'
  return 'Club'
}

function parseMatches(seg) {
  const matches = []
  // walk date headers and competition blocks in document order
  const token = /<h3 class="fix_res_date[^>]*>([^<]+)<\/h3>|<div class="competition">/g
  let currentDate = ''
  let currentIso = ''
  let m
  while ((m = token.exec(seg))) {
    if (m[1]) {
      const long = decode(m[1])
      currentDate = shortDate(long)
      currentIso = isoDate(long)
      continue
    }
    const block = seg.slice(m.index, seg.indexOf('more_info', m.index) + 900)
    const grab = (re) => {
      const hit = block.match(re)
      return hit ? decode(hit[1]) : ''
    }
    const competition = grab(/competition-name[^>]*>\s*<a[^>]*>\s*([^<]+)/)
    const home = grab(/home_team[\s\S]*?<a[^>]*>\s*([^<]+)/) || grab(/home_team[^>]*>\s*([^<]+)/)
    const away = grab(/away_team[\s\S]*?<a[^>]*>\s*([^<]+)/) || grab(/away_team[^>]*>\s*([^<]+)/)
    if (!home || !away) continue
    if (!home.includes('Kevin') && !away.includes('Kevin')) continue
    matches.push({
      competition,
      team: teamLabel(competition),
      home: home.replace(OUR_NAME, "St. Kevin's"),
      away: away.replace(OUR_NAME, "St. Kevin's"),
      date: currentDate,
      iso: currentIso,
      time: grab(/class="time[^>]*>\s*([^<]+)/),
      venue: grab(/Venue:<\/strong>\s*<a[^>]*>([^<]+)/) || 'TBC',
      homeScore: grab(/home_score[^>]*>\s*([^<]+)/),
      awayScore: grab(/away_score[^>]*>\s*([^<]+)/),
    })
  }
  return matches
}

const fixtures = parseMatches(section('fixtures-list'))
  .slice(0, MAX_FIXTURES)
  .map(({ homeScore, awayScore, ...f }) => f)

const results = parseMatches(section('results-list'))
  .slice(0, MAX_RESULTS)
  .map(({ time, ...r }) => r)

if (fixtures.length + results.length === 0) {
  throw new Error('parsed nothing — page layout may have changed; fixtures.json left untouched')
}

const out = new URL('../content/fixtures.json', import.meta.url)
writeFileSync(out, JSON.stringify({ fixtures, results }, null, 2) + '\n')
console.log(
  `synced from kildaregaa.ie: ${fixtures.length} fixtures, ${results.length} results`,
)
for (const f of fixtures) console.log(`  FIX ${f.date} ${f.time} — ${f.home} v ${f.away} (${f.competition})`)
for (const r of results) console.log(`  RES ${r.date} — ${r.home} ${r.homeScore} v ${r.awayScore} ${r.away}`)
