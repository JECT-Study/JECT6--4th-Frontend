'use client'

import { useRouter } from 'next/navigation'

import { type ReactNode, useEffect } from 'react'

import { useAtomValue } from 'jotai'

import { isLoggedInAtom } from '@/entities/auth'

import { MyPageTabs } from './_components/MyPageTabs'

export default function MyPageLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = useAtomValue(isLoggedInAtom)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/auth/login')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <main className="mx-auto w-full max-w-300 px-5 pb-30">
      <MyPageTabs />
      {children}
    </main>
  )
}
