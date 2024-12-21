import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Simple Blog',
  description: 'A blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="max-w-2xl mx-auto py-10 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">My Simple Blog</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}

