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
            제공된 무료 AI 진단 {limit}회가 모두 소진 되었어요. 매월 무료 진단 횟수가 충전됩니다.
          </p>
        </div>
      </div>
    )
  }

  return (
    <p className="text-16 text-neutral_50">
      남은 무료 AI 진단 <span className="font-semibold text-neutral_20">{remaining}</span>회
    </p>
  )
}
