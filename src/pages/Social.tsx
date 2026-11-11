import { club } from '../content'
import { PageHeader, SectionHeading } from '../components/ui'
import InstagramFeed from '../components/InstagramFeed'

// Facebook's page plugin renders at most 500px wide
const FB_WIDTH = 500
const FB_HEIGHT = 900

export default function Social() {
  const fbEmbed = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    club.facebook,
  )}&tabs=timeline&width=${FB_WIDTH}&height=${FB_HEIGHT}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`

  return (
    <div>
      <PageHeader
        title="Social Wall"
        subtitle="The latest from the club's Instagram and Facebook — straight from our accounts, always up to date."
      />
      <div className="mx-auto max-w-7xl px-4 py-14 space-y-16">
        {/* Instagram — live grid via Behold */}
        <section>
          <SectionHeading
            action={
              <a
                href={club.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-club-700 font-bold text-sm uppercase hover:underline"
              >
                @stkevinsgaa →
              </a>
            }
          >
            Instagram
          </SectionHeading>
          <InstagramFeed limit={6} cols={3} />
        </section>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Facebook — official page plugin */}
          <section>
            <SectionHeading>Facebook</SectionHeading>
            <div className="bg-white rounded-2xl border border-coal-100 shadow-sm overflow-hidden">
              <div className="mx-auto" style={{ maxWidth: FB_WIDTH }}>
                <iframe
                  src={fbEmbed}
                  title="St. Kevin's GAA on Facebook"
                  width="100%"
                  height={FB_HEIGHT}
                  style={{ border: 'none', overflow: 'hidden', display: 'block' }}
                  allow="encrypted-media"
                  loading="lazy"
                />
              </div>
              <a
                href={club.facebook}
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 transition-colors"
              >
                See all posts on Facebook →
              </a>
            </div>
            <p className="mt-2 text-xs text-coal-400">
              Some Facebook posts (reels, shared posts) only show on Facebook itself.
            </p>
          </section>

          {/* X — link card only: X blocks logged-out timeline embeds (HTTP 429)
              and its API is paid, so a live feed isn't viable */}
          <section>
            <SectionHeading>X / Twitter</SectionHeading>
            <div className="bg-coal-950 text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -right-16 top-0 bottom-0 w-64 sash-stripes opacity-20" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <img src="crest-clubzap.png" alt="" className="h-16 w-16 rounded-full bg-white p-0.5" />
                  <div>
                    <div className="font-display text-xl uppercase">CLG Naomh Caoimhín</div>
                    <div className="text-coal-300 text-sm">@StKevinsGfc</div>
                  </div>
                </div>
                <p className="mt-5 text-coal-300 text-sm leading-relaxed">
                  Live scores, team news and match-day updates — follow the club on X so you never
                  miss a result.
                </p>
                <a
                  href={club.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block bg-white text-coal-950 hover:bg-coal-100 font-bold uppercase text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Follow @StKevinsGfc on X →
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
