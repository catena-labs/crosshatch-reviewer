import { ThemeToggle } from "@/components/layout/theme-toggle"
import { siteConfig } from "@/config/site"
import { CookieIcon, CopyrightIcon, HandshakeIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export function Footer() {
  return (
    <footer className="row-start-3 flex w-full flex-col flex-wrap items-center justify-between gap-6 sm:flex-row">
      <div className="flex flex-col sm:flex-row">
        <Button
          variant="link"
          className="gap-2 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/">
            <CopyrightIcon width={16} height={16} />
            {new Date().getFullYear()} {siteConfig.name}
          </Link>
        </Button>

        <Button
          variant="link"
          className="gap-2 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/legal/privacy">
            <CookieIcon width={16} height={16} />
            Privacy
          </Link>
        </Button>

        <Button
          variant="link"
          className="gap-2 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/legal/terms">
            <HandshakeIcon width={16} height={16} />
            Terms
          </Link>
        </Button>
      </div>
      <ThemeToggle />
    </footer>
  )
}
