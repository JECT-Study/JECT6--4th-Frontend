'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { campaignService } from '@/service'

import type { Campaign } from '@/entities/campaign'

async function getPopularCampaignsByRegion(region: string): Promise<Campaign[]> {
  const response = await campaignService.getCampaigns({
    region,
    page: 0,
    size: 6,
    sort: 'popular',
  })

  return response.content
}

export function useRegionPopularCampaigns(initialCampaigns: Campaign[]) {
  const [region, setRegion] = useState('')
  const { data, isFetching } = useQuery({
    queryKey: ['region-popular-campaigns', region],
    queryFn: () => getPopularCampaignsByRegion(region),
    enabled: Boolean(region),
    placeholderData: previousData => previousData ?? initialCampaigns,
  })

  return {
    campaigns: region ? (data ?? initialCampaigns) : initialCampaigns,
    isLoading: isFetching,
    region,
    setRegion,
  }
}
