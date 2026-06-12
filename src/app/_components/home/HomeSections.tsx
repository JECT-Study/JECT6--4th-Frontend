'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Heart, User } from 'lucide-react'

import type { PopularBloggersResponse } from '@/entities/blog-analysis'

import LogoImage from '@/shared/assets/icons/logo.png'

import { HeroCarousel } from './HeroCarousel'
import { heroSlides } from './home.mock'
import { SectionHeader } from './SectionHeader'

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
    <Link href={profileUrl} target="_blank" rel="noopener noreferrer">
      <article className="flex h-86.5 max-w-none flex-col gap-4 bg-transparent p-5 font-pretendard text-neutral_20">
        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <span
              className="flex size-14.75 shrink-0 items-center justify-center rounded-full border text-neutral_60"
              aria-hidden
            >
              <User className="size-7" />
            </span>
            <div className="min-w-0">
              <div className="m-0 block truncate text-16 font-bold leading-24">블로그 방문</div>
              <span className="text-14 font-medium leading-20 text-neutral_60">{nickname}</span>
            </div>
          </div>
          <span className="shrink-0 rounded-sm bg-red_80 px-3 py-1 text-12 font-semibold leading-16 text-white">
            {category} 블로거
          </span>
        </header>
        <div className="flex h-39.5 items-center justify-center rounded-md border">
          <Image src={LogoImage} alt="Boost" className="h-auto w-32" />
        </div>
        <h3 className="m-0 line-clamp-2 text-18 font-semibold leading-28 text-neutral_20">
          {nickname}
        </h3>
        <div className="mt-auto flex items-center gap-2 text-14 font-semibold leading-20 text-neutral_20">
          <Heart className="size-4 text-red_50" aria-hidden />
          <span className="line-clamp-1 font-normal text-neutral_50">
            종합 점수 {overallScore}점
          </span>
        </div>
      </article>
    </Link>
  )
}
