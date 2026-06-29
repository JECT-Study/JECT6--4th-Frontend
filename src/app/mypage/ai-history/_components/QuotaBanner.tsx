import Link from 'next/link'

interface Props {
  limit: number
  remaining: number
}

export function QuotaBanner({ limit, remaining }: Props) {
  if (remaining <= 0) {
    return (
      <div className="flex items-center gap-6 rounded-[10px] border border-red_90 bg-red_99 px-6 py-8">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-20 font-medium leading-28 text-neutral_20">
            준비된 {limit}회의 AI 무료 진단을 모두 사용하셨어요
          </p>
          <p className="text-14 leading-20 text-neutral_40">
            제공된 무료 AI 진단 {limit}회가 모두 소진 되었어요. 멤버십 구독 또는 이용권 구매가
            필요합니다.
          </p>
        </div>
        <Link
          href="/mypage/subscription"
          className="shrink-0 text-16 font-medium text-red_30 underline"
        >
          결제하기 →
        </Link>
      </div>
    )
  }

  return (
    <p className="text-16 text-neutral_50">
      남은 무료 AI 진단 <span className="font-semibold text-neutral_20">{remaining}</span>회
    </p>
  )
}
