'use client'

import { useRecentViews } from '@/shared/hooks/useRecentViews'

import { HomeCarouselSection } from './HomeCarouselSection'

export default function RecentViewsSection() {
  const items = useRecentViews()

  if (items.length === 0) return null

  return <HomeCarouselSection title="최근에 내가 본 공고" campaigns={items} marginTop="mt-18" />
}
