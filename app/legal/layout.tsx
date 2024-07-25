import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import type { PropsWithChildren } from "react"

export default function LegalLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="prose prose-zinc lg:prose-xl dark:prose-invert container py-8">
      <Button variant="link" className="px-0 no-underline" asChild>
        <Link href="/">← Back to {siteConfig.name}</Link>
      </Button>
      <article className="">{children}</article>
    </main>
  )
}
