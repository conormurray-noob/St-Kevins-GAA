import { useState } from 'react'
import type { NewsArticle } from '../data'
import { news } from '../content'
import { Badge, PageHeader } from '../components/ui'

export function TagChips({ tags, onPick }: { tags: string[]; onPick?: (t: string) => void }) {
  if (tags.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          onClick={(e) => {
            if (!onPick) return
            e.stopPropagation()
            onPick(t)
          }}
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
            /ladies|girls/i.test(t)
              ? 'border-pink-200 bg-pink-50 text-pink-700'
              : 'border-coal-200 bg-coal-50 text-coal-600'
          } ${onPick ? 'hover:border-club-700 hover:text-club-700' : 'cursor-default'}`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export default function News() {
  const [open, setOpen] = useState<NewsArticle | null>(null)
  const [tag, setTag] = useState<string | null>(null)
  const allTags = [...new Set(news.flatMap((n) => n.tags))].sort()
  const shown = tag ? news.filter((n) => n.tags.includes(tag)) : news

  return (
    <div>
      <PageHeader
        title="Club News"
        subtitle="Match reports, club announcements and everything happening around Staplestown."
      />
      <div className="mx-auto max-w-7xl px-4 py-14">
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-coal-400 mr-1">Filter:</span>
            {[null, ...allTags].map((t) => (
              <button
                key={t ?? 'all'}
                onClick={() => setTag(t)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                  tag === t
                    ? 'bg-club-700 text-white border-club-700'
                    : 'bg-white text-coal-500 border-coal-200 hover:border-club-700 hover:text-club-700'
                }`}
              >
                {t ?? 'All News'}
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl border border-coal-100 shadow-sm overflow-hidden cursor-pointer flex flex-col"
              onClick={() => setOpen(article)}
            >
              <div className="overflow-hidden h-48">
                <img
                  src={article.image}
                  alt=""
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <Badge>{article.category}</Badge>
                  <span className="text-xs text-coal-400">{article.date}</span>
                </div>
                <h2 className="font-bold text-lg mt-3 leading-snug group-hover:text-club-700 transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-coal-500 mt-2 flex-1">{article.excerpt}</p>
                <div className="mt-3">
                  <TagChips tags={article.tags} onPick={setTag} />
                </div>
                <span className="mt-4 text-club-700 font-bold text-sm uppercase">Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-coal-950/80 overflow-y-auto p-4 md:p-10"
          onClick={() => setOpen(null)}
        >
          <article
            className="mx-auto max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={open.image} alt="" className="w-full h-64 md:h-80 object-cover" />
              <button
                onClick={() => setOpen(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 bg-coal-950/70 hover:bg-coal-950 text-white rounded-full h-10 w-10 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3">
                <Badge>{open.category}</Badge>
                <span className="text-sm text-coal-400">{open.date}</span>
              </div>
              <h1 className="font-display text-3xl uppercase mt-4 leading-tight">{open.title}</h1>
              <div className="mt-3">
                <TagChips tags={open.tags} />
              </div>
              <div className="mt-6 space-y-4 text-coal-600 leading-relaxed">
                {open.body.split(/\n\s*\n/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
