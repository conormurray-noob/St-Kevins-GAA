import { club, sponsorsPage } from '../content'
import { PageHeader, SectionHeading } from '../components/ui'

const TIER_ORDER = ['Main Club Sponsor', 'Sleeve Sponsor', 'Pitch Sponsor', 'Kit Partner', 'Club Partner']

export default function Sponsors() {
  const tiers = TIER_ORDER.filter((t) => sponsorsPage.sponsors.some((s) => s.tier === t))
  const main = sponsorsPage.sponsors.filter((s) => s.tier === 'Main Club Sponsor')

  return (
    <div>
      <PageHeader title="Our Sponsors" subtitle={sponsorsPage.intro} />
      <div className="mx-auto max-w-7xl px-4 py-14 space-y-14">
        {/* main sponsor hero card */}
        {main.map((s) => (
          <div key={s.name} className="bg-coal-950 text-white rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -right-20 top-0 bottom-0 w-96 sash-stripes opacity-25" />
            <div className="relative">
              <div className="text-club-400 font-bold uppercase tracking-[0.25em] text-sm">Main Club Sponsor</div>
              {s.logo ? (
                <img src={s.logo} alt={s.name} className="mt-5 h-20 bg-white rounded-xl p-3" />
              ) : (
                <div className="font-display text-5xl md:text-6xl uppercase mt-4">{s.name}</div>
              )}
              {s.description && <p className="mt-4 text-coal-300 max-w-xl">{s.description}</p>}
              {s.url && (
                <a href={s.url} target="_blank" rel="noreferrer" className="mt-5 inline-block bg-club-700 hover:bg-club-600 font-bold uppercase text-sm px-6 py-3 rounded-lg transition-colors">
                  Visit {s.name}
                </a>
              )}
            </div>
          </div>
        ))}

        {/* other tiers */}
        {tiers
          .filter((t) => t !== 'Main Club Sponsor')
          .map((tier) => (
            <section key={tier}>
              <SectionHeading>{tier}s</SectionHeading>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sponsorsPage.sponsors
                  .filter((s) => s.tier === tier)
                  .map((s) => (
                    <div key={s.name} className="bg-white rounded-2xl border border-coal-100 shadow-sm p-6">
                      {s.logo ? (
                        <img src={s.logo} alt={s.name} className="h-14 object-contain" />
                      ) : (
                        <div className="font-display text-xl uppercase text-coal-800">{s.name}</div>
                      )}
                      {s.description && <p className="text-sm text-coal-500 mt-2">{s.description}</p>}
                      {s.url && (
                        <a href={s.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-club-700 font-bold text-xs uppercase hover:underline">
                          Visit Website →
                        </a>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          ))}

        {/* become a sponsor */}
        <section className="bg-club-700 text-white rounded-3xl p-10 text-center">
          <h2 className="font-display text-3xl uppercase">Become a Sponsor</h2>
          <p className="mt-3 text-club-100 max-w-2xl mx-auto leading-relaxed">{sponsorsPage.becomeText}</p>
          <a
            href={`mailto:${club.email}?subject=${encodeURIComponent('Sponsorship enquiry')}`}
            className="mt-6 inline-block bg-coal-950 hover:bg-coal-800 font-bold uppercase tracking-wide px-8 py-3.5 rounded-xl transition-colors"
          >
            Talk to the Club
          </a>
        </section>
      </div>
    </div>
  )
}
