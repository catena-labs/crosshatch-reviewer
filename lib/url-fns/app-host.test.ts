import { describe, expect, test } from "bun:test"

import { appHost } from "./app-host"
import { env } from "@/env/client"

describe("appHost()", () => {
  test("returns the app host", () => {
    expect(appHost()).toBe(env.NEXT_PUBLIC_HOST!)
  })

  test("can exclude the protocol", () => {
    const url = new URL(env.NEXT_PUBLIC_HOST!)
    expect(appHost(false)).toBe(url.host)
  })
})
