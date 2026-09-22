import { type Page } from '../data'
import { news, fixtures, results, lotto, sponsors, socialPosts } from '../content'
import { Badge, FixtureCard, LottoBall, SectionHeading } from '../components/ui'

export default function Home({ navigate }: { navigate: (p: Page) => void }) {
  const featured = news.find((n) => n.featured) ?? news[0]
  const nextFixture = fixtures[0]
  const latestDraw = lotto.draws[0]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-coal-950 text-white overflow-hidden">
        <div className="absolute inset-0 pitch-lines" />
        <div className="absolute inset-0 bg-gradient-to-br from-club-950/80 via-transparent to-transparent" />
        <div className="absolute -right-20 top-0 bottom-0 w-[28rem] sash-stripes opacity-25 -skew-x-6" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img src="crest-clubzap.png" alt="Club crest" className="h-20 w-20 rounded-full bg-white p-1 shadow-xl" />
              <span className="text-club-400 font-semibold uppercase tracking-[0.25em] text-sm">
                Est. 1945 · Staplestown, Kildare
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95]">
              One Club.<br />
              <span className="text-club-600">One Community.</span>
            </h1>
            <p className="mt-6 text-lg text-coal-200 max-w-xl">
              Gaelic football for all ages in the heart of North Kildare — from the
              Saturday-morning academy to championship Sundays.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('fixtures')}
                className="bg-club-700 hover:bg-club-600 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-lg transition-colors"
              >
                Fixtures & Results
              </button>
              <button
                onClick={() => navigate('club')}
                className="border-2 border-white/30 hover:border-white text-white font-bold uppercase tracking-wide px-6 py-3 rounded-lg transition-colors"
              >
                Join the Club
              </button>
            </div>
          </div>

          {/* Next fixture panel */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-club-400 mb-4">Next Fixture</div>
            <div className="text-sm text-coal-300 mb-1">{nextFixture.competition}</div>
            <div className="font-display text-2xl uppercase leading-snug">
              {nextFixture.home} <span className="text-club-500">v</span> {nextFixture.away}
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-coal-200">
              <span className="bg-club-700 text-white font-bold px-3 py-1 rounded">{nextFixture.date}</span>
              <span>{nextFixture.time}</span>
              <span>· {nextFixture.venue}</span>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-club-400 mb-2">Latest Result</div>
              <div className="text-sm">
                {results[0].home} <span className="font-display">{results[0].homeScore}</span> — {' '}
                <span className="font-display">{results[0].awayScore}</span> {results[0].away}
              </div>
              <div className="text-xs text-coal-400 mt-1">{results[0].competition} · {results[0].venue}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lotto strip */}
      <section className="bg-club-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display uppercase">Club Lotto Jackpot</span>
            <span className="font-display text-3xl">{lotto.currentJackpot}</span>
            <div className="hidden sm:flex gap-1.5">
              {latestDraw.numbers.map((n) => (
                <LottoBall key={n} n={n} small />
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate('lotto')}
            className="bg-coal-950 hover:bg-coal-800 font-bold uppercase text-sm tracking-wide px-5 py-2.5 rounded-lg transition-colors"
          >
            Play & Results →
          </button>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          action={
            <button onClick={() => navigate('news')} className="text-club-700 font-bold text-sm uppercase hover:underline">
              All News →
            </button>
          }
        >
          Latest News
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr_1fr]">
          <article
            className="group relative rounded-2xl overflow-hidden min-h-[320px] cursor-pointer"
            onClick={() => navigate('news')}
          >
            <img
              src={featured.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coal-950 via-coal-950/40 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <Badge>{featured.category}</Badge>
              <h3 className="font-display text-2xl text-white uppercase mt-3 leading-tight">{featured.title}</h3>
              <p className="text-coal-200 text-sm mt-2 line-clamp-2">{featured.excerpt}</p>
            </div>
          </article>
          {news.slice(1, 3).map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl border border-coal-100 shadow-sm overflow-hidden cursor-pointer"
              onClick={() => navigate('news')}
            >
              <div className="overflow-hidden h-40">
                <img
                  src={article.image}
                  alt=""
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <Badge>{article.category}</Badge>
                <h3 className="font-bold text-lg mt-3 leading-snug group-hover:text-club-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-coal-500 mt-2 line-clamp-3">{article.excerpt}</p>
                <div className="text-xs text-coal-400 mt-3">{article.date}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Fixtures preview */}
      <section className="bg-coal-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            action={
              <button onClick={() => navigate('fixtures')} className="text-club-700 font-bold text-sm uppercase hover:underline">
                All Fixtures →
              </button>
            }
          >
            Upcoming Fixtures
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fixtures.map((f) => (
              <FixtureCard key={f.id} fixture={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Social preview */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          action={
            <button onClick={() => navigate('social')} className="text-club-700 font-bold text-sm uppercase hover:underline">
              Social Wall →
            </button>
          }
        >
          From Our Socials
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          {socialPosts.slice(0, 3).map((post, i) => (
            <div key={i} className="bg-white rounded-2xl border border-coal-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <img src="crest-clubzap.png" alt="" className="h-9 w-9 rounded-full bg-white ring-1 ring-coal-100" />
                <div className="text-sm">
                  <div className="font-bold">{post.author}</div>
                  <div className="text-coal-400 text-xs">{post.handle} · {post.date}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{post.text}</p>
              {post.image && (
                <img src={post.image} alt="" className="mt-3 rounded-xl w-full h-44 object-cover" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section className="border-t border-coal-100">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="text-center text-xs font-bold uppercase tracking-[0.25em] text-coal-400 mb-6">
            Proudly Supported By
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {sponsors.map((s) => (
              <span key={s} className="font-display text-coal-300 text-lg uppercase">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
