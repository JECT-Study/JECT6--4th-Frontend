'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const TABS = [
  { href: '/mypage/account', label: '내 계정 관리' },
  { href: '/mypage/saved', label: '관심 공고' },
  { href: '/mypage/ai-history', label: 'AI 히스토리' },
] as const

export function MyPageTabs() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-0 border-b border-neutral_95">
      {TABS.map(tab => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'relative px-4 py-6 text-[24px] font-semibold leading-9 transition-colors',
              active ? 'text-[#e72731]' : 'text-neutral_60 hover:text-neutral_30'
            )}
          >
            {tab.label}
            {active && (
              <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[#e72731]" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
