import { createEnv } from "@t3-oss/env-nextjs"
import { env as shared } from "./shared"

export const env = createEnv({
  extends: [shared],
  server: {
    // DATABASE_URL: z.string().url(),
    // OPEN_AI_API_KEY: z.string().min(1)
  },
  experimental__runtimeEnv: process.env
})