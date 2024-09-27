import { Octokit } from "@octokit/rest"

/**
 * TODO: Make sure we haven't commented, and if we have,
 * update it?
 */
export async function createPullRequestComment(
  client: Octokit,
  owner: string,
  repo: string,
  number: number,
  summary: string
) {
  const response = await client.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: summary
  })

  return response
}
