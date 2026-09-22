import { useState } from 'react'
import { galleryImages } from '../content'
import { PageHeader } from '../components/ui'

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Match days, medal days and everything in between. Have photos to share? Send them to the PRO."
      />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
          {galleryImages.map((img, i) => (
            <button
              key={img.image}
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden rounded-xl"
            >
              <img
                src={img.image}
                alt={img.caption}
                className="w-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <span className="p-3 text-white text-xs font-semibold text-left">{img.caption}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 border-2 border-dashed border-coal-200 rounded-2xl p-10 text-center">
          <div className="font-display uppercase text-coal-400 text-lg">Photo Uploads Coming Soon</div>
          <p className="text-sm text-coal-400 mt-2 max-w-md mx-auto">
            We're building a members' upload area. In the meantime, email photos to{' '}
            <a href="mailto:pro.stkevins.kildare@gaa.ie" className="text-club-700 font-semibold hover:underline">
              pro.stkevins.kildare@gaa.ie
            </a>
          </p>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-coal-950/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full">
            <img
              src={galleryImages[lightbox].image}
              alt={galleryImages[lightbox].caption}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="text-center text-white mt-4 font-semibold">
              {galleryImages[lightbox].caption}
            </div>
            <div className="text-center text-coal-400 text-sm mt-1">Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  )
}
