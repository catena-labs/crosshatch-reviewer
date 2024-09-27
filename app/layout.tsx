import "./globals.css"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import type { PropsWithChildren } from "react"
import { TailwindIndicator } from "@/components/layout/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils/cn"
import { fullURL } from "@/lib/utils/url-fns/full-url"

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  description: siteConfig.description,
  metadataBase: fullURL(),
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: "Automatically summarize your pull requests",
    type: "website",
    url: fullURL()
  },
  title: {
    default: `Automatically summarize your pull requests | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.author.twitter,
    description: siteConfig.description,
    site: siteConfig.handles.twitter,
    title: "Automatically summarize your pull requests"
  }
}

export const viewport: Viewport = {
  themeColor: "var(--background)"
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "font-sans antialiased"
        )}
      >
        <ThemeProvider attribute="class">
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
