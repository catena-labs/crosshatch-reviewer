import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1)
  },
  shared: {
    NODE_ENV: z
      .enum(["test", "development", "production"])
      .default("development")
  },
  runtimeEnv: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    //   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NODE_ENV: process.env.NODE_ENV
  }
})
