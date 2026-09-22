import { useMemo, useState } from 'react'
import { events, fixtures, schedule } from '../content'
import { PageHeader } from '../components/ui'

interface CalEntry {
  time: string
  label: string
  detail: string
  venue: VenueKey
  isMatch?: boolean
}

// Colour-coding by the space each slot occupies
const VENUE_STYLE = {
  'Main Pitch': 'bg-club-700 text-white',
  'Back Pitch': 'bg-amber-500 text-coal-950',
  'Training Pitch': 'bg-emerald-600 text-white',
  Astro: 'bg-sky-600 text-white',
  Hall: 'bg-violet-600 text-white',
  Clubhouse: 'bg-coal-800 text-white',
  'Away / Other': 'bg-coal-100 text-coal-600',
} as const

type VenueKey = keyof typeof VENUE_STYLE

function venueKey(venue: string): VenueKey {
  const v = venue.toLowerCase()
  if (v.includes('astro')) return 'Astro'
  if (v.includes('hall')) return 'Hall'
  if (v.includes('back')) return 'Back Pitch'
  if (v.includes('training') || v.includes('pitch 2') || v.includes('small')) return 'Training Pitch'
  if (v.includes('saints') || v.includes('bar') || v.includes('restaurant') || v.includes('clubhouse')) return 'Clubhouse'
  if (v.includes('main') || v.includes('kevin') || v.includes('staplestown')) return 'Main Pitch'
  return 'Away / Other'
}

