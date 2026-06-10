'use client'

import type { FeedHero, HeroType } from '@/entities/feed'

import { Button } from '@/shared/ui'

const HERO_CONTENT: Partial<Record<HeroType, { title: string; description: string; cta: string; href: string }>> = {
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
  ANONYMOUS: {
    title: '나에게 딱 맞는 체험단을 찾아보세요',
    description: 'AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.',
    cta: '지금 시작하기 >',
    href: '/campaigns',
  },
}

interface HeroCarouselProps {
  hero: FeedHero
}

export function HeroCarousel({ hero }: HeroCarouselProps) {
  const base = HERO_CONTENT[hero.type]
  const isBanner = hero.type === 'BANNER'

  const title = isBanner ? (hero.message ?? '') : (base?.title ?? hero.message ?? '')
  const description = isBanner ? '' : (hero.message ?? base?.description ?? '')
  const cta = hero.actionLabel ? `${hero.actionLabel} >` : (base?.cta ?? '보러가기 >')
  const href = base?.href ?? '/campaigns'

  return (
    <div className="relative flex min-h-86 overflow-hidden rounded-none bg-neutral_95 px-8 py-12 md:px-12 xl:items-center xl:py-0">
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
