import { describe, expect, test } from "bun:test"

import { fullURL } from "./full-url"

describe("fullURL()", () => {
  test("returns a full URL by appending the path to the host", () => {
    expect(fullURL("/path").toString()).toBe("http://test.host/path")
  })
})
