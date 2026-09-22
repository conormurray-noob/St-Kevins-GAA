import { club, committee, documents, strategy } from '../content'
import { PageHeader, SectionHeading } from '../components/ui'
import GetInvolved from '../components/GetInvolved'

export default function ClubInfo() {
  const docCategories = [...new Set(documents.map((d) => d.category))]

  return (
    <div>
      <PageHeader
        title="Our Club"
        subtitle="Naomh Caoimhín — proudly representing North Kildare since 1945."
      />
      <div className="mx-auto max-w-7xl px-4 py-14 space-y-16">
        <section className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <SectionHeading>Who We Are</SectionHeading>
            <div className="space-y-4 text-coal-600 leading-relaxed">
              <p>
                Founded in {club.founded}, St. Kevin's GAA is the home of Gaelic games for
                Staplestown, Donadea, Coill Dubh, Cooleragh and Timahoe. From our Saturday-morning
                academy for the youngest members to our adult men's and ladies' teams, the club is
                built entirely by volunteers.
              </p>
              <p>
                Our grounds at Staplestown feature two full-size pitches, an all-weather astro,
                a floodlit community walkway and a clubhouse that hosts everything from team
                meetings to community events.
              </p>
              <p className="font-semibold text-coal-900">
                New players, coaches and volunteers are always welcome — no experience necessary.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 sash-stripes opacity-10 rounded-3xl" />
            <img
              src="/placeholders/ph-5.svg"
              alt="Club grounds"
              className="relative rounded-2xl shadow-lg w-full"
            />
          </div>
        </section>

        {/* Strategy */}
        <section>
          <SectionHeading
            action={
              <a
                href="/st-kevins-strategy-2026-2031.pdf"
                target="_blank"
                rel="noreferrer"
                className="bg-club-700 hover:bg-club-600 text-white font-bold uppercase text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                Download the Plan (PDF)
              </a>
            }
          >
            Our Strategy 2026–2031
          </SectionHeading>
          <p className="text-coal-600 max-w-3xl leading-relaxed">
            {strategy.vision} Shaped by our members at the March 2025 Town Hall, the plan is built
            on six pillars — click each one to see what we've committed to:
          </p>
          <div className="mt-6 space-y-3">
            {strategy.pillars.map((pillar, i) => (
              <details key={pillar.title} className="group bg-white rounded-xl border border-coal-100 shadow-sm open:ring-1 open:ring-club-200">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center gap-4">
                  <span className="font-display text-2xl text-club-200 group-open:text-club-700 w-8 shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    <span className="font-display uppercase block">{pillar.title}</span>
                    <span className="text-sm text-coal-500">{pillar.tagline}</span>
                  </span>
                  <span className="text-club-700 text-xl group-open:rotate-90 transition-transform shrink-0">›</span>
                </summary>
                <div className="border-t border-coal-100 px-5 py-5 grid gap-4 md:grid-cols-2">
                  {pillar.objectives.map((o) => (
                    <div key={o.title} className="bg-coal-50 rounded-lg p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-club-800">{o.title}</h4>
                      <p className="text-sm text-coal-600 mt-1.5 leading-relaxed">{o.text}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <p className="mt-4 text-sm text-coal-400">Values: {strategy.values}</p>
        </section>

        {/* Committee */}
        <section>
          <SectionHeading>Club Committee 2026</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {committee.map((m, i) => (
              <div key={i} className="bg-white rounded-xl border border-coal-100 shadow-sm p-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-club-700">{m.role}</div>
                <div className="font-bold mt-1">{m.name}</div>
                {m.email ? (
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs text-coal-500 hover:text-club-700 break-all mt-1 block"
                  >
                    {m.email}
                  </a>
                ) : (
                  <div className="text-xs text-coal-300 mt-1">email to be confirmed</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Club documents */}
        <section>
          <SectionHeading>Club Documents</SectionHeading>
          <p className="text-coal-600 max-w-3xl mb-6">
            Policies, forms and plans for members — from safeguarding statements to injury claim
            forms. If you can't find what you need, contact the secretary.
          </p>
          <div className="space-y-3 max-w-3xl">
            {docCategories.map((cat) => (
              <details key={cat} className="group bg-white rounded-xl border border-coal-100 shadow-sm">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between font-display uppercase">
                  {cat}
                  <span className="text-club-700 group-open:rotate-90 transition-transform">›</span>
                </summary>
                <ul className="border-t border-coal-100 divide-y divide-coal-50">
                  {documents
                    .filter((d) => d.category === cat)
                    .map((d) => (
                      <li key={d.title} className="px-5 py-3.5 flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-sm">{d.title}</div>
                          {d.note && <div className="text-xs text-coal-400 mt-0.5">{d.note}</div>}
                        </div>
                        {d.file ? (
                          <a
                            href={d.file}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 text-club-700 font-bold text-xs uppercase hover:underline mt-0.5"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="shrink-0 bg-coal-100 text-coal-400 text-[10px] font-bold uppercase px-2 py-1 rounded">
                            Coming soon
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        {/* Membership */}
        <section>
          <SectionHeading>Membership 2026</SectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Juvenile', '€60', 'U6 to U17, includes academy and Cúl Camp discount'],
              ['Adult Player', '€120', 'All adult teams, men’s and ladies’'],
              ['Family', '€150', 'Two adults and all children in one household'],
            ].map(([name, price, desc]) => (
              <div key={name} className="bg-white rounded-2xl border border-coal-100 shadow-sm p-6 text-center">
                <div className="font-display uppercase text-lg">{name}</div>
                <div className="font-display text-4xl text-club-700 my-3">{price}</div>
                <p className="text-sm text-coal-500">{desc}</p>
                <button className="mt-5 w-full bg-coal-950 hover:bg-coal-800 text-white font-bold uppercase text-sm py-2.5 rounded-lg transition-colors">
                  Join Now
                </button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-coal-400">Membership rates shown are placeholders — to be confirmed by the committee.</p>
        </section>

        {/* Contact */}
        <section>
          <SectionHeading>Get In Touch</SectionHeading>
          <div className="bg-coal-50 rounded-2xl p-8 grid gap-6 md:grid-cols-3 text-sm">
            <div>
              <div className="font-bold uppercase text-xs tracking-wider text-coal-400 mb-1">Grounds</div>
              {club.grounds}
            </div>
            <div>
              <div className="font-bold uppercase text-xs tracking-wider text-coal-400 mb-1">Email</div>
              <a href={`mailto:${club.email}`} className="text-club-700 font-semibold hover:underline">{club.email}</a>
            </div>
            <div>
              <div className="font-bold uppercase text-xs tracking-wider text-coal-400 mb-1">Phone</div>
              <a href={`tel:${club.phone}`} className="text-club-700 font-semibold hover:underline">{club.phone}</a>
            </div>
          </div>
        </section>
      </div>
      <GetInvolved />
    </div>
  )
}
