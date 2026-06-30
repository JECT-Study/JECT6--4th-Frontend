import type { ReactNode } from 'react'

import { AppShell } from './_components/AppShell'
import { Providers } from './_components/Providers'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
