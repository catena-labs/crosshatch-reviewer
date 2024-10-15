import Image from "next/image"
import Link from "next/link"
import type { PropsWithChildren } from "react"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}

      <div className="container flex flex-row justify-center sm:justify-start">
        <Button variant="ghost" className="h-auto" asChild>
          <Link
            href="https://crosshatch.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/powered-by-crosshatch.png"
              alt="Powered by Crosshatch"
              width="136"
              height="40"
            />
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  )
}
