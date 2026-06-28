'use client'

import { useSearchParams } from 'next/navigation'

import { Suspense, useMemo, useState } from 'react'

import { useCampaignList } from '@/app/hooks/useCampaignList'

import type { Campaign, CampaignListParams } from '@/entities/campaign'

import { CampaignList } from './_components/CampaignList'
import Filter from './_components/Filter'

function CampaignsPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-300 flex-col">
      <CampaignList
        campaigns={[]}
        hasMore={false}
        isLoading
        isLoadingMore={false}
        title="공고 전체 보기"
        onLoadMore={() => undefined}
        totalElements={0}
      />
    </div>
  )
}

function CampaignsPageContent() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')?.trim() ?? ''
  const [params, setParams] = useState<CampaignListParams>({})
  const {
    data,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetchingNextPage,
    isLoading,
  } = useCampaignList({ keyword, params })
  const campaigns = useMemo(() => {
    const campaignMap = new Map<number, Campaign>()

    data?.pages.forEach(page => {
      page.content.forEach(campaign => {
        if (!campaignMap.has(campaign.id)) {
          campaignMap.set(campaign.id, campaign)
        }
      })
    })

    return Array.from(campaignMap.values())
  }, [data])
  const totalElements = data?.pages[0]?.totalElements ?? 0

  return (
    <div className="mx-auto flex w-full flex-col max-w-300">
      <Filter params={params} setParams={setParams} />
      <CampaignList
        campaigns={campaigns}
        hasMore={Boolean(hasMore)}
        isLoading={isLoading}
        isLoadingMore={isFetchingNextPage}
        title={keyword ? `"${keyword}" 검색 결과` : '공고 전체 보기'}
        onLoadMore={() => void fetchNextPage()}
        totalElements={totalElements}
      />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<CampaignsPageFallback />}>
      <CampaignsPageContent />
    </Suspense>
  )
}
