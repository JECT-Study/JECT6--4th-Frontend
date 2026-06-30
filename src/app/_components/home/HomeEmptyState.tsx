interface HomeEmptyStateProps {
  message?: string
}

export function HomeEmptyState({ message = '데이터가 없습니다.' }: HomeEmptyStateProps) {
  return (
    <div className="flex min-h-40 w-full items-center justify-center rounded-md border border-neutral_90 bg-neutral_99 px-5 py-10">
      <p className="m-0 text-center text-15 font-medium leading-22 text-neutral_60">{message}</p>
    </div>
  )
}
