'use client'

import { Heart, LockKeyhole } from 'lucide-react'

import type { PopularBloggersResponse } from '@/entities/blog-analysis'
import type { FeedHero } from '@/entities/feed'

import { HeroCarousel } from './HeroCarousel'
import { aiCampaigns } from './home.mock'
import { HomeCampaignCard } from './HomeCampaignCard'
import { SectionHeader } from './SectionHeader'

export function HeroSection({ hero }: { hero: FeedHero }) {
  return (
    <section
      id="home-hero"
      className="mx-auto w-full max-w-300 px-5 pt-10 md:px-8 lg:px-0 xl:pt-14"
    >
      <HeroCarousel hero={hero} />
    </section>
  )
}

export function LockedAiSection() {
  return (
    <section
      id="ai-campaigns"
      className="mx-auto mt-12 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <div className="flex max-w-170 flex-col gap-2">
        <SectionHeader title="AI 맞춤 체험단" />
        <p className="m-0 text-14 font-medium leading-20 text-neutral_50">
          AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.
        </p>
      </div>
      <div className="relative min-h-80.5 overflow-hidden rounded-none bg-white">
        <div
          className="grid max-h-80.5 gap-6 overflow-hidden opacity-45 sm:grid-cols-2 lg:grid-cols-4"
          aria-hidden="true"
        >
          {aiCampaigns.map(campaign => (
            <HomeCampaignCard key={campaign.id} variant="ai" className="max-w-none" {...campaign} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 px-5 shadow-[0_0_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
          <div className="flex max-w-110 flex-col items-center gap-4 text-center">
            <span className="flex size-12 items-center justify-center rounded-full border border-neutral_20 bg-white text-neutral_20">
              <LockKeyhole className="size-7" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="m-0 text-18 font-bold leading-28 text-neutral_20">
                AI 맞춤 공고는 로그인 후 확인할 수 있어요
              </h2>
              <p className="m-0 text-14 font-medium leading-20 text-neutral_40">
                로그인하고 AI가 추천하는 맞춤 공고를 확인해보세요.
              </p>
            </div>
            <p className="m-0 rounded-md bg-neutral_95 px-5 py-2.5 text-14 font-semibold leading-20 text-neutral_50">
              로그인 기능 연동 후 제공됩니다
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CreatorPostsSection({ bloggers }: { bloggers: PopularBloggersResponse | null }) {
  if (!bloggers) return null

  return (
    <section
      id="creator-posts"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <SectionHeader title="인기있는 블로거들의 포스팅 엿보기" />
      <div className="grid gap-6 lg:grid-cols-2">
        {bloggers.bloggers.map(blogger => (
          <HomeCreatorPostCard key={blogger.nickname} {...blogger} category={bloggers.category} />
        ))}
      </div>
    </section>
  )
}

function HomeCreatorPostCard({
  nickname,
  overallScore,
  profileUrl,
  category,
}: {
  nickname: string
  overallScore: number
  profileUrl: string
  category: string
}) {
  return (
    <article className="flex h-86.5 max-w-none flex-col gap-4 bg-transparent p-5 font-pretendard text-neutral_20">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="size-14.75 shrink-0 rounded-full bg-neutral_95" aria-hidden />
          <div className="min-w-0">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="m-0 block truncate text-16 font-bold leading-24"
            >
              블로그 방문 &gt;
            </a>
            <span className="text-14 font-medium leading-20 text-neutral_60">{nickname}</span>
          </div>
        </div>
        <span className="shrink-0 rounded-sm bg-red_80 px-3 py-1 text-12 font-semibold leading-16 text-white">
          {category} 블로거
        </span>
      </header>
      <div className="h-39.5 rounded-md bg-neutral_95" aria-hidden />
      <h3 className="m-0 line-clamp-2 text-18 font-semibold leading-28 text-neutral_20">
        {nickname}
      </h3>
      <div className="mt-auto flex items-center gap-2 text-14 font-semibold leading-20 text-neutral_20">
        <Heart className="size-4 text-red_50" aria-hidden />
        <span className="line-clamp-1 font-normal text-neutral_50">종합 점수 {overallScore}점</span>
      </div>
    </article>
  )
}
