import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { BackToTop } from "@/components/back-to-top"
import { ReadingProgress } from "@/components/reading-progress"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PCR Email AI Agent - Complete Technical Documentation",
  description:
    "Comprehensive technical documentation for Property Reports Plus PCR Email AI Agent - Intelligent property inspection scheduling system with AI-powered email processing, Google Calendar integration, and 11-step scheduling algorithm.",
  keywords:
    "PCR, Property Reports Plus, Email AI Agent, Inspection Scheduling, Property Management, Flask, Python, Supabase, Google Gemini AI",
  authors: [{ name: "Property Reports Plus" }],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased selection:bg-primary/20 selection:text-primary`}>
        <ReadingProgress />
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <main className="flex-1 lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
            <div className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-12 animate-fade-in">
              {children}
            </div>
            <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50 mt-12 bg-background/50 backdrop-blur-sm">
              <p>© {new Date().getFullYear()} Property Reports Plus. PCR Email AI Agent Documentation.</p>
            </footer>
          </main>
        </div>
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
