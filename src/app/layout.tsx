import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-pretendard">
        <Header />
        <div className="w-full flex items-center justify-center">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
