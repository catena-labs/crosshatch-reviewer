import { NextResponse } from "next/server"
import { handler } from "typed-route-handler"

import { env } from "@/env/server"

export const runtime = "edge"

interface ResponseBody {
  pong: string
  timestamp: string
}

export const GET = handler<ResponseBody>(() => {
  return NextResponse.json({
    pong: env.CF_PAGES_COMMIT_SHA,
    timestamp: new Date().toISOString()
  })
})
