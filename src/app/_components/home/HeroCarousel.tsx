'use client'

import { useEffect, useState } from 'react'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import { Button } from '@/shared/ui'

import { heroSlides } from './home.mock'

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {heroSlides.map((slide, i) => (
            <CarouselItem key={i} className="pl-0">
              <div className="flex min-h-86 overflow-hidden rounded-none bg-neutral_95 px-8 py-12 md:px-12 xl:items-center xl:py-0">
                <div className="relative z-10 flex max-w-150 flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h1 className="m-0 text-20 font-semibold leading-32 text-neutral_30">
                      {slide.title}
                    </h1>
                    <p className="m-0 text-16 font-medium leading-24 text-neutral_50">
                      {slide.description}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="primary"
                    className="h-10 w-fit rounded-md px-4 text-14 leading-20"
                  >
                    <a href={slide.href}>{slide.cta}</a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div
        className="pointer-events-none absolute bottom-12 left-1/2 hidden -translate-x-1/2 items-center gap-3 xl:flex"
        aria-hidden
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-hidden
            className={cn(
              'pointer-events-auto size-2 rounded-full transition-colors',
              i === current ? 'bg-red_50' : 'bg-white'
            )}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
