import { Sparkles } from 'lucide-react'

interface Props {
  index: number
  diagnosisDate: string
}

function formatDate(d: string): string {
  if (d.length === 8 && /^\d+$/.test(d)) {
    return `${d.slice(0, 4)}.${d.slice(4, 6)}.${d.slice(6, 8)}`
  }
  return d
}

export function AiDiagnosisCard({ index, diagnosisDate }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 rounded-[16px] border border-[#dcdcdc] px-6 py-8">
      <div className="flex size-[62px] shrink-0 items-center justify-center rounded-full bg-neutral_99">
        <Sparkles className="size-8 text-neutral_50" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[22px] font-semibold leading-32 text-[#474747]">
          AI 블로그 진단 {index}
        </p>
        <p className="text-[18px] font-medium leading-20 text-[#737373]">
          {formatDate(diagnosisDate)}
        </p>
      </div>
    </div>
  )
}
