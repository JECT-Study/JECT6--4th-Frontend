import { Heart, LockKeyhole } from 'lucide-react'

import { Button } from '@/shared/ui'

import { aiCampaigns, creatorPosts, popularCampaigns, regionPopularCampaigns } from './home.mock'
import { HomeCampaignCard } from './HomeCampaignCard'
import { SectionHeader } from './SectionHeader'

import type { CreatorPost } from './home.types'

export function HeroSection() {
  return (
    <section
      id="home-hero"
      className="mx-auto w-full max-w-300 px-5 pt-10 md:px-8 lg:px-0 xl:pt-14"
    >
      <div className="relative flex min-h-[344px] overflow-hidden rounded-none bg-neutral_95 px-8 py-12 md:px-12 xl:items-center xl:py-0">
        <div className="relative z-10 flex max-w-150 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="m-0 text-20 font-semibold leading-32 text-neutral_30">
              내 블로그 진단하고 더 정확한 공고 추천받기
            </h1>
            <p className="m-0 text-16 font-medium leading-24 text-neutral_50">
              AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.
            </p>
          </div>
          <Button
            asChild
            variant="primary"
            className="h-10 w-fit rounded-md px-4 text-14 leading-20"
          >
            <a href="#ai-campaigns">AI 맞춤 체험단 보기 &gt;</a>
          </Button>
        </div>
        <div
          className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 items-center gap-3 xl:flex"
          aria-hidden
        >
          <span className="size-2 rounded-full bg-white" />
          <span className="size-2 rounded-full bg-white" />
          <span className="size-2 rounded-full bg-red_50" />
          <span className="size-2 rounded-full bg-white" />
          <span className="size-2 rounded-full bg-white" />
        </div>
      </div>
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
      <div className="relative min-h-[322px] overflow-hidden rounded-none bg-white">
        <div
          className="grid max-h-[322px] gap-6 overflow-hidden opacity-45 sm:grid-cols-2 lg:grid-cols-4"
          aria-hidden="true"
        >
          {aiCampaigns.map(campaign => (
            <HomeCampaignCard
              key={campaign.offerTitle}
              variant="ai"
              className="max-w-none"
              {...campaign}
            />
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

export function CreatorPostsSection() {
  return (
    <section
      id="creator-posts"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <SectionHeader title="인기있는 블로거들의 포스팅 엿보기" filterLabel="랭킹" />
      <div className="grid gap-6 lg:grid-cols-2">
        {creatorPosts.map(post => (
          <HomeCreatorPostCard key={post.handle} {...post} />
        ))}
      </div>
    </section>
  )
}

export function PopularCampaignsSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section
      id="popular-campaigns"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      {showHeader && <SectionHeader title="인기 체험단" filterLabel="음식" />}
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
        {[0, 1].map(column => (
          <div key={column} className="flex flex-col gap-6">
            {popularCampaigns.slice(column * 3, column * 3 + 3).map(campaign => (
              <HomeCampaignCard
                key={`popular-${campaign.offerTitle}`}
                variant="horizontal"
                className="max-w-none"
                {...campaign}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="m-0 flex h-14 w-full items-center justify-center bg-neutral_95 text-14 font-semibold leading-20 text-neutral_50">
        전체 공고 목록 페이지 연동 예정
      </p>
    </section>
  )
}

export function RegionPopularCampaignsSection() {
  return (
    <section
      id="region-popular-campaigns"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <SectionHeader title="지역별 인기 체험" filterLabel="서울" />
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
        {[0, 1].map(column => (
          <div key={column} className="flex flex-col gap-6">
            {regionPopularCampaigns.slice(column * 3, column * 3 + 3).map(campaign => (
              <HomeCampaignCard
                key={`region-${campaign.offerTitle}`}
                variant="horizontal"
                className="max-w-none"
                {...campaign}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="m-0 flex h-14 w-full items-center justify-center bg-neutral_95 text-14 font-semibold leading-20 text-neutral_50">
        지역별 체험 전체보기 예정
      </p>
    </section>
  )
}

function HomeCreatorPostCard({ handle, likeCount, title }: CreatorPost) {
  return (
    <article className="flex h-[346px] max-w-none flex-col gap-4 bg-transparent p-5 font-pretendard text-neutral_20">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="size-[59px] shrink-0 rounded-full bg-neutral_95" aria-hidden />
          <div className="min-w-0">
            <h3 className="m-0 truncate text-16 font-bold leading-24">블로그명 &gt;</h3>
            <span className="text-14 font-medium leading-20 text-neutral_60">{handle}</span>
          </div>
        </div>
        <span className="shrink-0 rounded-sm bg-red_80 px-3 py-1 text-12 font-semibold leading-16 text-white">
          맛집 블로거
        </span>
      </header>
      <div className="h-[158px] rounded-md bg-neutral_95" aria-hidden />
      <h3 className="m-0 line-clamp-2 text-18 font-semibold leading-28 text-neutral_20">{title}</h3>
      <div className="mt-auto flex items-center gap-2 text-14 font-semibold leading-20 text-neutral_20">
        <Heart className="size-4 text-red_50" aria-hidden />
        <span>{likeCount}</span>
      </div>
    </article>
  )
}
