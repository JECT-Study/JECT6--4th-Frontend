'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface CampaignImageCarouselProps {
  images?: string[]
}

export function CampaignImageCarousel({ images = [] }: CampaignImageCarouselProps) {
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

  if (images.length === 0) {
    return <div className="h-100 w-full bg-neutral_95 mt-13.75 mb-7.5 rounded-lg" />
  }

  return (
    <div className="relative mt-13.75 mb-7.5">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {images.map((src, i) => (
            <CarouselItem key={i} className="pl-0">
              <div className="relative h-100 w-full overflow-hidden rounded-lg bg-neutral_95">
                <Image src={src} alt={`이미지 ${i + 1}`} fill className="object-cover" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2"
          aria-hidden
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-hidden
              className={cn(
                'size-2 rounded-full transition-colors',
                i === current ? 'bg-white' : 'bg-white/50'
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
