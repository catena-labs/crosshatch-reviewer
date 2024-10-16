import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

import { env as shared } from "./shared"

export const env = createEnv({
  experimental__runtimeEnv: process.env,
  extends: [shared],
  server: {
    /**
     * Github
     */
    GITHUB_APP_WEBHOOK_SECRET: z.string(),
    GITHUB_APP_ID: z.coerce.number(),
    GITHUB_APP_SLUG: z.string(),
    GITHUB_APP_CLIENT_ID: z.string(),
    GITHUB_APP_CLIENT_SECRET: z.string(),
    GITHUB_APP_PRIVATE_KEY: z.string(),

    /**
     * Crosshatch
     */
    CROSSHATCH_BASE_URL: z
      .string()
      .url()
      .default("https://api.crosshatch.app/v1"),
    CROSSHATCH_API_KEY: z.string().optional(),
    /**
     * Misc
     */
    NODE_VERSION: z.string().optional()
  }
})
