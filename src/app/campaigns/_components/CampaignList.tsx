'use client'

import { useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { aiCampaigns } from '@/app/_components/home/home.mock'
import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

const PAGE_SIZE = 12

export function CampaignList() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const hasMore = visibleCount < aiCampaigns.length

  const { ref } = useInView({
    threshold: 0,
    onChange: inView => {
      if (inView && hasMore) {
        setVisibleCount(prev => Math.min(prev + PAGE_SIZE, aiCampaigns.length))
      }
    },
  })

  return (
    <div className="flex flex-col gap-15">
      <div className="flex items-center justify-between">
        <div className="text-22 leading-6.25 font-semibold">공고 전체 보기</div>
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-26 pb-15">
        {aiCampaigns.slice(0, visibleCount).map(item => (
          <HomeCampaignCard key={item.id} variant="vertical" className="max-w-none" {...item} />
        ))}
      </div>
      {hasMore && <div ref={ref} className="h-1" aria-hidden />}
    </div>
  )
}
