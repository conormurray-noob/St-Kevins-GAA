import { useState } from 'react'
import { fixtures, results } from '../content'
import { FixtureCard, PageHeader } from '../components/ui'

export default function Fixtures() {
  const [tab, setTab] = useState<'fixtures' | 'results'>('fixtures')
  const [code, setCode] = useState<'All' | 'Men' | 'Ladies'>('All')
  const list = (tab === 'fixtures' ? fixtures : results).filter(
    (f) => code === 'All' || (f.code ?? 'Men') === code,
  )

  return (
    <div>
      <PageHeader
        title="Fixtures & Results"
        subtitle="All upcoming games and recent results across every St. Kevin's team."
      />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="inline-flex rounded-lg border border-coal-200 overflow-hidden">
            {(['fixtures', 'results'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                  tab === t ? 'bg-club-700 text-white' : 'bg-white text-coal-500 hover:bg-coal-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-lg border border-coal-200 overflow-hidden">
            {(['All', 'Men', 'Ladies'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCode(c)}
                className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                  code === c
                    ? c === 'Ladies'
                      ? 'bg-pink-600 text-white'
                      : 'bg-coal-950 text-white'
                    : 'bg-white text-coal-500 hover:bg-coal-50'
                }`}
              >
                {c === 'Men' ? "Men's" : c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((f) => (
            <FixtureCard key={f.id} fixture={f} result={tab === 'results'} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-coal-400">No {code === 'Ladies' ? 'ladies' : "men's"} {tab} listed right now.</p>
        )}

        <p className="mt-10 text-sm text-coal-400">
          Fixtures are subject to change — check the official{' '}
          <a
            href="https://kildaregaa.ie/clubs/st-kevins/"
            target="_blank"
            rel="noreferrer"
            className="text-club-700 font-semibold hover:underline"
          >
            Kildare GAA
          </a>{' '}
          listings before travelling.
        </p>
      </div>
    </div>
  )
}
