'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { campaignService } from '@/service'

import type { Campaign } from '@/entities/campaign'

import type { RegionSelection } from '@/constant'

async function getPopularCampaignsByRegion(region: RegionSelection): Promise<Campaign[]> {
  const response = await campaignService.getCampaigns({
    parentRegionId: region.parentRegionId,
    childRegionId: region.childRegionId,
    page: 0,
    size: 6,
    sort: 'POPULAR',
  })

  return response.content
}

export function useRegionPopularCampaigns(initialCampaigns: Campaign[]) {
  const [region, setRegion] = useState<RegionSelection | null>(null)
  const { data, isFetching } = useQuery({
    queryKey: ['region-popular-campaigns', region?.parentRegionId, region?.childRegionId],
    queryFn: () => getPopularCampaignsByRegion(region),
    enabled: Boolean(region),
    placeholderData: previousData => previousData ?? initialCampaigns,
  })

  return {
    campaigns: region ? (data ?? initialCampaigns) : initialCampaigns,
    isLoading: isFetching,
    region: region?.label ?? '',
    setRegion,
  }
}
