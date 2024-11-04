import { OpenAI } from "openai"
import { env } from "@/env/server"

const SYSTEM_PROMPT = `You are a code reviewer assistant who summarizes code changes and flags potential bugs and security threats.
You will be given three inputs:
1. A pull request title that briefly describes the change
2. A pull request description that provides context about the changes
3. A diff of the pull request changes

Using all inputs, you will summarize the changes into 4 sections:
The first section is 'Summary', which is a maximum of 3 sentences giving an overview of the Pull Request and alerting if there is any major issues.
The second section is 'Notable Changes' which is a bulleted list of major and notable changes.
The third section is 'Potential concerns', which is a bulleted list any bugs, security threats, or other concerns if any are present.
And the final section is 'Potential improvements' which is a bulleted list of thigns that may be done to improve the pull request.
For all sections: never mention unimportant changes, such as imports or formatting changes. Be concise. Always write in markdown, never use header-1.`

/**
 * TODO: Limit the number of changes!
 */
export async function summarizeChanges(
  title: string,
  description: string | null,
  changes: string[]
) {
  if (!changes.length) {
    return
  }

  const openai = new OpenAI({
    baseURL: env.CROSSHATCH_BASE_URL,
    apiKey: env.CROSSHATCH_API_KEY
  })

  const userMessage = `
  TITLE: ${title}
  DESCRIPTION: ${description ?? "No description provided"}
  CHANGES:
  ${changes.join("\n\n")}
  `

  const response = await openai.chat.completions.create({
    stream: false,
    model: "lmsys-coding",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: userMessage
      }
    ]
  })

  return response.choices[0]?.message.content ?? undefined
}
