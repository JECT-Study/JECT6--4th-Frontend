import { CampaignDetailInfo } from './CampaignDetailInfo'
import { CampaignImageCarousel } from './CampaignImageCarousel'
import { CampaignInfo } from './CampaignInfo'
import { CampaignMap } from './CampaignMap'
import { mockCampaignDetail } from './mock'

interface Props {
  id: string
}

export default function Details({ id }: Props) {
  const data = mockCampaignDetail
  console.log(id)

  return (
    <div className="max-w-167.5 w-full flex flex-col">
      <CampaignImageCarousel images={data.images?.map(img => img.url) ?? []} />
      <div className="flex flex-col gap-7.5 pb-17">
        <CampaignInfo data={data} />
        <CampaignDetailInfo data={data} />
        <CampaignMap location={data.location} />
      </div>
    </div>
  )
}
