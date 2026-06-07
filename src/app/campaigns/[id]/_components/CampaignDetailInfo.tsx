import type { CampaignDetail } from '@/entities/campaign'

import CalendarIcon from '@/shared/assets/icons/calendar.svg'
import InfoIcon from '@/shared/assets/icons/info.svg'

interface Props {
  data: CampaignDetail
}

export function CampaignDetailInfo({ data }: Props) {
  const detail = data.campaignDetail

  if (!detail) return null

  return (
    <div className="p-5 flex flex-col gap-5 border border-neutral_95 rounded-[8px]">
      <div className="text-24 leading-6.5 font-medium flex items-center gap-2.5">
        <InfoIcon />
        체험단 상세 안내
      </div>
      <div className="flex flex-col gap-4">
        {(detail.titleKeywords.length > 0 || detail.bodyKeywords.length > 0) && (
          <div className="flex gap-4">
            <CalendarIcon />
            <div className="flex flex-col">
              <div className="text-16 leading-20">키워드</div>
              <div className="text-14 leading-20 text-[#666666]">
                {[...detail.titleKeywords, ...detail.bodyKeywords].join(', ')}
              </div>
            </div>
          </div>
        )}
        {detail.links.length > 0 && (
          <div className="flex gap-4">
            <CalendarIcon />
            <div className="flex flex-col gap-1">
              <div className="text-16 leading-20">링크</div>
              {detail.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-14 leading-20 text-[#666666] underline"
                >
                  {link.title ?? link.url}
                </a>
              ))}
            </div>
          </div>
        )}
        {detail.additionalNotice && (
          <div className="flex gap-4">
            <CalendarIcon />
            <div className="flex flex-col">
              <div className="text-16 leading-20">추가 안내사항</div>
              <div className="text-14 leading-20 text-[#666666]">{detail.additionalNotice}</div>
            </div>
          </div>
        )}
        {detail.caution && (
          <div className="flex gap-4">
            <CalendarIcon />
            <div className="flex flex-col">
              <div className="text-16 leading-20">유의사항</div>
              <div className="text-14 leading-20 text-[#666666]">{detail.caution}</div>
            </div>
          </div>
        )}
        {detail.mission && (
          <div className="flex gap-4">
            <CalendarIcon />
            <div className="flex flex-col">
              <div className="text-16 leading-20">미션 가이드</div>
              <div className="text-14 leading-20 text-[#666666]">{detail.mission}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
