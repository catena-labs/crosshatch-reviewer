import { notFound } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { summarizeChanges } from "@/lib/crosshatch/summarize-changes"
import { getClient } from "@/lib/github/client"
import { createPullRequestComment } from "@/lib/github/create-pull-request-comment"
import { extractChangesFromDiff } from "@/lib/github/extract-changes-from-diff"
import { getPullRequestDiff } from "@/lib/github/get-pull-request-diff"

export const runtime = "edge"

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
  console.log("Got a payload", JSON.stringify({ json }, null, 2))
  const payload = payloadSchema.parse(json)

  console.log("parsed payload", JSON.stringify({ payload }, null, 2))

  /**
   * If there's no installation, we can't authenticate.
   */
  if (!payload.installation) {
    notFound()
  }

  /**
   * We only handle opened/syncrhonized PRs right now
   */
  if (!isOpenedOrSynchronizedPullRequest(payload)) {
    console.log(
      `Not a PR open or synchronize event, got '${payload.action}' skipping.`
    )
    notFound()
  }

  const githubClient = await getClient({
    installationId: payload.installation.id
  })

  // Load the diff
  const diff = await getPullRequestDiff(
    githubClient,
    payload.pull_request.base.repo.owner.login,
    payload.pull_request.base.repo.name,
    payload.number
  )

  console.log("Diff", { diff })

  const changes = extractChangesFromDiff(diff)
  console.log("Changes", { changes })
  const summary = await summarizeChanges(changes)

  if (!summary) {
    console.log("No summary, skipping.")
    notFound()
  }

  await createPullRequestComment(
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
