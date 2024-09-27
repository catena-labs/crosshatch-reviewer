import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

import { env as shared } from "./shared"

export const env = createEnv({
  experimental__runtimeEnv: process.env,
  extends: [shared],
  server: {
    /**
     * Cloudflare Env Vars
     */
    CF_PAGES_COMMIT_SHA: z.string().default("unknown"),
    CF_PAGES_URL: z.string().url().optional(),
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
    CROSSHATCH_BASE_URL: z.string().url().optional(),
    CROSSHATCH_API_KEY: z.string().optional(),
    /**
     * Misc
     */
    NODE_VERSION: z.string().optional()
  }
})
