import type { ReactNode } from 'react'

import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { Providers } from './_components/Providers'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
