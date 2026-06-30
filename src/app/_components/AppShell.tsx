'use client'

import { usePathname } from 'next/navigation'

import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

const FULLSCREEN_ROUTES = new Set(['/onboarding'])

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isFullscreenRoute = FULLSCREEN_ROUTES.has(pathname)

  if (isFullscreenRoute) {
    return children
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
