import type { ReactNode } from 'react'

export function SectionShell({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-20 font-semibold leading-8 text-neutral_20">{title}</h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}
