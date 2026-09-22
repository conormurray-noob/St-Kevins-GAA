import { useState } from 'react'
import { saints } from '../content'
import { PageHeader, SectionHeading } from '../components/ui'

export default function Saints() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div>
      <PageHeader title="Saints Bar and Restaurant" subtitle={saints.intro} />

      {/* hours strip */}
      <div className="bg-club-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm font-semibold">{saints.hours}</div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 space-y-16">
        {/* opening hours */}
        <section>
          <SectionHeading>Opening Hours</SectionHeading>
          <div className="max-w-md bg-white rounded-2xl border border-coal-100 shadow-sm divide-y divide-coal-50">
            {saints.openingHours.map((h) => (
              <div key={h.days} className="flex items-center justify-between px-6 py-3.5 text-sm">
                <span className="font-bold">{h.days}</span>
                <span className="text-coal-500 tabular-nums">{h.times}</span>
              </div>
            ))}
          </div>
        </section>

        {/* photos */}
        <section>
          <SectionHeading>Have a Look Around</SectionHeading>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {saints.photos.map((p, i) => (
              <button key={p.image} onClick={() => setLightbox(i)} className="group relative overflow-hidden rounded-xl">
                <img
                  src={p.image}
                  alt={p.caption}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-coal-950/80 to-transparent text-white text-xs font-semibold p-2.5 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.caption}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-coal-400">Placeholder photos — swap in real bar and restaurant shots via the admin.</p>
        </section>

        {/* menu */}
        <section>
          <SectionHeading>Menu</SectionHeading>
          <p className="text-sm text-coal-400 mb-6">{saints.menuNote}</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {saints.menu.map((section) => (
              <div key={section.section} className="bg-white rounded-2xl border border-coal-100 shadow-sm p-6">
                <h3 className="font-display uppercase text-lg border-b-2 border-club-700 pb-2 mb-4">
                  {section.section}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="font-display text-club-700">{item.price}</span>
                      </div>
                      {item.description && (
                        <div className="text-xs text-coal-400 mt-0.5">{item.description}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* bookings & contact */}
        <section>
          <SectionHeading>Book the Bar or Restaurant</SectionHeading>
          <p className="text-coal-600 max-w-3xl mb-6">
            Saints Bar and Restaurant is available for parties, celebrations, fundraisers and
            events — with catering and entertainment options. To book a table or talk about an
            event, contact the managers directly:
          </p>
          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl">
            {saints.managers.map((m) => (
              <div key={m.name} className="bg-coal-950 text-white rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -right-10 top-0 bottom-0 w-32 sash-stripes opacity-20" />
                <div className="relative">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-club-400">{m.role}</div>
                  <div className="font-display text-xl uppercase mt-1">{m.name}</div>
                  {m.phone.match(/\d/) ? (
                    <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="mt-2 inline-block font-bold text-club-300 hover:text-white">
                      {m.phone}
                    </a>
                  ) : (
                    <div className="mt-2 text-coal-400 text-sm">{m.phone}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-coal-950/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full">
            <img
              src={saints.photos[lightbox].image}
              alt={saints.photos[lightbox].caption}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="text-center text-white mt-4 font-semibold">{saints.photos[lightbox].caption}</div>
          </div>
        </div>
      )}
    </div>
  )
}
