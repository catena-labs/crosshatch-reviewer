import { notFound } from "next/navigation"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { summarizeChanges } from "@/lib/crosshatch/summarize-changes"
import { getClient } from "@/lib/github/client"
import { createOrUpdatePullRequestComment } from "@/lib/github/create-or-update-pull-request-comment"
import { extractChangesFromDiff } from "@/lib/github/extract-changes-from-diff"
import { getPullRequestInfo } from "@/lib/github/get-pull-request-info"

export const runtime = "edge"
export const maxDuration = 300

/**
 * Schemas from {@link https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#pull_request}
 */

const prSchema = z.object({
  number: z.number(),
  installation: z
    .object({
      id: z.union([z.string(), z.number()])
    })
    .optional(),
  pull_request: z.object({
    base: z.object({
      repo: z.object({
        name: z.string(),
        owner: z.object({
          login: z.string()
        })
      })
    })
  })
})

const prOpenedSchema = prSchema.extend({
  action: z.literal("opened")
})

const prSynchronizeSchema = prSchema.extend({
  action: z.literal("synchronize")
})

const genericPayloadSchema = z.intersection(
  z.object({
    action: z.string()
  }),
  z.record(z.unknown())
)

const payloadSchema = z.union([
  prOpenedSchema,
  prSynchronizeSchema,
  genericPayloadSchema
])

function isOpenedOrSynchronizedPullRequest(
  payload: z.infer<typeof payloadSchema>
): payload is
  | z.infer<typeof prOpenedSchema>
  | z.infer<typeof prSynchronizeSchema> {
  return payload.action == "opened" || payload.action == "synchronize"
}

export async function POST(req: NextRequest) {
  const json = (await req.json()) as unknown
  const payload = payloadSchema.parse(json)

  /**
   * If there's no installation, we can't authenticate.
   */
  if (!payload.installation) {
    notFound()
  }

  /**
   * We only handle opened/synchronized PRs right now
   */
  if (!isOpenedOrSynchronizedPullRequest(payload)) {
    console.debug(
      `Not a PR open or synchronize event, got '${payload.action}' skipping.`
    )
    return NextResponse.json({
      ok: true
    })
  }

  const githubClient = await getClient({
    installationId: payload.installation.id
  })

  // Load the PR info
  const { title, description, diff } = await getPullRequestInfo(
    githubClient,
    payload.pull_request.base.repo.owner.login,
    payload.pull_request.base.repo.name,
    payload.number
  )

  const changes = extractChangesFromDiff(diff)
  const summary = await summarizeChanges(title, description, changes)

  if (!summary) {
    console.debug("No summary, skipping.")
    notFound()
  }

  await createOrUpdatePullRequestComment(
    githubClient,
    payload.pull_request.base.repo.owner.login,
    payload.pull_request.base.repo.name,
    payload.number,
    summary
  )

  return NextResponse.json({
    ok: true
  })
}
