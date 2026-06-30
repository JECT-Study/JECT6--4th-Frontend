'use client'

import { useRecentViews } from '@/shared/hooks/useRecentViews'

import { HomeCarouselSection } from './HomeCarouselSection'
import { HomeEmptyState } from './HomeEmptyState'
import { SectionHeader } from './SectionHeader'

export default function RecentViewsSection() {
  const items = useRecentViews()

  if (items.length === 0) {
    return (
      <section className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0">
        <SectionHeader title="최근에 내가 본 공고" />
        <HomeEmptyState message="최근에 본 공고가 없습니다." />
      </section>
    )
  }

  return <HomeCarouselSection title="최근에 내가 본 공고" campaigns={items} marginTop="mt-18" />
}
