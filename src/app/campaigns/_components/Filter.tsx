'use client'

import type { Dispatch, SetStateAction } from 'react'

import { getRegionLabel, type RegionSelection } from '@/constant'

import type { CampaignListParams } from '@/entities/campaign'

import { DetailFilterGroup } from './DetailFilterGroup'
import { LocationDropdown } from './LocationDropdown'

interface Props {
  params: CampaignListParams
  setParams: Dispatch<SetStateAction<CampaignListParams>>
}

export default function Filter({ params, setParams }: Props) {
  const handleLocationChange = (region: RegionSelection | null) =>
    setParams(prev => ({
      ...prev,
      region: undefined,
      parentRegionId: region?.parentRegionId,
      childRegionId: region?.childRegionId,
      page: 0,
    }))

  return (
    <div className="flex flex-col py-15.5 gap-10">
      <LocationDropdown location={getRegionLabel(params)} setLocation={handleLocationChange} />
      <DetailFilterGroup params={params} setParams={setParams} />
    </div>
  )
}
