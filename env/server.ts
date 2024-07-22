import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // DATABASE_URL: z.string().url(),
    // OPEN_AI_API_KEY: z.string().min(1)
  },
  shared: {
    NODE_ENV: z
      .enum(["test", "development", "production"])
      .default("development")
  },
  experimental__runtimeEnv: process.env
})
