import { club } from '../content'
import { PageHeader, SectionHeading } from '../components/ui'
import InstagramFeed from '../components/InstagramFeed'

export default function Social() {
  return (
    <div>
      <PageHeader
        title="Social Wall"
        subtitle="The latest from the club's Instagram, straight from our account and always up to date — plus where to follow us on Facebook and X."
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
          <InstagramFeed limit={12} cols={3} />
        </section>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Facebook — link card only: the page plugin's timeline renders blank
              for most visitors (it needs third-party cookies browsers now block) */}
          <section>
            <SectionHeading>Facebook</SectionHeading>
            <div className="bg-blue-700 text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -right-16 top-0 bottom-0 w-64 sash-stripes opacity-20" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <img src="crest-clubzap.png" alt="" className="h-16 w-16 rounded-full bg-white p-0.5" />
                  <div>
                    <div className="font-display text-xl uppercase">St Kevins GAA</div>
                    <div className="text-blue-100 text-sm">facebook.com/stkevinsgfc</div>
                  </div>
                </div>
                <p className="mt-5 text-blue-100 text-sm leading-relaxed">
                  Club announcements, photos, lotto results and events — like the page to get every
                  update in your feed.
                </p>
                <a
                  href={club.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block bg-white text-blue-700 hover:bg-blue-50 font-bold uppercase text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Follow on Facebook →
                </a>
              </div>
            </div>
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
