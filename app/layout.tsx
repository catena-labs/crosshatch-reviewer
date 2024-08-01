import "./globals.css"
import { TailwindIndicator } from "@/components/layout/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { fullURL } from "@/lib/url-fns/full-url"
import { cn } from "@/lib/utils/cn"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import type { PropsWithChildren } from "react"

export const metadata: Metadata = {
  metadataBase: fullURL(),
  applicationName: siteConfig.name,
  title: {
    default: `A sane way to start your next next.js project | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: fullURL(),
    siteName: siteConfig.name,
    title: "A sane way to start your next next.js project",
    description: siteConfig.description
  },
  twitter: {
    title: "A sane way to start your next next.js project",
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
    site: siteConfig.handles.twitter,
    card: "summary_large_image"
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ]
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html suppressHydrationWarning lang="en">
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
