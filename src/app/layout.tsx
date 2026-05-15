export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-pretendard">{children}</body>
    </html>
  )
}