// "19:30 – 21:00" -> sortable minutes; entries without a time sink to the end
function timeSort(t: string): number {
  const m = t.match(/(\d{1,2}):(\d{2})/)
  return m ? Number(m[1]) * 60 + Number(m[2]) : 24 * 60
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TRAINING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function Calendar() {
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [showTraining, setShowTraining] = useState(true)

  const monthLabel = month.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })
  const todayIso = iso(new Date())

  // build a map of date -> entries for the displayed month
  const entriesByDay = useMemo(() => {
    const map = new Map<string, CalEntry[]>()
    const add = (day: string, entry: CalEntry) => {
      if (!map.has(day)) map.set(day, [])
      map.get(day)!.push(entry)
    }

    for (const f of fixtures) {
      if (!f.iso) continue
      const isHome = f.home.includes("Kevin's")
      add(f.iso, {
        time: f.time ?? '',
        label: `${f.team} ${isHome ? 'v ' + f.away : '@ ' + f.home}`,
        detail: `MATCH · ${f.competition} · ${f.time ?? 'time TBC'} · ${f.venue}`,
        venue: isHome ? venueKey(f.venue) : 'Away / Other',
        isMatch: true,
      })
    }
    for (const e of events) {
      add(e.date, {
        time: e.time ?? '',
        label: e.title,
        detail: [e.type, e.time ?? 'time TBC', e.venue].filter(Boolean).join(' · '),
        venue: venueKey(e.venue ?? ''),
      })
    }
    if (showTraining) {
      const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(month.getFullYear(), month.getMonth(), d)
        const dayName = DAY_NAMES[date.getDay()]
        for (const s of schedule.filter((s) => s.day === dayName)) {
          add(iso(date), {
            time: s.time.split('–')[0].trim(),
            label: s.team,
            detail: `Training · ${s.time} · ${s.venue}`,
            venue: venueKey(s.venue),
          })
        }
      }
    }
    for (const list of map.values()) {
      list.sort((a, b) => timeSort(a.time) - timeSort(b.time))
    }
    return map
  }, [month, showTraining])

  // calendar grid: leading blanks (Monday-first) + days
  const firstWeekday = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const changeMonth = (delta: number) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1))

  return (
    <div>
      <PageHeader
        title="Club Calendar"
        subtitle="Everything happening at St. Kevin's in one place — matches, training, bookings, and community events."
      />
      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => changeMonth(-1)}
              className="h-10 w-10 rounded-lg border border-coal-200 hover:border-club-700 hover:text-club-700 font-bold"
              aria-label="Previous month"
            >
              ←
            </button>
            <h2 className="font-display text-2xl uppercase w-56 text-center">{monthLabel}</h2>
            <button
              onClick={() => changeMonth(1)}
              className="h-10 w-10 rounded-lg border border-coal-200 hover:border-club-700 hover:text-club-700 font-bold"
              aria-label="Next month"
            >
              →
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-coal-500 cursor-pointer">
            <input
              type="checkbox"
              checked={showTraining}
              onChange={(e) => setShowTraining(e.target.checked)}
              className="accent-club-700 h-4 w-4"
            />
            Show weekly training
          </label>
        </div>

        {/* legend: colour = which space the slot occupies */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold">
          <span className="text-coal-400 uppercase tracking-wider mr-1">Colour = location:</span>
          {(Object.keys(VENUE_STYLE) as VenueKey[]).map((v) => (
            <span key={v} className={`px-2 py-0.5 rounded ${VENUE_STYLE[v]}`}>{v}</span>
          ))}
        </div>

        {/* month grid */}
        <div className="rounded-2xl border border-coal-100 overflow-hidden shadow-sm overflow-x-auto">
          <div className="min-w-[840px]">
            <div className="grid grid-cols-7 bg-coal-950 text-white text-xs font-bold uppercase tracking-wider">
              {WEEKDAYS.map((d) => (
                <div key={d} className="px-3 py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (day === null) return <div key={i} className="bg-coal-50 min-h-28 border-b border-r border-coal-100" />
                const dayIso = iso(new Date(month.getFullYear(), month.getMonth(), day))
                const dayEntries = entriesByDay.get(dayIso) ?? []
                const isToday = dayIso === todayIso
                return (
                  <div key={i} className={`min-h-28 border-b border-r border-coal-100 p-1.5 ${isToday ? 'bg-club-50' : 'bg-white'}`}>
                    <div className={`text-xs font-bold mb-1 ${isToday ? 'text-club-700' : 'text-coal-400'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEntries.slice(0, 4).map((e, j) => (
                        <div
                          key={j}
                          title={`${e.label} — ${e.detail}`}
                          className={`px-1.5 py-0.5 rounded text-[10px] leading-tight truncate ${VENUE_STYLE[e.venue]} ${e.isMatch ? 'font-extrabold uppercase' : 'font-semibold'}`}
                        >
                          {e.time && <span className="tabular-nums font-bold">{e.time} </span>}
                          {e.label}
                        </div>
                      ))}
                      {dayEntries.length > 4 && (
                        <div className="text-[10px] font-bold text-coal-400 px-1">+{dayEntries.length - 4} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-coal-400">
          Matches (in CAPS) come automatically from Kildare GAA fixtures. Bookings and events are
          added by club admins; weekly training repeats from the schedule below. Hover any entry
          for full details.
        </p>

        {/* weekly training schedule */}
        <h2 className="font-display text-2xl uppercase mt-14 mb-6 border-l-4 border-club-700 pl-4">
          Weekly Training Schedule
        </h2>
        <div className="space-y-8">
          {TRAINING_DAYS.map((day) => {
            const sessions = schedule.filter((s) => s.day === day)
            if (sessions.length === 0) return null
            return (
              <div key={day}>
                <h3 className="font-bold uppercase text-sm tracking-wider text-coal-500 mb-3">{day}</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sessions.map((s) => (
                    <div
                      key={`${s.day}-${s.team}`}
                      className="bg-white rounded-xl border border-coal-100 shadow-sm p-5 flex items-start justify-between gap-4"
                    >
                      <div>
                        <div className="font-bold">{s.team}</div>
                        <div className="text-sm text-coal-500 mt-1">{s.venue} · Coach {s.coach}</div>
                      </div>
                      <span className="shrink-0 bg-club-50 text-club-800 text-xs font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                        {s.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
