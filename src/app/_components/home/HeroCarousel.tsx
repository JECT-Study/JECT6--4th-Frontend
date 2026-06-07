'use client'

import { useEffect, useState } from 'react'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import type { HeroType } from '@/entities/feed'

import { Button } from '@/shared/ui'

import { heroSlides } from './home.mock'

const HERO_CONTENT: Record<
  HeroType,
  { title: string; description: string; cta: string; href: string }
> = {
  AI_MATCHED: {
    title: '내 블로그 진단하고 더 정확한 공고 추천받기',
    description: 'AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.',
    cta: 'AI 맞춤 체험단 보기 >',
    href: '#ai-campaigns',
  },
  POPULAR: {
    title: '지금 가장 인기 있는 체험단을 확인해보세요',
    description: '수백 개의 체험단 중 지금 가장 많이 신청받고 있는 공고를 모았어요.',
    cta: '인기 체험단 보기 >',
    href: '#popular-campaigns',
  },
  ACTIVITY_BASED: {
    title: '내 근처 체험단, 한눈에 찾아보기',
    description: '지역별로 분류된 체험단을 통해 가까운 공고를 빠르게 찾아보세요.',
    cta: '지역별 체험단 보기 >',
    href: '#region-popular-campaigns',
  },
}

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
          {heroSlides.map((slide, i) => {
            const { title, description, cta, href } = HERO_CONTENT[slide.type]
            return (
              <CarouselItem key={i} className="pl-0">
                <div className="flex min-h-86 overflow-hidden rounded-none bg-neutral_95 px-8 py-12 md:px-12 xl:items-center xl:py-0">
                  <div className="relative z-10 flex max-w-150 flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <h1 className="m-0 text-20 font-semibold leading-32 text-neutral_30">
                        {title}
                      </h1>
                      <p className="m-0 text-16 font-medium leading-24 text-neutral_50">
                        {description}
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="primary"
                      className="h-10 w-fit rounded-md px-4 text-14 leading-20"
                    >
                      <a href={href}>{cta}</a>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
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
