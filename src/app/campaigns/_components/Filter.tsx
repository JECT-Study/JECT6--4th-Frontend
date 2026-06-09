'use client'

import { useState } from 'react'

import type { CampaignListParams } from '@/entities/campaign'

import { DetailFilterGroup } from './DetailFilterGroup'
import { LocationDropdown } from './LocationDropdown'

export default function Filter() {
  const [params, setParams] = useState<CampaignListParams>({})

  const handleLocationChange = (region: string) => setParams(prev => ({ ...prev, region, page: 0 }))

  return (
    <div className="flex flex-col py-15.5 gap-10">
      <LocationDropdown location={params.region ?? ''} setLocation={handleLocationChange} />
      <DetailFilterGroup params={params} setParams={setParams} />
    </div>
  )
}
