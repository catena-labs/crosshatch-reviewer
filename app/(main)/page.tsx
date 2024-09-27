import Link from "next/link"

import { Logo } from "@/components/icons/brand/logo"
import { GithubIcon } from "@/components/icons/social/github-icon"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function Home() {
  return (
    <main className="flex grow flex-col items-center justify-center">
      <div className="container flex max-w-md flex-col items-center gap-8 sm:items-start">
        <div className="flex flex-row items-center gap-4 font-mono">
          <Logo className="size-11" />
          <div className="flex flex-col">
            <h2 className="text-sm uppercase tracking-widest">Crosshatch</h2>
            <h1 className="text-3xl font-extrabold">Reviewer</h1>
          </div>
        </div>
        <ol className="list-inside list-decimal text-center font-mono text-sm sm:text-left">
          <li className="mb-1">Install the app on your repository</li>
          <li className="mb-1">Open up a Pull Request.</li>
          <li>That's it</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            className="gap-2 rounded-full"
            size="lg"
            variant="default"
            asChild
          >
            <Link
              href="https://github.com/apps/crosshatch-reviewer-dev/installations/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="size-4 fill-current" />
              Install on Github
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
