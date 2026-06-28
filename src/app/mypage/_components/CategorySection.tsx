import { SectionShell } from './SectionShell'

export function CategorySection({
  categories,
  onEdit,
}: {
  categories: string[]
  onEdit?: () => void
}) {
  return (
    <SectionShell
      title="관심 카테고리"
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
      {categories.length === 0 ? (
        <p className="text-14 text-neutral_60">선택된 관심 카테고리가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {categories.map(label => (
            <span
              key={label}
              className="rounded-xl bg-neutral_99 px-4 py-2 text-16 font-medium text-neutral_20"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </SectionShell>
  )
}
