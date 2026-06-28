import type { FeedHero } from '@/entities/feed'

import { HeroCarousel } from './HeroCarousel'

interface HeroSectionProps {
  hero: FeedHero
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section
      id="home-hero"
      className="mx-auto w-full max-w-300 px-5 pt-10 md:px-8 lg:px-0 xl:pt-14"
    >
      <HeroCarousel heroes={[hero]} />
    </section>
  )
}
