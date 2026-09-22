import type { ReactNode } from 'react'
import type { Fixture } from '../data'

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative bg-coal-950 text-white overflow-hidden">
      <div className="absolute inset-0 pitch-lines" />
      <div className="absolute -right-24 top-0 bottom-0 w-96 sash-stripes opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <h1 className="font-display text-4xl md:text-5xl uppercase">{title}</h1>
        {subtitle && <p className="mt-3 text-coal-300 max-w-2xl">{subtitle}</p>}
      </div>
      <div className="h-1.5 bg-club-700 relative" />
    </div>
  )
}

export function SectionHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <h2 className="font-display text-2xl md:text-3xl uppercase text-coal-950 border-l-4 border-club-700 pl-4">
        {children}
      </h2>
      {action}
    </div>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block bg-club-700 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
      {children}
    </span>
  )
}

export function FixtureCard({ fixture, result = false }: { fixture: Fixture; result?: boolean }) {
  const isKevins = (name: string) => name.includes("Kevin's")
  const teams: [string, string | undefined][] = [
    [fixture.home, fixture.homeScore],
    [fixture.away, fixture.awayScore],
  ]
  return (
    <div className="bg-white rounded-xl border border-coal-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between bg-coal-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-coal-500">
        <span>{fixture.competition}</span>
        <span>{fixture.team}</span>
      </div>
      <div className="px-4 py-4 space-y-2">
        {teams.map(([name, score]) => (
          <div key={name} className="flex items-center justify-between">
            <span className={`font-semibold ${isKevins(name) ? 'text-club-700' : 'text-coal-900'}`}>
              {name}
            </span>
            {result && (
              <span className="font-display text-lg tabular-nums">{score}</span>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-coal-100 px-4 py-2.5 text-xs text-coal-500 flex items-center justify-between">
        <span>{fixture.date}{fixture.time && ` · ${fixture.time}`}</span>
        <span className="font-semibold">{fixture.venue}</span>
      </div>
    </div>
  )
}

export function LottoBall({ n, small = false }: { n: number; small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-club-700 text-white font-display shadow-md ring-2 ring-club-900/20 ${
        small ? 'h-9 w-9 text-sm' : 'h-14 w-14 text-xl'
      }`}
    >
      {n}
    </span>
  )
}
