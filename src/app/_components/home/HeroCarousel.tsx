'use client'

import { useEffect, useState } from 'react'

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import type { FeedHero, HeroType } from '@/entities/feed'

import { Button } from '@/shared/ui'

const HERO_CONTENT: Partial<
  Record<HeroType, { title: string; description: string; cta: string; href: string }>
> = {
  ANONYMOUS: {
    title: '나에게 딱 맞는 체험단을 찾아보세요',
    description: 'AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.',
    cta: '지금 시작하기 >',
    href: '/campaigns',
  },
  LOGGED_IN: {
    title: '블로그를 연동하고 AI 맞춤 추천을 받아보세요',
    description: '내 블로그를 분석하면 상황에 딱 맞는 체험단을 더 빠르게 찾을 수 있어요.',
    cta: '블로그 연동하기 >',
    href: '/mypage/account',
  },
  BLOG_LINKED: {
    title: 'AI가 분석한 나만의 맞춤 체험단',
    description: '블로그 관심사와 활동에 맞춘 추천 공고를 확인해보세요.',
    cta: '추천 공고 보기 >',
    href: '#ai-campaigns',
  },
}

interface HeroCarouselProps {
  heroes: FeedHero[]
}

export function HeroCarousel({ heroes }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const handleSelect = () => setCurrent(api.selectedScrollSnap())

    handleSelect()
    api.on('select', handleSelect)
    api.on('reInit', handleSelect)

    return () => {
      api.off('select', handleSelect)
      api.off('reInit', handleSelect)
    }
  }, [api])

  if (heroes.length === 0) return null

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent className="ml-0">
        {heroes.map((hero, index) => (
          <CarouselItem key={`${hero.type}-${index}`} className="pl-0">
            <HeroSlide hero={hero} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {heroes.length > 1 && (
        <>
          <CarouselPrevious className="left-4 hidden bg-white/90 text-neutral_30 hover:bg-white md:flex" />
          <CarouselNext className="right-4 hidden bg-white/90 text-neutral_30 hover:bg-white md:flex" />
          <div className="absolute bottom-5 left-8 z-20 flex gap-2 md:left-12">
            {heroes.map((hero, index) => (
              <button
                key={`${hero.type}-indicator-${index}`}
                type="button"
                aria-label={`${index + 1}번째 배너 보기`}
                aria-current={current === index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  current === index ? 'w-6 bg-red_50' : 'w-2 bg-neutral_70'
                )}
              />
            ))}
          </div>
        </>
      )}
    </Carousel>
  )
}

function HeroSlide({ hero }: { hero: FeedHero }) {
  const base = HERO_CONTENT[hero.type]
  const isBanner = hero.type === 'BANNER'

  const title = isBanner ? (hero.message ?? '') : hero.message || base?.title || ''
  const description = isBanner ? '' : (base?.description ?? '')
  const cta = hero.actionLabel ? `${hero.actionLabel}` : (base?.cta ?? '보러가기')
  const href = base?.href ?? '/campaigns'

  return (
    <div className="relative flex min-h-86 overflow-hidden rounded-none bg-linear-to-t from-red_80 to-white px-8 py-12 md:px-12 xl:items-center xl:py-0">
      <div className="relative z-10 flex max-w-150 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-20 font-semibold leading-32 text-neutral_30">{title}</h1>
          {description && (
            <p className="m-0 text-16 font-medium leading-24 text-neutral_50">{description}</p>
          )}
        </div>
        <Button asChild variant="primary" className="h-10 w-fit rounded-md px-4 text-14 leading-20">
          <a href={href}>{cta}</a>
        </Button>
      </div>
    </div>
  )
}
