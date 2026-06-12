'use client'

import { useSearchParams } from 'next/navigation'

import { Suspense, useCallback, useEffect, useState } from 'react'

import { campaignService } from '@/service'

import type { Campaign, CampaignListParams } from '@/entities/campaign'

import { CampaignList } from './_components/CampaignList'
import Filter from './_components/Filter'

const PAGE_SIZE = 12

function hasNextPage({
  itemCount,
  pageSize,
  serverHasNext,
  totalElements,
}: {
  itemCount: number
  pageSize: number
  serverHasNext?: boolean
  totalElements: number
}) {
  return serverHasNext ?? (itemCount >= pageSize && itemCount < totalElements)
}

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
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    let ignore = false

    async function fetchCampaigns() {
      setIsLoading(true)

      try {
        const response = keyword
          ? await campaignService.search(keyword, { page: 0, size: PAGE_SIZE })
          : await campaignService.getCampaigns({
              ...params,
              page: 0,
              size: PAGE_SIZE,
            })

        if (!ignore) {
          setCampaigns(response.content)
          setCurrentPage(0)
          setTotalElements(response.totalElements)
          setHasMore(
            hasNextPage({
              itemCount: response.content.length,
              pageSize: PAGE_SIZE,
              serverHasNext: response.hasNext,
              totalElements: response.totalElements,
            })
          )
        }
      } catch {
        if (!ignore) {
          setCampaigns([])
          setTotalElements(0)
          setHasMore(false)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    void fetchCampaigns()

    return () => {
      ignore = true
    }
  }, [keyword, params])

  const loadMore = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore) return

    const nextPage = currentPage + 1
    setIsLoadingMore(true)

    try {
      const response = keyword
        ? await campaignService.search(keyword, { page: nextPage, size: PAGE_SIZE })
        : await campaignService.getCampaigns({
            ...params,
            page: nextPage,
            size: PAGE_SIZE,
          })

      const nextCampaigns = response.content.filter(
        campaign => !campaigns.some(existing => existing.id === campaign.id)
      )
      const mergedCampaigns = [...campaigns, ...nextCampaigns]

      setCampaigns(mergedCampaigns)
      setCurrentPage(nextPage)
      setTotalElements(response.totalElements)
      setHasMore(
        nextCampaigns.length > 0 &&
          hasNextPage({
            itemCount: mergedCampaigns.length,
            pageSize: PAGE_SIZE,
            serverHasNext: response.hasNext,
            totalElements: response.totalElements,
          })
      )
    } catch {
      setHasMore(false)
    } finally {
      setIsLoadingMore(false)
    }
  }, [campaigns, currentPage, hasMore, isLoading, isLoadingMore, keyword, params])

  return (
    <div className="mx-auto flex w-full flex-col max-w-300">
      <Filter params={params} setParams={setParams} />
      <CampaignList
        campaigns={campaigns}
        hasMore={hasMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        title={keyword ? `"${keyword}" 검색 결과` : '공고 전체 보기'}
        onLoadMore={() => void loadMore()}
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
