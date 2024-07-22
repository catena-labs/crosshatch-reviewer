import { env } from "@/env/client"

/**
 * Adds a small indicator to the bottom left of the screen that shows the
 * current breakpoint. This is useful for debugging responsive styles.
 */
export function TailwindIndicator() {
  if (env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-5 left-2.5">
      <div className="bottom-2.5">
        <span
          className="flex size-6 items-center justify-center rounded-full font-bold text-xs"
          style={{
            boxShadow:
              "0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12)"
          }}
        >
          <span className="block sm:hidden">xs</span>
          <span className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
            sm
          </span>
          <span className="hidden md:block lg:hidden xl:hidden 2xl:hidden">
            md
          </span>
          <span className="hidden lg:block xl:hidden 2xl:hidden">lg</span>
          <span className="hidden xl:block 2xl:hidden">xl</span>
          <span className="hidden 2xl:block">2xl</span>
        </span>
      </div>
    </div>
  )
}
