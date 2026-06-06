import { CampaignDetail } from '@/entities/campaign'

import CalendarIcon from '@/shared/assets/icons/calendar.svg'
import InfoIcon from '@/shared/assets/icons/info.svg'

interface Props {
  data: CampaignDetail
}

export function CampaignDetailInfo({ data }: Props) {
  return (
    <div className="p-5 flex flex-col gap-5 border border-neutral_95 rounded-[8px]">
      <div className="text-24 leading-6.5 font-medium flex items-center gap-2.5">
        <InfoIcon />
        체험단 상세 안내
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <CalendarIcon />
          <div className="flex flex-col">
            <div className="text-16 leading-20">키워드</div>
            <div className="text-14 leading-20 text-[#666666]">{data.id}</div>
          </div>
        </div>
        <div className="flex gap-4">
          <CalendarIcon />
          <div className="flex flex-col">
            <div className="text-16 leading-20">링크</div>
            <div className="text-14 leading-20 text-[#666666]">ㄴㄷㄹㄴㄷㄹㄴㄷㄹ</div>
          </div>
        </div>
        <div className="flex gap-4">
          <CalendarIcon />
          <div className="flex flex-col">
            <div className="text-16 leading-20">추가 안내사항</div>
            <div className="text-14 leading-20 text-[#666666]">ㄴㄷㄹㄴㄷㄹㄴㄷㄹ</div>
          </div>
        </div>
        <div className="flex gap-4">
          <CalendarIcon />
          <div className="flex flex-col">
            <div className="text-16 leading-20">유의사항</div>
            <div className="text-14 leading-20 text-[#666666]">ㄴㄷㄹㄴㄷㄹㄴㄷㄹ</div>
          </div>
        </div>
      </div>
    </div>
  )
}
