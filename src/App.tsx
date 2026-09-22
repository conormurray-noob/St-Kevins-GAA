import { useEffect, useState } from 'react'
import { type Page } from './data'
import { club } from './content'
import Home from './pages/Home'
import News from './pages/News'
import Fixtures from './pages/Fixtures'
import Calendar from './pages/Calendar'
import Lotto from './pages/Lotto'
import Gallery from './pages/Gallery'
import Social from './pages/Social'
import Community from './pages/Community'
import Saints from './pages/Saints'
import Bookings from './pages/Bookings'
import Sponsors from './pages/Sponsors'
import ClubInfo from './pages/ClubInfo'

interface NavLink {
  page: Page
  label: string
}

interface NavGroup {
  label: string
  page?: Page
  children?: NavLink[]
}

const NAV: NavGroup[] = [
  { label: 'Home', page: 'home' },
  {
    label: 'News & Media',
    children: [
      { page: 'news', label: 'News' },
      { page: 'social', label: 'Social Wall' },
      { page: 'gallery', label: 'Gallery' },
    ],
  },
  {
    label: 'Games',
    children: [
      { page: 'fixtures', label: 'Fixtures & Results' },
      { page: 'calendar', label: 'Club Calendar' },
    ],
  },
  { label: 'Lotto', page: 'lotto' },
  {
    label: 'Community',
    children: [
      { page: 'community', label: 'Community' },
      { page: 'saints', label: 'Saints Bar & Restaurant' },
      { page: 'bookings', label: 'Facilities & Bookings' },
    ],
  },
  {
    label: 'Our Club',
    children: [
      { page: 'club', label: 'About & Committee' },
      { page: 'sponsors', label: 'Sponsors' },
    ],
  },
]

const ALL_LINKS: NavLink[] = NAV.flatMap((g) => (g.children ? g.children : [{ page: g.page!, label: g.label }]))

function pageFromHash(): Page {
  const hash = window.location.hash.replace('#/', '')
  if (hash === 'schedule') return 'calendar' // old link alias
  return (ALL_LINKS.find((n) => n.page === hash)?.page ?? 'home') as Page
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash())
      setMenuOpen(false)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (p: Page) => {
    window.location.hash = `/${p}`
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top ribbon */}
      <div className="bg-club-700 text-white text-xs font-semibold tracking-wide">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex items-center justify-between">
          <span className="uppercase">Founded {club.founded} · {club.grounds}</span>
          <div className="flex items-center gap-4">
            <a href={club.twitter} target="_blank" rel="noreferrer" className="hover:text-club-200">X / Twitter</a>
            <a href={club.facebook} target="_blank" rel="noreferrer" className="hover:text-club-200">Facebook</a>
            <a href={club.instagram} target="_blank" rel="noreferrer" className="hover:text-club-200">Instagram</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-coal-950 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between py-3">
            <button onClick={() => navigate('home')} className="flex items-center gap-3 text-left">
              <img src="crest-clubzap.png" alt="St. Kevin's GAA crest" className="h-12 w-12 rounded-full bg-white p-0.5" />
              <div>
                <div className="font-display text-lg leading-tight uppercase">St. Kevin's GAA</div>
                <div className="text-[11px] text-coal-300 tracking-widest uppercase">{club.irishName}</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative group">
                    <button
                      className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide rounded transition-colors flex items-center gap-1.5 ${
                        item.children.some((c) => c.page === page)
                          ? 'bg-club-700 text-white'
                          : 'text-coal-200 hover:text-white hover:bg-coal-800'
                      }`}
                    >
                      {item.label}
                      <svg className="h-3 w-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 top-full pt-1 hidden group-hover:block group-focus-within:block z-50">
                      <div className="bg-coal-900 border border-coal-800 rounded-xl shadow-2xl overflow-hidden min-w-56">
                        {item.children.map((c) => (
                          <button
                            key={c.page}
                            onClick={() => navigate(c.page)}
                            className={`block w-full text-left px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                              page === c.page ? 'bg-club-700 text-white' : 'text-coal-200 hover:bg-coal-800 hover:text-white'
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.page}
                    onClick={() => navigate(item.page!)}
                    className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide rounded transition-colors ${
                      page === item.page
                        ? 'bg-club-700 text-white'
                        : 'text-coal-200 hover:text-white hover:bg-coal-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ),
              )}
            </nav>

            <button
              className="lg:hidden p-2 text-coal-200 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden border-t border-coal-800 bg-coal-950 pb-3 max-h-[70vh] overflow-y-auto">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="px-6 pt-4 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-coal-500">
                    {item.label}
                  </div>
                  {item.children.map((c) => (
                    <button
                      key={c.page}
                      onClick={() => navigate(c.page)}
                      className={`block w-full px-8 py-2.5 text-left text-sm font-semibold ${
                        page === c.page ? 'bg-club-700 text-white' : 'text-coal-200 hover:bg-coal-800'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page!)}
                  className={`block w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide ${
                    page === item.page ? 'bg-club-700 text-white' : 'text-coal-200 hover:bg-coal-800'
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>
        )}
      </header>

      {/* Page body */}
      <main className="flex-1">
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'news' && <News />}
        {page === 'fixtures' && <Fixtures />}
        {page === 'calendar' && <Calendar />}
        {page === 'lotto' && <Lotto />}
        {page === 'gallery' && <Gallery />}
        {page === 'social' && <Social />}
        {page === 'community' && <Community />}
        {page === 'saints' && <Saints />}
        {page === 'bookings' && <Bookings />}
        {page === 'sponsors' && <Sponsors />}
        {page === 'club' && <ClubInfo />}
      </main>

      {/* Footer */}
      <footer className="bg-coal-950 text-coal-300">
        <div className="h-1.5 bg-club-700" />
        <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="crest-clubzap.png" alt="" className="h-14 w-14 rounded-full bg-white p-0.5" />
              <div>
                <div className="font-display text-white uppercase">St. Kevin's GAA</div>
                <div className="text-xs tracking-widest uppercase">{club.irishName}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Serving Staplestown, Donadea, Coill Dubh, Timahoe and the wider North Kildare
              community since {club.founded}.
            </p>
          </div>
          <div>
            <h3 className="font-display text-white uppercase text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>{club.grounds}</li>
              <li><a href={`mailto:${club.email}`} className="hover:text-white">{club.email}</a></li>
              <li><a href={`tel:${club.phone}`} className="hover:text-white">{club.phone}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-white uppercase text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm columns-2">
              {ALL_LINKS.filter((l) => l.page !== 'home').map((item) => (
                <li key={item.page}>
                  <button onClick={() => navigate(item.page)} className="hover:text-white">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-coal-800">
          <div className="mx-auto max-w-7xl px-4 py-4 text-xs flex flex-col sm:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} St. Kevin's GAA Club. All rights reserved.</span>
            <span>Ní neart go cur le chéile — there is no strength without unity</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
