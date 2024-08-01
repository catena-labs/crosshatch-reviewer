import { ThemeToggle } from "@/components/layout/theme-toggle"
import { siteConfig } from "@/config/site"
import { CopyrightIcon } from "lucide-react"
import Link from "next/link"
import { GithubIcon } from "../icons/social/github-icon"
import { XTwitterIcon } from "../icons/social/x-twitter-icon"
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

        <nav className="flex flex-row items-center justify-center gap-2 sm:justify-start">
          <Button
            variant="link"
            className="px-0 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/legal/privacy">Privacy</Link>
          </Button>

          <Button
            variant="link"
            className="px-0 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/legal/terms">Terms</Link>
          </Button>
        </nav>
      </div>

      <nav className="flex flex-row items-center space-x-2">
        <Button variant="ghost" className="h-8 w-8 px-0" asChild>
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <span className="sr-only">Github</span>
            <GithubIcon className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" className="h-8 w-8 px-0" asChild>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">X (Twitter)</span>
            <XTwitterIcon className="size-4" />
          </Link>
        </Button>

        <ThemeToggle />
      </nav>
    </footer>
  )
}
