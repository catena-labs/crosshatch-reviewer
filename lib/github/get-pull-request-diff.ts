import { Octokit } from "@octokit/rest"

/**
 * Loads a diff from a pull request.
 *
 * @returns an array of changed, grouped by file
 */
export async function getPullRequestDiff(
  client: Octokit,
  owner: string,
  repo: string,
  number: number
) {
  const response = await client.pulls.get({
    owner,
    repo,
    pull_number: number,
    mediaType: {
      format: "diff"
    }
  })

  /**
   * The response.data object is actually a string when mediaType is 'diff',
   * but is not able to be typed as such.
   * @see {@link https://github.com/octokit/request.js/issues/463#issuecomment-1164800010}
   */
  return response.data as unknown as string
}
