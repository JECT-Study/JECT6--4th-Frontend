import { HeroCarousel } from './HeroCarousel'
import { heroSlides } from './home.mock'

export function HeroSection() {
  return (
    <section
      id="home-hero"
      className="mx-auto w-full max-w-300 px-5 pt-10 md:px-8 lg:px-0 xl:pt-14"
    >
      <HeroCarousel heroes={heroSlides} />
    </section>
  )
}
