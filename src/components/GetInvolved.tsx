import { useState, type FormEvent } from 'react'
import { club } from '../content'

const INTERESTS = ['Playing', 'Coaching', 'Volunteering', 'Sponsorship', 'Community activities', 'Other']

export default function GetInvolved() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState(INTERESTS[0])
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const secretary = 'secretary.stkevins.kildare@gaa.ie'

  async function submit(e: FormEvent) {
    e.preventDefault()
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    if (!isLocal) {
      // Hosted on Netlify: submissions are captured by Netlify Forms and
      // forwarded to the secretary's email (configured in the Netlify dashboard).
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ 'form-name': 'get-involved', name, email, interest, message }).toString(),
        })
        setSent(true)
        return
      } catch {
        // fall through to mailto
      }
    }
    const body = `Name: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}`
    window.location.href = `mailto:${secretary}?subject=${encodeURIComponent(`Get Involved — ${name}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="bg-club-700 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h2 className="font-display text-3xl uppercase leading-tight">
            Get Involved —<br />Everyone Is Welcome
          </h2>
          <p className="mt-4 text-club-100 leading-relaxed">
            St. Kevin's GFC is your club. Whether it's playing, coaching, volunteering on match
            days, or helping with events and fundraising — there's a place for you, regardless of
            experience. Leave your details and someone from the club will be in touch.
          </p>
          <p className="mt-4 text-club-200 text-sm">
            Prefer to talk? Contact any committee member or email{' '}
            <a href={`mailto:${secretary}`} className="underline font-semibold">{secretary}</a>
            {' '}· {club.phone}
          </p>
        </div>

        {sent ? (
          <div className="bg-white/10 rounded-2xl p-10 text-center">
            <div className="font-display text-2xl uppercase">Thanks, {name.split(' ')[0] || 'you'}!</div>
            <p className="mt-2 text-club-100 text-sm">
              Your details are on their way to the club secretary. We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form
            name="get-involved"
            data-netlify="true"
            onSubmit={submit}
            className="bg-white rounded-2xl p-6 md:p-8 text-coal-900 shadow-xl space-y-4"
          >
            <input type="hidden" name="form-name" value="get-involved" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Name</span>
                <input
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 focus:outline-none focus:border-club-700"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 focus:outline-none focus:border-club-700"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-coal-500">I'm interested in</span>
              <select
                name="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 bg-white focus:outline-none focus:border-club-700"
              >
                {INTERESTS.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-coal-500">Anything else? (optional)</span>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-coal-200 px-3 py-2.5 focus:outline-none focus:border-club-700"
                placeholder="Tell us a bit about yourself…"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-club-700 hover:bg-club-600 text-white font-bold uppercase tracking-wide py-3 rounded-lg transition-colors"
            >
              Send to the Club
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
