export interface Campaign {
  brandName: string
  category: string
  competitionLabel: string
  dday: string
  fitLabel?: string
  offerTitle: string
  region: string
}

export interface CreatorPost {
  handle: string
  likeCount: number
  title: string
}

export interface HeroSlide {
  title: string
  description: string
  cta: string
  href: string
}
