'use client'

import { useState } from 'react'

import { HomeCampaignCard } from './HomeCampaignCard'
import { SectionHeader } from './SectionHeader'

import type { Campaign } from './home.types'

interface HomeCarouselSectionProps {
  campaigns: Campaign[]
  marginTop?: string
  pageSize?: number
  title: string
}

export function HomeCarouselSection({
  campaigns,
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCampaigns.map(campaign => (
          <HomeCampaignCard
            key={`${title}-${campaign.offerTitle}`}
            className="max-w-none"
            {...campaign}
          />
        ))}
      </div>
    </section>
  )
}
