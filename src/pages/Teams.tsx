import { club, teams, teamsIntro } from '../content'
import type { Team } from '../data'
import { PageHeader, SectionHeading } from '../components/ui'

const SECTION_ORDER = ['Adult', 'Juvenile', 'Academy', 'Recreational']

const CODE_STYLE: Record<Team['code'], string> = {
  Men: 'bg-coal-900 text-white',
  Ladies: 'bg-pink-600 text-white',
  Mixed: 'bg-club-700 text-white',
}

function isPlaceholder(name: string) {
  return /\bTBC\b/i.test(name)
}

export default function Teams() {
  const sections = [
    ...SECTION_ORDER.filter((s) => teams.some((t) => t.section === s)),
    ...[...new Set(teams.map((t) => t.section))].filter((s) => !SECTION_ORDER.includes(s)),
  ]

  return (
    <div>
      <PageHeader title="Teams & Mentors" subtitle={teamsIntro} />
      <div className="mx-auto max-w-7xl px-4 py-14 space-y-14">
        {sections.map((section) => (
          <section key={section}>
            <SectionHeading>{section}</SectionHeading>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {teams
                .filter((t) => t.section === section)
                .map((team) => (
                  <div key={team.name} className="bg-white rounded-2xl border border-coal-100 shadow-sm p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display uppercase text-lg leading-tight">{team.name}</h3>
                      <span className={`shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded ${CODE_STYLE[team.code]}`}>
                        {team.code}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {team.mentors.map((m, i) => (
                        <li key={i} className="text-sm">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-club-700">{m.role}</div>
                          <div className={`font-semibold ${isPlaceholder(m.name) ? 'text-coal-300' : 'text-coal-900'}`}>
                            {m.name}
                          </div>
                          {m.phone && (
                            <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="block text-coal-500 hover:text-club-700">
                              {m.phone}
                            </a>
                          )}
                          {m.email && (
                            <a href={`mailto:${m.email}`} className="block text-coal-500 hover:text-club-700 break-all">
                              {m.email}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>
        ))}

        <div className="bg-coal-50 rounded-2xl p-8 text-center">
          <h2 className="font-display text-xl uppercase">Can't find who you need?</h2>
          <p className="text-sm text-coal-500 mt-2">
            Contact the club secretary at{' '}
            <a href="mailto:secretary.stkevins.kildare@gaa.ie" className="text-club-700 font-semibold hover:underline">
              secretary.stkevins.kildare@gaa.ie
            </a>{' '}
            or call {club.phone} and we'll put you in touch.
          </p>
        </div>
      </div>
    </div>
  )
}
