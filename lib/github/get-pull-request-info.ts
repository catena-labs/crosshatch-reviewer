import { Octokit } from "@octokit/rest"

export interface PullRequestInfo {
  diff: string
  title: string
  description: string | null
}

export async function getPullRequestInfo(
  client: Octokit,
  owner: string,
  repo: string,
  number: number
): Promise<PullRequestInfo> {
  const response = await client.pulls.get({
    owner,
    repo,
    pull_number: number,
    mediaType: {
      format: "json"
    }
  })

  const diffResponse = await client.pulls.get({
    owner,
    repo,
    pull_number: number,
    mediaType: {
      format: "diff"
    }
  })

  return {
    description: response.data.body,
    title: response.data.title,
    diff: diffResponse.data as unknown as string
  }
}
