import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

export function SavedSummaryCard({
  label,
  count,
  href,
}: {
  label: string
  count: number
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex flex-1 items-center gap-3 rounded-3xl border border-[#dcdcdc] px-6 py-10 transition-colors hover:bg-neutral_99"
    >
      <div className="flex flex-1 flex-col gap-3">
        <span className="text-16 font-semibold text-neutral_50">{label}</span>
        <span className="text-24 font-semibold text-[#303030]">{count}개</span>
      </div>
      <div className="flex size-11 shrink-0 items-center justify-center">
        <ChevronRight className="size-6 text-neutral_50" aria-hidden />
      </div>
    </Link>
  )
}
