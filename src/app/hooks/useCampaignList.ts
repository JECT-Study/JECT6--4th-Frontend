import { useInfiniteQuery } from '@tanstack/react-query'

import { campaignService } from '@/service'

import type { Campaign, CampaignListParams, Paginated } from '@/entities/campaign'

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

function getCampaignPage({
  keyword,
  page,
  params,
}: {
  keyword: string
  page: number
  params: CampaignListParams
}): Promise<Paginated<Campaign>> {
  if (keyword) {
    return campaignService.search(keyword, { page, size: PAGE_SIZE })
  }

  return campaignService.getCampaigns({
    ...params,
    page,
    size: PAGE_SIZE,
  })
}

export function useCampaignList({
  keyword,
  initialPage,
  params,
}: {
  keyword: string
  initialPage?: Paginated<Campaign>
  params: CampaignListParams
}) {
  return useInfiniteQuery({
    queryKey: ['campaigns', keyword, params],
    queryFn: ({ pageParam }) => getCampaignPage({ keyword, params, page: pageParam }),
    initialPageParam: 0,
    initialData: initialPage
      ? {
          pageParams: [0],
          pages: [initialPage],
        }
      : undefined,
    getNextPageParam: (lastPage, allPages) => {
      const itemCount = allPages.reduce((count, page) => count + page.content.length, 0)
      const hasNext = hasNextPage({
        itemCount,
        pageSize: PAGE_SIZE,
        serverHasNext: lastPage.hasNext,
        totalElements: lastPage.totalElements,
      })

      if (!hasNext) {
        return undefined
      }

      return typeof lastPage.number === 'number' ? lastPage.number + 1 : allPages.length
    },
  })
}
