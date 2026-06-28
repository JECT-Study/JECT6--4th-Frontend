import { SectionShell } from './SectionShell'

export function BlogLinkSection({
  blogUrl,
  onEdit,
}: {
  blogUrl: string | null
  onEdit?: () => void
}) {
  return (
    <SectionShell
      title="내 블로그 연동"
      action={
        <button
          type="button"
          onClick={onEdit}
          className="text-16 font-medium text-neutral_60 hover:text-neutral_30"
        >
          편집
        </button>
      }
    >
      <div className="flex items-center gap-6 rounded-2xl border border-neutral_95 px-6 py-6">
        <span className="size-[62px] shrink-0 rounded-full bg-neutral_95" aria-hidden />
        <div className="flex flex-col gap-1">
          <span className="text-16 font-semibold text-neutral_20">네이버 블로그 URL</span>
          <span className="text-14 text-neutral_60">{blogUrl ?? '연동된 블로그가 없습니다.'}</span>
        </div>
      </div>
    </SectionShell>
  )
}
