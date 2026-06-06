import { CampaignDetail } from '@/entities/campaign'

interface Props {
  data: CampaignDetail
}

export function CampaignDetailInfo({ data }: Props) {
  return (
    <div className="p-5 flex flex-col gap-5 border border-neutral_95 rounded-[8px]">
      <div>체험단 상세 안내</div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col">
            <div>키워드</div>
            <div>{data.id}</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col">
            <div>링크</div>
            <div>ㄴㄷㄹㄴㄷㄹㄴㄷㄹ</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col">
            <div>추가 안내사항</div>
            <div>ㄴㄷㄹㄴㄷㄹㄴㄷㄹ</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col">
            <div>유의사항</div>
            <div>ㄴㄷㄹㄴㄷㄹㄴㄷㄹ</div>
          </div>
        </div>
      </div>
    </div>
  )
}
