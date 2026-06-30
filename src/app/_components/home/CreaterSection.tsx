import Image from 'next/image'
import Link from 'next/link'

import { Heart, User } from 'lucide-react'

import { feedService } from '@/service'

import type { BloggerStory } from '@/entities/feed'

import LogoImage from '@/shared/assets/icons/logo.png'

import { HomeEmptyState } from './HomeEmptyState'
import { SectionHeader } from './SectionHeader'

async function getBloggerStories(): Promise<BloggerStory[]> {
  try {
    const response = await feedService.getBloggerStories()
    return response.stories
  } catch {
    return []
  }
}

export default async function CreatorPostsSection() {
  const stories = await getBloggerStories()

  return (
    <section
      id="creator-posts"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <SectionHeader title="인기있는 블로거들의 포스팅 엿보기" />
      {stories.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {stories.map(story => (
            <HomeCreatorPostCard
              key={`${story.bloggerNickname}-${story.campaignTitle ?? story.story}`}
              {...story}
            />
          ))}
        </div>
      ) : (
        <HomeEmptyState />
      )}
    </section>
  )
}

function HomeCreatorPostCard({ bloggerNickname, campaignTitle, profileUrl, story }: BloggerStory) {
  const card = (
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
            <span className="text-14 font-medium leading-20 text-neutral_60">
              {bloggerNickname}
            </span>
          </div>
        </div>
      </header>
      <div className="flex h-39.5 items-center justify-center rounded-md border">
        <Image src={LogoImage} alt="Boost" className="h-auto w-32" />
      </div>
      <h3 className="m-0 line-clamp-2 text-18 font-semibold leading-28 text-neutral_20">
        {campaignTitle ?? bloggerNickname}
      </h3>
      <div className="mt-auto flex items-center gap-2 text-14 font-semibold leading-20 text-neutral_20">
        <Heart className="size-4 text-red_50" aria-hidden />
        <span className="line-clamp-1 font-normal text-neutral_50">{story}</span>
      </div>
    </article>
  )

  return profileUrl ? (
    <Link href={profileUrl} target="_blank" rel="noopener noreferrer">
      {card}
    </Link>
  ) : (
    card
  )
}
