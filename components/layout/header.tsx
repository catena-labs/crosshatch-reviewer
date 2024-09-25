import Link from "next/link"
import type { HTMLProps } from "react"
import { Button } from "@/components/ui/button"
import { env } from "@/env/shared"
import { cn } from "@/lib/utils/cn"

type Props = HTMLProps<HTMLDivElement>

export function Header({ className, ...props }: Props) {
  const isCloudflare = env.NODE_ENV === "production"

  return (
    <header className={cn("w-full", className)} {...props}>
      <div className="container flex items-center justify-center gap-4 p-2">
        <Button className="gap-2 font-mono text-sm" variant="ghost" asChild>
          <Link
            href="https://pages.cloudflare.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="relative flex size-3">
              <span
                className={cn(
                  "absolute inline-flex size-full animate-ping rounded-full  opacity-75",
                  isCloudflare ? "bg-orange-400" : "bg-blue-400"
                )}
              ></span>
              <span
                className={cn(
                  "relative inline-flex size-3 rounded-full",
                  isCloudflare ? "bg-orange-500" : "bg-blue-500"
                )}
              ></span>
            </span>
            <span>
              {isCloudflare ? (
                <>Deployed to Cloudflare</>
              ) : (
                <>Running on localhost</>
              )}
            </span>
          </Link>
        </Button>
      </div>
    </header>
  )
}
