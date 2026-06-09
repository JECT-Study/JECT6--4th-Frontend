import HeartIcon from '@/shared/assets/icons/heart.svg'
import { Button } from '@/shared/ui'

export function CampaignActionSection() {
  return (
    <div className="flex flex-col gap-3.5">
      <Button>지원하러 가기</Button>
      <div className="py-6 px-8.75 rounded-[8px] flex gap-4.25 items-center bg-neutral_99">
        <div className="flex">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="size-8 rounded-full border border-[#A8A8A8] bg-white shadow-md"
              style={{ marginLeft: i === 0 ? 0 : '-8px', zIndex: 3 - i }}
            />
          ))}
        </div>
        <p className="text-16 leading-5.5">
          이 공고에 좋아요를 누른 사용자는
          <br />
          <span className="font-bold">000 블로거</span>의 특징을 가지고 있어요
        </p>
      </div>
      <Button variant="tertiary">
        <div className="flex items-center gap-3.5">
          <HeartIcon className="size-8" />
          관심공고 담기
        </div>
      </Button>
    </div>
  )
}
