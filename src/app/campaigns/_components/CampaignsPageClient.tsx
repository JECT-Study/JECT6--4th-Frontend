'use client'

import { useSearchParams } from 'next/navigation'

import { useMemo, useState } from 'react'

import { useCampaignList } from '@/app/hooks/useCampaignList'

import type { Campaign, CampaignListParams, Paginated } from '@/entities/campaign'

import { CampaignList } from './CampaignList'
import Filter from './Filter'

function hasActiveParams(params: CampaignListParams) {
  return Object.entries(params).some(
    ([key, value]) => key !== 'page' && key !== 'size' && value !== undefined
  )
}

interface Props {
  initialKeyword: string
  initialPage: Paginated<Campaign>
}

export function CampaignsPageClient({ initialKeyword, initialPage }: Props) {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')?.trim() ?? ''
  const [params, setParams] = useState<CampaignListParams>({})
  const useInitialPage = keyword === initialKeyword && !hasActiveParams(params)
  const {
    data,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetchingNextPage,
    isLoading,
  } = useCampaignList({
    initialPage: useInitialPage ? initialPage : undefined,
    keyword,
    params,
  })
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
