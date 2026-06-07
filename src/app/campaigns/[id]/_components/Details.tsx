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
      <CampaignImageCarousel
        images={[
          'https://media.bunjang.co.kr/product/410221229_2_1779701101_w360.jpg',
          'https://media.bunjang.co.kr/product/410221229_2_1779701101_w360.jpg',
        ]}
      />
      <div className="flex flex-col gap-7.5 pb-17">
        <CampaignInfo data={data} />
        <CampaignDetailInfo data={data} />
        <CampaignMap regionDepth1={data.regionDepth1} regionDepth2={data.regionDepth2} />
      </div>
    </div>
  )
}
