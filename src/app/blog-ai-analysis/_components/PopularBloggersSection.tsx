import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

import type { PopularBlogger } from '@/entities/blog-analysis'

export function PopularBloggersSection({ bloggers }: { bloggers: PopularBlogger[] }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-24 font-bold leading-36">내 카테고리의 인기 블로거</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        {bloggers.map(blogger => (
          <PopularBloggerCard key={blogger.nickname} blogger={blogger} />
        ))}
      </div>
    </section>
  )
}

function PopularBloggerCard({ blogger }: { blogger: PopularBlogger }) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">
      <Link className="group block" href={blogger.profileUrl}>
        <h3 className="flex items-center gap-1 text-22 font-bold leading-32 text-neutral_20">
          {blogger.nickname}
          <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </h3>
        <div className="mt-4 h-42 rounded-sm bg-neutral_95" aria-hidden />
      </Link>
      <div className="mt-4 flex items-center gap-2 text-12 leading-16 text-neutral_70">
        <span className="ml-auto font-semibold text-green_40">
          상위 {100 - blogger.overallScore}%
        </span>
      </div>
    </article>
  )
}
