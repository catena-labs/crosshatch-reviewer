import { NextResponse } from "next/server"
import { handler } from "typed-route-handler"

export const runtime = "edge"

interface ResponseBody {
  pong: string
}

export const GET = handler<ResponseBody>(() => {
  return NextResponse.json({
    pong: new Date().toISOString()
  })
})
