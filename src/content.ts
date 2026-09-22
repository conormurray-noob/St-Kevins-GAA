// Loads everything editable through the CMS (/admin) from content/*.json.
// Decap CMS writes these files; Vite bundles them at build time.
import type {
  ClubDetails,
  ClubDocument,
  ClubEvent,
  CommitteeMember,
  CommunityActivity,
  Facility,
  Fixture,
  GalleryImage,
  LottoInfo,
  NewsArticle,
  SaintsInfo,
  SocialPost,
  SponsorEntry,
  StrategyPillar,
  TrainingSession,
} from './data'
import clubJson from '../content/club.json'
import lottoJson from '../content/lotto.json'
import fixturesJson from '../content/fixtures.json'
import scheduleJson from '../content/schedule.json'
import galleryJson from '../content/gallery.json'
import socialJson from '../content/social.json'
import committeeJson from '../content/committee.json'
import communityJson from '../content/community.json'
import facilitiesJson from '../content/facilities.json'
import eventsJson from '../content/events.json'
import documentsJson from '../content/documents.json'
import strategyJson from '../content/strategy.json'
import saintsJson from '../content/saints.json'
import sponsorsJson from '../content/sponsors.json'

interface NewsFile {
  title: string
  date: string
  category: string
  image: string
  excerpt: string
  featured?: boolean
  body: string
}

const newsFiles = import.meta.glob('../content/news/*.json', {
  eager: true,
}) as Record<string, { default: NewsFile }>

function displayDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const news: NewsArticle[] = Object.entries(newsFiles)
  .map(([path, mod]) => ({
    ...mod.default,
    id: path,
    featured: mod.default.featured ?? false,
    sortKey: mod.default.date,
    date: displayDate(mod.default.date),
  }))
  .sort((a, b) => b.sortKey.localeCompare(a.sortKey))

export const club: ClubDetails = clubJson

export const lotto: LottoInfo = lottoJson

export const fixtures: Fixture[] = fixturesJson.fixtures.map((f, i) => ({ ...f, id: i }))

export const results: Fixture[] = fixturesJson.results.map((f, i) => ({ ...f, id: i }))

export const schedule: TrainingSession[] = scheduleJson.sessions

export const galleryImages: GalleryImage[] = galleryJson.images

export const socialPosts: SocialPost[] = socialJson.posts as SocialPost[]

// Names shown on the home-page sponsor strip ("your business here" placeholders excluded)
export const sponsors: string[] = sponsorsJson.sponsors
  .filter((s) => !s.name.toLowerCase().includes('your business'))
  .map((s) => s.name)

export const sponsorsPage: { intro: string; becomeText: string; sponsors: SponsorEntry[] } =
  sponsorsJson as { intro: string; becomeText: string; sponsors: SponsorEntry[] }

export const committee: CommitteeMember[] = committeeJson.members

export const communityIntro: string = communityJson.intro

export const communityActivities: CommunityActivity[] = communityJson.activities

export const facilitiesIntro: string = facilitiesJson.intro

export const bookingEmail: string = facilitiesJson.bookingEmail

export const facilities: Facility[] = facilitiesJson.facilities

export const events: ClubEvent[] = eventsJson.events as ClubEvent[]

export const documents: ClubDocument[] = documentsJson.documents

export const strategy: { vision: string; values: string; pillars: StrategyPillar[] } = strategyJson

export const saints: SaintsInfo = saintsJson
