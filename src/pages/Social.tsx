import { useState } from 'react'
import type { SocialPost } from '../data'
import { club, socialPosts } from '../content'
import { PageHeader } from '../components/ui'

const PLATFORM_META: Record<SocialPost['platform'], { label: string; color: string }> = {
  twitter: { label: 'X / Twitter', color: 'bg-coal-950' },
  instagram: { label: 'Instagram', color: 'bg-gradient-to-tr from-amber-500 via-club-600 to-purple-600' },
  facebook: { label: 'Facebook', color: 'bg-blue-600' },
}

export default function Social() {
  const [filter, setFilter] = useState<'all' | SocialPost['platform']>('all')
  const posts = filter === 'all' ? socialPosts : socialPosts.filter((p) => p.platform === filter)

  return (
    <div>
      <PageHeader
        title="Social Wall"
        subtitle="The latest from the club's Instagram, X and Facebook — all in one place."
      />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap gap-2 mb-8">
          {(['all', 'twitter', 'instagram', 'facebook'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border transition-colors ${
                filter === f
                  ? 'bg-club-700 text-white border-club-700'
                  : 'bg-white text-coal-500 border-coal-200 hover:border-club-700 hover:text-club-700'
              }`}
            >
              {f === 'all' ? 'All Posts' : PLATFORM_META[f].label}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
          {posts.map((post, i) => (
            <div key={i} className="break-inside-avoid bg-white rounded-2xl border border-coal-100 shadow-sm overflow-hidden">
              <div className={`${PLATFORM_META[post.platform].color} text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5`}>
                {PLATFORM_META[post.platform].label}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src="crest-clubzap.png" alt="" className="h-10 w-10 rounded-full ring-1 ring-coal-100" />
                  <div className="text-sm">
                    <div className="font-bold">{post.author}</div>
                    <div className="text-coal-400 text-xs">{post.handle} · {post.date}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{post.text}</p>
                {post.image && (
                  <img src={post.image} alt="" className="mt-3 rounded-xl w-full object-cover" loading="lazy" />
                )}
                <div className="mt-4 flex gap-5 text-xs text-coal-400 font-semibold">
                  <span>♥ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-coal-950 text-white rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute -left-16 top-0 bottom-0 w-64 sash-stripes opacity-20" />
          <div className="relative">
            <h2 className="font-display text-2xl uppercase">Follow the Club</h2>
            <p className="text-coal-300 text-sm mt-2">Never miss a score, a draw or a training update.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href={club.twitter} target="_blank" rel="noreferrer" className="bg-white text-coal-950 font-bold px-6 py-2.5 rounded-lg hover:bg-coal-100 transition-colors">
                @StKevinsGfc on X
              </a>
              <a href={club.facebook} target="_blank" rel="noreferrer" className="bg-club-700 font-bold px-6 py-2.5 rounded-lg hover:bg-club-600 transition-colors">
                Facebook
              </a>
              <a href={club.instagram} target="_blank" rel="noreferrer" className="border border-white/40 font-bold px-6 py-2.5 rounded-lg hover:border-white transition-colors">
                Instagram
              </a>
            </div>
            <p className="text-xs text-coal-500 mt-6">
              Live embeds (official Instagram & X widgets) can be wired in here once the site goes live.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
