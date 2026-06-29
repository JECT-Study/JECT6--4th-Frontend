import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function SectionShell({
  title,
  action,
  children,
  className,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('mt-10', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-medium leading-8 text-[#474747]">{title}</h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}
