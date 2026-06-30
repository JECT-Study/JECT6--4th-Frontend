'use client'

import Link from 'next/link'

import { usePopularCampaigns } from '@/app/hooks/usePopularCampaigns'

import type { Campaign, CampaignCategory } from '@/entities/campaign'

import { Button } from '@/shared/ui'

import { HomeCampaignCard } from './HomeCampaignCard'
import { HomeEmptyState } from './HomeEmptyState'
import { SectionHeader } from './SectionHeader'

const CATEGORY_OPTIONS: { label: string; value: CampaignCategory | 'ALL' }[] = [
  { label: '전체', value: 'ALL' },
  { label: '음식', value: 'FOOD' },
  { label: '뷰티', value: 'BEAUTY' },
  { label: '패션', value: 'FASHION' },
  { label: '여행', value: 'TRAVEL' },
  { label: '라이프스타일', value: 'LIVING' },
  { label: '테크/IT', value: 'TECH_IT' },
  { label: '반려동물', value: 'PET' },
  { label: '문화', value: 'CULTURE' },
]

export default function PopularCampaignsSection({
  campaigns,
  showHeader = true,
}: {
  campaigns: Campaign[]
  showHeader?: boolean
}) {
  const {
    campaigns: displayedCampaigns,
    category,
    isLoading,
    setCategory,
  } = usePopularCampaigns(campaigns)

  return (
    <section
      id="popular-campaigns"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      {showHeader && (
        <SectionHeader
          title="인기 체험단"
          filter={{
            value: category,
            options: CATEGORY_OPTIONS,
            onChange: value => setCategory(value as CampaignCategory | 'ALL'),
          }}
        />
      )}
      {displayedCampaigns.length > 0 ? (
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          {[0, 1].map(column => (
            <div key={column} className="flex flex-col gap-6">
              {displayedCampaigns.slice(column * 3, column * 3 + 3).map(campaign => (
                <HomeCampaignCard
                  key={`popular-${campaign.id}`}
                  variant="horizontal"
                  className="max-w-none"
                  {...campaign}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <HomeEmptyState />
      )}
      {isLoading && (
        <p className="m-0 text-center text-14 font-medium leading-20 text-neutral_60">
          불러오는 중...
        </p>
      )}
      <Link href="/campaigns">
        <Button variant="tertiary" className="w-full border-[#8A8A8A] py-6">
          전체 보기
        </Button>
      </Link>
    </section>
  )
}
