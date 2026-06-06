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
    <div className="py-23 max-w-167.5 w-full flex flex-col">
      <div className="flex flex-col gap-8.25">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div>{data.channel}</div>
            <div className="text-22 leading-6.5">{data.brandName}</div>
          </div>
          <h1 className="text-[32px] leading-40 font-medium">{data.title}</h1>
        </div>
        <p className="text-20 text-[#666666] font-normal">{data.description}</p>
      </div>
      <CampaignImageCarousel
        images={[
          'https://media.bunjang.co.kr/product/410221229_2_1779701101_w360.jpg',
          'https://media.bunjang.co.kr/product/410221229_2_1779701101_w360.jpg',
        ]}
      />
      <div className="flex flex-col gap-7.5">
        <CampaignInfo data={data} />
        <CampaignDetailInfo data={data} />
        <CampaignMap regionDepth1={data.regionDepth1} regionDepth2={data.regionDepth2} />
      </div>
    </div>
  )
}
