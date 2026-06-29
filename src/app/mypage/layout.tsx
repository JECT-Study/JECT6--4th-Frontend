'use client'

import { useRouter } from 'next/navigation'

import { type ReactNode, useEffect, useState } from 'react'

import { useAtomValue } from 'jotai'

import { isLoggedInAtom } from '@/entities/auth'

import { MyPageTabs } from './_components/MyPageTabs'

export default function MyPageLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = useAtomValue(isLoggedInAtom)
  const router = useRouter()

  const [hydrated, setHydrated] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration guard: effect runs only on client after mount
  useEffect(() => setHydrated(true), [])
  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.replace('/auth/login')
    }
  }, [hydrated, isLoggedIn, router])

  if (!hydrated || !isLoggedIn) {
    return null
  }

  return (
    <main className="mx-auto w-full max-w-300 px-5 pb-30">
      <MyPageTabs />
      {children}
    </main>
  )
}
