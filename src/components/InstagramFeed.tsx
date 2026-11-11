import { useEffect, useState } from 'react'

// Behold feed for @stkevinsgaa (managed at app.behold.so, free plan).
// We render its public JSON ourselves — Behold's own widget renders at zero
// height inside this app.
const BEHOLD_FEED_URL = 'https://feeds.behold.so/n7sZCPAg9dxjPbSbbAYj'

interface BeholdPost {
  id: string
  permalink: string
  caption?: string
  likeCount?: number
  timestamp?: string
  sizes?: { medium?: { mediaUrl: string } }
  mediaUrl?: string
}

// Fetched once and shared between the home page and the Social page
let feedPromise: Promise<BeholdPost[]> | null = null
function loadFeed() {
  feedPromise ??= fetch(BEHOLD_FEED_URL)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((d: { posts: BeholdPost[] }) => d.posts.filter((p) => p.permalink))
  return feedPromise
}

const COLS = { 2: 'grid-cols-2', 3: 'grid-cols-2 md:grid-cols-3' } as const

export default function InstagramFeed({ limit = 6, cols = 3 }: { limit?: number; cols?: 2 | 3 }) {
  const [posts, setPosts] = useState<BeholdPost[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    loadFeed()
      .then(setPosts)
      .catch(() => {
        feedPromise = null
        setFailed(true)
      })
  }, [])

  if (failed) {
    return (
      <p className="text-sm text-coal-500 text-center py-6">
        Couldn't load Instagram right now — see the latest on the club's profile.
      </p>
    )
  }

  if (!posts) {
    return (
      <div className={`grid gap-3 ${COLS[cols]}`}>
        {Array.from({ length: limit }, (_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-coal-100 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid gap-3 ${COLS[cols]}`}>
      {posts.slice(0, limit).map((p) => (
        <a
          key={p.id}
          href={p.permalink}
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-square overflow-hidden rounded-xl bg-coal-100"
        >
          <img
            src={p.sizes?.medium?.mediaUrl ?? p.mediaUrl}
            alt={p.caption?.split('\n')[0] ?? 'Instagram post'}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-coal-950/90 via-coal-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 text-white text-xs leading-snug">
            <span className="line-clamp-3">{p.caption?.split('\n')[0]}</span>
            {p.likeCount != null && <span className="mt-1 font-bold">♥ {p.likeCount}</span>}
          </span>
        </a>
      ))}
    </div>
  )
}
