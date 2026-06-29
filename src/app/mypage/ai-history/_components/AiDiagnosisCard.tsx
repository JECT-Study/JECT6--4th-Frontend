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
    <div className="flex min-w-0 flex-1 flex-col gap-8 rounded-2xl border border-neutral_95 px-6 py-8">
      <div className="flex size-[62px] shrink-0 items-center justify-center rounded-full bg-neutral_99">
        <Sparkles className="size-8 text-neutral_50" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-22 font-semibold leading-32 text-neutral_30">AI 블로그 진단 {index}</p>
        <p className="text-18 font-medium leading-20 text-neutral_50">
          {formatDate(diagnosisDate)}
        </p>
      </div>
    </div>
  )
}
