import type { PropsWithChildren } from "react"

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return <div className="flex min-h-screen flex-col">{children}</div>
}
