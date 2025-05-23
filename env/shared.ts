import { createEnv } from "@t3-oss/env-nextjs"
import { vercel } from "@t3-oss/env-nextjs/presets"
import { z } from "zod"

export const env = createEnv({
  extends: [vercel()],
  runtimeEnv: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NODE_ENV: process.env.NODE_ENV
  },
  shared: {
    NEXT_PUBLIC_HOST: z
      .string()
      .url()
      .default("https://reviewer.crosshatch.app"),
    NODE_ENV: z
      .enum(["test", "development", "production"])
      .default("development")
  }
})
