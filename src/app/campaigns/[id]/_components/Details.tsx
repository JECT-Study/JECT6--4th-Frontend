import type { CampaignDetail } from '@/entities/campaign'

import BgImage1 from '@/shared/assets/icons/bg_1.jpeg'
import BgImage2 from '@/shared/assets/icons/bg_2.jpg'
import BgImage3 from '@/shared/assets/icons/bg_3.jpeg'

import { CampaignDetailInfo } from './CampaignDetailInfo'
import { CampaignImageCarousel } from './CampaignImageCarousel'
import { CampaignInfo } from './CampaignInfo'
import { CampaignMap } from './CampaignMap'

interface Props {
  data: CampaignDetail
  viewerCount: number
}

const DETAIL_IMAGES = [BgImage1.src, BgImage2.src, BgImage3.src]

export default function Details({ data, viewerCount }: Props) {
  return (
    <div className="max-w-167.5 w-full flex flex-col">
      <CampaignImageCarousel images={DETAIL_IMAGES} />
      <div className="flex flex-col gap-7.5 pb-17">
        <CampaignInfo data={data} viewerCount={viewerCount} />
        <CampaignDetailInfo data={data} />
        <CampaignMap location={data.location} />
      </div>
    </div>
  )
}
