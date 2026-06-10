import type { CampaignDetail } from '@/entities/campaign'

import { CampaignDetailInfo } from './CampaignDetailInfo'
import { CampaignImageCarousel } from './CampaignImageCarousel'
import { CampaignInfo } from './CampaignInfo'
import { CampaignMap } from './CampaignMap'

interface Props {
  data: CampaignDetail
  viewerCount: number
}

export default function Details({ data, viewerCount }: Props) {
  return (
    <div className="max-w-167.5 w-full flex flex-col">
      <CampaignImageCarousel images={data.images?.map(img => img.url) ?? []} />
      <div className="flex flex-col gap-7.5 pb-17">
        <CampaignInfo data={data} viewerCount={viewerCount} />
        <CampaignDetailInfo data={data} />
        <CampaignMap location={data.location} />
      </div>
    </div>
  )
}
