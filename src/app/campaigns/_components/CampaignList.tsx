'use client'

import { useInView } from 'react-intersection-observer'

import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

import type { Campaign } from '@/entities/campaign'

interface Props {
  campaigns: Campaign[]
  hasMore: boolean
  isLoading: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
  title?: string
  totalElements: number
}

export function CampaignList({
  campaigns,
  hasMore,
  isLoading,
  isLoadingMore,
  onLoadMore,
  title = '공고 전체 보기',
  totalElements,
}: Props) {
  const { ref } = useInView({
    threshold: 0,
    onChange: inView => {
      if (inView && hasMore && !isLoadingMore) {
        onLoadMore()
      }
    },
  })

  return (
    <div className="flex flex-col gap-15">
      <div className="flex items-center justify-between">
        <div className="text-22 leading-6.25 font-semibold">{title}</div>
        <span className="text-14 font-medium leading-20 text-neutral_60">
          총 {totalElements.toLocaleString()}개
        </span>
      </div>
      {isLoading ? (
        <p className="py-20 text-center text-16 font-medium leading-24 text-neutral_60">
          공고를 불러오는 중...
        </p>
      ) : campaigns.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-6 gap-y-26 pb-15">
          {campaigns.map((item, index) => (
            <HomeCampaignCard
              key={`${item.id}-${index}`}
              variant="vertical"
              className="max-w-none"
              {...item}
            />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-16 font-medium leading-24 text-neutral_60">
          조건에 맞는 공고가 없어요.
        </p>
      )}
      {isLoadingMore && (
        <p className="text-center text-14 font-medium leading-20 text-neutral_60">
          더 불러오는 중...
        </p>
      )}
      {hasMore && <div ref={ref} className="h-1" aria-hidden />}
    </div>
  )
}
