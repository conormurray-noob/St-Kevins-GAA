import { useState, type FormEvent } from 'react'
import { bookingEmail, facilities } from '../content'

// Booking-request form: on the live site submissions go through Netlify Forms
// (emailed to the club); locally it falls back to the visitor's email app.
export default function BookingRequest() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [facility, setFacility] = useState(facilities[0]?.name ?? 'AstroTurf Pitch')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [sent, setSent] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    if (!isLocal) {
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'booking-request',
            name,
            contact,
            facility,
            date,
            time,
            notes,
          }).toString(),
        })
        setSent(true)
        return
      } catch {
        // fall through to mailto
      }
    }
    const body = `Booking request\n\nName: ${name}\nContact: ${contact}\nFacility: ${facility}\nDate: ${date}\nTime: ${time}\nNotes: ${notes}`
    window.location.href = `mailto:${bookingEmail}?subject=${encodeURIComponent(`Booking request: ${facility} ${date}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-coal-100 shadow-sm p-8 text-center">
        <div className="font-display text-xl uppercase">Request Sent</div>
        <p className="text-sm text-coal-500 mt-2">
          Thanks {name.split(' ')[0] || ''} — the club will confirm availability with you directly.
          Confirmed bookings appear on this calendar.
        </p>
      </div>
    )
  }

  return (
    <form
      name="booking-request"
      data-netlify="true"
      onSubmit={submit}
      className="bg-white rounded-2xl border border-coal-100 shadow-sm p-6 md:p-8"
    >
      <input type="hidden" name="form-name" value="booking-request" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Your name / team / club</span>
          <input
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 focus:outline-none focus:border-club-700"
            placeholder="e.g. Prosperous FC seniors"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Email or phone</span>
          <input
            required
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 focus:outline-none focus:border-club-700"
            placeholder="How do we reach you?"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Facility</span>
          <select
            name="facility"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 bg-white focus:outline-none focus:border-club-700"
          >
            {facilities.map((f) => (
              <option key={f.name}>{f.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Date</span>
          <input
            required
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 bg-white focus:outline-none focus:border-club-700"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Time</span>
          <input
            required
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 focus:outline-none focus:border-club-700"
            placeholder="e.g. 19:00 – 20:00"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Notes (optional)</span>
          <input
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 focus:outline-none focus:border-club-700"
            placeholder="Training, match, event…"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-5 bg-club-700 hover:bg-club-600 text-white font-bold uppercase tracking-wide px-8 py-3 rounded-lg transition-colors"
      >
        Request This Slot
      </button>
      <p className="mt-3 text-xs text-coal-400">
        Requests go to the club for approval — check the calendar above for clashes before asking.
      </p>
    </form>
  )
}
