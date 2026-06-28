export function ProfileHeader({ nickname, onEdit }: { nickname: string; onEdit?: () => void }) {
  return (
    <div className="flex items-end gap-4 pt-12">
      <h1 className="text-40 font-bold leading-12 text-neutral_20">{nickname}</h1>
      <button
        type="button"
        onClick={onEdit}
        className="pb-2 text-16 font-medium leading-5 text-neutral_60 hover:text-neutral_30"
      >
        편집
      </button>
    </div>
  )
}
