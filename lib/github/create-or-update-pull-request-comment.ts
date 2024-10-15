import type { Octokit } from "@octokit/rest"

export async function createOrUpdatePullRequestComment(
  client: Octokit,
  owner: string,
  repo: string,
  number: number,
  summary: string
) {
  const commentsResponse = await client.rest.issues.listComments({
    owner,
    repo,
    issue_number: number
  })

  const appComment = commentsResponse.data.find((comment) => {
    return comment.performed_via_github_app?.slug === "crosshatch-reviewer"
  })

  if (appComment) {
    console.debug("Comment found, updating... ")
    return client.rest.issues.updateComment({
      owner,
      repo,
      comment_id: appComment.id,
      body: summary
    })
  }

  console.debug("Creating new comment...")

  return client.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: summary
  })
}
