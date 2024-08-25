import { createEnv } from "@t3-oss/env-nextjs"

import { env as shared } from "./shared"

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1)
  },
  extends: [shared],
  runtimeEnv: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    //   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  }
})
