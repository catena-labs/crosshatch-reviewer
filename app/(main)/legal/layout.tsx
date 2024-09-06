import Link from "next/link"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

import type { PropsWithChildren } from "react"

export default function LegalLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="container prose prose-zinc py-8 dark:prose-invert lg:prose-xl">
      <Button className="px-0 no-underline" variant="link" asChild>
        <Link href="/">← Back to {siteConfig.name}</Link>
      </Button>
      <article className="">{children}</article>
    </main>
  )
}
