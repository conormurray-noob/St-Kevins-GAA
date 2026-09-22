export type Page =
  | 'home'
  | 'news'
  | 'fixtures'
  | 'calendar'
  | 'lotto'
  | 'gallery'
  | 'social'
  | 'community'
  | 'saints'
  | 'bookings'
  | 'sponsors'
  | 'club'

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  body: string
  category: string
  date: string
  image: string
  featured?: boolean
}

export interface Fixture {
  id: number
  competition: string
  team: string
  home: string
  away: string
  date: string
  iso?: string
  time?: string
  venue: string
  homeScore?: string
  awayScore?: string
}

export interface CommitteeMember {
  role: string
  name: string
  email?: string
}

export interface CommunityActivity {
  title: string
  when?: string
  description: string
  image?: string
}

export interface Facility {
  name: string
  description: string
  rate?: string
  note?: string
}

export interface ClubEvent {
  title: string
  date: string
  time?: string
  venue?: string
  type: 'Match' | 'Training' | 'Event' | 'Booking' | 'Community'
}

export interface ClubDocument {
  title: string
  category: string
  file?: string
  note?: string
}

export interface SaintsInfo {
  intro: string
  hours: string
  openingHours: { days: string; times: string }[]
  managers: { name: string; role: string; phone: string }[]
  photos: GalleryImage[]
  menuNote: string
  menu: { section: string; items: { name: string; description?: string; price: string }[] }[]
}

export interface SponsorEntry {
  name: string
  tier: string
  description?: string
  url?: string
  logo?: string
}

export interface StrategyPillar {
  title: string
  tagline: string
  objectives: { title: string; text: string }[]
}

export interface LottoDraw {
  date: string
  numbers: number[]
  jackpot: string
  jackpotWon: boolean
  winners: { name: string; prize: string }[]
}

export interface TrainingSession {
  day: string
  team: string
  time: string
  venue: string
  coach: string
}

export interface SocialPost {
  platform: 'instagram' | 'twitter' | 'facebook'
  author: string
  handle: string
  date: string
  text: string
  image?: string
  likes: number
  comments: number
}

export interface GalleryImage {
  image: string
  caption: string
}

export interface ClubDetails {
  name: string
  irishName: string
  founded: number
  grounds: string
  email: string
  phone: string
  twitter: string
  facebook: string
  instagram: string
}

export interface LottoInfo {
  currentJackpot: string
  nextDraw: string
  entriesClose: string
  playUrl: string
  draws: LottoDraw[]
}
