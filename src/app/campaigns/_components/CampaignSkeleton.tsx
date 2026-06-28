import { Skeleton } from '@/components/ui/skeleton'

export default function CampaignCardSkeleton() {
  return (
    <article className="flex h-80.5 max-w-none flex-col gap-3 bg-transparent font-pretendard">
      <div className="relative h-43 w-full shrink-0">
        <Skeleton className="h-full w-full" />
        <Skeleton className="absolute right-4 top-4 size-8.5 rounded-full bg-white/80" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-2 border-b border-neutral_95 pb-3">
          <Skeleton className="h-6 w-13 rounded-sm" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </article>
  )
}
