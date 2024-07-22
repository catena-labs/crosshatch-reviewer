import { createEnv } from "@t3-oss/env-nextjs"
import { env as shared } from "./shared"

export const env = createEnv({
  extends: [shared],
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1)
  },
  runtimeEnv: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    //   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  }
})
