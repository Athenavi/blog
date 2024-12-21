import './globals.css'
import type { Metadata } from 'next'
import { ThemeToggle } from '../components/theme-toggle'

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="max-w-2xl mx-auto py-10 px-4">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">My Simple Blog</h1>
            <ThemeToggle />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}

