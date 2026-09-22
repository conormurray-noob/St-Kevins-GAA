import { lotto } from '../content'
import { LottoBall, PageHeader } from '../components/ui'

export default function Lotto() {
  const latest = lotto.draws[0]

  return (
    <div>
      <PageHeader
        title="Club Lotto"
        subtitle="Our weekly lotto is the club's biggest fundraiser — every ticket keeps the lights on and the pitches cut."
      />

      {/* Jackpot banner */}
      <div className="bg-club-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <div className="text-club-200 font-bold uppercase tracking-[0.25em] text-sm">This Week's Jackpot</div>
            <div className="font-display text-6xl md:text-7xl mt-2">{lotto.currentJackpot}</div>
            <div className="mt-4 text-club-100">
              Next draw: <strong>{lotto.nextDraw}</strong> · {lotto.entriesClose}
            </div>
          </div>
          <div className="md:text-right">
            <a
              href={lotto.playUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-coal-950 hover:bg-coal-800 font-bold uppercase tracking-wide px-8 py-4 rounded-xl transition-colors"
            >
              Play Online — €2 a line
            </a>
            <p className="mt-3 text-sm text-club-200">
              Tickets also available in local shops and at the clubhouse.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Latest draw */}
        <div className="bg-white rounded-2xl border border-coal-100 shadow-sm p-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-2xl uppercase">Latest Draw</h2>
            <span className="text-coal-400 text-sm">{latest.date}</span>
          </div>
          <div className="flex gap-3 mb-6">
            {latest.numbers.map((n) => (
              <LottoBall key={n} n={n} />
            ))}
          </div>
          <div className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${
            latest.jackpotWon ? 'bg-green-100 text-green-800' : 'bg-coal-100 text-coal-600'
          }`}>
            {latest.jackpotWon ? 'Jackpot won!' : 'No jackpot winner — it rolls over!'}
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-sm uppercase tracking-wide text-coal-500 mb-3">Lucky Dip Winners</h3>
            <ul className="space-y-2">
              {latest.winners.map((w) => (
                <li key={w.name} className="flex items-center justify-between border-b border-coal-100 pb-2 text-sm">
                  <span className="font-semibold">{w.name}</span>
                  <span className="text-club-700 font-bold">{w.prize}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Previous draws */}
        <h2 className="font-display text-xl uppercase mb-5">Previous Draws</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {lotto.draws.slice(1).map((draw) => (
            <div key={draw.date} className="bg-white rounded-xl border border-coal-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm">{draw.date}</span>
                <span className="text-xs text-coal-400">Jackpot {draw.jackpot}</span>
              </div>
              <div className="flex gap-2 mb-4">
                {draw.numbers.map((n) => (
                  <LottoBall key={n} n={n} small />
                ))}
              </div>
              <ul className="text-sm text-coal-500 space-y-1">
                {draw.winners.map((w) => (
                  <li key={w.name}>{w.name} — {w.prize}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 text-sm">
          {[
            ['How to Play', 'Pick 4 numbers from 1–30. Match all 4 to win the jackpot. €2 a line, 3 lines for €5.'],
            ['Where It Goes', 'Every euro raised goes directly to pitch maintenance, equipment and juvenile development.'],
            ['Annual Tickets', 'Never miss a draw — annual tickets (€90) available from any committee member.'],
          ].map(([title, body]) => (
            <div key={title} className="bg-coal-50 rounded-xl p-6">
              <h3 className="font-display uppercase mb-2">{title}</h3>
              <p className="text-coal-500">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
