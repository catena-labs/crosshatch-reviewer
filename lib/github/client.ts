import { InstallationAuthOptions, createAppAuth } from "@octokit/auth-app"
import { Octokit } from "@octokit/rest"
import { env } from "@/env/server"

type GetClientOptions = Pick<InstallationAuthOptions, "installationId">

/**
 * Builds an Octokit instance with authentication
 * @param installationId
 * @returns
 */
export async function getClient(opts?: GetClientOptions) {
  const auth = createAppAuth({
    appId: env.GITHUB_APP_ID,
    privateKey: env.GITHUB_APP_PRIVATE_KEY,
    clientId: env.GITHUB_APP_CLIENT_ID,
    clientSecret: env.GITHUB_APP_CLIENT_SECRET
  })

  const { token } = await auth({ type: "installation", ...opts })

  // Create a new Octokit instance with the authenticated token
  return new Octokit({ auth: token })
}
