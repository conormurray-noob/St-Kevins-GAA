import { bookingEmail, facilities, facilitiesIntro } from '../content'
import { PageHeader } from '../components/ui'

export default function Bookings() {
  const requestLink = (facility: string) =>
    `mailto:${bookingEmail}?subject=${encodeURIComponent(`Booking request: ${facility}`)}&body=${encodeURIComponent(
      `Hi,\n\nI'd like to book the ${facility}.\n\nName / club / group:\nDate and time:\nDuration:\nContact number:\n\nThanks!`,
    )}`

  return (
    <div>
      <PageHeader title="Facilities & Bookings" subtitle={facilitiesIntro} />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <div key={f.name} className="bg-white rounded-2xl border border-coal-100 shadow-sm p-6 flex flex-col">
              <h2 className="font-display text-lg uppercase">{f.name}</h2>
              <p className="text-sm text-coal-500 mt-2 flex-1">{f.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-club-700">{f.rate}</span>
              </div>
              {f.note && <p className="text-xs text-coal-400 mt-1">{f.note}</p>}
              <a
                href={requestLink(f.name)}
                className="mt-4 block text-center bg-coal-950 hover:bg-coal-800 text-white font-bold uppercase text-sm py-2.5 rounded-lg transition-colors"
              >
                Request Booking
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-coal-950 text-white rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute -right-16 top-0 bottom-0 w-64 sash-stripes opacity-20" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-xl uppercase">Online Booking — Coming Soon</h2>
            <p className="mt-2 text-coal-300 text-sm leading-relaxed">
              We're building instant online booking with a live availability calendar and card
              payment for external hire (Stripe). Until then, booking requests go by email and are
              confirmed by the club — club teams continue to book through their coach or team
              administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
