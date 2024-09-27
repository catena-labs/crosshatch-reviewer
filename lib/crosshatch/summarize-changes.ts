import { OpenAI } from "openai"
import { env } from "@/env/server"

const SYSTEM_PROMPT = `You are a code reviewer assistant who summarizes code changes and flags potential bugs and security threats.
You will be given a diff of a pull request. You will summarize the changes into 4 sections:
The first section is 'Summary', which is a maximum of 3 sentences giving an overview of the Pull Request and alerting if there is any major issues.
The second section is 'Notable Changes' which is a bulleted list of major and notable changes.
The third section is 'Potential concerns', which is a bulleted list any bugs, security threats, or other concerns if any are present.
And the final section is 'Potential improvements' which is a bulleted list of thigns that may be done to improve the pull request.
For all sections: never mention unimportant changes, such as imports or formatting changes. Be concise. Always write in markdown, never use header-1.`

/**
 * TODO: Limit the number of changes!
 */
export async function summarizeChanges(changes: string[]) {
  if (!changes.length) {
    return
  }

  const openai = new OpenAI({
    baseURL: env.CROSSHATCH_BASE_URL,
    apiKey: env.CROSSHATCH_API_KEY
  })

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
        content: `Here is the diff:\n${changes.join("\n\n")}`
      }
    ]
  })

  return response.choices[0]?.message.content ?? undefined
}
