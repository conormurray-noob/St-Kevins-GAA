import { communityActivities, communityIntro } from '../content'
import { PageHeader } from '../components/ui'
import GetInvolved from '../components/GetInvolved'

export default function Community() {
  return (
    <div>
      <PageHeader title="Community" subtitle={communityIntro} />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityActivities.map((a) => (
            <div key={a.title} className="bg-white rounded-2xl border border-coal-100 shadow-sm overflow-hidden flex flex-col">
              {a.image && (
                <img src={a.image} alt="" className="h-44 w-full object-cover" loading="lazy" />
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="font-display text-lg uppercase">{a.title}</h2>
                {a.when && (
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-club-700">{a.when}</div>
                )}
                <p className="text-sm text-coal-500 mt-3 flex-1">{a.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-coal-50 rounded-2xl p-8 text-center">
          <h2 className="font-display text-xl uppercase">Run something at the club?</h2>
          <p className="text-sm text-coal-500 mt-2 max-w-xl mx-auto">
            If you'd like to host a class, group or event at St. Kevin's — from fitness to cards to
            community meetings — get in touch and we'll find you a slot.
          </p>
        </div>
      </div>
      <GetInvolved />
    </div>
  )
}
