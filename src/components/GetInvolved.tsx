import { useState, type FormEvent } from 'react'
import { club } from '../content'
import QrCode from './QrCode'

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
          {club.whatsappUrl && (
            <div className="mt-6 flex items-center gap-5 bg-white/10 rounded-2xl p-4 max-w-md">
              <QrCode value={club.whatsappUrl} size={104} />
              <div className="flex-1 min-w-0">
                <div className="font-display uppercase text-sm leading-tight">Club Notes on WhatsApp</div>
                <p className="text-club-100 text-xs mt-1 mb-3">
                  Scan the code with your phone camera, or tap the button.
                </p>
                <a
                  href={club.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />
                  </svg>
                  Join the group
                </a>
              </div>
            </div>
          )}
          {club.membershipUrl && (
            <div className="mt-4">
              {club.membershipUrl && (
                <a
                  href={club.membershipUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center bg-white text-club-700 hover:bg-club-50 font-bold px-5 py-3 rounded-lg transition-colors"
                >
                  Become a Member →
                </a>
              )}
            </div>
          )}
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
