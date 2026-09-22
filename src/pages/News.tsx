import { useState } from 'react'
import type { NewsArticle } from '../data'
import { news } from '../content'
import { Badge, PageHeader } from '../components/ui'

export default function News() {
  const [open, setOpen] = useState<NewsArticle | null>(null)

  return (
    <div>
      <PageHeader
        title="Club News"
        subtitle="Match reports, club announcements and everything happening around Staplestown."
      />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
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
