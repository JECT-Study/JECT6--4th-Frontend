'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

import type { Campaign } from '@/entities/campaign'

import { HomeCampaignCard } from './HomeCampaignCard'
import { SectionHeader } from './SectionHeader'

interface HomeCarouselSectionProps {
  campaigns: Campaign[]
  columns?: 4 | 5
  marginTop?: string
  pageSize?: number
  title: string
}

export function HomeCarouselSection({
  campaigns,
  columns = 4,
  marginTop = 'mt-12',
  pageSize = 4,
  title,
}: HomeCarouselSectionProps) {
  const [pageIndex, setPageIndex] = useState(0)
  const totalPages = Math.ceil(campaigns.length / pageSize)
  const hasPagination = totalPages > 1
  const visibleCampaigns = campaigns.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  return (
    <section
      className={`mx-auto flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0 ${marginTop}`}
    >
      <SectionHeader
        title={title}
        pagination={
          hasPagination
            ? {
                canGoNext: pageIndex < totalPages - 1,
                canGoPrevious: pageIndex > 0,
                onNext: () => setPageIndex(current => Math.min(current + 1, totalPages - 1)),
                onPrevious: () => setPageIndex(current => Math.max(current - 1, 0)),
              }
            : undefined
        }
      />
      <div
        className={cn(
          'grid gap-6 sm:grid-cols-2',
          columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        )}
      >
        {visibleCampaigns.map(campaign => (
          <HomeCampaignCard key={`${title}-${campaign.id}`} className="max-w-none" {...campaign} />
        ))}
      </div>
    </section>
  )
}
